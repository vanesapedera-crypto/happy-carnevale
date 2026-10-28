"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addBookingAction } from "@/lib/admin/bookingActions";

const INPUT =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";
const LABEL = "text-xs font-semibold uppercase tracking-wide text-slate-500";

const EMPTY = {
  kind: "rezervacija" as "rezervacija" | "pasakums",
  title: "",
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  eventTime: "",
  pickupDate: "",
  address: "",
  comment: "",
};

/** Pieteikuma pievienošana ar roku (piem., pieteicās pa telefonu). */
export default function AddBookingForm() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const set = (key: keyof typeof EMPTY) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  const rental = form.kind === "rezervacija";

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setNotice(null);
    try {
      const result = await addBookingAction(form);
      if (result.ok) {
        setNotice({ ok: true, text: "Pievienots kalendāram" });
        setForm(EMPTY);
        router.refresh();
      } else {
        setNotice({ ok: false, text: result.error });
      }
    } catch {
      setNotice({ ok: false, text: "Neizdevās saglabāt. Lūdzu, mēģini vēlreiz." });
    }
    setPending(false);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="ab-title" className={LABEL}>{rental ? "Kostīms" : "Pakalpojums"}</label>
        <input
          id="ab-title"
          value={form.title}
          onChange={set("title")}
          placeholder={rental ? "piem. Ragana" : "piem. Animatori"}
          maxLength={200}
          className={INPUT}
        />
      </div>
      <div>
        <label htmlFor="ab-date" className={LABEL}>Pasākuma datums *</label>
        <input id="ab-date" type="date" required value={form.eventDate} onChange={set("eventDate")} className={INPUT} />
      </div>
      {rental ? (
        <div>
          <label htmlFor="ab-pickup" className={LABEL}>Saņemšanas datums</label>
          <input id="ab-pickup" type="date" value={form.pickupDate} onChange={set("pickupDate")} className={INPUT} />
        </div>
      ) : (
        <div>
          <label htmlFor="ab-time" className={LABEL}>Laiks</label>
          <input id="ab-time" type="time" value={form.eventTime} onChange={set("eventTime")} className={INPUT} />
        </div>
      )}
      <div>
        <label htmlFor="ab-name" className={LABEL}>Klienta vārds</label>
        <input id="ab-name" value={form.name} onChange={set("name")} maxLength={120} className={INPUT} />
      </div>
      <div>
        <label htmlFor="ab-phone" className={LABEL}>Tālrunis</label>
        <input id="ab-phone" type="tel" value={form.phone} onChange={set("phone")} maxLength={40} className={INPUT} />
      </div>
      <div>
        <label htmlFor="ab-email" className={LABEL}>E-pasts</label>
        <input id="ab-email" type="email" value={form.email} onChange={set("email")} maxLength={254} className={INPUT} />
      </div>
      <div>
        <label htmlFor="ab-address" className={LABEL}>{rental ? "Piegādes adrese / pakomāts" : "Adrese"}</label>
        <input id="ab-address" value={form.address} onChange={set("address")} maxLength={300} className={INPUT} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ab-comment" className={LABEL}>Piezīmes</label>
        <textarea id="ab-comment" rows={3} value={form.comment} onChange={set("comment")} maxLength={1000} className={INPUT} />
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-600 disabled:opacity-40"
        >
          {pending ? "Saglabā…" : "Pievienot kalendāram"}
        </button>
        {notice && (
          <span role={notice.ok ? "status" : "alert"} className={`text-sm font-medium ${notice.ok ? "text-emerald-600" : "text-red-600"}`}>
            {notice.text}
          </span>
        )}
      </div>
    </form>
  );
}
