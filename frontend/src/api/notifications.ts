import { api } from './http';
import type { Notification } from '@/types/notification';

/** Lists the user's notifications, newest first. */
export async function getNotifications(): Promise<Notification[]> {
    return api.get<Notification[]>('/notifications');
}

/** Returns the number of unread notifications (for the bell badge). */
export async function getUnreadCount(): Promise<number> {
    const res = await api.get<{ count: number }>('/notifications/unread-count');
    return res.count;
}

/** Marks a single notification as read. */
export async function markAsRead(id: string): Promise<Notification> {
    return api.patch<Notification>(`/notifications/${id}/read`);
}

/** Marks all of the user's notifications as read. */
export async function markAllAsRead(): Promise<void> {
    return api.patch<void>('/notifications/read-all');
}

/** Deletes a notification by id. */
export async function deleteNotification(id: string): Promise<void> {
    return api.delete<void>(`/notifications/${id}`);
}
