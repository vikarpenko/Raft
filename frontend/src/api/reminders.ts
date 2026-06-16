import { api } from './http';
import type { Reminder, CreateReminderInput, UpdateReminderInput } from '@/types/reminder';

/** Lists the user's reminders. */
export async function getReminders(): Promise<Reminder[]> {
    return api.get<Reminder[]>('/reminders');
}

/** Creates a reminder for a task or event at the given time. */
export async function createReminder(data: CreateReminderInput): Promise<Reminder> {
    return api.post<Reminder>('/reminders', data);
}

/** Updates a reminder (e.g. reschedules its time). */
export async function updateReminder(id: string, data: UpdateReminderInput): Promise<Reminder> {
    return api.patch<Reminder>(`/reminders/${id}`, data);
}

/** Deletes a reminder by id. */
export async function deleteReminder(id: string): Promise<void> {
    return api.delete<void>(`/reminders/${id}`);
}
