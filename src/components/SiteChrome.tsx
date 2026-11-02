import Link from "next/link";
import { brand, footer, nav } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className}`}>
      {brand.name}
      <span className="text-crunch">.</span>
    </span>
  );
}

export function Header({ withNav = true }: { withNav?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label={`${brand.name} – pradžia`}>
          <Logo className="text-2xl" />
        </Link>
        {withNav && (
          <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="hidden rounded-full px-3 py-2 text-ink/70 transition hover:text-ink sm:block"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#registracija"
              className="rounded-full bg-ink px-4 py-2 text-cream transition hover:bg-crunch"
            >
              Prisijungti
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="text-3xl text-cream" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{brand.status}</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-cream">Kontaktai</p>
          <a href={`mailto:${brand.email}`} className="hover:text-crunch">
            {brand.email}
          </a>
          <p className="mt-1">{brand.domain}</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-cream">Informacija</p>
          <ul className="space-y-1">
            {footer.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-crunch">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-cream/50 sm:px-6">
          © {brand.domain} · Projektas kūrimo stadijoje. Maistinės vertės rodikliai – planuojami, ne laboratoriškai patvirtinti.
        </p>
      </div>
    </footer>
  );
}
