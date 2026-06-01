import type { Task } from '@/types/task';

export const mockTasks: Task[] = [
  { id: 't-1', title: 'Finish Raft README', description: 'Write setup and usage sections', priority: 'high', dueDate: '2026-06-01', dueTime: '17:00', completed: false },
  { id: 't-2', title: 'Read OOP chapter 4', description: 'Inheritance and polymorphism', priority: 'medium', dueDate: '2026-06-01', dueTime: '11:40', completed: false },
  { id: 't-3', title: 'Water the plants', description: 'Kitchen and balcony', priority: 'low', dueDate: '2026-06-01', dueTime: '13:30', completed: false },
  { id: 't-4', title: 'Submit lab report', description: 'Upload PDF to the portal', priority: 'high', dueDate: '2026-06-02', dueTime: '23:59', completed: false },
  { id: 't-5', title: 'Buy groceries', description: 'Milk, eggs, coffee', priority: 'low', dueDate: '2026-05-31', completed: true },
  { id: 't-6', title: 'Morning standup notes', description: 'Share blockers with the team', priority: 'medium', dueDate: '2026-06-01', dueTime: '08:00', completed: false },
];
