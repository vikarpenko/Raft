import type { Task, TaskState } from '@/types/task';

export function todayISO(now: Date = new Date()): string {
  return now.toLocaleDateString('en-CA');
}

export function taskDueAt(task: Task): Date {
  return new Date(`${task.dueDate}T${task.dueTime ?? '23:59'}`);
}

export function getTaskState(task: Task, now: Date = new Date()): TaskState {
  if (task.status === 'COMPLETED') return 'done';
  if (taskDueAt(task).getTime() < now.getTime()) return 'overdue';
  return 'upcoming';
}

export function isDueOn(task: Task, isoDate: string): boolean {
  return task.dueDate === isoDate;
}

export function byDueTime(a: Task, b: Task): number {
  if (a.dueTime && b.dueTime) return a.dueTime.localeCompare(b.dueTime);
  if (a.dueTime) return -1;
  if (b.dueTime) return 1;
  return 0;
}
