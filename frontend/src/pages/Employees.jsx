import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://aether-ai-portal.onrender.com/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Save, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Custom Avatar component with safe initials fallback
function EmployeeAvatar({ name, src }) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <img 
        src={src} 
        alt={name} 
        className="w-9 h-9 rounded-full object-cover border border-canvas-200"
        onError={() => setError(true)}
      />
    );
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="w-9 h-9 rounded-full bg-forest-800/10 text-forest-800 border border-forest-800/20 flex items-center justify-center font-serif text-xs font-bold select-none uppercase">
      {initials}
    </div>
  );
}

export default function Employees() {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form local state variables
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDepartment, setFormDepartment] = useState('Research');
  const [formRole, setFormRole] = useState('');
  const [formSalary, setFormSalary] = useState('');
  const [formJoinDate, setFormJoinDate] = useState('');

  // Fetch employees list from Node/Express backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setEmployees(data ?? []);
      } else {
        const errData = await res.json();
        setError(errData.message || 'Failed to sync employee ledger');
      }
    } catch (err) {
      console.error('Fetch employees list error:', err);
      setError('Network communication breakdown: Failed to fetch employee logs.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 2. Search & Filtering Logic
  const filteredEmployees = (employees ?? []).filter((emp) => {
    if (!emp) return false;
    const query = searchQuery.toLowerCase();
    const nameStr = (emp.name ?? '').toLowerCase();
    const deptStr = (emp.department ?? '').toLowerCase();
    const roleStr = (emp.role ?? '').toLowerCase();
    const emailStr = (emp.email ?? '').toLowerCase();
    return (
      nameStr.includes(query) ||
      deptStr.includes(query) ||
      roleStr.includes(query) ||
      emailStr.includes(query)
    );
  });

  // Modal open handlers
  const handleOpenAdd = () => {
    setSelectedEmployee(null);
    setError('');
    setFormName('');
    setFormEmail('');
    setFormDepartment('Research');
    setFormRole('');
    setFormSalary('');
    setFormJoinDate('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setSelectedEmployee(emp);
    setError('');
    setFormName(emp?.name ?? '');
    setFormEmail(emp?.email ?? '');
    setFormDepartment(emp?.department ?? 'Research');
    setFormRole(emp?.role ?? '');
    
    // Format numeric salary to visual currency input format (e.g. $120,000)
    setFormSalary(typeof emp?.salary === 'number' ? `$${emp.salary.toLocaleString()}` : (emp?.salary ?? ''));
    
    // Format joinDate to visual date input format (e.g. 12 Jan 2024)
    if (emp?.joinDate) {
      const formattedDate = new Date(emp.joinDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      setFormJoinDate(formattedDate);
    } else {
      setFormJoinDate('');
    }
    
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  // Submit operations (Create or Update)
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');

    // Parse input fields cleanly
    const parsedSalary = Number(String(formSalary).replace(/[^0-9]/g, ''));
    const parsedDate = new Date(formJoinDate);
    const validJoinDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

    const payload = {
      name: formName,
      email: formEmail,
      department: formDepartment,
      role: formRole,
      salary: parsedSalary,
      joinDate: validJoinDate,
      status: selectedEmployee?.status || 'Active'
    };

    try {
      if (selectedEmployee) {
        // Edit mode
        const res = await fetch(`${API_BASE_URL}/employees/${selectedEmployee._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          await fetchEmployees();
          setIsModalOpen(false);
        } else {
          const errData = await res.json();
          setError(errData.message || 'Failed to update employee node');
        }
      } else {
        // Add mode
        const res = await fetch(`${API_BASE_URL}/employees`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          await fetchEmployees();
          setIsModalOpen(false);
        } else {
          const errData = await res.json();
          setError(errData.message || 'Failed to register employee node');
        }
      }
    } catch (err) {
      console.error('Save employee node error:', err);
      setError('Communication exception: Could not connect to API server.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/employees/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        await fetchEmployees();
        setIsDeleteOpen(false);
        setDeleteId(null);
      } else {
        const errData = await res.json();
        console.error('Delete employee node failed:', errData.message);
      }
    } catch (err) {
      console.error('Delete employee node error:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* 2. Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight text-void-950">Employees</h1>
          <p className="text-xs text-void-700/60 mt-1.5 font-sans leading-none">
            Manage and organize your organization's workforce.
          </p>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          {/* Search Bar */}
          <div className="relative border border-canvas-200 rounded-xl bg-white focus-within:border-forest-800 focus-within:ring-4 focus-within:ring-forest-800/5 transition-all duration-200 w-56 sm:w-64 shadow-[0_1px_2px_0_rgba(9,13,22,0.02)]">
            <Search className="absolute left-3 top-3 w-4 h-4 text-void-700/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees..."
              className="w-full bg-transparent pl-9 pr-3 py-2 text-xs font-sans text-void-950 placeholder-void-700/40 focus:outline-none"
            />
          </div>

          {/* Filters Toggle Button */}
          <button className="flex items-center space-x-2 px-3.5 py-2 border border-canvas-200 bg-white rounded-xl text-xs font-semibold text-void-700/80 shadow-[0_1px_2px_0_rgba(9,13,22,0.02)] hover:bg-canvas-50 hover:text-void-950 transition-all cursor-pointer">
            <SlidersHorizontal className="w-3.5 h-3.5 text-void-700/50" />
            <span className="font-sans">Filters</span>
          </button>

          {/* Add Employee Button */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-1.5 px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold transition-all shadow-[0_1px_2px_0_rgba(9,13,22,0.05)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="font-sans">Add Employee</span>
          </button>
        </div>
      </div>

      {/* 1. Employee Grid Table Card */}
      <div className="aether-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-canvas-200/50">
            <thead className="bg-[#f8fafc]/50 select-none">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Employee</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Salary</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Join Date</th>
                <th scope="col" className="px-6 py-4 text-right text-[10px] font-mono font-medium text-void-700/50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-canvas-200/40">
              {(filteredEmployees ?? []).length > 0 ? (
                (filteredEmployees ?? []).map((emp, index) => {
                  if (!emp) return null;
                  const empId = emp._id ?? emp.id ?? `emp_fallback_${index}`;
                  const empName = emp.name ?? '—';
                  const empEmail = emp.email ?? '—';
                  const empDept = emp.department ?? '—';
                  const empRole = emp.role ?? '—';
                  const empStatus = emp.status ?? 'Active';
                  
                  // Format numeric salary to localized currency string (e.g. $120,000)
                  const empSalary = typeof emp.salary === 'number'
                    ? `$${emp.salary.toLocaleString()}`
                    : (emp.salary ?? '—');

                  // Format joinDate string/Date to localized short text format (e.g. 12 Jan 2024)
                  const empJoinDate = emp.joinDate
                    ? new Date(emp.joinDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '—';
                  
                  return (
                    <tr key={empId} className="hover:bg-canvas-50/30 transition-colors">
                      {/* Employee avatar, name, and email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 text-left">
                          <EmployeeAvatar name={empName} />
                          <div>
                            <h4 className="text-xs font-semibold text-void-950 font-sans leading-tight">{empName}</h4>
                            <p className="text-[10px] text-void-700/40 mt-0.5 font-sans leading-none">{empEmail}</p>
                          </div>
                        </div>
                      </td>
   
                      {/* Department */}
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <span className="text-xs font-medium text-void-700/80 font-sans">{empDept}</span>
                      </td>
   
                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <span className="text-xs text-void-700 font-sans">{empRole}</span>
                      </td>
   
                      {/* Status Pill */}
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wider uppercase bg-mint-100 text-mint-800 border border-mint-800/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-800 mr-1.5 animate-pulse"></span>
                          {empStatus}
                        </span>
                      </td>

                      {/* Salary */}
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <span className="text-xs font-medium text-void-950 font-sans">{empSalary}</span>
                      </td>

                      {/* Join Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <span className="text-xs text-void-700/60 font-sans">{empJoinDate}</span>
                      </td>

                      {/* Action buttons (Pencil & Trash) */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                        <div className="flex items-center justify-end space-x-2.5">
                          <button
                            onClick={() => handleOpenEdit(emp)}
                            className="p-1.5 bg-white border border-canvas-200 hover:bg-canvas-50 text-void-700 rounded-lg shadow-sm transition-all cursor-pointer"
                            title="Edit employee record"
                          >
                            <Pencil className="w-3.5 h-3.5 text-void-700/60" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(empId)}
                            className="p-1.5 bg-white border border-canvas-200 hover:bg-red-50 text-red-650 rounded-lg shadow-sm transition-all cursor-pointer"
                            title="Delete employee record"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-650/60" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs text-void-700/40 font-semibold font-sans">
                    No employee logs matched search queries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Footer Summary */}
        <div className="px-6 py-4 border-t border-canvas-200/50 bg-[#f8fafc]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
          {/* Footer message summary */}
          <div className="text-left">
            <p className="text-xs text-void-700/40 font-medium font-sans">
              Showing 1 to {filteredEmployees.length} of 248 employees
            </p>
          </div>

          {/* Styled Horizontal Numerical Pagination Strips */}
          <div className="flex items-center space-x-1 self-center sm:self-auto">
            <button className="p-1.5 text-void-700/30 hover:text-void-950 rounded-lg transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button className="w-7 h-7 bg-canvas-100 border border-canvas-200 rounded-lg text-xs font-bold text-void-950 flex items-center justify-center font-sans shadow-sm">
              1
            </button>
            <button className="w-7 h-7 hover:bg-canvas-50 rounded-lg text-xs font-medium text-void-700/60 flex items-center justify-center font-sans transition-colors cursor-pointer">
              2
            </button>
            <button className="w-7 h-7 hover:bg-canvas-50 rounded-lg text-xs font-medium text-void-700/60 flex items-center justify-center font-sans transition-colors cursor-pointer">
              3
            </button>
            <button className="w-7 h-7 hover:bg-canvas-50 rounded-lg text-xs font-medium text-void-700/60 flex items-center justify-center font-sans transition-colors cursor-pointer">
              4
            </button>
            <button className="w-7 h-7 hover:bg-canvas-50 rounded-lg text-xs font-medium text-void-700/60 flex items-center justify-center font-sans transition-colors cursor-pointer">
              5
            </button>
            
            <span className="text-[10px] text-void-700/30 px-1 select-none font-bold">...</span>
            
            <button className="w-7 h-7 hover:bg-canvas-50 rounded-lg text-xs font-medium text-void-700/60 flex items-center justify-center font-sans transition-colors cursor-pointer">
              50
            </button>
            
            <button className="p-1.5 text-void-700/40 hover:text-void-950 rounded-lg transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Unified Add/Edit Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-void-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white w-full max-w-md rounded-2xl border border-canvas-200/60 shadow-2xl z-10 text-left overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-canvas-200/60 flex justify-between items-center bg-[#f8fafc]/50">
                <h3 className="text-base font-display font-medium tracking-normal text-void-950 select-none">
                  {selectedEmployee ? 'Edit Employee Record' : 'Register Employee Node'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-void-700/40 hover:text-void-950 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form content */}
              <form onSubmit={handleSave} className="p-6 space-y-4">
                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-650 shrink-0"></span>
                    <span className="font-semibold">{error}</span>
                  </div>
                )}
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName ?? ''}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Jane Cooper"
                    className="aether-input"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formEmail ?? ''}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="aether-input"
                  />
                </div>

                {/* Department Selector */}
                <div>
                  <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5">Department</label>
                  <select
                    value={formDepartment ?? 'Research'}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="aether-input bg-canvas-50 focus:bg-white cursor-pointer"
                  >
                    <option value="Research">Research</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                {/* Role title */}
                <div>
                  <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5">Role Title</label>
                  <input
                    type="text"
                    required
                    value={formRole ?? ''}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="UX Designer"
                    className="aether-input"
                  />
                </div>

                {/* Salary & Join Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5">Salary</label>
                    <input
                      type="text"
                      required
                      value={formSalary ?? ''}
                      onChange={(e) => setFormSalary(e.target.value)}
                      placeholder="$90,000"
                      className="aether-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase mb-1.5">Join Date</label>
                    <input
                      type="text"
                      required
                      value={formJoinDate ?? ''}
                      onChange={(e) => setFormJoinDate(e.target.value)}
                      placeholder="30 Apr 2024"
                      className="aether-input"
                    />
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-canvas-200 mt-6 select-none">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-canvas-200 hover:bg-canvas-50 rounded-xl text-xs font-semibold text-void-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-1.5 transition-all cursor-pointer"
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

      {/* 4. Delete Confirmation Dialog */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteOpen(false)}
              className="absolute inset-0 bg-void-950/60 backdrop-blur-sm"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-sm rounded-2xl border border-canvas-200/60 shadow-2xl z-10 text-left p-6"
            >
              <div className="flex items-start space-x-3.5 select-none">
                <div className="p-3 bg-red-50 text-red-650 rounded-xl border border-red-100 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-display font-medium tracking-normal text-void-950">Remove Employee Record</h3>
                  <p className="text-xs text-void-700/60 mt-2.5 leading-relaxed">
                    Are you sure you want to delete this employee record? This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Action Choices */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-canvas-200/50 select-none">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 border border-canvas-200 hover:bg-canvas-50 rounded-xl text-xs font-semibold text-void-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
