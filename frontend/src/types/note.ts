import type {UserSummary} from "@/types/user";
import type {FolderType} from "@/types/folder";

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    folderId: string;
    folderName: string;
    folderType: FolderType;
    creator: UserSummary;
}