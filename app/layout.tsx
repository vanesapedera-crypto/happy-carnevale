import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { SITE } from "@/lib/constants";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteShell from "@/components/layout/SiteShell";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Happy Carnevale – kostīmu noma, animatori un ziepju burbuļi",
  description:
    "Kostīmu noma, animatori bērnu svētkiem, pārsteiguma tēli un ziepju burbuļu veikals. Rīgā un visā Latvijā.",
  // Katrai lapai viena galvenā adrese (ar www), lai Google neredz dublikātus
  alternates: { canonical: "./" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lv" className={poppins.variable}>
      <body className="font-sans">
        <CartProvider>
          <SiteShell header={<Header />} footer={<Footer />}>
            {children}
          </SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}