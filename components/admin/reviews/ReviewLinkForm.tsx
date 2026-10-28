"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveReviewLinkAction } from "@/lib/admin/reviewActions";

const INPUT =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";

/** Google atsauksmju saite, ko izmanto WhatsApp ziņās un e-pastos. */
export default function ReviewLinkForm({ initialUrl }: { initialUrl: string }) {
  const router = useRouter();
  const [url, setUrl] = useState(initialUrl);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  async function save() {
    setPending(true);
    setNotice(null);
    try {
      const result = await saveReviewLinkAction(url);
      setNotice(result.ok ? { ok: true, text: "Saglabāts" } : { ok: false, text: result.error });
      if (result.ok) router.refresh();
    } catch {
      setNotice({ ok: false, text: "Neizdevās saglabāt. Lūdzu, mēģini vēlreiz." });
    }
    setPending(false);
  }

  return (
    <div>
      <label htmlFor="review-url" className="text-sm font-semibold text-slate-700">
        Google atsauksmju saite
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="review-url"
          type="url"
          value={url}
          placeholder="https://g.page/r/..."
          onChange={(event) => setUrl(event.target.value)}
          className={INPUT}
        />
        <button
          type="button"
          onClick={save}
          disabled={pending || url.trim() === initialUrl}
          className="shrink-0 rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Saglabā…" : "Saglabāt"}
        </button>
      </div>
      {notice && (
        <p
          role={notice.ok ? "status" : "alert"}
          className={`mt-2 text-sm font-medium ${notice.ok ? "text-emerald-600" : "text-red-600"}`}
        >
          {notice.text}
        </p>
      )}
    </div>
  );
}
