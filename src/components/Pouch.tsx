/** Produkto vizualizacija – iliustracija, ne tikra pakuotė. */
export function Pouch({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* traškūs gabalėliai aplink */}
      <Bite className="animate-drift absolute -left-2 top-16 w-14 sm:-left-8" fill="#d9a85b" />
      <Bite className="animate-drift absolute -right-1 top-6 w-10 [animation-delay:-2s] sm:-right-6" fill="#c98d3f" />
      <Bite className="animate-drift absolute bottom-10 -right-3 w-16 [animation-delay:-4s] sm:-right-10" fill="#e0b56c" />
      <Bite className="animate-drift absolute bottom-24 -left-4 w-9 [animation-delay:-1s] sm:-left-12" fill="#b9792e" />

      <svg viewBox="0 0 300 380" className="animate-float relative w-full drop-shadow-2xl" role="img" aria-label="kramz pakuotės iliustracija">
        <defs>
          <linearGradient id="pouch" x1="0" x2="1">
            <stop offset="0" stopColor="#1a1714" />
            <stop offset="0.55" stopColor="#2a2520" />
            <stop offset="1" stopColor="#141210" />
          </linearGradient>
          <linearGradient id="shine" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.09" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* pakuotė */}
        <path d="M40 30 L260 30 L268 330 Q270 362 238 362 L62 362 Q30 362 32 330 Z" fill="url(#pouch)" />
        {/* viršutinis suvirinimas */}
        <rect x="40" y="22" width="220" height="26" rx="4" fill="#2f2a25" />
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={i} x1={48 + i * 10} y1="26" x2={48 + i * 10} y2="44" stroke="#3d3731" strokeWidth="2" />
        ))}
        {/* plėšimo įpjova */}
        <circle cx="250" cy="60" r="4" fill="#0e0c0a" />
        <path d="M70 70 L120 360" stroke="url(#shine)" strokeWidth="60" />
        {/* etiketė */}
        <text x="150" y="168" textAnchor="middle" fontFamily="var(--font-bricolage), sans-serif" fontWeight="800" fontSize="64" fill="#f6f1e7" letterSpacing="-2">
          kramz<tspan fill="#e2561f">.</tspan>
        </text>
        <text x="150" y="198" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="11" fill="#f6f1e7" opacity="0.7" letterSpacing="2.5">
          TRAŠKUS • BE GAMINIMO
        </text>
        {/* langelis su produktu */}
        <rect x="80" y="225" width="140" height="80" rx="40" fill="#f6f1e7" opacity="0.08" />
        <g transform="translate(95 238)">
          <circle cx="18" cy="28" r="15" fill="#d9a85b" />
          <circle cx="50" cy="22" r="13" fill="#c98d3f" />
          <circle cx="80" cy="30" r="14" fill="#e0b56c" />
          <circle cx="104" cy="24" r="11" fill="#b9792e" />
          <circle cx="36" cy="44" r="10" fill="#c98d3f" />
          <circle cx="66" cy="46" r="11" fill="#d9a85b" />
          <circle cx="94" cy="47" r="9" fill="#c98d3f" />
        </g>
        <text x="150" y="335" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="11" fill="#f6f1e7" opacity="0.55">
          Planuojama: 30 g baltymų / 100 g
        </text>
      </svg>
    </div>
  );
}

function Bite({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M20 3c6 0 9 4 13 6s5 8 3 13-2 9-8 12-12 3-17 0S2 28 3 22s1-10 5-14S14 3 20 3z"
        fill={fill}
      />
      <circle cx="14" cy="15" r="1.6" fill="#8a5a22" opacity="0.5" />
      <circle cx="25" cy="22" r="1.3" fill="#8a5a22" opacity="0.5" />
      <circle cx="18" cy="28" r="1.1" fill="#8a5a22" opacity="0.5" />
    </svg>
  );
}
