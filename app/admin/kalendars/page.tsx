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
import { COSTUME_CATEGORIES, loadCategoryCostumes } from "@/lib/costumeCatalog";

export const dynamic = "force-dynamic";

interface CalendarPageProps {
  searchParams: Promise<{ m?: string | string[] }>;
}

const MAX_CHIPS = 3;
/** "oktobrī", "novembrī" ... */
const MONTH_LOCATIVE = [
  "janvārī", "februārī", "martā", "aprīlī", "maijā", "jūnijā",
  "jūlijā", "augustā", "septembrī", "oktobrī", "novembrī", "decembrī",
];
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
  const cancelledBookings = bookings.filter((booking) => booking.cancelled && booking.kind === "rezervacija");
  const byDate = entriesByDate(active, from, to);
  const days = [...byDate.keys()].sort();
  const total = [...byDate.values()].reduce((sum, list) => sum + list.length, 0);
  const navLink = (delta: number) => `/admin/kalendars?m=${monthParam(shiftMonth(month, delta))}`;

  // Kostīma sīktēls kartītē: bilde pēc kostīma nosaukuma no kostīmu kataloga.
  const imageByTitle = new Map<string, string>();
  try {
    const lists = await Promise.all(COSTUME_CATEGORIES.map((category) => loadCategoryCostumes(category.path)));
    for (const costume of lists.flat()) {
      const key = costume.title.trim().toLowerCase();
      if (costume.image && !imageByTitle.has(key)) imageByTitle.set(key, costume.image);
    }
  } catch (error) {
    console.error("[bookings] costume images failed", error);
  }
  const imageFor = (entry: CalendarEntry) => imageByTitle.get(entry.booking.title.trim().toLowerCase());

  const card = "rounded-[20px] bg-white shadow-[0_6px_18px_rgba(59,7,100,0.06)]";
  const navButton =
    "flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-bold text-pink-600 transition hover:bg-pink-50";

  return (
    <AdminShell email={session.email} current="kalendars">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-black">Kalendārs</h1>
        <div className={`${card} px-5 py-2.5`}>
          <p className="text-2xl font-black leading-tight">{total}</p>
          <p className="text-xs text-[#8b6aa7]">
            {total === 1 ? "kostīms nomā" : "kostīmi nomā"} {MONTH_LOCATIVE[month.month - 1]}
          </p>
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
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            <section>
              <h2 className="mb-3 text-lg font-black">Tuvākās 2 nedēļas</h2>
              {upcoming.length === 0 ? (
                <p className={`${card} px-4 py-6 text-center text-sm text-[#8b6aa7]`}>Pieteikumu nav.</p>
              ) : (
                <ul className="space-y-3">
                  {upcoming.map((entry) => (
                    <BookingCard key={`${entry.booking.id}-${entry.type}`} entry={entry} image={imageFor(entry)} showDate />
                  ))}
                </ul>
              )}
            </section>

            <section className={`${card} p-4`}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-lg font-black">
                  {MONTH_NAMES[month.month - 1]} {month.year}
                </h2>
                <div className="flex items-center">
                  <Link href={navLink(-1)} aria-label="Iepriekšējais mēnesis" className={navButton}>
                    ‹
                  </Link>
                  <Link href="/admin/kalendars" className={navButton}>
                    Šodien
                  </Link>
                  <Link href={navLink(1)} aria-label="Nākamais mēnesis" className={navButton}>
                    ›
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#c4a9d6]">
                  {WEEKDAYS.map((day) => (
                    <div key={day} className="py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {monthWeeks(month)
                    .flat()
                    .map((day, index) => {
                      const entries = day ? byDate.get(day) ?? [] : [];
                      return (
                        <div
                          key={day ?? `empty-${index}`}
                          className={`min-h-20 min-w-0 rounded-xl p-1.5 ${day ? "bg-[#fdf4ff]" : ""}`}
                        >
                          {day && (
                            <>
                              <div
                                className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                                  day === today ? "bg-pink-500 text-white" : "text-[#7e5a9b]"
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
                                  <a href={`#d-${day}`} className="block px-1.5 text-[11px] font-semibold text-[#8b6aa7] hover:underline">
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
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#8b6aa7]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-pink-500" /> Jāsazinās
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-emerald-500" /> Sazinājos
                  </span>
                </div>
              </div>
            </section>
          </div>

          <details className={`${card} mt-6 p-4 [&[open]>summary]:mb-4`}>
            <summary className="cursor-pointer text-sm font-bold text-pink-600">+ Pievienot pieteikumu</summary>
            <AddBookingForm />
          </details>

          <section className="mt-8">
            <h2 className="mb-3 text-lg font-black">
              Visi pieteikumi: {MONTH_NAMES[month.month - 1].toLowerCase()} ({total})
            </h2>
            {days.length === 0 ? (
              <p className={`${card} px-4 py-8 text-center text-sm text-[#8b6aa7]`}>Šajā mēnesī pieteikumu nav.</p>
            ) : (
              <div className="space-y-6">
                {days.map((day) => (
                  <div key={day} id={`d-${day}`} className="scroll-mt-4">
                    <h3 className={`mb-2 text-sm font-bold ${day === today ? "text-pink-600" : "text-[#7e5a9b]"}`}>
                      {longDate(day)}
                      {day === today ? " · šodien" : ""}
                    </h3>
                    <ul className="space-y-3">
                      {(byDate.get(day) ?? []).map((entry) => (
                        <BookingCard key={`${entry.booking.id}-${entry.type}`} entry={entry} image={imageFor(entry)} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {cancelledBookings.length > 0 && (
              <details className={`${card} mt-8 p-4`}>
                <summary className="cursor-pointer text-sm font-bold text-[#7e5a9b]">
                  Atceltie un nenotikušie ({cancelledBookings.length})
                </summary>
                <ul className="mt-3 divide-y divide-pink-50">
                  {cancelledBookings.map((booking) => (
                    <li key={booking.id} className="flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
                      <span className="text-[#8b6aa7]">
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
