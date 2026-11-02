import { connection } from "next/server";
import { survey } from "@/content/site";
import { listSignups } from "@/lib/store";

// Apsaugota slaptažodžiu per src/proxy.ts
export async function GET() {
  await connection();
  const signups = await listSignups();
  const header = [
    "email",
    ...survey.map((q) => q.id),
    "consent_marketing",
    "consent_version",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "referrer",
    "created_at",
  ];
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    // apsauga nuo CSV formulių injekcijos
    const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
    return /[",\n;]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
  };
  const rows = signups.map((s) =>
    [
      s.email,
      ...survey.map((q) => s.answers?.[q.id] ?? ""),
      s.consent_marketing,
      s.consent_version,
      s.utm_source,
      s.utm_medium,
      s.utm_campaign,
      s.referrer,
      s.created_at,
    ]
      .map(esc)
      .join(","),
  );
  return new Response("﻿" + [header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kramz-waitlist.csv"',
      "Cache-Control": "no-store",
    },
  });
}
