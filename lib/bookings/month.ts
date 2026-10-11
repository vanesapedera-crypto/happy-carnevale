/** Mēneša kalendāra aprēķini (bez laika joslām: visi datumi ir "YYYY-MM-DD"). */

export interface MonthRef {
  year: number;
  month: number; // 1-12
}

export const MONTH_NAMES = [
  "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
  "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris",
];
export const WEEKDAYS = ["P", "O", "T", "C", "Pk", "S", "Sv"];

const pad = (value: number) => String(value).padStart(2, "0");

export function isoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** Šodiena Latvijā "YYYY-MM-DD". */
export function todayInRiga(now = new Date()): string {
  return now.toLocaleDateString("sv-SE", { timeZone: "Europe/Riga" });
}

/** "2026-10" -> {2026, 10}; citādi šis mēnesis. */
export function parseMonth(value: string | undefined, today: string): MonthRef {
  const match = /^(\d{4})-(\d{2})$/.exec(value ?? "");
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    if (year >= 2020 && year <= 2100 && month >= 1 && month <= 12) return { year, month };
  }
  return { year: Number(today.slice(0, 4)), month: Number(today.slice(5, 7)) };
}

export function monthParam({ year, month }: MonthRef): string {
  return `${year}-${pad(month)}`;
}

export function shiftMonth({ year, month }: MonthRef, delta: number): MonthRef {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

function daysIn(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Nedēļas (pirmdiena–svētdiena); dienas ārpus mēneša ir null. */
export function monthWeeks({ year, month }: MonthRef): (string | null)[][] {
  const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7; // 0 = pirmdiena
  const cells: (string | null)[] = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysIn(year, month); day += 1) cells.push(isoDate(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7));
  return weeks;
}

export function monthRange({ year, month }: MonthRef): { from: string; to: string } {
  return { from: isoDate(year, month, 1), to: isoDate(year, month, daysIn(year, month)) };
}

/** "2026-10-31" -> "31.10." */
export function shortDate(value: string): string {
  return `${value.slice(8, 10)}.${value.slice(5, 7)}.`;
}

/** "2026-10-31" -> "Sestdiena, 31. oktobris" */
export function longDate(value: string): string {
  const date = new Date(`${value}T12:00:00Z`);
  const text = date.toLocaleDateString("lv-LV", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });
  return text.charAt(0).toUpperCase() + text.slice(1);
}
