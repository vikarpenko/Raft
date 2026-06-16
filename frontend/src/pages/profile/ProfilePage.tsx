import { useProfile } from '@/hooks/profile/useProfile';
import { AchievementsList } from '@/components/achievements/AchievementsList';
import './ProfilePage.css';
import {useState} from "react";
import {EditProfileModal} from "@/pages/profile/EditProfileModal.tsx";

/** The Profile page: user details with an edit modal, achievements, and account deletion. */
export function ProfilePage() {
    const { user, updateUser } = useProfile();
    const [editOpen, setEditOpen] = useState(false);

    if (!user) return null;

    const initials =
        (user.firstName[0] ?? '').toUpperCase() + (user.lastName[0] ?? '').toUpperCase();

    return (
        <div className="profile">
            <div className="profile-hero">
                <div className="profile-avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="profile-avatar__img" />
                    ) : (
                        <div className="profile-avatar__initials">{initials}</div>
                    )}
                </div>
                <div className="profile-hero__info">
                    <h1 className="profile-hero__name">{user.firstName} {user.lastName}</h1>
                    <p className="profile-hero__username">@{user.username}</p>
                    <p className="profile-hero__email">{user.email}</p>
                </div>
                <button type="button" className="modal__btn modal__btn--primary profile-hero__edit" onClick={() => setEditOpen(true)}>
                    Edit
                </button>
            </div>

            {editOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setEditOpen(false)}
                    onSave={(updated) => updateUser(updated)}
                />
            )}

            <AchievementsList />
        </div>
    );
}
