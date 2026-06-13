import { Terminal, UserPlus, ShieldAlert, KeyRound } from 'lucide-react';

export default function ActivityFeed() {
  const activities = [
    {
      id: 'act_01',
      type: 'user_created',
      title: 'New employee node registered',
      meta: 'Marcus Vance (Engineering)',
      time: '2 mins ago',
      icon: UserPlus,
      color: 'text-forest-700 bg-mint-100'
    },
    {
      id: 'act_02',
      type: 'security_alert',
      title: 'Access credentials updated',
      meta: 'Admin session token rotated',
      time: '12 mins ago',
      icon: KeyRound,
      color: 'text-blue-700 bg-blue-50'
    },
    {
      id: 'act_03',
      type: 'policy_change',
      title: 'System policy override check',
      meta: 'Alexander Vane (Product Systems)',
      time: '1 hr ago',
      icon: ShieldAlert,
      color: 'text-amber-700 bg-amber-50'
    },
    {
      id: 'act_04',
      type: 'system_log',
      title: 'Ledger synchronization complete',
      meta: 'Synced 12 active records',
      time: '3 hrs ago',
      icon: Terminal,
      color: 'text-void-950 bg-canvas-100'
    }
  ];

  return (
    <div className="premium-card p-6 flex flex-col h-full justify-between">
      <div>
        <h3 className="text-lg font-serif font-bold text-void-950">Recent System Logs</h3>
        <p className="text-xs text-void-700/60 mt-1">Real-time record of security actions and employee governance.</p>

        {/* List of feeds */}
        <div className="mt-6 space-y-4">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="flex space-x-3.5 items-start text-left">
                <div className={`p-2.5 rounded-xl border border-canvas-200/10 ${act.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-void-950 truncate leading-tight">{act.title}</p>
                  <p className="text-[11px] text-void-700/50 mt-0.5 truncate font-sans">{act.meta}</p>
                  <span className="text-[10px] text-void-700/35 block mt-1 font-medium">{act.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button link */}
      <div className="border-t border-canvas-200/50 pt-4 mt-6">
        <a
          href="#"
          className="text-xs font-semibold text-forest-800 hover:text-forest-900 flex justify-center items-center transition-colors"
        >
          View Full Audit Ledger
        </a>
      </div>
    </div>
  );
}
