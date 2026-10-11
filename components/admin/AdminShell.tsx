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
  { key: "bildes", label: "Bildes", href: "/admin/dashboard" },
  { key: "kalendars", label: "Kalendārs", href: "/admin/kalendars" },
  { key: "atsauksmes", label: "Atsauksmes", href: "/admin/atsauksmes" },
] as const;

/** Admin paneļa rāmis: augšējā josla ar lietotāju un izrakstīšanos. */
export default function AdminShell({ email, current = "bildes", children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
              Happy Carnevale
            </p>
            <p className="text-lg font-bold">Satura pārvaldība</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">{email}</span>
            <LogoutButton />
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 px-4 sm:px-6" aria-label="Admin sadaļas">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={current === item.key ? "page" : undefined}
              className={`border-b-2 px-3 py-2 text-sm font-semibold transition ${
                current === item.key
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
