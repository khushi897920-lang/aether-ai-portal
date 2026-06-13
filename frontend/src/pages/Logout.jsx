import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LightWave from '../components/canvas/LightWave';
import { Lock } from 'lucide-react';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session token from state and localStorage defensively
    try {
      if (typeof logout === 'function') {
        logout();
      }
    } catch (error) {
      console.warn("AuthContext logout handler exception:", error);
    }
    navigate('/login');
  };

  const handleCancel = () => {
    // Return back to secure dashboard
    navigate('/');
  };

  return (
    <div className="w-screen h-screen relative flex items-center justify-center p-6 bg-[#f8fafc] overflow-hidden select-none">
      {/* 1. Light-mode Three.js animated particle wave background */}
      <LightWave />

      {/* Top-Left Logo Branding matching image_103cd9.jpg */}
      {/* Top-Left Logo Branding */}
      <div className="absolute top-8 left-8 z-10 text-left">
        <h2 className="font-sans font-bold tracking-tight text-xl text-void-950">Aether AI</h2>
        <span className="font-mono uppercase text-[10px] tracking-[0.15em] opacity-60 block mt-0.5 text-void-950">
          Enterprise Portal
        </span>
      </div>

      {/* 2. Center Prompt Card aligned perfectly in the viewport (z-10) */}
      <div className="aether-card w-full max-w-[440px] p-10 text-center relative z-10 bg-white">
        
        {/* Upper Icon Header matching image_103cd9.jpg green circle and lock */}
        <div className="w-20 h-20 bg-[#e6f4ea] text-forest-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Lock className="w-8 h-8 text-forest-800" />
        </div>

        {/* Dialog Typography using custom Display heading */}
        <h2 className="text-2xl font-display font-medium tracking-tight text-void-950 leading-tight">
          Are you sure you want to logout?
        </h2>
        <p className="text-xs text-void-700/50 mt-4 leading-relaxed max-w-xs mx-auto font-sans">
          You will be securely logged out of the Aether AI Enterprise Portal.
        </p>

        {/* Action Button Controls */}
        <div className="flex items-center gap-4 mt-10">
          {/* Cancel Option */}
          <button
            onClick={handleCancel}
            className="w-1/2 py-3 border border-canvas-200 bg-white hover:bg-canvas-50 rounded-xl text-xs font-semibold text-void-700/80 transition-all cursor-pointer shadow-[0_1px_2px_rgba(9,13,22,0.02)]"
          >
            Cancel
          </button>
          
          {/* Yes, Logout Option */}
          <button
            onClick={handleLogout}
            className="w-1/2 py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
