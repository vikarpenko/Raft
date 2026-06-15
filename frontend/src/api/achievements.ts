import { api } from '@/api/http';
import type { Achievement } from '@/types/achievement';

/** Fetches all achievements with the current user's earned/locked state. */
export async function getAchievements(): Promise<Achievement[]> {
    return api.get<Achievement[]>('/achievements');
}