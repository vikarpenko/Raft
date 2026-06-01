import type { Task } from '@/types/task';
import { mockTasks } from '@/mocks/tasks';

export async function getTasks(): Promise<Task[]> {
  return Promise.resolve(mockTasks);
}
