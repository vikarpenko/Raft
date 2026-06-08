import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/lib/icons';
import { getWorkspace } from '@/api/workspaces';
import { colorHex } from '@/lib/workspaceColors';
import type { WorkspaceDetail } from '@/types/workspace';
import './WorkspacePage.css';

export function WorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<WorkspaceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let active = true;
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

  return (
    <div className="wpage">
      {back}

      <header className="wpage__head">
        <span className="wpage__dot" style={{ background: colorHex(detail.color) }} />
        <h1 className="wpage__title">{detail.name}</h1>
      </header>
    </div>
  );
}
