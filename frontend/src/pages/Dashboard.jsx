import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import { 
  Users, 
  Building2, 
  Grid, 
  TrendingUp, 
  Calendar, 
  User, 
  UserCheck, 
  ArrowUpRight, 
  FileText, 
  ChevronRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// Custom Tooltip component matching the clean off-white card style
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-canvas-200 rounded-xl p-3.5 shadow-lg text-left text-xs font-sans">
        <p className="text-void-700/50 font-semibold">{data.name} 2024</p>
        <p className="text-void-950 font-bold mt-1 text-sm">{data.value} Employees</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user, token } = useAuth();
  const [dateRange] = useState('May 12 – May 18, 2024');
  const [employees, setEmployees] = useState([]);

  // Fetch employees on component load to populate dynamic dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/employees`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setEmployees(data ?? []);
        }
      } catch (err) {
        console.error('Failed to load employee list for dashboard statistics:', err);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Recharts Chart Data (Dec -> 180, Jan -> 190, Feb -> 210, Mar -> 200, Apr -> 232, May -> 248)
  const chartData = [
    { name: 'Dec', value: 180 },
    { name: 'Jan', value: 190 },
    { name: 'Feb', value: 210 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 232 },
    { name: 'May', value: employees.length > 0 ? employees.length : 248 },
  ];

  // Dynamic Metrics derived from MongoDB Atlas employees database
  const totalCount = employees.length;
  const uniqueDepts = [...new Set((employees ?? []).map((e) => e?.department).filter(Boolean))];
  const uniqueRoles = [...new Set((employees ?? []).map((e) => e?.role).filter(Boolean))];
  
  const totalSalary = (employees ?? []).reduce((sum, e) => sum + (e?.salary || 0), 0);
  const formattedSalary = totalSalary > 0 
    ? `$${(totalSalary / 1000).toFixed(0)}k`
    : '$125k';

  const metrics = [
    {
      title: 'Total Employees',
      value: totalCount > 0 ? String(totalCount) : '248',
      trend: totalCount > 0 ? `↑ ${totalCount} nodes online` : '↑ 12 this month',
      trendType: 'positive',
      icon: Users,
      iconBg: 'bg-[#d1fae5] text-[#065f46]',
    },
    {
      title: 'Departments',
      value: uniqueDepts.length > 0 ? String(uniqueDepts.length) : '12',
      trend: 'Active segments',
      trendType: 'neutral',
      icon: Building2,
      iconBg: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Active Roles',
      value: uniqueRoles.length > 0 ? String(uniqueRoles.length) : '28',
      trend: 'Distinct allocations',
      trendType: 'positive',
      icon: Grid,
      iconBg: 'bg-teal-50 text-teal-700',
    },
    {
      title: 'Total Payroll',
      value: formattedSalary,
      trend: 'Monthly gross budget',
      trendType: 'positive',
      icon: TrendingUp,
      iconBg: 'bg-[#d1fae5] text-[#065f46]',
    },
  ];

  // Compute dynamic timeline list from newly created employee records
  const dbActivities = (employees ?? [])
    .slice(-4)
    .reverse()
    .map((emp) => ({
      id: emp._id,
      text: `${emp.name ?? 'New Employee'} joined as ${emp.role ?? 'Staff'} in ${emp.department ?? 'Operations'}`,
      time: emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : 'Recent',
      icon: User,
      iconBg: 'bg-mint-100 text-mint-800'
    }));

  const activities = dbActivities.length > 0 ? dbActivities : [
    {
      id: 'act_01',
      text: 'A new employee, Olivia Martinez, joined the Design team',
      time: '2h ago',
      icon: User,
      iconBg: 'bg-mint-100 text-mint-800',
    },
    {
      id: 'act_02',
      text: "Michael Chen's profile was updated",
      time: '5h ago',
      icon: UserCheck,
      iconBg: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'act_03',
      text: 'Priya Sharma was promoted to Senior Data Scientist',
      time: '1d ago',
      icon: ArrowUpRight,
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'act_04',
      text: "New department 'AI Research' was created",
      time: '2d ago',
      icon: FileText,
      iconBg: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight text-void-950">
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'Jane'}
          </h1>
          <p className="text-xs text-void-700/60 mt-1.5 font-sans leading-none">
            Here's what's happening in your organization today.
          </p>
        </div>

        {/* Date Selector Badge */}
        <button className="flex items-center space-x-2.5 px-4 py-2.5 bg-white border border-canvas-200 rounded-xl text-xs font-semibold text-void-700/80 shadow-[0_1px_2px_0_rgba(9,13,22,0.02)] hover:bg-canvas-50 hover:text-void-950 transition-all cursor-pointer self-start sm:self-auto select-none">
          <span className="font-medium text-void-950/70">{dateRange}</span>
          <Calendar className="w-4 h-4 text-void-700/40" />
        </button>
      </div>

      {/* 4-Column Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(metrics ?? []).map((m, index) => {
          const Icon = m?.icon ?? Users;
          return (
            <div key={index} className="aether-card p-6 flex flex-col justify-between select-none">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <p className="text-[10px] font-mono font-medium tracking-wider text-void-700/50 uppercase">
                    {m?.title ?? '—'}
                  </p>
                  <h3 className="text-3xl font-sans font-semibold text-void-950 mt-2">
                    {m?.value ?? '0'}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl border border-canvas-200/10 ${m?.iconBg ?? 'bg-canvas-100 text-void-700'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-1.5 text-left">
                <span className={`text-xs font-semibold ${
                  m?.trendType === 'positive' ? 'text-mint-800' : 'text-void-700/40'
                }`}>
                  {m?.trend ?? '—'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analysis Flex Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: 2/3 Width - Employee Overview Chart */}
        <div className="lg:col-span-2">
          <div className="aether-card p-6 flex flex-col h-full justify-between">
            <div className="mb-6 text-left select-none">
              <h3 className="text-lg font-display font-medium tracking-normal text-void-950">Employee Overview</h3>
              <p className="text-xs text-void-700/40 mt-1 font-sans">Last 6 months</p>
            </div>

            {/* Recharts Area Plot */}
            <div className="w-full h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="forestGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#054432" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#054432" stopOpacity={0.00}/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                  
                  {/* X Axis */}
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  />
                  
                  {/* Y Axis */}
                  <YAxis 
                    domain={[160, 260]}
                    ticks={[160, 180, 200, 220, 240, 260]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  />
                  
                  {/* Custom Tooltip */}
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Render Area Plot */}
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#054432" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#forestGlow)"
                    activeDot={{ r: 6, stroke: '#054432', strokeWidth: 2, fill: '#ffffff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side: 1/3 Width - Recent Activity timeline */}
        <div className="lg:col-span-1">
          <div className="aether-card p-6 flex flex-col justify-between h-full">
            <div>
              <div className="mb-6 text-left select-none">
                <h3 className="text-lg font-display font-medium tracking-normal text-void-950">Recent Activity</h3>
              </div>

              {/* Timeline Logs List */}
              <div className="space-y-5">
                {(activities ?? []).map((act) => {
                  const Icon = act?.icon ?? User;
                  return (
                    <div key={act?.id} className="flex space-x-3.5 items-start text-left group">
                      {/* Icon container */}
                      <div className={`p-2.5 rounded-xl border border-canvas-200/10 ${act?.iconBg ?? 'bg-canvas-100 text-void-700'} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      {/* Text meta */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-void-950/80 leading-normal group-hover:text-void-950 transition-colors">
                          {act?.text ?? 'Activity entry.'}
                        </p>
                        <span className="text-[10px] text-void-700/40 block mt-1.5 font-sans font-medium">
                          {act?.time ?? '—'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom action Link shortcut */}
            <div className="border-t border-canvas-200 pt-4 mt-6">
              <a
                href="#"
                className="text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center justify-center space-x-1 transition-colors font-sans group"
              >
                <span>View all activity</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
