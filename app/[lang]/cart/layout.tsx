import type { Metadata } from "next";
import type { ReactNode } from "react";
import { toLang, tr } from "@/lib/i18n";

// Šo lapu Google meklētājā nerādām
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return {
  title: `${tr(lang, { lv: "Grozs", ru: "Корзина", en: "Cart" })} | Happy Carnevale`,
    robots: { index: false, follow: false },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
