import { api } from '@/api/http';
import type { Event } from '@/types/event';

/** Fetches all calendar events across the current user's accessible workspaces. */
export async function getEvents(): Promise<Event[]> {
  return api.get<Event[]>('/events');
}

/** Creates an event; `workspaceId` is sent as a number (the backend expects `Long`). */
export async function createEvent(input: Omit<Event, 'id'>): Promise<Event> {
  return api.post<Event>('/events', {
    title: input.title,
    description: input.description,
    startTime: input.startTime,
    endTime: input.endTime,
    workspaceId: input.workspaceId ? Number(input.workspaceId) : null,
  });
}

/** Updates an event's details (title, description, start/end time). */
export async function updateEvent(id: string, patch: Partial<Event>): Promise<Event> {
  return api.patch<Event>(`/events/${id}`, {
    title: patch.title,
    description: patch.description,
    startTime: patch.startTime,
    endTime: patch.endTime,
  });
}

/** Deletes an event by id. */
export async function deleteEvent(id: string): Promise<void> {
  await api.delete<void>(`/events/${id}`);
}
