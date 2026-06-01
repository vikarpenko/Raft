import type { Task } from '@/types/task';
import { mockTasks } from '@/mocks/tasks';

let store: Task[] = mockTasks.map((task) => ({ ...task }));

export async function getTasks(): Promise<Task[]> {
  return Promise.resolve(store.map((task) => ({ ...task })));
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  store = store.map((task) => (task.id === id ? { ...task, ...patch } : task));
  const updated = store.find((task) => task.id === id);
  if (!updated) throw new Error(`Task ${id} not found`);
  return { ...updated };
}
