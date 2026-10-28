"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setBookingCancelledAction } from "@/lib/admin/bookingActions";

/** "Nenotika" (izņem no kalendāra) / "Atjaunot". */
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
        title={cancelled ? "Atgriezt pieteikumu kalendārā" : "Noma atcelta vai pasākums nenotika: izņemt no kalendāra"}
        disabled={pending}
        className="rounded-full border border-[#f3e8ff] px-3 py-1 text-xs font-semibold text-[#a78bbf] transition hover:bg-pink-50 hover:text-pink-700 disabled:opacity-40"
      >
        {cancelled ? "Atjaunot" : "Atcelts / nenotika"}
      </button>
      {error && (
        <span role="alert" className="text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </span>
  );
}
