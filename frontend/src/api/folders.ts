import { api } from '@/api/http';
import type { Folder, CreateFolderInput, UpdateFolderInput } from '@/types/folder';

export async function getFolders(): Promise<Folder[]> {
    return api.get<Folder[]>('/folders');
}

export async function createFolder(data: CreateFolderInput): Promise<Folder> {
    return api.post<Folder>('/folders', data);
}

export async function updateFolder(id: string, data: UpdateFolderInput): Promise<Folder> {
    return api.patch<Folder>(`/folders/${id}`, data);
}

export async function deleteFolder(id: string): Promise<void> {
    return api.delete<void>(`/folders/${id}`);
}