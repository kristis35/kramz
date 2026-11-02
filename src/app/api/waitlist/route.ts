import { NextResponse, type NextRequest } from "next/server";
import { consentVersion } from "@/content/site";
import { recordEvent, upsertSignup } from "@/lib/store";
import { cleanAnswers, normalizeEmail, shortText } from "@/lib/validate";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Paprastas apsaugos nuo botų laukas (paslėptas formoje).
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, existed: false });
  }

  const email = normalizeEmail(body.email);
  if (!email) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  if (body.consentPrivacy !== true) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }

  const { answers, missing } = cleanAnswers(body.answers);
  if (missing.length) {
    return NextResponse.json({ error: "missing_answers", missing }, { status: 400 });
  }

  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const attribution = {
    utm_source: shortText(utm.source, 100),
    utm_medium: shortText(utm.medium, 100),
    utm_campaign: shortText(utm.campaign, 100),
    referrer: shortText(body.referrer, 500),
  };

  try {
    const { existed } = await upsertSignup({
      email,
      answers,
      consent_privacy: true,
      consent_marketing: body.consentMarketing === true,
      consent_version: consentVersion,
      ...attribution,
    });

    if (!existed) {
      await recordEvent({ type: "signup", path: "/", ...attribution }).catch((e) =>
        console.error("[waitlist] event", e),
      );
      await sendConfirmationEmail(email).catch((e) => console.error("[waitlist] email", e));
    }
    return NextResponse.json({ ok: true, existed });
  } catch (e) {
    console.error("[waitlist]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
