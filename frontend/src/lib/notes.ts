/** Formats a date as `dd/mm/yy`. */
export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
}

/** Returns a random float in the range `[min, max)` (used for the scattered sticky-note look). */
export function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
