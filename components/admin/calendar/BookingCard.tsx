import type { CalendarEntry } from "./entries";
import { entryColor } from "./entries";
import CancelButton from "./CancelButton";
import ContactButtons from "./ContactButtons";
import { longDate } from "@/lib/bookings/month";

interface BookingCardProps {
  entry: CalendarEntry;
  /** Rādīt datumu kartītē (tuvāko pieteikumu sarakstā). */
  showDate?: boolean;
}

/** Viena pieteikuma kartīte: kas, kad, klients, pogas atbildēt un visa informācija. */
export default function BookingCard({ entry, showDate = false }: BookingCardProps) {
  const { booking } = entry;
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${entryColor(entry)}`}>
            {entry.type === "pickup"
              ? "Kostīma saņemšana"
              : booking.kind === "pasakums"
              ? "Pasākums"
              : "Kostīma rezervācija"}
          </span>
          {showDate && (
            <span className="ml-2 text-xs font-semibold text-slate-500">{longDate(entry.date)}</span>
          )}
          <p className="mt-2 text-base font-bold text-slate-900">
            {booking.eventTime && entry.type === "event" ? `${booking.eventTime} · ` : ""}
            {booking.title || "—"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {booking.name || "—"}
            {booking.phone ? ` · ${booking.phone}` : ""}
            {booking.email ? <span className="break-all">{` · ${booking.email}`}</span> : null}
          </p>
        </div>
        <CancelButton id={booking.id} cancelled={booking.cancelled} />
      </div>

      <ContactButtons booking={booking} />

      {booking.details.length > 0 && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-semibold text-slate-600">Visa informācija</summary>
          <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-[max-content_1fr]">
            {booking.details.map((detail) => (
              <div key={detail.label} className="contents">
                <dt className="text-slate-500">{detail.label}</dt>
                <dd className="whitespace-pre-line text-slate-900">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </li>
  );
}
