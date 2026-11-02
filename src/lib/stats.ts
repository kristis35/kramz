import "server-only";
import { goals, priceQuestionId, survey, willingnessThreshold } from "@/content/site";
import { eventStats, listSignups, sourceLabel, storageMode } from "@/lib/store";

export async function getDashboard() {
  const [signups, events] = await Promise.all([listSignups(), eventStats()]);

  const priceQ = survey.find((q) => q.id === priceQuestionId);
  const amountOf = (v: string | undefined) => priceQ?.options.find((o) => o.value === v)?.amount ?? null;

  const breakdown = survey.map((q) => {
    const counts = Object.fromEntries(q.options.map((o) => [o.value, 0])) as Record<string, number>;
    let answered = 0;
    for (const s of signups) {
      const v = s.answers?.[q.id];
      if (v && v in counts) {
        counts[v] += 1;
        answered += 1;
      }
    }
    return {
      id: q.id,
      label: q.label,
      answered,
      options: q.options.map((o) => ({ value: o.value, label: o.label, count: counts[o.value] })),
    };
  });

  const willing = signups.filter((s) => {
    const a = amountOf(s.answers?.[priceQuestionId]);
    return a !== null && a >= willingnessThreshold;
  }).length;

  const signupsBySource: Record<string, number> = {};
  for (const s of signups) {
    const src = sourceLabel(s.utm_source, s.referrer);
    signupsBySource[src] = (signupsBySource[src] ?? 0) + 1;
  }

  const visits = events.counts.page_view;
  const conversion = visits > 0 ? signups.length / visits : 0;

  return {
    mode: storageMode(),
    totals: {
      visits,
      ctaClicks: events.counts.cta_click,
      formStarts: events.counts.form_start,
      signups: signups.length,
      marketingConsents: signups.filter((s) => s.consent_marketing).length,
      conversion,
      willing,
    },
    goals,
    breakdown,
    sources: Object.keys({ ...events.pageViewsBySource, ...signupsBySource })
      .map((src) => ({
        source: src,
        visits: events.pageViewsBySource[src] ?? 0,
        signups: signupsBySource[src] ?? 0,
      }))
      .sort((a, b) => b.visits - a.visits || b.signups - a.signups),
    byDay: events.pageViewsByDay,
    recent: signups.slice(0, 25),
  };
}
