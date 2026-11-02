const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function Icon({ name, className = "size-6" }: { name: string; className?: string }) {
  switch (name) {
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "scale":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="4" />
          <path d="M8 9a5 5 0 0 1 8 0" />
          <path d="M12 9l1.5-2" />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
          <path d="M5 8h14l-1 12H6L5 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.5} aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    default:
      return null;
  }
}
