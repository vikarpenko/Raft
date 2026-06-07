import { api } from '@/api/http';
import type { Task } from '@/types/task';

export async function getTasks(): Promise<Task[]> {
  return api.get<Task[]>('/tasks');
}

export async function createTask(input: Omit<Task, 'id'>): Promise<Task> {
  return api.post<Task>('/tasks', {
    title: input.title,
    description: input.description,
    priority: input.priority,
    dueDate: input.dueDate,
    dueTime: input.dueTime,
    status: input.status,
    workspaceId: input.workspaceId ? Number(input.workspaceId) : null,
  });
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  return api.patch<Task>(`/tasks/${id}`, {
    title: patch.title,
    description: patch.description,
    priority: patch.priority,
    dueDate: patch.dueDate,
    dueTime: patch.dueTime,
    status: patch.status,
  });
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete<void>(`/tasks/${id}`);
}
