import type { Notification } from '@/types/notification';

/** Formats a past timestamp as a short relative label (`just now`, `5m ago`, `yesterday`...). */
export function formatDate(iso: string): string {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);

    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD === 1) return 'yesterday';
    if (diffD < 7) return `${diffD}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Formats a future reminder time as a short label (`overdue`, `in 10m`, `tomorrow`...). */
export function formatReminderTime(iso: string): string {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);

    if (diffMs < 0) return 'overdue';
    if (diffMin < 60) return `in ${diffMin}m`;
    if (diffH < 24) return `in ${diffH}h`;
    if (diffD === 1) return 'tomorrow';
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/** Display label for a notification type. */
export function typeLabel(type: Notification['type']): string {
    switch (type) {
        case 'REMINDER': return 'Reminder';
        case 'ACHIEVEMENT': return 'Achievement';
        case 'SYSTEM': return 'System';
        default: return type;
    }
}

/** Picks the icon name used to render a notification of the given type. */
export function getNotificationIcon(type: Notification['type']): 'bell' | 'achievement' | 'settings' {
    switch (type) {
        case 'ACHIEVEMENT': return 'achievement';
        case 'SYSTEM':      return 'settings';
        default:            return 'bell';
    }
}
