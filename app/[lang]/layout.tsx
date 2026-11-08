import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Montserrat, Poppins } from "next/font/google";
import "../globals.css";

import { CartProvider } from "@/context/CartContext";
import { LangProvider } from "@/context/LangContext";
import { SITE } from "@/lib/constants";
import { businessData } from "@/lib/structuredData";
import { isLang, langParams, LANG_LOCALE, languageAlternates, tr } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteShell from "@/components/layout/SiteShell";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Kirilicas burtiem krievu lapās (Poppins tos nesatur)
const cyrillic = Montserrat({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cyrillic",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return langParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : "lv";
  return {
    metadataBase: new URL(SITE.url),
    title: tr(lang, {
      lv: "Happy Carnevale – kostīmu noma, animatori un ziepju burbuļi",
      ru: "Happy Carnevale – аренда костюмов, аниматоры и мыльные пузыри",
      en: "Happy Carnevale – costume rental, entertainers and soap bubbles",
    }),
    description: tr(lang, {
      lv: "Kostīmu noma, animatori bērnu svētkiem, pārsteiguma tēli un ziepju burbuļu veikals. Rīgā un visā Latvijā.",
      ru: "Аренда костюмов, аниматоры на детские праздники, персонажи-сюрпризы и магазин мыльных пузырей. В Риге и по всей Латвии.",
      en: "Costume rental, kids' party entertainers, surprise characters and a soap bubble shop. In Riga and all over Latvia.",
    }),
    // Katrai lapai viena galvenā adrese (ar www) + hreflang saites uz citām valodām.
    // Lapas, kurām ir savs generateMetadata, to pārraksta ar savu ceļu.
    alternates: languageAlternates(lang, "/"),
    // Daloties ar saiti (Facebook, WhatsApp u.c.), rāda app/opengraph-image.png.
    // Ikona pārlūka cilnē un Google rezultātos: app/icon.png un app/favicon.ico.
    openGraph: {
      siteName: SITE.name,
      locale: LANG_LOCALE[lang],
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={lang === "ru" ? `${poppins.variable} ${cyrillic.variable}` : poppins.variable}>
      <body className="font-sans">
        <JsonLd data={businessData(lang)} />
        <LangProvider lang={lang}>
          <CartProvider>
            <SiteShell header={<Header />} footer={<Footer lang={lang} />}>
              {children}
            </SiteShell>
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
