import type { Task } from '@/types/task';

export const mockTasks: Task[] = [
  { id: 't-1', title: 'Finish Raft README', description: 'Write setup and usage sections', priority: 'HIGH', dueDate: '2026-06-01', dueTime: '17:00', status: 'IN_PROGRESS' },
  { id: 't-2', title: 'Read OOP chapter 4', description: 'Inheritance and polymorphism', priority: 'MEDIUM', dueDate: '2026-06-01', dueTime: '11:40', status: 'TODO' },
  { id: 't-3', title: 'Water the plants', description: 'Kitchen and balcony', priority: 'LOW', dueDate: '2026-06-01', dueTime: '13:30', status: 'TODO' },
  { id: 't-4', title: 'Submit lab report', description: 'Upload PDF to the portal', priority: 'HIGH', dueDate: '2026-06-02', dueTime: '23:59', status: 'TODO' },
  { id: 't-5', title: 'Buy groceries', description: 'Milk, eggs, coffee', priority: 'LOW', dueDate: '2026-05-31', status: 'COMPLETED' },
  { id: 't-6', title: 'Morning standup notes', description: 'Share blockers with the team', priority: 'MEDIUM', dueDate: '2026-06-01', dueTime: '08:00', status: 'TODO' },
];
