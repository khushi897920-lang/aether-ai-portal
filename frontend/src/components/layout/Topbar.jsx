import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, ChevronDown, User, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Notification ledger state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_01',
      text: 'Security Alert: Successful root login detected from IP 192.168.1.45',
      type: 'warning',
      timestamp: '10m ago',
      isUnread: true,
    },
    {
      id: 'notif_02',
      text: 'Database Sync: Core MongoDB ledger successfully backed up to cluster',
      type: 'success',
      timestamp: '1h ago',
      isUnread: true,
    },
    {
      id: 'notif_03',
      text: 'System Update: Platform dependencies compiled cleanly in 265ms',
      type: 'info',
      timestamp: '3h ago',
      isUnread: true,
    },
  ]);

  const hasUnread = (notifications ?? []).some((n) => n?.isUnread);

  // Dynamic route-based page title matching visual guidelines
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/employees')) return 'Employees';
    if (path.startsWith('/profile')) return 'Profile Settings';
    if (path.startsWith('/logout')) return 'De-authorization';
    return 'Aether Portal';
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleNotifClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
    setIsNotificationOpen(false);
  };

  return (
    <header className="h-20 bg-white border-b border-canvas-200/60 px-8 flex items-center justify-between select-none shrink-0">
      {/* Left Section: Dynamic Page Title */}
      <div className="text-left">
        <h1 className="text-2xl font-display font-medium tracking-tight text-void-950">
          {getPageTitle()}
        </h1>
      </div>

      {/* Center Section: Global Search Input */}
      <div className="w-[320px] md:w-[400px]">
        <div className="relative border border-canvas-200 rounded-xl bg-canvas-50/50 focus-within:bg-white focus-within:border-forest-800 focus-within:ring-4 focus-within:ring-forest-800/5 transition-all duration-200">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-void-700/40" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs font-sans text-void-950 placeholder-void-700/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section: Notification & Profile Widget */}
      <div className="flex items-center space-x-5">
        {/* Notifications Container */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsDropdownOpen(false);
            }}
            className="p-2.5 text-void-750/70 hover:text-void-950 hover:bg-canvas-100 rounded-xl transition-all relative cursor-pointer hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-800/10"
            aria-expanded={isNotificationOpen}
            aria-haspopup="true"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>
            )}
          </button>

          {/* Floating Notification Panel Dropdown Card */}
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="absolute right-0 mt-3 w-80 z-50 bg-white border border-gray-200 rounded-[2px] p-3 flex flex-col shadow-none"
              >
                {/* Header segment */}
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-100 select-none">
                  <h3 className="text-xs font-sans font-bold tracking-wider text-void-950 uppercase">
                    System Notifications
                  </h3>
                  {hasUnread && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[9px] font-mono font-semibold tracking-wider uppercase text-void-700/40 hover:text-forest-800 transition-colors cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Body segment */}
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-0.5">
                  {(notifications ?? []).map((n) => {
                    let tag = '[SYS]';
                    let color = '#64748b'; // slate-500
                    if (n?.type === 'warning') {
                      tag = '[SEC]';
                      color = '#df6500'; // Warning = #df6500
                    } else if (n?.type === 'success') {
                      tag = '[DB]';
                      color = '#76b900'; // Success = #76b900
                    }

                    return (
                      <button
                        key={n?.id}
                        onClick={() => handleNotifClick(n?.id)}
                        className={`w-full text-left py-2 px-1 transition-all duration-150 cursor-pointer flex items-start space-x-2.5 hover:bg-canvas-50/50 ${
                          n?.isUnread ? 'bg-[#f8fafc]/30 font-medium' : 'opacity-70'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 shrink-0" style={{ backgroundColor: color }}></span>
                              <span className="font-mono text-[9px] font-semibold tracking-wider" style={{ color }}>
                                {tag}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-void-700/40">
                              {n?.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-void-950 font-sans leading-normal">
                            {n?.text}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer segment */}
                <div className="pt-2 mt-2 border-t border-gray-100 select-none text-center">
                  <Link
                    to="/"
                    onClick={() => setIsNotificationOpen(false)}
                    className="inline-block text-xs font-sans font-bold tracking-wider uppercase text-[#054432] hover:text-[#022c22] transition-colors"
                  >
                    View all system logs →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-canvas-200"></div>

        {/* User Profile Widget Container */}
        <div className="relative" ref={dropdownRef}>
          {/* User Profile Trigger Button */}
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center space-x-3 p-1.5 px-2.5 hover:bg-canvas-50 rounded-xl transition-all duration-200 select-none cursor-pointer group focus:outline-none focus:ring-2 focus:ring-forest-800/10"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {/* Avatar Container */}
            <div className="w-9 h-9 rounded-full border border-canvas-200 overflow-hidden shadow-sm shrink-0 flex items-center justify-center bg-[#054432] text-white select-none">
              {user?.avatar || user?.profileImage ? (
                <img 
                  src={user.avatar || user.profileImage} 
                  alt={user.name || 'User Profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-sans font-bold text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'J'}
                </span>
              )}
            </div>
            
            {/* Metadata Block */}
            <div className="text-left hidden sm:block">
              <h4 className="text-xs font-semibold text-void-950 group-hover:text-forest-800 transition-colors leading-tight">
                {user?.name || 'Jane Cooper'}
              </h4>
              <p className="text-[10px] font-sans font-medium text-void-700/40 mt-0.5 leading-none">
                {user?.role || 'Admin'}
              </p>
            </div>
            
            <ChevronDown 
              className={`w-3.5 h-3.5 text-void-700/40 group-hover:text-void-950 transition-transform duration-300 ease-in-out shrink-0 ${
                isDropdownOpen ? 'rotate-180 text-void-950' : ''
              }`} 
            />
          </button>

          {/* Floating Profile Dropdown Card Component */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="aether-card absolute right-0 mt-2 w-48 z-50 p-1 flex flex-col"
              >
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2.5 text-xs font-medium text-void-750 hover:text-forest-800 hover:bg-canvas-50 rounded-lg transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-void-700/60" />
                  <span>Profile Settings</span>
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2.5 text-xs font-medium text-void-750 hover:text-forest-800 hover:bg-canvas-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-void-700/60" />
                  <span>System Dashboard</span>
                </Link>

                <div className="border-t border-gray-100 my-1"></div>

                <Link
                  to="/logout"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50/60 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
