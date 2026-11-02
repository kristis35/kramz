import { survey } from "@/content/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const email = v.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  return email;
}

/** Palieka tik žinomus klausimus ir leidžiamas reikšmes. Grąžina klaidą, jei trūksta privalomo atsakymo. */
export function cleanAnswers(raw: unknown): { answers: Record<string, string>; missing: string[] } {
  const input = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const answers: Record<string, string> = {};
  const missing: string[] = [];
  for (const q of survey) {
    const v = input[q.id];
    if (typeof v === "string" && q.options.some((o) => o.value === v)) {
      answers[q.id] = v;
    } else if (q.required) {
      missing.push(q.id);
    }
  }
  return { answers, missing };
}

export function shortText(v: unknown, max = 200): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}
