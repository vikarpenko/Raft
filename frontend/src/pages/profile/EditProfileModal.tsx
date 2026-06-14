import { useState, type FormEvent } from 'react';
import { Modal } from '@/components/common/Modal';
import { updateUser } from '@/api/user';
import type { User, ProfileUpdateRequest } from '@/types/user';

interface Props {
    user: User;
    onClose: () => void;
    onSave: (updated: User) => void;
}

export function EditProfileModal({ user, onClose, onSave }: Props) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [username, setUsername] = useState(user.username);
    const [avatar, setAvatar] = useState(user.avatar ?? '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSaving(true);

        const payload: ProfileUpdateRequest = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            email: email.trim(),
            avatar: avatar.trim() || null,
        };

        try {
            const updated = await updateUser(payload);
            onSave(updated);
            onClose();
        } catch {
            setError('Could not save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const isValid = firstName.trim() && lastName.trim() && username.trim();

    return (
        <Modal onClose={onClose} as="form" onSubmit={handleSubmit}>
            <h2 className="modal__title">Edit profile</h2>

            <label className="modal__field-wrap">
                <span className="modal__label">First name</span>
                <input
                    className="modal__input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={50}
                    autoFocus
                />
            </label>

            <label className="modal__field-wrap">
                <span className="modal__label">Last name</span>
                <input
                    className="modal__input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={50}
                />
            </label>

            <label className="modal__field-wrap">
                <span className="modal__label">Username</span>
                <input
                    className="modal__input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={30}
                />
            </label>

            <label className="modal__field-wrap">
                <span className="modal__label">Email</span>
                <input
                    className="modal__input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label className="modal__field-wrap">
                <span className="modal__label">Avatar URL</span>
                <input
                    className="modal__input"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://…"
                />
            </label>

            {error && <p className="modal__error">{error}</p>}

            <div className="modal__actions">
                <span className="modal__spacer" />
                <button type="button" className="modal__btn modal__btn--ghost" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="modal__btn modal__btn--primary" disabled={!isValid || saving}>
                    {saving ? 'Saving…' : 'Save'}
                </button>
            </div>
        </Modal>
    );
}
