import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '@/lib/icons';
import { useAuth } from '@/auth/AuthContext';
import { deleteWorkspace, getWorkspace, updateWorkspace } from '@/api/workspaces';
import { WorkspaceTasks } from './WorkspaceTasks';
import { WorkspaceMembers } from './WorkspaceMembers';
import { colorHex, WORKSPACE_COLOR_NAMES } from '@/lib/workspaceColors';
import type { Member, WorkspaceColor, WorkspaceDetail } from '@/types/workspace';
import './WorkspacePage.css';

function colorLabel(color: WorkspaceColor | null): string {
  if (!color) return '—';
  return color.charAt(0) + color.slice(1).toLowerCase();
}

export function WorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [detail, setDetail] = useState<WorkspaceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState<WorkspaceColor>('ROSE');
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    getWorkspace(id)
      .then((d) => {
        if (active) setDetail(d);
      })
      .catch(() => {
        if (active) setDetail(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (searchParams.get('edit') === '1' && detail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInfoOpen(true);
      setEditing(false);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, detail, setSearchParams]);

  const startEdit = () => {
    if (!detail) return;
    setEditName(detail.name);
    setEditColor(detail.color ?? 'ROSE');
    setEditing(true);
  };

  const closeModal = () => {
    setInfoOpen(false);
    setEditing(false);
  };

  const saveEdit = async (event: FormEvent) => {
    event.preventDefault();
    if (!detail) return;
    const name = editName.trim();
    if (!name) return;
    const updated = await updateWorkspace(detail.id, { name, color: editColor });
    setDetail({ ...detail, name: updated.name, color: updated.color });
    window.dispatchEvent(
      new CustomEvent('workspace-updated', {
        detail: { id: detail.id, name: updated.name, color: updated.color },
      }),
    );
    closeModal();
  };

  const confirmDelete = async () => {
    if (!detail) return;
    await deleteWorkspace(detail.id);
    navigate('/spaces');
  };

  const back = (
    <button type="button" className="wpage__back" onClick={() => navigate('/spaces')}>
      <Icon name="chevron-left" size={18} />
      Spaces
    </button>
  );

  if (loading) {
    return (
      <div className="wpage">
        {back}
        <p className="wpage__muted">Loading&hellip;</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="wpage">
        {back}
        <p className="wpage__muted">Space not found.</p>
      </div>
    );
  }

  const isAdmin = detail.role === 'ADMIN';
  const canManage = isAdmin && detail.type === 'SHARED';

  return (
    <div className="wpage">
      <div className="wpage__top">{back}</div>

      <div className="wpage__columns" data-single={detail.type !== 'SHARED'}>
        <WorkspaceTasks workspaceId={detail.id} detail={detail} currentUserId={user?.id} />

        {detail.type === 'SHARED' && (
          <aside className="wpage__side">
            <WorkspaceMembers
              workspaceId={detail.id}
              members={detail.members}
              canManage={canManage}
              currentUserId={user?.id}
              onChange={(members: Member[]) => setDetail({ ...detail, members })}
            />
          </aside>
        )}
      </div>

      {infoOpen && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal__scrim" onClick={closeModal} />
          {editing ? (
          <form className="modal__card" onSubmit={saveEdit}>
            <h2 className="modal__title">Edit space</h2>
            <label className="modal__field">
              <span>Name</span>
              <input
                className="modal__input"
                placeholder="Space name"
                maxLength={100}
                autoFocus
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
              />
              <span className="modal__counter">{editName.length}/100</span>
            </label>
            <div className="modal__field">
              <span>Color</span>
              <div className="modal__swatches">
                {WORKSPACE_COLOR_NAMES.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="modal__swatch"
                    data-active={editColor === color}
                    style={{ background: colorHex(color) }}
                    aria-label={color}
                    title={color}
                    onClick={() => setEditColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="modal__actions">
              {detail.type === 'SHARED' && (
                <button
                  type="button"
                  className="modal__btn modal__btn--danger"
                  onClick={() => {
                    closeModal();
                    setDeleteOpen(true);
                  }}
                >
                  Delete
                </button>
              )}
              <span className="modal__spacer" />
              <button type="button" className="modal__btn modal__btn--ghost" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="modal__btn modal__btn--primary" disabled={!editName.trim()}>
                Save
              </button>
            </div>
          </form>
          ) : (
          <div className="modal__card">
            <h2 className="modal__title modal__title--clamp">{detail.name}</h2>
            <div className="modal__view">
              <div className="modal__view-row">
                <span>Type</span>
                <b>{detail.type === 'PERSONAL' ? 'Private' : 'Shared'}</b>
              </div>
              <div className="modal__view-row">
                <span>Color</span>
                <b className="modal__view-color">
                  <span className="modal__view-dot" style={{ background: colorHex(detail.color) }} />
                  {colorLabel(detail.color)}
                </b>
              </div>
              {detail.type === 'SHARED' && (
                <div className="modal__view-row">
                  <span>Members</span>
                  <b>{detail.members.length}</b>
                </div>
              )}
              {detail.created && (
                <div className="modal__view-row">
                  <span>Created</span>
                  <b>
                    {new Date(detail.created).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </b>
                </div>
              )}
            </div>
            <div className="modal__actions">
              {isAdmin && detail.type === 'SHARED' && (
                <button
                  type="button"
                  className="modal__btn modal__btn--danger"
                  onClick={() => {
                    closeModal();
                    setDeleteOpen(true);
                  }}
                >
                  Delete
                </button>
              )}
              <span className="modal__spacer" />
              <button type="button" className="modal__btn modal__btn--ghost" onClick={closeModal}>
                Close
              </button>
              {isAdmin && (
                <button type="button" className="modal__btn modal__btn--primary" onClick={startEdit}>
                  Edit
                </button>
              )}
            </div>
          </div>
          )}
        </div>
      )}

      {deleteOpen && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal__scrim" onClick={() => setDeleteOpen(false)} />
          <div className="modal__card modal__card--confirm">
            <h2 className="modal__title">Delete space?</h2>
            <p className="modal__text">
              This permanently deletes &ldquo;{detail.name}&rdquo; and all its tasks. This can&rsquo;t be undone.
            </p>
            <div className="modal__actions">
              <span className="modal__spacer" />
              <button type="button" className="modal__btn modal__btn--ghost" onClick={() => setDeleteOpen(false)}>
                Cancel
              </button>
              <button type="button" className="modal__btn modal__btn--danger-solid" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
