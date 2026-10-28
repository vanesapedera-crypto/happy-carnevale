import type { CalendarEntry } from "./entries";
import CancelButton from "./CancelButton";
import ContactButtons from "./ContactButtons";
import { longDate } from "@/lib/bookings/month";

interface BookingCardProps {
  entry: CalendarEntry;
  /** Rādīt datumu kartītē (tuvāko pieteikumu sarakstā). */
  showDate?: boolean;
  /** Kostīma bilde (sīktēls). */
  image?: string;
}

/** Viena pieteikuma kartīte: kas, kad, klients, pogas atbildēt un visa informācija. */
export default function BookingCard({ entry, showDate = false, image }: BookingCardProps) {
  const { booking } = entry;
  const rental = booking.kind === "rezervacija";
  return (
    <li className="rounded-[18px] bg-white p-4 shadow-[0_6px_18px_rgba(59,7,100,0.06)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span
          className={`rounded-full px-2.5 py-0.5 font-bold ${
            rental ? "bg-pink-100 text-pink-700" : "bg-violet-100 text-violet-700"
          }`}
        >
          {rental ? "Kostīms jāatdod" : "Pasākums"}
        </span>
        {showDate && <span className="font-semibold text-[#8b6aa7]">{longDate(entry.date)}</span>}
        <span className="ml-auto">
          <CancelButton id={booking.id} cancelled={booking.cancelled} />
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-16 w-14 shrink-0 rounded-xl bg-[#fdf4ff] object-contain p-1"
          />
        )}
        <div className="min-w-0">
          <p className="text-base font-bold">
            {booking.eventTime && !rental ? `${booking.eventTime} · ` : ""}
            {booking.title || "—"}
          </p>
          <p className="mt-0.5 text-sm text-[#7e5a9b]">
            {booking.name || "—"}
            {booking.phone ? ` · ${booking.phone}` : ""}
            {booking.email ? <span className="break-all">{` · ${booking.email}`}</span> : null}
          </p>

        </div>
      </div>

      <ContactButtons booking={booking} />

      {booking.details.length > 0 && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-semibold text-[#a78bbf]">Visa informācija</summary>
          <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-[max-content_1fr]">
            {booking.details.map((detail) => (
              <div key={detail.label} className="contents">
                <dt className="text-[#8b6aa7]">{detail.label}</dt>
                <dd className="whitespace-pre-line text-[#3b0764]">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </li>
  );
}
