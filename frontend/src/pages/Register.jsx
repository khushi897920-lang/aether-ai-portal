import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthSidebar from '../components/layout/AuthSidebar';
import { Eye, EyeOff, Globe } from 'lucide-react';
import NeuralWave from '../components/canvas/NeuralWave';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      if (typeof register === 'function') {
        await register(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
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

        {/* Register Card container */}
        <div className="w-full max-w-[440px] bg-white p-10 rounded-2xl border border-canvas-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] text-left z-10">
          <div className="mb-5">
            <h2 className="text-2xl font-display font-medium tracking-tight text-void-950">Create your account</h2>
            <p className="text-xs text-void-700/50 mt-1.5 font-sans leading-relaxed">
              Join Aether AI Enterprise Portal.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-650"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-void-900 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name ?? ''}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Cooper"
                className="aether-input"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-void-900 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword ?? ''}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="aether-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-void-700/40 hover:text-void-950 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Password strength indicator bars */}
            <div className="space-y-1.5 pt-1">
              <div className="grid grid-cols-4 gap-1.5">
                <div className="h-1 bg-forest-800 rounded-full"></div>
                <div className="h-1 bg-forest-800 rounded-full"></div>
                <div className="h-1 bg-forest-800 rounded-full"></div>
                <div className="h-1 bg-canvas-200 rounded-full"></div>
              </div>
              <div className="flex justify-end">
                <span className="text-[10px] font-bold text-forest-800 uppercase tracking-wider font-sans">Strong</span>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start text-xs pt-1.5">
              <input
                type="checkbox"
                required
                defaultChecked
                className="h-4 w-4 mt-0.5 rounded border-canvas-200 text-forest-800 focus:ring-forest-800/10 cursor-pointer"
              />
              <span className="ml-2 text-void-700/60 font-medium leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-forest-850 hover:text-forest-900 font-semibold transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-forest-850 hover:text-forest-900 font-semibold transition-colors">Privacy Policy</a>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-center space-x-2 mt-4 cursor-pointer shadow-[0_1px_2px_0_rgba(9,13,22,0.05)]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Login redirection Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-void-700/60 font-sans">
              Already have an account?{' '}
              <Link to="/login" className="text-forest-750 hover:text-forest-900 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
