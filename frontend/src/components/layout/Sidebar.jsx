import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, User, LogOut, Shield } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Logout', path: '/logout', icon: LogOut },
  ];

  return (
    <aside className="w-64 bg-void-950 text-white h-screen flex flex-col justify-between border-r border-white/5 select-none shrink-0">
      <div>
        {/* Brand Header Section */}
        <div className="h-20 flex flex-col justify-center px-6 border-b border-white/5 text-left">
          <h2 className="font-sans font-bold tracking-tight text-xl text-white">Aether AI</h2>
          <span className="font-mono uppercase text-[10px] tracking-[0.15em] opacity-60 block mt-0.5">
            Enterprise Portal
          </span>
        </div>

        {/* Navigation Menu List */}
        <nav className="px-4 py-6 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Check if active: '/' exact match, others by prefix
            const isActive = item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={
                  `flex items-center align-middle gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-250 ${
                    isActive
                      ? 'bg-forest-800 text-white shadow-[0_4px_12px_rgba(5,68,50,0.2)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Absolute Bottom Brand Shield Footer */}
      <div className="p-4 space-y-4 border-t border-white/5">
        {/* Shield Quality Badge */}
        <div className="flex items-center space-x-3 bg-[#03050a]/40 border border-white/10 rounded-xl p-3">
          <div className="p-1.5 bg-forest-800/20 text-forest-700 rounded-lg border border-forest-800/10">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-left">
            <h4 className="text-[10px] font-bold text-white font-sans">Secure. Intelligent.</h4>
            <p className="text-[8px] text-white/40 font-semibold font-sans mt-0.5">Built For Scale.</p>
          </div>
        </div>

        {/* Copyright notice */}
        <p className="text-[9px] text-white/30 text-center font-sans">
          © 2026 Aether AI
        </p>
      </div>
    </aside>
  );
}
