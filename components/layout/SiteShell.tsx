import type { ReactNode } from "react";

interface SiteShellProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

/** Publiskajām lapām rāda galveni un kājeni (admin panelim ir savs izkārtojums). */
export default function SiteShell({ header, footer, children }: SiteShellProps) {
  return (
    <>
      {header}

      <main className="pt-16 lg:pt-24 min-h-screen">{children}</main>

      {footer}
    </>
  );
}
