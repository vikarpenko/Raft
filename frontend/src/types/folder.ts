import type { WorkspaceColor, WorkspaceType } from '@/types/workspace';
import type {UserSummary} from "@/types/user";
export type FolderType = 'PERSONAL' | 'SHARED';

export interface Folder {
    id: string;
    name: string;
    folderType: FolderType;
    created: string;
    workspaceId: string;
    workspaceName: string;
    workspaceColor?: WorkspaceColor | null;
    workspaceType: WorkspaceType;
    owner: UserSummary;
    canEdit: boolean;
}

export type CreateFolderInput = {
    name: string;
    type: FolderType;
    workspaceId: string;
};

export type UpdateFolderInput = {
    name?: string;
};