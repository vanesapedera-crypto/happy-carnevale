"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { removeExtraImageAction } from "@/lib/admin/actions";
import type { SectionItem } from "@/lib/admin/types";
import { postImage } from "@/lib/admin/uploadClient";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/admin/validation";

const MAX = 12;

/** Kostīma papildu bildes: sīktēli, "+ Pievienot bildes" (vairākas uzreiz) un dzēšana. */
export default function ExtraImages({ item }: { item: SectionItem }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const images = item.extraImages;

  async function handleAdd(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    const room = MAX - images.length;
    const selected = files.slice(0, Math.max(0, room));
    setError(
      files.length > selected.length
        ? `Var pievienot līdz ${MAX} papildu bildēm. Pievienotas pirmās ${selected.length}.`
        : null
    );

    for (let index = 0; index < selected.length; index += 1) {
      setBusy(`Augšupielādē ${index + 1}/${selected.length}…`);
      const message = await postImage("/api/admin/add-image", { id: item.id }, selected[index]);
      if (message) {
        setError(message);
        break;
      }
    }
    setBusy(null);
    router.refresh();
  }

  async function handleRemove(url: string) {
    if (!window.confirm("Dzēst šo papildu bildi?")) return;
    setBusy("Dzēš…");
    setError(null);
    try {
      const result = await removeExtraImageAction(item.id, url);
      if (!result.ok) setError(result.error);
    } catch {
      setError("Neizdevās izdzēst bildi. Lūdzu, mēģini vēlreiz.");
    }
    setBusy(null);
    router.refresh();
  }

  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Papildu bildes ({images.length})
      </p>

      {images.length > 0 && (
        <ul className="mt-2 grid grid-cols-4 gap-2">
          {images.map((image) => (
            <li key={image.url} className="relative aspect-square overflow-hidden rounded-md bg-slate-100">
              <Image src={image.url} alt="" fill unoptimized className="object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(image.url)}
                disabled={busy !== null}
                aria-label="Dzēst šo bildi"
                className="absolute right-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-red-600 shadow disabled:opacity-50"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {images.length < MAX && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy !== null}
          className="mt-2 w-full rounded-lg border border-dashed border-pink-300 px-3 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50 disabled:opacity-60"
        >
          {busy ?? "+ Pievienot bildes"}
        </button>
      )}
      {busy && images.length >= MAX && <p className="mt-2 text-sm text-slate-500">{busy}</p>}

      <input
        ref={fileRef}
        type="file"
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleAdd}
        aria-label="Izvēlies papildu bildes"
        tabIndex={-1}
        className="sr-only"
      />

      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
