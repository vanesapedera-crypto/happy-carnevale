import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import NotConfigured from "@/components/admin/NotConfigured";
import CancelButton from "@/components/admin/calendar/CancelButton";
import { entriesByDate, entryColor, entryLabel } from "@/components/admin/calendar/entries";
import { getAdminConfig, getMissingEnv } from "@/lib/admin/config";
import { requireSession } from "@/lib/admin/session";
import { describeSupabaseError } from "@/lib/admin/supabase";
import {
  MONTH_NAMES,
  WEEKDAYS,
  longDate,
  monthParam,
  monthRange,
  monthWeeks,
  parseMonth,
  shortDate,
  shiftMonth,
  todayInRiga,
} from "@/lib/bookings/month";
import { listBookingsInRange, type Booking } from "@/lib/bookings/store";
import { isMissingTable } from "@/lib/reviews/store";

export const dynamic = "force-dynamic";

interface CalendarPageProps {
  searchParams: Promise<{ m?: string | string[] }>;
}

const MAX_CHIPS = 3;

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const session = await requireSession();
  const config = getAdminConfig();
  if (!config) {
    return (
      <AdminShell email={session.email} current="kalendars">
        <NotConfigured missing={getMissingEnv()} />
      </AdminShell>
    );
  }

  const params = await searchParams;
  const today = todayInRiga();
  const month = parseMonth(Array.isArray(params.m) ? params.m[0] : params.m, today);
  const { from, to } = monthRange(month);

  let bookings: Booking[] = [];
  let missingTable = false;
  let loadError: string | null = null;
  try {
    bookings = await listBookingsInRange(config, from, to);
  } catch (error) {
    if (isMissingTable(error)) missingTable = true;
    else {
      console.error("[bookings] load failed", error);
      loadError = describeSupabaseError(error);
    }
  }

  // Atceltās nomas un nenotikušie pasākumi kalendārā netiek rādīti; tie ir atsevišķā sarakstā zemāk.
  const active = bookings.filter((booking) => !booking.cancelled);
  const cancelledBookings = bookings.filter((booking) => booking.cancelled);
  const byDate = entriesByDate(active, from, to);
  const days = [...byDate.keys()].sort();
  const total = active.length;
  const navLink = (delta: number) => `/admin/kalendars?m=${monthParam(shiftMonth(month, delta))}`;

  return (
    <AdminShell email={session.email} current="kalendars">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Kalendārs</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kostīmu rezervācijas un pasākumu pieteikumi no mājaslapas parādās šeit automātiski.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={navLink(-1)} aria-label="Iepriekšējais mēnesis" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold hover:bg-slate-50">
            ‹
          </Link>
          <span className="min-w-36 text-center text-lg font-bold">
            {MONTH_NAMES[month.month - 1]} {month.year}
          </span>
          <Link href={navLink(1)} aria-label="Nākamais mēnesis" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold hover:bg-slate-50">
            ›
          </Link>
          <Link href="/admin/kalendars" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50">
            Šodien
          </Link>
        </div>
      </div>

      {missingTable ? (
        <p role="alert" className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
          Datubāzē vēl nav kalendāra tabulas. Supabase SQL Editor palaid failu supabase/kalendars.sql un pārlādē lapu.
        </p>
      ) : loadError ? (
        <p role="alert" className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          Neizdevās ielādēt pieteikumus. {loadError}
        </p>
      ) : (
        <>
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white sm:block">
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {WEEKDAYS.map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>
            {monthWeeks(month).map((week, index) => (
              <div key={index} className="grid grid-cols-7 border-b border-slate-100 last:border-b-0">
                {week.map((day, dayIndex) => {
                  const entries = day ? byDate.get(day) ?? [] : [];
                  return (
                    <div
                      key={day ?? `empty-${dayIndex}`}
                      className={`min-h-28 border-r border-slate-100 p-1.5 last:border-r-0 ${day ? "" : "bg-slate-50/60"}`}
                    >
                      {day && (
                        <>
                          <div
                            className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                              day === today ? "bg-pink-500 text-white" : "text-slate-600"
                            }`}
                          >
                            {Number(day.slice(8, 10))}
                          </div>
                          <div className="space-y-1">
                            {entries.slice(0, MAX_CHIPS).map((entry) => (
                              <a
                                key={`${entry.booking.id}-${entry.type}`}
                                href={`#d-${day}`}
                                title={entryLabel(entry)}
                                className={`block truncate rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${entryColor(entry)}`}
                              >
                                {entryLabel(entry)}
                              </a>
                            ))}
                            {entries.length > MAX_CHIPS && (
                              <a href={`#d-${day}`} className="block px-1.5 text-[11px] font-semibold text-slate-500 hover:underline">
                                + vēl {entries.length - MAX_CHIPS}
                              </a>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-3 hidden flex-wrap gap-4 text-xs text-slate-500 sm:flex">
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-pink-100" /> Kostīma rezervācija (pasākuma diena)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-amber-50 ring-1 ring-amber-200" /> Kostīma saņemšana</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-violet-100" /> Pasākums</span>
          </div>

          <section className="mt-8">
            <h2 className="mb-3 text-lg font-bold">
              Pieteikumi: {MONTH_NAMES[month.month - 1].toLowerCase()} ({total})
            </h2>
            {days.length === 0 ? (
              <p className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
                Šajā mēnesī pieteikumu nav.
              </p>
            ) : (
              <div className="space-y-6">
                {days.map((day) => (
                  <div key={day} id={`d-${day}`} className="scroll-mt-4">
                    <h3 className={`mb-2 text-sm font-bold ${day === today ? "text-pink-600" : "text-slate-700"}`}>
                      {longDate(day)}
                      {day === today ? " · šodien" : ""}
                    </h3>
                    <ul className="space-y-3">
                      {(byDate.get(day) ?? []).map((entry) => {
                        const { booking } = entry;
                        return (
                          <li
                            key={`${booking.id}-${entry.type}`}
                            className={`rounded-2xl border border-slate-200 bg-white p-4 ${booking.cancelled ? "opacity-60" : ""}`}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="min-w-0">
                                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${entryColor(entry)}`}>
                                  {entry.type === "pickup"
                                    ? "Kostīma saņemšana"
                                    : booking.kind === "pasakums"
                                    ? "Pasākums"
                                    : "Kostīma rezervācija"}
                                  {booking.cancelled ? " · atcelts" : ""}
                                </span>
                                <p className={`mt-2 font-semibold text-slate-900 ${booking.cancelled ? "line-through" : ""}`}>
                                  {booking.eventTime && entry.type === "event" ? `${booking.eventTime} · ` : ""}
                                  {booking.title || "—"}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                  {booking.name}
                                  {booking.phone && (
                                    <>
                                      {" · "}
                                      <a href={`tel:${booking.phone.replace(/\s/g, "")}`} className="text-pink-600 hover:underline">
                                        {booking.phone}
                                      </a>
                                    </>
                                  )}
                                  {booking.email && (
                                    <>
                                      {" · "}
                                      <a href={`mailto:${booking.email}`} className="break-all text-pink-600 hover:underline">
                                        {booking.email}
                                      </a>
                                    </>
                                  )}
                                </p>
                              </div>
                              <CancelButton id={booking.id} cancelled={booking.cancelled} />
                            </div>
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
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {cancelledBookings.length > 0 && (
              <details className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-bold text-slate-600">
                  Atceltie un nenotikušie ({cancelledBookings.length})
                </summary>
                <ul className="mt-3 divide-y divide-slate-100">
                  {cancelledBookings.map((booking) => (
                    <li key={booking.id} className="flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
                      <span className="text-slate-500">
                        {booking.eventDate ? `${shortDate(booking.eventDate)} · ` : ""}
                        {booking.title || "—"}
                        {booking.name ? ` – ${booking.name}` : ""}
                      </span>
                      <CancelButton id={booking.id} cancelled />
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        </>
      )}
    </AdminShell>
  );
}
