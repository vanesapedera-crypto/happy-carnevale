import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";

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
  title: "Happy Carneval",
  description: "Kostīmu noma, pasākumi un burbuļu produkti",
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