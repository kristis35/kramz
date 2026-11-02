"use client";

import { track } from "@/lib/client-analytics";

export function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track("cta_click")}>
      {children}
    </a>
  );
}
