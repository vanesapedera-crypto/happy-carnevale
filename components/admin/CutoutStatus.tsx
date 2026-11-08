"use client";

import { useCallback, useEffect, useState } from "react";
import { removeBackground } from "@/lib/admin/removeBackground";
import { cutoutFor } from "@/lib/costumeCutouts";
import type { ActionResult, SectionItem } from "@/lib/admin/types";

type State = "ready" | "working" | "error";

// Ja datubāzē nav kolonnas, nemēģinām katrai kartītei atsevišķi
let databaseMissing = false;

/**
 * Kostīma kartītē admin panelī: ja bildei vēl nav versijas bez fona,
 * izveido to pats (pārlūkā) un saglabā. Mājaslapā tad aiz kostīma rāda krāsainu apli.
 */
export default function CutoutStatus({ item }: { item: SectionItem }) {
  const hasCutout =
    !!cutoutFor(item.imageUrl) || (item.cutout !== null && item.cutout.source === item.imageUrl);
  const [state, setState] = useState<State>(hasCutout ? "ready" : "working");
  const [message, setMessage] = useState("");

  const run = useCallback(async () => {
    if (databaseMissing) {
      setState("error");
      setMessage("Supabase jāpalaiž supabase/izgriezumi.sql");
      return;
    }
    setState("working");
    setMessage("");
    try {
      const blob = await removeBackground(item.imageUrl);
      const body = new FormData();
      body.append("id", item.id);
      body.append("source", item.imageUrl);
      body.append("file", blob, blob.type === "image/png" ? "bez-fona.png" : "bez-fona.webp");
      const response = await fetch("/api/admin/cutout", { method: "POST", body });
      const result = (await response.json()) as ActionResult<SectionItem>;
      if (result.ok) {
        setState("ready");
      } else {
        if (response.status === 409 && result.error.includes("izgriezumi.sql")) databaseMissing = true;
        setState("error");
        setMessage(result.error);
      }
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Neizdevās noņemt fonu.");
    }
  }, [item.id, item.imageUrl]);

  useEffect(() => {
    if (!hasCutout) void run();
    // Tikai pirmo reizi un pēc bildes nomaiņas
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.imageUrl]);

  if (state === "ready") {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-emerald-600/90 px-2.5 py-1 text-[11px] font-semibold text-white">
        ✓ Bez fona
      </span>
    );
  }
  if (state === "working") {
    return (
      <span className="absolute left-3 top-3 animate-pulse rounded-full bg-violet-600/90 px-2.5 py-1 text-[11px] font-semibold text-white">
        Noņem fonu…
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => void run()}
      title={message}
      className="absolute left-3 top-3 max-w-[85%] rounded-full bg-amber-500/95 px-2.5 py-1 text-left text-[11px] font-semibold text-white hover:bg-amber-600"
    >
      Fons nav noņemts – mēģināt vēlreiz
    </button>
  );
}
