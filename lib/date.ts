/** "2026-10-15" -> "15.10.2026". Citus formātus atgriež nemainītus. */
export function formatDateLv(value: unknown) {
  const text = String(value ?? "");
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : text;
}

/** Date -> "YYYY-MM-DD" pēc vietējā laika. */
export function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
