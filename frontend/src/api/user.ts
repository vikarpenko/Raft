import { api } from '@/api/http';
import type { User, ProfileUpdateRequest } from '@/types/user';

/** Fetches the currently logged-in user's profile. */
export async function getUser(): Promise<User> {
  return api.get<User>('/users/me');
}

/** Searches users by name/username (used when inviting members). */
export async function searchUsers(q: string): Promise<User[]> {
  return api.get<User[]>(`/users/search?q=${encodeURIComponent(q)}`);
}

/** Updates the current user's profile (name, avatar, etc.). */
export async function updateUser(data: ProfileUpdateRequest): Promise<User> {
  return api.put<User>('/users/me', data);
}
