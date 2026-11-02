"use client";

export type ClientEvent = "page_view" | "cta_click" | "form_start";

export function utmFromLocation() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    source: p.get("utm_source") ?? undefined,
    medium: p.get("utm_medium") ?? undefined,
    campaign: p.get("utm_campaign") ?? undefined,
  };
}

export function externalReferrer(): string | undefined {
  if (typeof document === "undefined" || !document.referrer) return undefined;
  try {
    return new URL(document.referrer).host === window.location.host ? undefined : document.referrer;
  } catch {
    return undefined;
  }
}

/** Anoniminis įvykis – be slapukų ir be naudotojo identifikatoriaus. */
export function track(type: ClientEvent) {
  try {
    const body = JSON.stringify({
      type,
      path: window.location.pathname,
      referrer: externalReferrer(),
      utm: utmFromLocation(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
    }
  } catch {
    /* analitika niekada neturi sugadinti puslapio */
  }
}
