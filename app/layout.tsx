import type { Metadata } from "next";
// @ts-expect-error Global CSS is handled by Next.js at build time.
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";

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
    <html lang="lv">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}