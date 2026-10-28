"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setBookingNoteAction } from "@/lib/admin/bookingActions";

/** "Mani komentāri" pie pieteikuma: redzams teksts + labošana. */
export default function NoteEditor({ id, note }: { id: string; note: string }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(note);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setPending(true);
    setError(null);
    try {
      const result = await setBookingNoteAction(id, value);
      if (result.ok) {
        setEditing(false);
        router.refresh();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Neizdevās saglabāt.");
    }
    setPending(false);
  }

  if (!editing) {
    return note ? (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="mt-3 block w-full rounded-xl bg-amber-50 px-3 py-2 text-left text-sm text-amber-900 transition hover:bg-amber-100"
      >
        <span className="block text-xs font-bold text-amber-700">Mani komentāri</span>
        <span className="whitespace-pre-line">{note}</span>
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="mt-3 text-sm font-semibold text-[#a78bbf] transition hover:text-pink-600"
      >
        + Mani komentāri
      </button>
    );
  }

  return (
    <div className="mt-3">
      <label htmlFor={`note-${id}`} className="text-xs font-bold text-amber-700">
        Mani komentāri
      </label>
      <textarea
        id={`note-${id}`}
        value={value}
        maxLength={2000}
        rows={3}
        autoFocus
        onChange={(event) => setValue(event.target.value)}
        placeholder="piem. izmērs M, atnāks pēc 17:00, iemaksāts avanss"
        className="mt-1 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-amber-600 disabled:opacity-50"
        >
          {pending ? "Saglabā…" : "Saglabāt"}
        </button>
        <button
          type="button"
          onClick={() => {
            setValue(note);
            setEditing(false);
            setError(null);
          }}
          disabled={pending}
          className="rounded-full px-4 py-1.5 text-sm font-semibold text-[#a78bbf] transition hover:bg-pink-50"
        >
          Atcelt
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
