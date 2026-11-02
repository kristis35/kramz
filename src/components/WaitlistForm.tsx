"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { survey, waitlist } from "@/content/site";
import { externalReferrer, track, utmFromLocation } from "@/lib/client-analytics";

type Status = "idle" | "submitting" | "success" | "already" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(false);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("form_start");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Įvesk teisingą el. pašto adresą.";
    for (const q of survey) if (q.required && !answers[q.id]) e[q.id] = "Pasirink vieną atsakymą.";
    if (!consentPrivacy) e.consentPrivacy = "Be šio sutikimo negalime tavęs įtraukti į sąrašą.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("submitting");
    try {
      const form = new FormData(ev.currentTarget);
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers,
          consentPrivacy,
          consentMarketing,
          company: form.get("company"),
          utm: utmFromLocation(),
          referrer: externalReferrer(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "error");
      setStatus(data.existed ? "already" : "success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-ink/5 sm:p-12">
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-crunch text-white">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-bold">{waitlist.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {status === "already" ? waitlist.alreadyText : waitlist.successText}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={markStarted}
      noValidate
      className="space-y-7 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-10"
    >
      {/* Honeypot – žmonės šio lauko nemato */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Įmonė
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div id="field-email">
        <label htmlFor="email" className="mb-2 block font-semibold">
          {waitlist.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={waitlist.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded-2xl border border-ink/15 bg-cream/60 px-5 py-4 text-lg outline-none transition placeholder:text-muted/60 focus:border-crunch focus:bg-white focus:ring-4 focus:ring-crunch/15"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-crunch-deep">
            {errors.email}
          </p>
        )}
      </div>

      {survey.map((q) => (
        <fieldset key={q.id} id={`field-${q.id}`} aria-invalid={!!errors[q.id]}>
          <legend className="mb-3 font-semibold">{q.label}</legend>
          <div className="flex flex-wrap gap-2">
            {q.options.map((o) => {
              const checked = answers[q.id] === o.value;
              return (
                <label
                  key={o.value}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition select-none has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-crunch/25 ${
                    checked
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 bg-cream/60 hover:border-ink/40"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={o.value}
                    checked={checked}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
          {errors[q.id] && <p className="mt-2 text-sm text-crunch-deep">{errors[q.id]}</p>}
        </fieldset>
      ))}

      <div className="space-y-3 border-t border-ink/10 pt-6 text-sm">
        <label id="field-consentPrivacy" className="flex cursor-pointer gap-3">
          <input
            type="checkbox"
            checked={consentPrivacy}
            onChange={(e) => setConsentPrivacy(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-crunch"
          />
          <span>
            {waitlist.privacyConsent}{" "}
            <Link href="/privatumas" className="underline underline-offset-2 hover:text-crunch" target="_blank">
              Privatumo politika
            </Link>
            <span className="text-crunch"> *</span>
          </span>
        </label>
        {errors.consentPrivacy && <p className="pl-8 text-crunch-deep">{errors.consentPrivacy}</p>}
        <label className="flex cursor-pointer gap-3 text-muted">
          <input
            type="checkbox"
            checked={consentMarketing}
            onChange={(e) => setConsentMarketing(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-crunch"
          />
          <span>{waitlist.marketingConsent}</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-crunch px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-crunch/25 transition hover:bg-crunch-deep focus-visible:ring-4 focus-visible:ring-crunch/30 focus-visible:outline-none disabled:opacity-60"
      >
        {status === "submitting" ? waitlist.submitting : waitlist.submit}
      </button>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-crunch-deep">
          {waitlist.errorText}
        </p>
      )}
    </form>
  );
}
