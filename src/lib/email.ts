import "server-only";
import { brand } from "@/content/site";

/**
 * Automatinis registracijos patvirtinimas (pageidautina MVP funkcija).
 * Veikia tik nustačius RESEND_API_KEY ir EMAIL_FROM (pvz. "kramz <labas@kramz.lt>").
 */
export async function sendConfirmationEmail(to: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return;

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#1a1714">
    <p style="font-size:28px;font-weight:800;margin:0 0 24px">${brand.name}<span style="color:#e2561f">.</span></p>
    <h1 style="font-size:22px;margin:0 0 12px">Ačiū – tu laukiančiųjų sąraše!</h1>
    <p style="line-height:1.6">Kai tik ${brand.name} bus paruoštas išbandyti, parašysime tau pirmiems.</p>
    <p style="line-height:1.6">Produktas dar kuriamas, todėl laiškų daug nesiųsime – tik tai, kas svarbu.</p>
    <p style="line-height:1.6;color:#6b645c;font-size:13px;margin-top:32px">
      Nebenori būti sąraše? Tiesiog atsakyk į šį laišką arba parašyk ${brand.email} – pašalinsime tavo duomenis.
    </p>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: brand.email,
      subject: `Tu kramz laukiančiųjų sąraše`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
