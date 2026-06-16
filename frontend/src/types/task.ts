import type { WorkspaceColor, WorkspaceType } from '@/types/workspace';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskState = 'upcoming' | 'overdue' | 'done';

/** Minimal user info attached to a task (creator/assignee). */
export interface TaskUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

/** A task with its schedule, status, assignment, and the workspace it belongs to. */
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
  dueTime?: string;
  status: TaskStatus;
  workspaceId?: string;
  workspaceName?: string;
  workspaceColor?: WorkspaceColor | null;
  workspaceType?: WorkspaceType;
  created?: string;
  creator?: TaskUser;
  assignee?: TaskUser;
  assigneeId?: string;
}
