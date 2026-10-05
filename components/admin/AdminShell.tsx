import type { ReactNode } from "react";
import LogoutButton from "./LogoutButton";

interface AdminShellProps {
  email: string;
  children: ReactNode;
}

/** Admin paneļa rāmis: augšējā josla ar lietotāju un izrakstīšanos. */
export default function AdminShell({ email, children }: AdminShellProps) {
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
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
