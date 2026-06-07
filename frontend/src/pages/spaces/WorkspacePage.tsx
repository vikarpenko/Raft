import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/lib/icons';
import { useAuth } from '@/auth/AuthContext';
import { ApiError } from '@/api/http';
import { addMember, getWorkspace, removeMember } from '@/api/workspaces';
import { colorHex } from '@/lib/workspaceColors';
import type { WorkspaceDetail } from '@/types/workspace';
import './WorkspacePage.css';

function errorMessage(err: unknown): string {
  return err instanceof ApiError ? err.message : 'Something went wrong. Try again.';
}

export function WorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [detail, setDetail] = useState<WorkspaceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [error, setError] = useState('');

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

  const invite = async (event: FormEvent) => {
    event.preventDefault();
    if (!detail) return;
    const email = inviteEmail.trim();
    if (!email) return;
    try {
      const member = await addMember(detail.id, email);
      setDetail({ ...detail, members: [...detail.members, member] });
      setInviteEmail('');
      setError('');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const kick = async (userId: string) => {
    if (!detail) return;
    try {
      await removeMember(detail.id, userId);
      setDetail({ ...detail, members: detail.members.filter((m) => m.userId !== userId) });
      setError('');
    } catch (err) {
      setError(errorMessage(err));
    }
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

  const canManage = detail.role === 'ADMIN' && detail.type === 'SHARED';

  return (
    <div className="wpage">
      {back}

      <div className="wpage__banner" style={{ background: colorHex(detail.color) }}>
        <span className="wpage__chip">{detail.type === 'SHARED' ? 'Shared' : 'Personal'}</span>
      </div>

      <header className="wpage__head">
        <h1 className="wpage__title">{detail.name}</h1>
        <span className="wpage__role" data-role={detail.role}>
          {detail.role === 'ADMIN' ? 'Admin' : 'Member'}
        </span>
      </header>

      {error && <div className="wpage__error">{error}</div>}

      <section className="wpage__card">
        <h2 className="wpage__subtitle">Members ({detail.members.length})</h2>
        <ul className="wpage__members">
          {detail.members.map((member) => {
            const isYou = member.userId === user?.id;
            return (
              <li key={member.id} className="wpage__member">
                <span className="wpage__avatar">
                  {(member.firstName[0] ?? '') + (member.lastName[0] ?? '')}
                </span>
                <div className="wpage__member-info">
                  <span className="wpage__member-name">
                    {member.firstName} {member.lastName}
                    {isYou && <span className="wpage__you"> (you)</span>}
                  </span>
                  <span className="wpage__member-email">{member.email}</span>
                </div>
                <span className="wpage__member-role" data-role={member.role}>
                  {member.role === 'ADMIN' ? 'Admin' : 'Member'}
                </span>
                {canManage && member.role !== 'ADMIN' && (
                  <button
                    type="button"
                    className="wpage__remove"
                    aria-label={`Remove ${member.firstName}`}
                    onClick={() => kick(member.userId)}
                  >
                    <Icon name="close" size={16} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {canManage && (
          <form className="wpage__invite" onSubmit={invite}>
            <input
              type="email"
              placeholder="Invite by email"
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
            />
            <button type="submit" disabled={!inviteEmail.trim()}>
              Add member
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
