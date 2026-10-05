"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/admin/actions";

const INPUT_CLASS =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const result = await loginAction(new FormData(event.currentTarget));
      if (result.ok) {
        router.replace("/admin/dashboard");
        router.refresh();
        return;
      }
      setError(result.error);
    } catch {
      setError("Neizdevās pieslēgties. Lūdzu, mēģini vēlreiz.");
    }
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="text-sm font-semibold text-slate-700">
          E-pasts
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="text-sm font-semibold text-slate-700">
          Parole
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={INPUT_CLASS}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-pink-500 px-4 py-3 text-base font-bold text-white transition hover:bg-pink-600 disabled:opacity-60"
      >
        {pending ? "Pārbauda…" : "Ielogoties"}
      </button>
    </form>
  );
}
