import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "../globals.css";
import { SITE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Satura pārvaldība | Happy Carnevale",
  robots: { index: false, follow: false },
  // Admin paneli var pievienot telefona sākuma ekrānam kā lietotni.
  manifest: "/admin.webmanifest",
  appleWebApp: { capable: true, title: "HC Admin", statusBarStyle: "default" },
  icons: { apple: "/admin-icons/apple-180.png" },
};

export const viewport: Viewport = {
  themeColor: "#ec4899",
};

// Admin panelim ir savs saknes izkārtojums (bez mājaslapas galvenes un kājenes).
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="lv" className={poppins.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
