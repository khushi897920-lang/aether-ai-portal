import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ErrorBoundary from '../common/ErrorBoundary';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas-50 font-sans text-void-950">
      {/* Sidebar remains locked on the left */}
      <Sidebar />

      {/* Main content frame occupies the remaining space */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar spans across the top of the content panel */}
        <Topbar />

        {/* Scrollable content main section */}
        <main className="flex-1 overflow-y-auto p-8 bg-canvas-50 dark-scrollbar text-left">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
