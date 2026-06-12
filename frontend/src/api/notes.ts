import { api } from '@/api/http';
import type { Note } from '@/types/note';

export async function getNotes(): Promise<Note[]> {
    return api.get<Note[]>('/notes');
}

export async function createNote(data: {
    title: string;
    content?: string;
    folderId: string;
}): Promise<Note> {
    return api.post<Note>('/notes', data);
}

export async function updateNote(id: string, data: { title?: string; content?: string }): Promise<Note> {
    return api.patch<Note>(`/notes/${id}`, data);
}

export async function deleteNote(id: string): Promise<void> {
    return api.delete<void>(`/notes/${id}`);
}

export async function searchNotes(search: string, limit = 20): Promise<Note[]> {
    return api.get<Note[]>(`/notes/search?search=${encodeURIComponent(search)}&limit=${limit}`);
}