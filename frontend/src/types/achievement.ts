export interface Achievement {
    id: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedAt?: string;
}
