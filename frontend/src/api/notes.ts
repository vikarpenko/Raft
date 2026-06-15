import { api } from '@/api/http';
import type { Note, CreateNoteInput, UpdateNoteInput } from '@/types/note';

/** Fetches all of the current user's notes. */
export async function getNotes(): Promise<Note[]> {
    return api.get<Note[]>('/notes');
}

/** Creates a note. */
export async function createNote(data: CreateNoteInput): Promise<Note> {
    return api.post<Note>('/notes', data);
}

/** Updates a note's content, pin state, color, etc. */
export async function updateNote(id: string, data: UpdateNoteInput): Promise<Note> {
    return api.patch<Note>(`/notes/${id}`, data);
}

/** Deletes a note by id. */
export async function deleteNote(id: string): Promise<void> {
    return api.delete<void>(`/notes/${id}`);
}

/** Full-text search across the user's notes, capped at `limit` results. */
export async function searchNotes(search: string, limit = 20): Promise<Note[]> {
    return api.get<Note[]>(`/notes/search?search=${encodeURIComponent(search)}&limit=${limit}`);
}
