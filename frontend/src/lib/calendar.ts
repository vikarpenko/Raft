/** Date helpers for the calendar UI. All operate in local time (never UTC). */

/** Formats a date as a local `YYYY-MM-DD` string (e.g. `2026-06-16`). */
export function toISODate(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

/** Formats a date as local `YYYY-MM-DDTHH:mm`, matching `<input type="datetime-local">`. */
export function toDateTimeLocal(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Builds the 42 days (6 weeks, Monday-first) for a month grid, padding with adjacent months. */
export function monthGridDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
}

/** Returns the 7 days (Monday-first) of the week containing `date`. */
export function weekDays(date: Date): Date[] {
  const offset = (date.getDay() + 6) % 7;
  return Array.from(
    { length: 7 },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset + i),
  );
}
