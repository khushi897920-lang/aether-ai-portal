import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthSidebar from '../components/layout/AuthSidebar';
import { Eye, EyeOff, Globe, Shield } from 'lucide-react';
import NeuralWave from '../components/canvas/NeuralWave';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please provide email and password.');
      setIsLoading(false);
      return;
    }

    try {
      if (typeof login === 'function') {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoAdmin = () => {
    setEmail('admin@aether.ai');
    setPassword('demo-admin-pass');
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-void-950 font-sans relative select-none">
      {/* Left panel split */}
      <div className="hidden lg:flex lg:w-1/2 bg-void-950 text-white p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
        {/* Animated wave mesh mesh */}
        <NeuralWave />
        <AuthSidebar />
      </div>

      {/* Right form split screen - Centered via flex items-center justify-center */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8 relative bg-[#f8fafc]">
        {/* Top Right Language Selector */}
        <div className="absolute top-6 right-8 flex items-center space-x-1.5 cursor-pointer text-void-700/60 hover:text-void-950 transition-colors">
          <Globe className="w-4 h-4 text-void-700/40" />
          <span className="text-xs font-semibold">English</span>
          <span className="text-[10px] text-void-700/40">▼</span>
        </div>

        {/* Login form Card container */}
        <div className="w-full max-w-[440px] bg-white p-10 rounded-2xl border border-canvas-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] text-left z-10">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-medium tracking-tight text-void-950">Sign in to your account</h2>
            <p className="text-xs text-void-700/50 mt-1.5 font-sans leading-relaxed">
              Enter your credentials to access the Aether AI Enterprise Portal.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-650"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-void-900 mb-1.5">Email</label>
              <input
                type="email"
                value={email ?? ''}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="aether-input"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-void-900 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password ?? ''}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="aether-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-void-700/40 hover:text-void-950 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-canvas-200 text-forest-800 focus:ring-forest-800/10 cursor-pointer"
                />
                <span className="ml-2 text-void-700/60 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-xs text-forest-850 hover:text-forest-900 font-semibold transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-center space-x-2 mt-2 shadow-[0_1px_2px_0_rgba(9,13,22,0.05)] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-canvas-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-[10px] font-bold text-void-700/30 font-sans">or</span>
            </div>
          </div>

          {/* SSO Button */}
          <button
            type="button"
            onClick={loadDemoAdmin}
            className="w-full py-2.5 bg-white hover:bg-canvas-50 border border-canvas-200 rounded-xl text-xs font-semibold text-void-700/80 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(9,13,22,0.02)]"
          >
            <Shield className="w-3.5 h-3.5 text-void-700/40" />
            <span>Sign in with SSO</span>
          </button>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-void-700/60 font-sans">
              Don't have an account?{' '}
              <Link to="/register" className="text-forest-750 hover:text-forest-900 font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
