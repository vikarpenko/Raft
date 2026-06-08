import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkspaces } from '@/api/workspaces';
import { WorkspaceCard } from '@/components/workspace/WorkspaceCard';
import { Icon } from '@/lib/icons';
import type { Workspace } from '@/types/workspace';
import './SpacesWidget.css';

const MAX = 3;

export function SpacesWidget() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getWorkspaces()
      .then((all) => {
        if (active) setWorkspaces(all);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const recent = [...workspaces].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, MAX);

  return (
    <section className="dash-spaces">
      <header className="dash-spaces__head">
        <h2 className="dash-spaces__title">Spaces</h2>
        <button
          type="button"
          className="dash-spaces__add"
          onClick={() => navigate('/spaces')}
          aria-label="New space"
        >
          <Icon name="plus" size={20} />
        </button>
      </header>

      {loading ? (
        <p className="dash-spaces__muted">Loading&hellip;</p>
      ) : error ? (
        <p className="dash-spaces__muted">Couldn&rsquo;t load spaces.</p>
      ) : recent.length === 0 ? (
        <p className="dash-spaces__muted">No spaces yet.</p>
      ) : (
        <div className="dash-spaces__grid">
          {recent.map((ws) => (
            <WorkspaceCard key={ws.id} workspace={ws} onOpen={(id) => navigate(`/spaces/${id}`)} />
          ))}
        </div>
      )}
    </section>
  );
}
