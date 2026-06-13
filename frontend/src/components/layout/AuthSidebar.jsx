import { useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function AuthSidebar() {
  const location = useLocation();
  const isRegister = location.pathname.includes('/register');

  const title = isRegister 
    ? 'Aether AI\nEnterprise Portal' 
    : 'Aether AI\nEnterprise Portal';

  const headingText = isRegister
    ? 'Join'
    : 'Welcome to';

  const description = isRegister
    ? 'Create your account to access organizational intelligence and enterprise operations.'
    : 'Secure access to organizational infrastructure, workforce intelligence, and enterprise operations.';

  return (
    <div className="h-full flex flex-col justify-between relative z-10 text-left select-none">
      {/* Brand Header */}
      <div>
        <h2 className="font-sans font-bold tracking-tight text-xl text-white">Aether AI</h2>
        <span className="font-mono uppercase text-[10px] tracking-[0.15em] opacity-60 block mt-0.5">
          Enterprise Portal
        </span>
      </div>

      {/* Hero Welcome / Copy */}
      <div className="my-auto max-w-sm">
        <span className="text-white/80 font-display text-3xl font-normal block leading-tight tracking-tight">
          {headingText}
        </span>
        <h1 className="text-white font-display text-4xl font-medium leading-tight mt-1 mb-5 tracking-tight">
          {title}
        </h1>
        <p className="text-white/50 font-sans text-xs leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer Info & Badges */}
      <div className="space-y-6">
        {/* Shield Quality Badge */}
        <div className="inline-flex items-center space-x-3.5 bg-[#03050a]/40 border border-white/10 rounded-xl px-4 py-3 max-w-xs">
          <div className="p-1.5 bg-forest-800/20 text-forest-700 rounded-lg border border-forest-800/10">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white font-sans">Secure. Intelligent.</h4>
            <p className="text-[9px] text-white/40 font-semibold font-sans mt-0.5">Built for Scale.</p>
          </div>
        </div>

        {/* Copyright notice */}
        <p className="text-[10px] text-white/30 font-sans">
          © 2026 Aether AI
        </p>
      </div>
    </div>
  );
}
