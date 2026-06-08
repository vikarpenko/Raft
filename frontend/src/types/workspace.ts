export type WorkspaceType = 'PERSONAL' | 'SHARED';
export type MemberRole = 'ADMIN' | 'MEMBER';
export type WorkspaceColor =
  | 'RED' | 'ORANGE' | 'AMBER' | 'YELLOW' | 'GREEN' | 'TEAL'
  | 'BLUE' | 'SKY' | 'INDIGO' | 'VIOLET' | 'PINK' | 'ROSE' | 'GRAY';

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  color: WorkspaceColor | null;
  role: MemberRole;
  memberCount?: number;
}

export interface Member {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: MemberRole;
}

export interface WorkspaceDetail extends Workspace {
  members: Member[];
}
