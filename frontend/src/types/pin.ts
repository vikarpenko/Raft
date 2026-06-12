export interface PinItem {
    id: string;
    type: 'note' | 'image';
    noteId?: string;
    imageUrl?: string;
    title?: string;
    text?: string;
    x: number;
    y: number;
    rotate: number;
}