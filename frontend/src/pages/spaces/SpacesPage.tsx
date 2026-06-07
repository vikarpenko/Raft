import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/lib/icons';
import { ApiError } from '@/api/http';
import { createWorkspace, getWorkspaces } from '@/api/workspaces';
import { colorHex, WORKSPACE_COLOR_NAMES } from '@/lib/workspaceColors';
import type { Workspace, WorkspaceColor } from '@/types/workspace';
import './SpacesPage.css';

function errorMessage(err: unknown): string {
  return err instanceof ApiError ? err.message : 'Something went wrong. Try again.';
}

export function SpacesPage() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState<WorkspaceColor>('ROSE');
  const [error, setError] = useState('');

  useEffect(() => {
    getWorkspaces().then((all) => {
      setWorkspaces(all);
      setLoading(false);
    });
  }, []);

  const open = (id: string) => navigate(`/spaces/${id}`);

  const create = async (event: FormEvent) => {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;
    try {
      const ws = await createWorkspace(name, newColor);
      setCreateOpen(false);
      setNewName('');
      setNewColor('ROSE');
      setError('');
      navigate(`/spaces/${ws.id}`);
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const filtered = search.trim()
    ? workspaces.filter((w) => w.name.toLowerCase().includes(search.trim().toLowerCase()))
    : workspaces;

  return (
    <div className="spaces">
      <header className="spaces__head">
        <div className="spaces__search">
          <Icon name="search" size={16} />
          <input
            type="search"
            placeholder="Search spaces"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button type="button" className="spaces__add" onClick={() => setCreateOpen(true)} aria-label="New space">
          <Icon name="plus" size={22} />
        </button>
      </header>

      {loading ? (
        <p className="spaces__muted">Loading&hellip;</p>
      ) : workspaces.length === 0 ? (
        <p className="spaces__muted">No spaces yet — create your first one.</p>
      ) : filtered.length === 0 ? (
        <p className="spaces__muted">No spaces match your search.</p>
      ) : (
        <div className="spaces__grid">
          {filtered.map((ws) => (
            <div
              key={ws.id}
              className="scard"
              role="button"
              tabIndex={0}
              onClick={() => open(ws.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') open(ws.id);
              }}
            >
              <div className="scard__banner" style={{ background: colorHex(ws.color) }}>
                <span className="scard__chip">{ws.type === 'SHARED' ? 'Shared' : 'Personal'}</span>
              </div>
              <div className="scard__body">
                <div className="scard__row">
                  <span className="scard__name">{ws.name}</span>
                  <span className="scard__role" data-role={ws.role}>
                    {ws.role === 'ADMIN' ? 'Admin' : 'Member'}
                  </span>
                </div>
                <p className="scard__hint">Open space</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {createOpen && (
        <div className="smodal" role="dialog" aria-modal="true">
          <div className="smodal__scrim" onClick={() => setCreateOpen(false)} />
          <form className="smodal__card" onSubmit={create}>
            <h2 className="smodal__title">New space</h2>
            {error && <div className="smodal__error">{error}</div>}
            <input
              className="smodal__input"
              placeholder="Space name"
              maxLength={100}
              autoFocus
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
            <div className="smodal__swatches">
              {WORKSPACE_COLOR_NAMES.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="smodal__swatch"
                  data-active={newColor === color}
                  style={{ background: colorHex(color) }}
                  aria-label={color}
                  title={color}
                  onClick={() => setNewColor(color)}
                />
              ))}
            </div>
            <div className="smodal__actions">
              <button type="button" className="smodal__btn smodal__btn--ghost" onClick={() => setCreateOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="smodal__btn smodal__btn--primary" disabled={!newName.trim()}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
