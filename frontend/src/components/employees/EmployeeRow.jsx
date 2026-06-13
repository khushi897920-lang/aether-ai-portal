import { Edit3, Trash2, ShieldCheck, User } from 'lucide-react';

export default function EmployeeRow({ employee, onEdit, onDelete }) {
  const isStatusActive = employee.status === 'Active';

  return (
    <tr className="hover:bg-canvas-50/50 transition-colors border-b border-canvas-200/50">
      {/* Name and avatar block */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-9 h-9 rounded-lg bg-canvas-100 border border-canvas-200 flex items-center justify-center font-serif text-void-950 text-sm font-semibold select-none">
            {employee.name ? employee.name.charAt(0) : <User className="w-4 h-4 text-void-700/50" />}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-void-950">{employee.name}</h4>
            <p className="text-[10px] text-void-700/40 mt-0.5">{employee.email}</p>
          </div>
        </div>
      </td>

      {/* Department cell */}
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <span className="text-xs font-sans text-void-900">{employee.department}</span>
      </td>

      {/* Role cell */}
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="flex items-center space-x-1">
          {employee.role === 'Admin' && <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />}
          <span className="text-xs font-sans text-void-700">{employee.role}</span>
        </div>
      </td>

      {/* Status cell */}
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
          isStatusActive
            ? 'bg-mint-100 text-mint-800'
            : 'bg-red-50 text-red-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            isStatusActive ? 'bg-forest-600' : 'bg-red-600'
          }`}></span>
          {employee.status}
        </span>
      </td>

      {/* Action buttons */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => onEdit(employee)}
            className="p-1.5 text-void-700/40 hover:text-forest-800 hover:bg-canvas-100 rounded-lg transition-all"
            title="Edit record"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className="p-1.5 text-void-700/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete record"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
