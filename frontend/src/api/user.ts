import type { User } from '@/types/user';
import { mockUser } from '@/mocks/user';

export async function getUser(): Promise<User> {
  return Promise.resolve(mockUser);
}
