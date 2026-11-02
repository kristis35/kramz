import { NextResponse, type NextRequest } from "next/server";

/**
 * Administravimo vaizdo apsauga (HTTP Basic Auth).
 * Prisijungimas: vartotojas `admin` (arba ADMIN_USER), slaptažodis – ADMIN_PASSWORD.
 * Produkcijoje be ADMIN_PASSWORD administravimas išjungtas.
 */
export function proxy(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  const user = process.env.ADMIN_USER ?? "admin";

  if (!password) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return new NextResponse("Administravimas išjungtas: nenustatytas ADMIN_PASSWORD.", { status: 503 });
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(":");
      if (safeEqual(u, user) && safeEqual(rest.join(":"), password)) return NextResponse.next();
    } catch {
      /* netinkama antraštė */
    }
  }

  return new NextResponse("Reikalingas prisijungimas", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="kramz admin", charset="UTF-8"' },
  });
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
