import { api } from '@/api/http';
import type { Member, MemberRole, Workspace, WorkspaceColor, WorkspaceDetail } from '@/types/workspace';

export async function getWorkspaces(): Promise<Workspace[]> {
  return api.get<Workspace[]>('/workspaces');
}

export async function createWorkspace(name: string, color?: WorkspaceColor): Promise<Workspace> {
  return api.post<Workspace>('/workspaces', { name, color });
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
