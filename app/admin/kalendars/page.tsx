import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import NotConfigured from "@/components/admin/NotConfigured";
import AddBookingForm from "@/components/admin/calendar/AddBookingForm";
import BookingCard from "@/components/admin/calendar/BookingCard";
import CancelButton from "@/components/admin/calendar/CancelButton";
import { entriesByDate, entryColor, entryLabel, type CalendarEntry } from "@/components/admin/calendar/entries";
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
const UPCOMING_DAYS = 14;

/** ISO datums + n dienas (YYYY-MM-DD). */
function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

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
  const upcomingTo = addDays(today, UPCOMING_DAYS - 1);
  let upcoming: CalendarEntry[] = [];
  try {
    bookings = await listBookingsInRange(config, from, to);
    const soon = (await listBookingsInRange(config, today, upcomingTo)).filter((b) => !b.cancelled);
    const soonByDate = entriesByDate(soon, today, upcomingTo);
    upcoming = [...soonByDate.keys()].sort().flatMap((day) => soonByDate.get(day) ?? []);
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
          <section className="mt-6 rounded-3xl border-2 border-pink-200 bg-pink-50/60 p-4 sm:p-5">
            <h2 className="text-lg font-black text-slate-900">
              Tuvākās 2 nedēļas{" "}
              <span className="text-sm font-semibold text-slate-500">({upcoming.length})</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pieteikumi no šodienas. Ar pogām vari uzreiz atbildēt klientam.
            </p>
            {upcoming.length === 0 ? (
              <p className="mt-4 rounded-2xl bg-white px-4 py-6 text-center text-sm text-slate-500">
                Tuvāko 2 nedēļu laikā pieteikumu nav.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {upcoming.map((entry) => (
                  <BookingCard key={`${entry.booking.id}-${entry.type}`} entry={entry} showDate />
                ))}
              </ul>
            )}
          </section>

          <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 [&[open]>summary]:mb-4">
            <summary className="cursor-pointer text-sm font-bold text-pink-600">+ Pievienot pieteikumu ar roku</summary>
            <AddBookingForm />
          </details>

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
                      {(byDate.get(day) ?? []).map((entry) => (
                        <BookingCard key={`${entry.booking.id}-${entry.type}`} entry={entry} />
                      ))}
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
