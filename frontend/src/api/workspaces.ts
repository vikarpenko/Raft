import { api } from '@/api/http';
import type {
  Member,
  MemberRole,
  Workspace,
  WorkspaceColor,
  WorkspaceDetail,
  WorkspaceType,
} from '@/types/workspace';

export interface CreateWorkspaceInput {
  color?: WorkspaceColor;
  type?: WorkspaceType;
  memberEmails?: string[];
}

export async function getWorkspaces(): Promise<Workspace[]> {
  return api.get<Workspace[]>('/workspaces');
}

export async function createWorkspace(name: string, input?: CreateWorkspaceInput): Promise<Workspace> {
  return api.post<Workspace>('/workspaces', { name, ...input });
}

export async function getWorkspace(id: string): Promise<WorkspaceDetail> {
  return api.get<WorkspaceDetail>(`/workspaces/${id}`);
}

export async function addMember(id: string, email: string, role?: MemberRole): Promise<Member> {
  return api.post<Member>(`/workspaces/${id}/members`, { email, role });
}

export async function removeMember(id: string, userId: string): Promise<void> {
  await api.delete<void>(`/workspaces/${id}/members/${userId}`);
}
