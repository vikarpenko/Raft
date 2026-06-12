import { api } from '@/api/http';
import type { PinItem, CreatePinInput, UpdatePinPositionInput } from '@/types/pin';

export async function getPins(): Promise<PinItem[]> {
    return api.get<PinItem[]>('/pins');
}

export async function createPin(data: CreatePinInput): Promise<PinItem> {
    return api.post<PinItem>('/pins', data);
}

export async function updatePinPosition(id: string, data: UpdatePinPositionInput): Promise<PinItem> {
    return api.patch<PinItem>(`/pins/${id}`, data);
}

export async function deletePin(id: string): Promise<void> {
    return api.delete<void>(`/pins/${id}`);
}