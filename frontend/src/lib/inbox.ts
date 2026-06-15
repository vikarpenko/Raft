import type { Notification } from '@/types/notification';

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

export function typeLabel(type: Notification['type']): string {
    switch (type) {
        case 'REMINDER': return 'Reminder';
        case 'ACHIEVEMENT': return 'Achievement';
        case 'SYSTEM': return 'System';
        default: return type;
    }
}

export function getNotificationIcon(type: Notification['type']): 'bell' | 'achievement' | 'settings' {
    switch (type) {
        case 'ACHIEVEMENT': return 'achievement';
        case 'SYSTEM':      return 'settings';
        default:            return 'bell';
    }
}