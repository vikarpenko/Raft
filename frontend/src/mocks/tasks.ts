import type { Task } from '@/types/task';

export const mockTasks: Task[] = [
  { id: 't-1', title: 'Finish Raft README', status: 'in_progress', priority: 'high', dueDate: '2026-06-01' },
  { id: 't-2', title: 'Read OOP chapter 4', status: 'todo', priority: 'medium', dueDate: '2026-06-01' },
  { id: 't-3', title: 'Water the plants', status: 'todo', priority: 'low', dueDate: '2026-06-01' },
  { id: 't-4', title: 'Submit lab report', status: 'todo', priority: 'high', dueDate: '2026-06-02' },
  { id: 't-5', title: 'Buy groceries', status: 'done', priority: 'low', dueDate: '2026-05-31' },
  { id: 't-6', title: 'Morning standup notes', status: 'done', priority: 'medium', dueDate: '2026-06-01' },
];
