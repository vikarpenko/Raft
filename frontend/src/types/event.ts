import type { WorkspaceColor } from '@/types/workspace';

/** A calendar event with a start/end time, belonging to a workspace. */
export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  workspaceId?: string;
  workspaceName?: string;
  workspaceColor?: WorkspaceColor | null;
}
