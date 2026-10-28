import type { ReactNode } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface AdminShellProps {
  email: string;
  /** Kura sadaļa ir atvērta (izcelta izvēlnē). */
  current?: "bildes" | "kalendars" | "atsauksmes";
  children: ReactNode;
}

const NAV = [
  { key: "kalendars", label: "Kalendārs", href: "/admin/kalendars" },
  { key: "atsauksmes", label: "Atsauksmes", href: "/admin/atsauksmes" },
  { key: "bildes", label: "Bildes", href: "/admin/dashboard" },
] as const;

/** Admin paneļa rāmis: rozā–violets sānu panelis (telefonā – josla augšā). */
export default function AdminShell({ email, current = "bildes", children }: AdminShellProps) {
  const link = (item: (typeof NAV)[number], mobile: boolean) => {
    const active = current === item.key;
    return (
      <Link
        key={item.key}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={
          mobile
            ? `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active ? "bg-white text-pink-700" : "text-white/90 hover:bg-white/15"
              }`
            : `block rounded-xl px-3.5 py-2.5 text-[15px] font-semibold transition ${
                active ? "bg-white text-pink-700 shadow-sm" : "text-white/90 hover:bg-white/15"
              }`
        }
      >
        {item.label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#fff7fb] text-[#3b0764] lg:flex">
      {/* Telefons un planšete */}
      <header className="bg-gradient-to-r from-pink-500 to-violet-500 px-4 pb-3 pt-4 text-white lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">Happy Carnevale</p>
            <p className="text-lg font-bold">Admin panelis</p>
          </div>
          <LogoutButton className="rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/30 disabled:opacity-60" />
        </div>
        <nav className="mt-3 flex gap-1 overflow-x-auto" aria-label="Admin sadaļas">
          {NAV.map((item) => link(item, true))}
        </nav>
      </header>

      {/* Dators */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-gradient-to-b from-pink-500 to-violet-500 px-4 py-6 text-white lg:flex">
        <div className="mb-8 px-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Happy Carnevale</p>
          <p className="text-lg font-bold">Admin panelis</p>
        </div>
        <nav className="space-y-1" aria-label="Admin sadaļas">
          {NAV.map((item) => link(item, false))}
        </nav>
        <div className="mt-auto px-2">
          <p className="mb-2 break-all text-xs text-white/80">{email}</p>
          <LogoutButton className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white/30 disabled:opacity-60" />
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
