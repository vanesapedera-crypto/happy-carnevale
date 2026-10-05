"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SiteShellProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

/**
 * Publiskajām lapām rāda galveni un kājeni.
 * /admin lapām tās nerāda, jo admin panelim ir savs rāmis.
 */
export default function SiteShell({ header, footer, children }: SiteShellProps) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <>{children}</>;
  }

  return (
    <>
      {header}

      <main className="pt-16 lg:pt-24 min-h-screen">{children}</main>

      {footer}
    </>
  );
}
