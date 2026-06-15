import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { clearToken, getToken, setToken } from '@/api/http';
import * as authApi from '@/api/auth';
import { getUser } from '@/api/user';
import type { RegisterInput } from '@/api/auth';
import type { User } from '@/types/user';

/** Auth state and actions exposed through {@link useAuth}. */
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  updateUser: (updated: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Holds the logged-in user and auth actions for the whole app.
 *
 * On mount it restores the session: if a token exists it fetches the user,
 * clearing the token if that fails (expired/invalid). `loading` stays true
 * until this check finishes, so the app can avoid flashing the login screen.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    let active = true;
    getUser()
      .then((u) => {
        if (active) setUser(u);
      })
      .catch(() => {
        clearToken();
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = async (loginValue: string, password: string) => {
    const res = await authApi.login(loginValue, password);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (input: RegisterInput) => {
    const res = await authApi.register(input);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const updateUser = (updated: User) => setUser(updated);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Accesses the auth context; throws if used outside an {@link AuthProvider}. */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
