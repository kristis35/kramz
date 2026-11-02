import { NextResponse, type NextRequest } from "next/server";
import { recordEvent, type EventType } from "@/lib/store";
import { shortText } from "@/lib/validate";

const ALLOWED: EventType[] = ["page_view", "cta_click", "form_start"];
const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit/i;

/**
 * Anoniminė analitika be slapukų: nesaugome IP, naudotojo agento ar jokio identifikatoriaus –
 * tik įvykio tipą, puslapį, šaltinį (UTM / referrer) ir laiką.
 */
export async function POST(req: NextRequest) {
  if (BOT_RE.test(req.headers.get("user-agent") ?? "")) {
    return new NextResponse(null, { status: 204 });
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const type = body.type as EventType;
  if (!ALLOWED.includes(type)) return new NextResponse(null, { status: 400 });

  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  try {
    await recordEvent({
      type,
      path: shortText(body.path, 200),
      referrer: shortText(body.referrer, 500),
      utm_source: shortText(utm.source, 100),
      utm_medium: shortText(utm.medium, 100),
      utm_campaign: shortText(utm.campaign, 100),
    });
  } catch (e) {
    console.error("[track]", e);
  }
  return new NextResponse(null, { status: 204 });
}
