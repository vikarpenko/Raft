import type { Task } from '@/types/task';

export const mockTasks: Task[] = [
  { id: 't-1', title: 'Finish Raft README', description: 'Write setup and usage sections', priority: 'HIGH', dueDate: '2026-06-01', dueTime: '17:00', status: 'IN_PROGRESS' },
  { id: 't-2', title: 'Read OOP chapter 4', description: 'Inheritance and polymorphism', priority: 'MEDIUM', dueDate: '2026-06-01', dueTime: '11:40', status: 'TODO' },
  { id: 't-3', title: 'Water the plants', description: 'Kitchen and balcony', priority: 'LOW', dueDate: '2026-06-01', dueTime: '13:30', status: 'TODO' },
  { id: 't-4', title: 'Submit lab report', description: 'Upload PDF to the portal', priority: 'HIGH', dueDate: '2026-06-02', dueTime: '23:59', status: 'TODO' },
  { id: 't-5', title: 'Buy groceries', description: 'Milk, eggs, coffee', priority: 'LOW', dueDate: '2026-05-31', status: 'COMPLETED' },
  { id: 't-6', title: 'Morning standup notes', description: 'Share blockers with the team', priority: 'MEDIUM', dueDate: '2026-06-01', dueTime: '08:00', status: 'TODO' },
  { id: 't-7', title: 'Prepare demo slides', description: 'Sprint review deck', priority: 'HIGH', dueDate: '2026-06-01', dueTime: '16:00', status: 'TODO' },
  { id: 't-8', title: 'Email professor', description: 'Ask about thesis topic', priority: 'MEDIUM', dueDate: '2026-06-01', dueTime: '15:00', status: 'TODO' },
  { id: 't-9', title: 'Gym session', description: 'Leg day', priority: 'LOW', dueDate: '2026-06-01', dueTime: '19:00', status: 'TODO' },
  { id: 't-10', title: 'Call grandma', priority: 'LOW', dueDate: '2026-06-01', status: 'TODO' },
  { id: 't-11', title: 'Team retro meeting', description: 'What went well / what to improve', priority: 'MEDIUM', dueDate: '2026-06-02', dueTime: '10:00', status: 'TODO' },
  { id: 't-12', title: 'Refactor auth module', description: 'Split into smaller services', priority: 'HIGH', dueDate: '2026-06-02', dueTime: '14:00', status: 'TODO' },
  { id: 't-13', title: 'Algorithms exam', description: 'Chapters 1-6', priority: 'HIGH', dueDate: '2026-06-03', dueTime: '09:00', status: 'TODO' },
  { id: 't-14', title: 'Dentist appointment', priority: 'MEDIUM', dueDate: '2026-06-04', dueTime: '14:30', status: 'TODO' },
  { id: 't-15', title: 'Pay rent', description: 'Transfer to landlord', priority: 'HIGH', dueDate: '2026-06-05', status: 'TODO' },
  { id: 't-16', title: 'Finish lab 3', description: 'Linked lists', priority: 'MEDIUM', dueDate: '2026-05-30', dueTime: '12:00', status: 'COMPLETED' },
  { id: 't-17', title: 'Book train tickets', priority: 'LOW', dueDate: '2026-05-29', status: 'COMPLETED' },
];
