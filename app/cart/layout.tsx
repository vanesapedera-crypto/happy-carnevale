import type { Metadata } from "next";
import type { ReactNode } from "react";

// Šo lapu Google meklētājā nerādām
export const metadata: Metadata = {
  title: "Grozs | Happy Carnevale",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
