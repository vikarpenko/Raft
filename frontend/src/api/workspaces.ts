import { api } from '@/api/http';
import type {
  Member,
  MemberRole,
  Workspace,
  WorkspaceColor,
  WorkspaceDetail,
  WorkspaceType,
} from '@/types/workspace';

/** Options for creating a workspace (color, personal/shared, and members to invite). */
export interface CreateWorkspaceInput {
  color?: WorkspaceColor;
  type?: WorkspaceType;
  memberLogins?: string[];
}

/** Lists every workspace the user owns or belongs to. */
export async function getWorkspaces(): Promise<Workspace[]> {
  return api.get<Workspace[]>('/workspaces');
}

/** Creates a workspace with the given name and options. */
export async function createWorkspace(name: string, input?: CreateWorkspaceInput): Promise<Workspace> {
  return api.post<Workspace>('/workspaces', { name, ...input });
}

/** Fetches one workspace with its members and full detail. */
export async function getWorkspace(id: string): Promise<WorkspaceDetail> {
  return api.get<WorkspaceDetail>(`/workspaces/${id}`);
}

/** Updates a workspace's name and/or color. */
export async function updateWorkspace(id: string, input: { name?: string;
                                                           color?: WorkspaceColor },): Promise<Workspace> {
  return api.patch<Workspace>(`/workspaces/${id}`, input);
}

/** Deletes a workspace by id (owner only). */
export async function deleteWorkspace(id: string): Promise<void> {
  await api.delete<void>(`/workspaces/${id}`);
}

/** Adds a member by login; the backend notifies them they were added. */
export async function addMember(id: string, login: string, role?: MemberRole): Promise<Member> {
  return api.post<Member>(`/workspaces/${id}/members`, { login, role });
}

/** Removes a member from a workspace (admin only). */
export async function removeMember(id: string, userId: string): Promise<void> {
  await api.delete<void>(`/workspaces/${id}/members/${userId}`);
}

/** Leaves a workspace the current user is a member of. */
export async function leaveWorkspace(id: string): Promise<void> {
  await api.delete<void>(`/workspaces/${id}/members/me`);
}
