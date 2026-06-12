import { api } from '@/api/http';
import type { Folder } from '@/types/folder';

export async function getFolders(): Promise<Folder[]> {
    return api.get<Folder[]>('/folders');
}

export async function createFolder(data: {
    name: string;
    type: 'PERSONAL' | 'SHARED';
    workspaceId: string;
}): Promise<Folder> {
    return api.post<Folder>('/folders', data);
}

export async function updateFolder(id: string, data: { name?: string }): Promise<Folder> {
    return api.patch<Folder>(`/folders/${id}`, data);
}

export async function deleteFolder(id: string): Promise<void> {
    return api.delete<void>(`/folders/${id}`);
}