"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setBookingCancelledAction } from "@/lib/admin/bookingActions";

/** "Atcelts" / "Atjaunot" pieteikumam kalendārā. */
export default function CancelButton({ id, cancelled }: { id: string; cancelled: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setPending(true);
    setError(null);
    try {
      const result = await setBookingCancelledAction(id, !cancelled);
      if (!result.ok) setError(result.error);
      router.refresh();
    } catch {
      setError("Neizdevās saglabāt.");
    }
    setPending(false);
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
      >
        {cancelled ? "Atjaunot" : "Atcelt"}
      </button>
      {error && (
        <span role="alert" className="text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </span>
  );
}
