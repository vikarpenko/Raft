export function toISODate(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

export function monthGridDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
}

export function weekDays(date: Date): Date[] {
  const offset = (date.getDay() + 6) % 7;
  return Array.from(
    { length: 7 },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset + i),
  );
}
