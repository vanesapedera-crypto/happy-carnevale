"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setBookingContactedAction } from "@/lib/admin/bookingActions";
import type { Booking } from "@/lib/bookings/store";
import { normalizePhone } from "@/lib/reviews/whatsapp";

function shortDate(value: string): string {
  const [, month, day] = value.slice(0, 10).split("-");
  return `${day}.${month}.`;
}

function contactedDay(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("lv-LV", { day: "2-digit", month: "2-digit", timeZone: "Europe/Riga" });
}

/** Sagatavotā ziņa klientam: "Sveiki, Anna! Rakstām no Happy Carnevale par Jūsu ...". */
export function contactMessage(booking: Booking): string {
  const greeting = booking.name ? `Sveiki, ${booking.name}!` : "Sveiki!";
  const what = booking.kind === "pasakums" ? "pasākuma pieteikumu" : "kostīma rezervāciju";
  const extra = [booking.title, booking.eventDate ? shortDate(booking.eventDate) : ""].filter(Boolean).join(", ");
  return `${greeting} Rakstām no Happy Carnevale par Jūsu ${what}${extra ? ` (${extra})` : ""}.`;
}

const base =
  "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-bold text-white transition hover:opacity-90";

/**
 * Pogas atbildēt klientam (WhatsApp, SMS, zvans, e-pasts) un atzīme "Sazinājos".
 * Uzspiežot kādu no saziņas pogām, pieteikums automātiski tiek atzīmēts kā "Sazinājos".
 */
export default function ContactButtons({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const number = booking.phone ? normalizePhone(booking.phone) : null;
  const message = encodeURIComponent(contactMessage(booking));
  const email = booking.email.trim();
  const contacted = booking.contactedAt !== null;

  async function mark(value: boolean) {
    setPending(true);
    setError(null);
    try {
      const result = await setBookingContactedAction(booking.id, value);
      if (!result.ok) setError(result.error);
      router.refresh();
    } catch {
      setError("Neizdevās saglabāt.");
    }
    setPending(false);
  }

  // Saziņas pogas atzīmē automātiski (tikai, ja vēl nav atzīmēts).
  const autoMark = () => {
    if (!contacted) void mark(true);
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        {number && (
          <>
            <a
              href={`https://wa.me/${number}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={autoMark}
              className={`${base} bg-[#25D366]`}
            >
              WhatsApp
            </a>
            <a href={`sms:+${number}?&body=${message}`} onClick={autoMark} className={`${base} bg-blue-500`}>
              SMS
            </a>
            <a href={`tel:+${number}`} onClick={autoMark} className={`${base} bg-slate-400`}>
              Zvanīt
            </a>
          </>
        )}
        {email && (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Happy Carnevale")}&body=${message}`}
            onClick={autoMark}
            className={`${base} bg-pink-500`}
          >
            E-pasts
          </a>
        )}
        <button
          type="button"
          disabled={pending}
          onClick={() => mark(!contacted)}
          title={contacted ? "Noņemt atzīmi" : "Atzīmēt, ka ar klientu jau sazinājies"}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition disabled:opacity-50 ${
            contacted
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : "border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          {contacted ? `Sazinājos ${contactedDay(booking.contactedAt ?? "")}` : "Atzīmēt: sazinājos"}
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
