import { api } from '@/api/http';
import type { PinItem, CreatePinInput, UpdatePinPositionInput } from '@/types/pin';

/** Fetches the items pinned to the user's pinboard. */
export async function getPins(): Promise<PinItem[]> {
    return api.get<PinItem[]>('/pins');
}

/** Pins an item (e.g. a note) to the board. */
export async function createPin(data: CreatePinInput): Promise<PinItem> {
    return api.post<PinItem>('/pins', data);
}

/** Updates a pin's position on the board (after drag). */
export async function updatePinPosition(id: string, data: UpdatePinPositionInput): Promise<PinItem> {
    return api.patch<PinItem>(`/pins/${id}`, data);
}

/** Removes a pin by id. */
export async function deletePin(id: string): Promise<void> {
    return api.delete<void>(`/pins/${id}`);
}
