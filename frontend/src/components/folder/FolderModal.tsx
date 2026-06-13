import {useState, type FormEvent} from 'react';
import type {Folder, FolderType, CreateFolderInput, UpdateFolderInput} from '@/types/folder';
import type {Workspace} from '@/types/workspace';
import '../task/TaskModal.css';

const TYPES: FolderType[] = ['PERSONAL', 'SHARED'];

interface FolderModalProps {
    folder: Folder | null;
    workspaces: Workspace[];
    onClose: () => void;
    onCreate: (input: CreateFolderInput) => Promise<void>;
    onUpdate: (id: string, input: UpdateFolderInput) => Promise<void>;
    onDelete: (id: string) => void;
}

export function FolderModal({folder, workspaces, onClose, onCreate, onUpdate, onDelete}: FolderModalProps) {
    const [name, setName] = useState(folder?.name ?? '');
    const [type, setType] = useState<FolderType>(folder?.folderType ?? 'PERSONAL');
    const [workspaceId, setWorkspaceId] = useState(folder?.workspaceId ?? workspaces[0]?.id ?? '');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed || submitting) return;
        setSubmitting(true);
        try {
            if (folder) {
                await onUpdate(folder.id, {name: trimmed});
            } else {
                await onCreate({name: trimmed, type, workspaceId});
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!folder || !window.confirm('Delete this folder?')) return;
        setSubmitting(true);
        try {
            await onDelete(folder.id);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal__scrim" onClick={onClose}/>
            <form className="modal__card" onSubmit={handleSubmit}>
                <h2 className="modal__title">{folder ? 'Edit folder' : 'New folder'}</h2>

                <input className="modal__input" placeholder="Folder name" value={name}
                       onChange={(e) => setName(e.target.value)}
                       autoFocus/>

                <div className="modal__row">
                    <div className="modal__row">
                        <label className="modal__field">
                            <span>Workspace</span>
                            <select
                                className="modal__select"
                                value={workspaceId}
                                onChange={(e) => setWorkspaceId(e.target.value)}
                            >
                                {workspaces.map((ws) => (
                                    <option key={ws.id} value={ws.id}>{ws.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label className="modal__field">
                        <span>Type</span>
                        <select value={type} onChange={(e) => setType(e.target.value as FolderType)}>
                            {TYPES.map((value) => (
                                <option key={value} value={value}>
                                    {value === 'PERSONAL' ? 'Personal' : 'Shared'}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="modal__actions">
                    {folder && (
                        <button type="button" className="modal__btn modal__btn--danger" onClick={handleDelete}
                                disabled={submitting}>
                            Delete
                        </button>
                    )}
                    <span className="modal__spacer"/>
                    <button type="button" className="modal__btn modal__btn--ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="modal__btn modal__btn--primary" disabled={!name.trim()}>
                        {folder ? 'Save' : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    );
}