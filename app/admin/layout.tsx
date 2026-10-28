import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
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

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
