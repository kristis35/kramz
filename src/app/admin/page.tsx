import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { brand } from "@/content/site";
import { getDashboard } from "@/lib/stats";
import { Logo } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: `Administravimas – ${brand.name}`,
  robots: { index: false, follow: false },
};

// Prieiga apsaugota slaptažodžiu per src/proxy.ts
export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <Logo className="text-3xl" />
          <span className="text-muted">MVP validacija</span>
        </div>
        <a
          href="/api/admin/export"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-crunch"
        >
          Atsisiųsti CSV
        </a>
      </div>
      <Suspense fallback={<p className="mt-10 text-muted">Kraunama…</p>}>
        <Dashboard />
      </Suspense>
    </main>
  );
}

const pct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")} %`;

async function Dashboard() {
  await connection();
  const d = await getDashboard();
  const t = d.totals;

  const kpis = [
    { label: "Lankytojų (peržiūrų)", value: t.visits, goal: d.goals.visitors, display: String(t.visits) },
    { label: "Registracijų", value: t.signups, goal: d.goals.signups, display: String(t.signups) },
    {
      label: "Registracijos konversija",
      value: t.conversion,
      goal: d.goals.conversion,
      display: pct(t.conversion),
    },
    {
      label: "Mokėtų ≥ 19,90 €/kg",
      value: t.willing,
      goal: d.goals.willingToPay,
      display: String(t.willing),
    },
  ];

  const days = Object.entries(d.byDay).sort(([a], [b]) => a.localeCompare(b)).slice(-14);
  const maxDay = Math.max(1, ...days.map(([, v]) => v));

  return (
    <div className="mt-8 space-y-8">
      {d.mode === "local" && (
        <p className="rounded-2xl bg-oat/20 px-5 py-3 text-sm">
          Supabase nesukonfigūruota – duomenys saugomi lokaliai faile <code>.data/db.json</code> (tik kūrimui).
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const progress = Math.min(1, k.goal ? k.value / k.goal : 0);
          const done = progress >= 1;
          return (
            <div key={k.label} className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
              <p className="text-sm text-muted">{k.label}</p>
              <p className="mt-2 font-display text-4xl font-extrabold">{k.display}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand">
                <div
                  className={`h-full rounded-full ${done ? "bg-emerald-600" : "bg-crunch"}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted">
                Tikslas: {k.label.includes("konversija") ? pct(k.goal) : k.goal} {done && "✓"}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
          <h2 className="font-semibold">Piltuvas</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Puslapio peržiūros", t.visits],
              ["CTA paspaudimai", t.ctaClicks],
              ["Pradėjo pildyti formą", t.formStarts],
              ["Užsiregistravo", t.signups],
              ["Sutiko gauti naujienas", t.marketingConsents],
            ].map(([label, v]) => (
              <div key={label as string} className="flex justify-between border-b border-ink/5 pb-2">
                <dt className="text-muted">{label}</dt>
                <dd className="font-semibold tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5 lg:col-span-2">
          <h2 className="font-semibold">Peržiūros per dieną (paskutinės 14 d.)</h2>
          {days.length === 0 ? (
            <p className="mt-4 text-sm text-muted">Duomenų dar nėra.</p>
          ) : (
            <div className="mt-6 flex h-40 items-end gap-1.5">
              {days.map(([day, v]) => (
                <div key={day} className="flex flex-1 flex-col items-center gap-1" title={`${day}: ${v}`}>
                  <span className="text-[10px] text-muted tabular-nums">{v}</span>
                  <div className="w-full rounded-t-md bg-crunch" style={{ height: `${(v / maxDay) * 100}%` }} />
                  <span className="text-[10px] text-muted">{day.slice(5)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {d.breakdown.map((q) => (
          <div key={q.id} className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
            <h2 className="font-semibold">{q.label}</h2>
            <p className="text-xs text-muted">Atsakė: {q.answered}</p>
            <ul className="mt-4 space-y-3">
              {q.options.map((o) => {
                const share = q.answered ? o.count / q.answered : 0;
                return (
                  <li key={o.value} className="text-sm">
                    <div className="flex justify-between">
                      <span>{o.label}</span>
                      <span className="tabular-nums text-muted">
                        {o.count} · {Math.round(share * 100)}%
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-sand">
                      <div className="h-full rounded-full bg-ink" style={{ width: `${share * 100}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
          <h2 className="font-semibold">Šaltiniai</h2>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-muted">
              <tr>
                <th className="pb-2 font-normal">Šaltinis</th>
                <th className="pb-2 text-right font-normal">Peržiūros</th>
                <th className="pb-2 text-right font-normal">Reg.</th>
                <th className="pb-2 text-right font-normal">Konv.</th>
              </tr>
            </thead>
            <tbody>
              {d.sources.map((s) => (
                <tr key={s.source} className="border-t border-ink/5">
                  <td className="py-2">{s.source}</td>
                  <td className="py-2 text-right tabular-nums">{s.visits}</td>
                  <td className="py-2 text-right tabular-nums">{s.signups}</td>
                  <td className="py-2 text-right tabular-nums">{s.visits ? pct(s.signups / s.visits) : "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white p-6 ring-1 ring-ink/5">
          <h2 className="font-semibold">Naujausios registracijos</h2>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-muted">
              <tr>
                <th className="pb-2 font-normal">El. paštas</th>
                <th className="pb-2 font-normal">Atsakymai</th>
                <th className="pb-2 font-normal">Naujienos</th>
                <th className="pb-2 font-normal">Data</th>
              </tr>
            </thead>
            <tbody>
              {d.recent.map((s) => (
                <tr key={s.email} className="border-t border-ink/5 align-top">
                  <td className="py-2 pr-3">{s.email}</td>
                  <td className="py-2 pr-3 text-muted">{Object.values(s.answers ?? {}).join(" · ")}</td>
                  <td className="py-2 pr-3">{s.consent_marketing ? "Taip" : "Ne"}</td>
                  <td className="py-2 whitespace-nowrap text-muted">{s.created_at.slice(0, 16).replace("T", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {d.recent.length === 0 && <p className="mt-4 text-sm text-muted">Registracijų dar nėra.</p>}
        </div>
      </section>
    </div>
  );
}
