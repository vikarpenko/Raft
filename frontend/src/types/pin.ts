export type PinType = 'note' | 'image';

export interface PinItem {
    id: string;
    type: PinType;
    noteId?: string;
    imageUrl?: string;
    title?: string;
    text?: string;
    x: number;
    y: number;
    rotate: number;
}

export type CreatePinInput =
    | { noteId: string; x: number; y: number; rotate: number }
    | { imageUrl: string; title?: string; text?: string; x: number; y: number; rotate: number };

export type UpdatePinPositionInput = { x: number; y: number; rotate: number };