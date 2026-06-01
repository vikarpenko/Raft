export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskState = 'upcoming' | 'overdue' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
  dueTime?: string;
  completed: boolean;
}
