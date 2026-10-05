"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { prepareImage } from "@/lib/admin/prepareImage";
import type { ActionResult, SectionItem } from "@/lib/admin/types";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/admin/validation";

const MAX_FILES_PER_BATCH = 30;

type UploadStatus = "waiting" | "uploading" | "done" | "error";

interface QueueEntry {
  id: string;
  name: string;
  status: UploadStatus;
  message?: string;
}

const STATUS_LABEL: Record<UploadStatus, string> = {
  waiting: "Gaida",
  uploading: "Augšupielādē…",
  done: "Pievienots",
  error: "Kļūda",
};

const STATUS_CLASS: Record<UploadStatus, string> = {
  waiting: "text-slate-500",
  uploading: "text-pink-600",
  done: "text-emerald-600",
  error: "text-red-600",
};

interface ImageUploaderProps {
  sectionKey: string;
}

async function uploadOne(sectionKey: string, original: File): Promise<string | null> {
  let file: File;
  try {
    file = await prepareImage(original);
  } catch {
    return "Šo failu nevar nolasīt kā attēlu. Izmanto JPG, PNG vai WebP.";
  }

  const body = new FormData();
  body.append("sectionKey", sectionKey);
  body.append("file", file, file.name);

  try {
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const result = (await response.json()) as ActionResult<SectionItem>;
    return result.ok ? null : result.error;
  } catch {
    return "Neizdevās augšupielādēt. Pārbaudi interneta savienojumu.";
  }
}

/** Viena vai vairāku attēlu augšupielāde izvēlētajā sadaļā. */
export default function ImageUploader({ sectionKey }: ImageUploaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  function setEntry(id: string, changes: Partial<QueueEntry>) {
    setQueue((entries) =>
      entries.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry))
    );
  }

  async function handleFiles(fileList: FileList | null) {
    if (busy || !fileList || fileList.length === 0) return;

    const files = Array.from(fileList).slice(0, MAX_FILES_PER_BATCH);
    const entries: QueueEntry[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      status: "waiting",
    }));

    setBusy(true);
    setQueue(entries);

    // Pa vienam: katram attēlam savs pieprasījums un savs statuss.
    for (let index = 0; index < files.length; index += 1) {
      const entry = entries[index];
      setEntry(entry.id, { status: "uploading" });
      const error = await uploadOne(sectionKey, files[index]);
      setEntry(
        entry.id,
        error ? { status: "error", message: error } : { status: "done" }
      );
    }

    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    void handleFiles(event.target.files);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    void handleFiles(event.dataTransfer.files);
  }

  return (
    <div>
      <label
        htmlFor="admin-upload"
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragging
            ? "border-pink-500 bg-pink-50"
            : "border-slate-300 bg-white hover:border-pink-400 hover:bg-pink-50/50"
        } ${busy ? "pointer-events-none opacity-60" : ""}`}
      >
        <span className="text-base font-bold text-slate-900">
          {busy ? "Notiek augšupielāde…" : "Izvēlies attēlus vai ievelc tos šeit"}
        </span>
        <span className="mt-1 text-sm text-slate-500">
          JPG, PNG vai WebP. Var izvēlēties vairākus uzreiz.
        </span>
        <input
          ref={inputRef}
          id="admin-upload"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          multiple
          disabled={busy}
          onChange={handleChange}
          className="sr-only"
        />
      </label>

      {queue.length > 0 && (
        <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-sm">
          {queue.map((entry) => (
            <li key={entry.id} className="flex items-start justify-between gap-4 px-4 py-2.5">
              <span className="min-w-0 truncate text-slate-700">{entry.name}</span>
              <span className={`shrink-0 text-right font-semibold ${STATUS_CLASS[entry.status]}`}>
                {entry.message ?? STATUS_LABEL[entry.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
