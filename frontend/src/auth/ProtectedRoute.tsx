import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import '@/pages/auth/AuthPage.css';

/**
 * Route guard for authenticated pages: waits for the session check, then
 * renders the child route if logged in or redirects to `/login` otherwise.
 */
export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading">Loading&hellip;</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
