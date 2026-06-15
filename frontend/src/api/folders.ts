import { api } from '@/api/http';
import type { Folder, CreateFolderInput, UpdateFolderInput } from '@/types/folder';

/** Fetches all of the user's note folders. */
export async function getFolders(): Promise<Folder[]> {
    return api.get<Folder[]>('/folders');
}

/** Creates a note folder. */
export async function createFolder(data: CreateFolderInput): Promise<Folder> {
    return api.post<Folder>('/folders', data);
}

/** Renames or recolors a folder. */
export async function updateFolder(id: string, data: UpdateFolderInput): Promise<Folder> {
    return api.patch<Folder>(`/folders/${id}`, data);
}

/** Deletes a folder by id. */
export async function deleteFolder(id: string): Promise<void> {
    return api.delete<void>(`/folders/${id}`);
}
