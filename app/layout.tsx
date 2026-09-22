import type { Metadata } from "next";
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

          <main className="pt-16 lg:pt-24">
            {children}
          </main>

        </CartProvider>
      </body>
    </html>
  );
}