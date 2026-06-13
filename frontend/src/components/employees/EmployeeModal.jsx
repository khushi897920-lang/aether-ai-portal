import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

export default function EmployeeModal({ isOpen, onClose, onSave, employee }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Product Systems');
  const [role, setRole] = useState('Member');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');

  // Sync state if editing an existing employee
  useEffect(() => {
    if (employee) {
      setName(employee.name || '');
      setEmail(employee.email || '');
      setDepartment(employee.department || 'Product Systems');
      setRole(employee.role || 'Member');
      setStatus(employee.status || 'Active');
    } else {
      setName('');
      setEmail('');
      setDepartment('Product Systems');
      setRole('Member');
      setStatus('Active');
    }
    setError('');
  }, [employee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Please fill in name and email fields.');
      return;
    }

    const payload = {
      id: employee?.id || 'emp_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      department,
      role,
      status,
    };

    onSave(payload);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void-950/60 backdrop-blur-sm"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white w-full max-w-md rounded-2xl border border-canvas-200/60 shadow-2xl overflow-hidden z-10 text-left"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-canvas-200/60 flex justify-between items-center bg-canvas-50/50">
              <h3 className="text-base font-serif font-bold text-void-950">
                {employee ? 'Edit Employee Node' : 'Add Employee Node'}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 text-void-700/40 hover:text-void-950 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-[10px] font-semibold text-void-900 tracking-wide uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Vane"
                  className="premium-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold text-void-900 tracking-wide uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="premium-input"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-[10px] font-semibold text-void-900 tracking-wide uppercase mb-1.5">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="premium-input bg-canvas-50 focus:bg-white"
                >
                  <option value="Product Systems">Product Systems</option>
                  <option value="Engineering & Infrastructure">Engineering & Infrastructure</option>
                  <option value="Security Operations">Security Operations</option>
                  <option value="Human Operations">Human Operations</option>
                </select>
              </div>

              {/* Role & Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-void-900 tracking-wide uppercase mb-1.5">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="premium-input"
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-void-900 tracking-wide uppercase mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="premium-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-canvas-200/50 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-canvas-200 hover:bg-canvas-50 rounded-xl text-xs font-semibold text-void-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow-void-glow flex items-center space-x-2 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
