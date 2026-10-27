import type { Booking } from "@/lib/bookings/store";
import { shortDate } from "@/lib/bookings/month";
import { normalizePhone } from "@/lib/reviews/whatsapp";

/** Sagatavotā ziņa klientam: "Sveiki, Anna! Rakstām no Happy Carnevale par Jūsu ...". */
export function contactMessage(booking: Booking): string {
  const greeting = booking.name ? `Sveiki, ${booking.name}!` : "Sveiki!";
  const what =
    booking.kind === "pasakums" ? "pasākuma pieteikumu" : "kostīma rezervāciju";
  const extra = [booking.title, booking.eventDate ? shortDate(booking.eventDate) : ""]
    .filter(Boolean)
    .join(", ");
  return `${greeting} Rakstām no Happy Carnevale par Jūsu ${what}${extra ? ` (${extra})` : ""}.`;
}

const base =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:opacity-90";

/** Pogas, lai uzreiz atbildētu klientam: WhatsApp, SMS, zvans, e-pasts. */
export default function ContactButtons({ booking }: { booking: Booking }) {
  const number = booking.phone ? normalizePhone(booking.phone) : null;
  const message = encodeURIComponent(contactMessage(booking));
  const email = booking.email.trim();
  if (!number && !email) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {number && (
        <>
          <a href={`https://wa.me/${number}?text=${message}`} target="_blank" rel="noopener noreferrer" className={`${base} bg-[#25D366]`}>
            WhatsApp
          </a>
          <a href={`sms:+${number}?&body=${message}`} className={`${base} bg-blue-500`}>
            SMS
          </a>
          <a href={`tel:+${number}`} className={`${base} bg-slate-500`}>
            Zvanīt
          </a>
        </>
      )}
      {email && (
        <a
          href={`mailto:${email}?subject=${encodeURIComponent("Happy Carnevale")}&body=${message}`}
          className={`${base} bg-pink-500`}
        >
          E-pasts
        </a>
      )}
    </div>
  );
}
