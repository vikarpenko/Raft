export type NotificationType = 'REMINDER' | 'ACHIEVEMENT' | 'SYSTEM';

/** An inbox notification (reminder fired, achievement earned, system message). */
export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    sourceId?: string;
    read: boolean;
    createdAt: string;
}