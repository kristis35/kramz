import {
  benefits,
  faq,
  hero,
  howItWorks,
  nutrition,
  pricing,
  problem,
  solution,
  waitlist,
} from "@/content/site";
import { CtaLink } from "@/components/CtaLink";
import { Icon } from "@/components/Icons";
import { PageViewTracker } from "@/components/PageViewTracker";
import { Pouch } from "@/components/Pouch";
import { Footer, Header } from "@/components/SiteChrome";
import { WaitlistForm } from "@/components/WaitlistForm";

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-4 text-xs font-bold tracking-[0.2em] uppercase ${dark ? "text-oat" : "text-crunch"}`}
    >
      {children}
    </p>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-crunch px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-crunch/25 transition hover:-translate-y-0.5 hover:bg-crunch-deep";

export default function Home() {
  return (
    <>
      <PageViewTracker />
      <Header />

      <main>
        {/* 1. HERO */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-oat/25 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-20 md:pb-28">
            <div>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="font-display text-5xl leading-[0.98] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {hero.title} <span className="text-crunch">{hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.text}</p>
              <div className="mt-9 flex flex-col items-start gap-4">
                <CtaLink href="#registracija" className={ctaClass}>
                  {hero.cta}
                  <span aria-hidden className="ml-2">→</span>
                </CtaLink>
                <p className="flex items-center gap-2 text-sm text-muted">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-crunch opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-crunch" />
                  </span>
                  {hero.note}
                </p>
              </div>
            </div>
            <Pouch className="mx-auto w-64 sm:w-72 md:w-80" />
          </div>
        </section>

        {/* 2. PROBLEMA */}
        <section className="bg-ink text-cream">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow dark>{problem.eyebrow}</Eyebrow>
              <H2>{problem.title}</H2>
              <p className="mt-6 text-lg leading-relaxed text-cream/70">{problem.text}</p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-cream/10 md:grid-cols-3">
              {problem.points.map((p, i) => (
                <div key={p.title} className="bg-ink p-8">
                  <p className="font-display text-5xl font-bold text-cream/15">0{i + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/60">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SPRENDIMAS */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <Eyebrow>{solution.eyebrow}</Eyebrow>
            <H2>{solution.title}</H2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{solution.text}</p>
            <ul className="mt-8 space-y-3">
              {solution.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 font-medium">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-crunch/10 text-crunch">
                    <Icon name="check" className="size-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4" aria-hidden>
            {[
              ["Kokteilis", "Geriamas", false],
              ["Milteliai", "Reikia maišyti", false],
              ["Gaminimas", "30–60 min.", false],
              ["kramz", "Atidarai ir valgai", true],
            ].map(([t, s, ours]) => (
              <div
                key={t as string}
                className={`rounded-3xl p-6 ${ours ? "bg-crunch text-white shadow-xl shadow-crunch/25" : "bg-sand text-ink/50"}`}
              >
                <p className={`font-display text-2xl font-bold ${ours ? "" : "line-through decoration-2"}`}>{t}</p>
                <p className={`mt-1 text-sm ${ours ? "text-white/85" : ""}`}>{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PRIVALUMAI */}
        <section className="bg-sand/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{benefits.eyebrow}</Eyebrow>
              <H2>{benefits.title}</H2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {benefits.items.map((b) => (
                <div key={b.title} className="rounded-3xl bg-cream p-8 ring-1 ring-ink/5">
                  <div className="grid size-12 place-items-center rounded-2xl bg-ink text-cream">
                    <Icon name={b.icon} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{b.title}</h3>
                  <p className="font-medium text-crunch">{b.subtitle}</p>
                  <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KAIP VEIKIA */}
        <section id="kaip-veikia" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="max-w-2xl">
            <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
            <H2>{howItWorks.title}</H2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {howItWorks.steps.map((s, i) => (
              <li key={s.n} className="relative rounded-3xl border border-ink/10 p-8">
                <p className="font-display text-6xl font-extrabold text-crunch">{s.n}</p>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
                {i < howItWorks.steps.length - 1 && (
                  <span aria-hidden className="absolute top-1/2 -right-4 hidden text-2xl text-ink/20 md:block">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* 5. MAISTINĖ VERTĖ + 6. KAINA */}
        <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 md:pb-28">
          <div id="maistine-verte" className="rounded-3xl bg-ink p-8 text-cream sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow dark>{nutrition.eyebrow}</Eyebrow>
              <span className="mb-4 rounded-full border border-oat/40 px-3 py-1 text-xs font-semibold text-oat">
                {nutrition.badge}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold">{nutrition.title}</h2>
            <p className="mt-1 text-cream/60">{nutrition.per}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {nutrition.values.map((v) => (
                <div key={v.label} className="rounded-2xl bg-cream/5 p-5 ring-1 ring-cream/10">
                  <p className="font-display text-5xl font-extrabold">
                    {v.value}
                    <span className="ml-1 text-xl font-semibold text-cream/60">{v.unit}</span>
                  </p>
                  <p className="mt-1 text-sm text-cream/60">{v.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-cream/55">{nutrition.disclaimer}</p>
          </div>

          <div id="kaina" className="flex flex-col rounded-3xl bg-crunch p-8 text-white sm:p-10">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{pricing.eyebrow}</p>
            <h2 className="font-display text-3xl font-bold">{pricing.title}</h2>
            <p className="mt-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
              {pricing.priceFrom}–{pricing.priceTo}
              <span className="ml-2 text-2xl font-semibold text-white/80">
                {pricing.currency} / {pricing.unit}
              </span>
            </p>
            <p className="mt-2 text-white/85">
              {pricing.portions} · {pricing.perPortion}
            </p>
            <p className="mt-6 leading-relaxed text-white/90">{pricing.question}</p>
            <div className="mt-auto pt-8">
              <CtaLink
                href="#registracija"
                className="inline-flex rounded-full bg-white px-7 py-3.5 font-semibold text-crunch-deep transition hover:bg-cream"
              >
                {pricing.cta} →
              </CtaLink>
            </div>
          </div>
        </section>

        {/* 7. LAUKIANČIŲJŲ SĄRAŠAS */}
        <section id="registracija" className="bg-sand/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.3fr] md:py-28">
            <div className="md:sticky md:top-28 md:self-start">
              <Eyebrow>{waitlist.eyebrow}</Eyebrow>
              <H2>{waitlist.title}</H2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{waitlist.text}</p>
              <ul className="mt-8 space-y-2 text-sm text-muted">
                <li>✓ Nemokama ir niekuo neįpareigoja</li>
                <li>✓ Sužinosi pirmas apie išbandymo galimybę</li>
                <li>✓ Išsiregistruoti galėsi bet kada</li>
              </ul>
            </div>
            <WaitlistForm />
          </div>
        </section>

        {/* 8. DUK */}
        <section id="duk" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <H2>{faq.title}</H2>
          <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {faq.items.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-semibold">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand transition group-open:rotate-45 group-open:bg-crunch group-open:text-white">
                    <Icon name="plus" className="size-4" />
                  </span>
                </summary>
                <p className="mt-3 pr-12 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaLink href="#registracija" className={ctaClass}>
              {hero.cta}
            </CtaLink>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <Footer />
    </>
  );
}
