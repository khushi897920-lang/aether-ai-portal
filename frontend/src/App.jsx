import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layout shell component
import MainLayout from './components/layout/MainLayout';

// View Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

// Global styling baseline
import './App.css';

import ErrorBoundary from './components/common/ErrorBoundary';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Paths: Unauthenticated Split screens */}
          <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
          <Route path="/register" element={<ErrorBoundary><Register /></ErrorBoundary>} />

          {/* Standalone Protected Path: Bypasses MainLayout for a true fullscreen dialog */}
          <Route path="/logout" element={<ProtectedRoute><ErrorBoundary><Logout /></ErrorBoundary></ProtectedRoute>} />

          {/* Protected Nested Corporate Frames: Wrapped inside MainLayout grid shell */}
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            {/* Dashboard metrics view */}
            <Route index element={<Dashboard />} />
            
            {/* Employees governance table ledger */}
            <Route path="employees" element={<Employees />} />
            
            {/* Account settings panel */}
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Catch-all node redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
