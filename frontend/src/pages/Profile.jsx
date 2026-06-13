import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserCheck, 
  Building2, 
  Briefcase, 
  MapPin, 
  Pencil, 
  Eye, 
  EyeOff, 
  Save, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  // Account information edit state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Jane Cooper');
  const [email, setEmail] = useState('jane.cooper@eether.ai');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [department, setDepartment] = useState('Administration');
  const [role, setRole] = useState('System Administrator');

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Status and Validation state
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  // Sync state with global AuthContext user details if available
  useEffect(() => {
    if (user) {
      setName(user.name ?? 'Jane Cooper');
      setEmail(user.email ?? 'jane.cooper@eether.ai');
      setDepartment(user.department ?? 'Administration');
      setRole(user.role ?? 'System Administrator');
    }
  }, [user]);

  // Handle Account info edit save
  const handleSaveAccount = (e) => {
    e.preventDefault();
    setAccountSuccess(false);

    // Save back to context state with defensive checks
    if (typeof updateProfile === 'function') {
      updateProfile({
        name: name ?? '',
        email: email ?? '',
        department: department ?? '',
        role: role ?? ''
      });
    }

    setAccountSuccess(true);
    setIsEditing(false);

    // Fade out notification
    setTimeout(() => setAccountSuccess(false), 4000);
  };

  // Handle password form validation and submission
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    // 4. Form Validation Logic
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill out all password fields.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Confirm Password does not match the New Password.');
      return;
    }

    // Success simulation
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Fade out notification
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        {/* 1. Left Column: Profile Summary Card (30% Width / 3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="aether-card p-6 flex flex-col items-center select-none text-center">
            {/* User profile avatar */}
            <div className="w-28 h-28 rounded-full border border-canvas-200 overflow-hidden shadow-md shrink-0 flex items-center justify-center bg-[#054432] text-white select-none">
              {user?.avatar || user?.profileImage ? (
                <img 
                  src={user.avatar || user.profileImage} 
                  alt={name || 'User Profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-sans font-bold text-5xl">
                  {name ? name.charAt(0).toUpperCase() : 'J'}
                </span>
              )}
            </div>

            {/* User Meta labels */}
            <h2 className="text-xl font-display font-medium tracking-tight text-void-950 mt-5 leading-tight">{name}</h2>
            <p className="text-xs font-mono font-medium text-forest-800 uppercase tracking-wider mt-1">Admin</p>
            <p className="text-[11px] text-void-700/40 mt-1.5 font-sans">{email}</p>

            {/* Bottom Section Data Rows */}
            <div className="w-full border-t border-canvas-200/50 mt-6 pt-5 space-y-4 text-left">
              
              {/* Member Since */}
              <div className="flex space-x-3.5 items-start">
                <div className="p-2 bg-canvas-50 text-void-700/50 rounded-xl border border-canvas-200/40 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase">Member since</p>
                  <p className="text-xs font-semibold text-void-950 font-sans mt-0.5">15 Jan 2024</p>
                </div>
              </div>

              {/* Department */}
              <div className="flex space-x-3.5 items-start">
                <div className="p-2 bg-canvas-50 text-void-700/50 rounded-xl border border-canvas-200/40 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase">Department</p>
                  <p className="text-xs font-semibold text-void-950 font-sans mt-0.5">{department}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex space-x-3.5 items-start">
                <div className="p-2 bg-canvas-50 text-void-700/50 rounded-xl border border-canvas-200/40 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase">Role</p>
                  <p className="text-xs font-semibold text-void-950 font-sans mt-0.5">{role}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex space-x-3.5 items-start">
                <div className="p-2 bg-canvas-50 text-void-700/50 rounded-xl border border-canvas-200/40 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase">Location</p>
                  <p className="text-xs font-semibold text-void-950 font-sans mt-0.5">San Francisco, CA</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Columns: (70% Width / 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 2. Top Right: Account Information Card */}
          <div className="aether-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-display font-medium tracking-normal text-void-950 select-none">
                Account Information
              </h3>
              
              {/* Edit/Save toggle control */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 border border-canvas-200 bg-white rounded-lg text-xs font-semibold text-void-700/80 shadow-[0_1px_2px_0_rgba(9,13,22,0.02)] hover:bg-canvas-50 hover:text-void-950 transition-all cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-void-700/40" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 border border-canvas-200 bg-white rounded-lg text-xs font-semibold text-void-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAccount}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            {accountSuccess && (
              <div className="mb-5 p-3.5 bg-mint-100 border border-mint-800/10 text-mint-800 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-forest-750" />
                <span className="font-semibold">Profile credentials updated successfully!</span>
              </div>
            )}

            {/* Static vs Editable Info Grid */}
            <form onSubmit={handleSaveAccount}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 text-left">
                {/* Full Name */}
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Full Name</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={name ?? ''} 
                      onChange={(e) => setName(e.target.value)} 
                      className="aether-input font-medium py-1.5 px-3"
                    />
                  ) : (
                    <p className="text-xs font-semibold text-void-950 font-sans py-1.5">{name ?? '—'}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Email</p>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={email ?? ''} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="aether-input font-medium py-1.5 px-3"
                    />
                  ) : (
                    <p className="text-xs font-semibold text-void-950 font-sans py-1.5">{email ?? '—'}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Phone</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={phone ?? ''} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="aether-input font-medium py-1.5 px-3"
                    />
                  ) : (
                    <p className="text-xs font-semibold text-void-950 font-sans py-1.5">{phone ?? '—'}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Department</p>
                  {isEditing ? (
                    <select
                      value={department ?? 'Administration'}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="aether-input font-medium py-1.5 px-3 bg-canvas-50 focus:bg-white"
                    >
                      <option value="Administration">Administration</option>
                      <option value="Research">Research</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                    </select>
                  ) : (
                    <p className="text-xs font-semibold text-void-950 font-sans py-1.5">{department ?? '—'}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Role</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={role ?? ''} 
                      onChange={(e) => setRole(e.target.value)} 
                      className="aether-input font-medium py-1.5 px-3"
                    />
                  ) : (
                    <p className="text-xs font-semibold text-void-950 font-sans py-1.5">{role ?? '—'}</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* 3. Bottom Right: Change Password Security Form Card */}
          <div className="aether-card p-6">
            <h3 className="text-base font-display font-medium tracking-normal text-void-950 mb-6 text-left select-none">
              Change Password
            </h3>

            {/* Error notifications */}
            {passwordError && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600/70" />
                <span className="font-semibold">{passwordError}</span>
              </div>
            )}

            {/* Success notifications */}
            {passwordSuccess && (
              <div className="mb-5 p-3.5 bg-mint-100 border border-mint-800/10 text-mint-800 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-forest-750" />
                <span className="font-semibold font-sans">Password updated successfully! Node synchronized.</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4 text-left">
              {/* Current Password */}
              <div>
                <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword ?? ''}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="aether-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3.5 top-3.5 text-void-700/40 hover:text-void-950 transition-colors"
                  >
                    {showCurrent ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword ?? ''}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="aether-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3.5 top-3.5 text-void-700/40 hover:text-void-950 transition-colors"
                  >
                    {showNew ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5 select-none">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword ?? ''}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="aether-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-3.5 text-void-700/40 hover:text-void-950 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t border-canvas-200 mt-6 select-none">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
