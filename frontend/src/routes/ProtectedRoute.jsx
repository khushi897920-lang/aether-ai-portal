import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route protection wrapper. Checks token and user session, redirects to /login if missing.
 * If active, processes nested route outlets.
 */
export default function ProtectedRoute({ children }) {
  const { token, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-50 flex items-center justify-center">
        <div className="relative w-12 h-12">
          {/* Spinner layout */}
          <div className="absolute inset-0 rounded-full border-4 border-forest-800/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-forest-800 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Render children if passed directly, otherwise fall back to <Outlet /> for nested routing
  return children ? children : <Outlet />;
}
