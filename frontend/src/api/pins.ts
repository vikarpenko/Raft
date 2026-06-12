import { api } from '@/api/http';
import type { PinItem } from '@/types/pin';

export async function getPins(): Promise<PinItem[]> {
    return api.get<PinItem[]>('/pins');
}

export async function createPin(data: {
    noteId?: string;
    imageUrl?: string;
    title?: string;
    text?: string;
    x: number;
    y: number;
    rotate: number;
}): Promise<PinItem> {
    return api.post<PinItem>('/pins', data);
}

export async function updatePinPosition(id: string, x: number, y: number, rotate: number): Promise<PinItem> {
    return api.patch<PinItem>(`/pins/${id}`, { x, y, rotate });
}

export async function deletePin(id: string): Promise<void> {
    return api.delete<void>(`/pins/${id}`);
}