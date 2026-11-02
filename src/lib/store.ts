import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Duomenų saugykla.
 * - Jei nustatyti SUPABASE_URL ir SUPABASE_SERVICE_ROLE_KEY – naudojama Supabase.
 * - Kitaip (tik lokaliam kūrimui) – JSON failas `.data/db.json`.
 */

export type Signup = {
  email: string;
  answers: Record<string, string>;
  consent_privacy: boolean;
  consent_marketing: boolean;
  consent_version: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  created_at: string;
  updated_at?: string;
};

export type EventType = "page_view" | "cta_click" | "form_start" | "signup";

export type TrackedEvent = {
  type: EventType;
  path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
};

let client: SupabaseClient | null | undefined;

function supabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}

export function storageMode(): "supabase" | "local" {
  return supabase() ? "supabase" : "local";
}

/* ---------- lokali atsarginė saugykla (tik kūrimui) ---------- */

type LocalDb = { signups: Signup[]; events: TrackedEvent[] };
const dbFile = path.join(process.cwd(), ".data", "db.json");

async function readLocal(): Promise<LocalDb> {
  try {
    return JSON.parse(await fs.readFile(dbFile, "utf8")) as LocalDb;
  } catch {
    return { signups: [], events: [] };
  }
}

async function writeLocal(db: LocalDb) {
  await fs.mkdir(path.dirname(dbFile), { recursive: true });
  await fs.writeFile(dbFile, JSON.stringify(db, null, 2));
}

function assertLocalAllowed() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_LOCAL_STORAGE !== "true") {
    throw new Error(
      "Supabase nesukonfigūruota: nustatykite SUPABASE_URL ir SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
}

/* ---------- registracijos ---------- */

/** Įrašo registraciją. Jei el. paštas jau yra – atnaujina atsakymus ir grąžina `existed: true`. */
export async function upsertSignup(
  input: Omit<Signup, "created_at" | "updated_at">,
): Promise<{ existed: boolean }> {
  const now = new Date().toISOString();
  const sb = supabase();

  if (sb) {
    const { data: existing, error: selErr } = await sb
      .from("waitlist_signups")
      .select("id")
      .eq("email", input.email)
      .maybeSingle();
    if (selErr) throw selErr;

    if (existing) {
      const { error } = await sb
        .from("waitlist_signups")
        .update({
          answers: input.answers,
          consent_privacy: input.consent_privacy,
          consent_marketing: input.consent_marketing,
          consent_version: input.consent_version,
          updated_at: now,
        })
        .eq("id", existing.id);
      if (error) throw error;
      return { existed: true };
    }

    const { error } = await sb.from("waitlist_signups").insert(input);
    if (error) {
      // Lygiagretus dublikatas (unique constraint) – laikome sėkme.
      if (error.code === "23505") return { existed: true };
      throw error;
    }
    return { existed: false };
  }

  assertLocalAllowed();
  const db = await readLocal();
  const idx = db.signups.findIndex((s) => s.email === input.email);
  if (idx >= 0) {
    db.signups[idx] = {
      ...db.signups[idx],
      answers: input.answers,
      consent_privacy: input.consent_privacy,
      consent_marketing: input.consent_marketing,
      consent_version: input.consent_version,
      updated_at: now,
    };
    await writeLocal(db);
    return { existed: true };
  }
  db.signups.push({ ...input, created_at: now });
  await writeLocal(db);
  return { existed: false };
}

export async function listSignups(): Promise<Signup[]> {
  const sb = supabase();
  if (sb) {
    const rows: Signup[] = [];
    const page = 1000;
    for (let from = 0; ; from += page) {
      const { data, error } = await sb
        .from("waitlist_signups")
        .select(
          "email, answers, consent_privacy, consent_marketing, consent_version, utm_source, utm_medium, utm_campaign, referrer, created_at, updated_at",
        )
        .order("created_at", { ascending: false })
        .range(from, from + page - 1);
      if (error) throw error;
      rows.push(...(data as Signup[]));
      if (!data || data.length < page) break;
    }
    return rows;
  }
  const db = await readLocal();
  return [...db.signups].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

/* ---------- analitika ---------- */

export async function recordEvent(event: Omit<TrackedEvent, "created_at">) {
  const sb = supabase();
  if (sb) {
    const { error } = await sb.from("events").insert(event);
    if (error) throw error;
    return;
  }
  assertLocalAllowed();
  const db = await readLocal();
  db.events.push({ ...event, created_at: new Date().toISOString() });
  await writeLocal(db);
}

export type EventStats = {
  counts: Record<EventType, number>;
  pageViewsBySource: Record<string, number>;
  pageViewsByDay: Record<string, number>;
};

export async function eventStats(): Promise<EventStats> {
  const counts: Record<EventType, number> = { page_view: 0, cta_click: 0, form_start: 0, signup: 0 };
  const pageViewsBySource: Record<string, number> = {};
  const pageViewsByDay: Record<string, number> = {};

  const add = (e: Pick<TrackedEvent, "type" | "utm_source" | "referrer" | "created_at">) => {
    counts[e.type] = (counts[e.type] ?? 0) + 1;
    if (e.type === "page_view") {
      const src = sourceLabel(e.utm_source, e.referrer);
      pageViewsBySource[src] = (pageViewsBySource[src] ?? 0) + 1;
      const day = e.created_at.slice(0, 10);
      pageViewsByDay[day] = (pageViewsByDay[day] ?? 0) + 1;
    }
  };

  const sb = supabase();
  if (sb) {
    const page = 1000;
    for (let from = 0; ; from += page) {
      const { data, error } = await sb
        .from("events")
        .select("type, utm_source, referrer, created_at")
        .order("created_at", { ascending: true })
        .range(from, from + page - 1);
      if (error) throw error;
      (data ?? []).forEach(add);
      if (!data || data.length < page) break;
    }
  } else {
    (await readLocal()).events.forEach(add);
  }
  return { counts, pageViewsBySource, pageViewsByDay };
}

export function sourceLabel(utmSource: string | null, referrer: string | null): string {
  if (utmSource) return utmSource.toLowerCase();
  if (!referrer) return "tiesioginis";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "kita";
  }
}
