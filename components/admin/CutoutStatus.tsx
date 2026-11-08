"use client";

import { useState } from "react";
import { makeCutout } from "@/lib/admin/cutoutClient";
import { cutoutFor } from "@/lib/costumeCutouts";
import type { SectionItem } from "@/lib/admin/types";

type State = "idle" | "working" | "ready" | "error";

/**
 * Kostīma kartītē admin panelī: poga "Noņemt fonu". Bildi bez fona izveido
 * pārlūkā un saglabā; mājaslapā tad aiz kostīma rāda krāsainu apli.
 */
export default function CutoutStatus({ item }: { item: SectionItem }) {
  const hasCutout =
    !!cutoutFor(item.imageUrl) || (item.cutout !== null && item.cutout.source === item.imageUrl);
  const [state, setState] = useState<State>(hasCutout ? "ready" : "idle");
  const [message, setMessage] = useState("");

  async function run() {
    setState("working");
    setMessage("");
    const error = await makeCutout(item);
    if (error) {
      setState("error");
      setMessage(error);
    } else {
      setState("ready");
    }
  }

  if (state === "ready") {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-emerald-600/90 px-2.5 py-1 text-[11px] font-semibold text-white">
        ✓ Bez fona
      </span>
    );
  }
  if (state === "working") {
    return (
      <span className="absolute left-3 top-3 animate-pulse rounded-full bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white">
        Noņem fonu…
      </span>
    );
  }
  return (
    <div className="absolute left-3 top-3 max-w-[85%]">
      <button
        type="button"
        onClick={() => void run()}
        className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-violet-700"
      >
        {state === "error" ? "Mēģināt vēlreiz" : "Noņemt fonu"}
      </button>
      {state === "error" && (
        <p className="mt-1 rounded-md bg-white/95 px-2 py-1 text-[11px] font-medium text-amber-700 shadow">
          {message}
        </p>
      )}
    </div>
  );
}
