import { useState } from 'react';
import { useAuth } from '@/auth/AuthContext';

/** Gives the current user (from auth) and an action to update the profile. */
export function useProfile() {
    const { user, updateUser } = useAuth();
    const [saving] = useState(false);
    const [error] = useState<string | null>(null);

    return { user, saving, error, updateUser };
}
