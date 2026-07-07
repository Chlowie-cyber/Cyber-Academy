import React from 'react';

interface ActivityGridProps {
  // Array of numbers representing activity level (0 to 4) for the last 84 days (12 weeks)
  activityLog?: number[]; 
}

export function ActivityGrid({ activityLog }: ActivityGridProps) {
  // Generate mock data for 84 days if none provided, making sure today and yesterday are active
  const days = activityLog || Array.from({ length: 84 }, (_, i) => {
    if (i > 78) return Math.floor(Math.random() * 5); // recent high activity
    return Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0;
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = months[new Date().getMonth()];
  const previousMonth = months[(new Date().getMonth() - 1 + 12) % 12];

  // Helper for GitHub intensity colors
  const getColorClass = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-900/40 border border-emerald-800/30'; // Light activity
      case 2: return 'bg-emerald-700/60 border border-emerald-600/40';
      case 3: return 'bg-emerald-500 border border-emerald-400/50';
      case 4: return 'bg-neon-green shadow-[0_0_10px_rgba(0,255,136,0.4)]'; // High activity
      default: return 'bg-slate-900 border border-slate-800'; // No activity
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-left shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          ⚡ CONSISTENCY ENGINE (REAL-TIME ACTIVITY MATRIX)
        </span>
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <span>Less</span>
          <div className="h-2.5 w-2.5 rounded bg-slate-900 border border-slate-800" />
          <div className="h-2.5 w-2.5 rounded bg-emerald-900/40" />
          <div className="h-2.5 w-2.5 rounded bg-emerald-700/60" />
          <div className="h-2.5 w-2.5 rounded bg-emerald-500" />
          <div className="h-2.5 w-2.5 rounded bg-neon-green" />
          <span>More</span>
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="flex flex-col gap-1 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex gap-1 text-[9px] text-slate-500 mb-1 pl-6">
          <div className="w-12">{previousMonth}</div>
          <div className="w-12">Current Loop</div>
          <div className="ml-auto text-neon-green animate-pulse">● Live Sync Active</div>
        </div>

        <div className="flex gap-1">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between text-[9px] text-slate-600 pr-2 pb-1 h-[78px]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* 12 Columns of Weeks (7 squares per column) */}
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {days.map((level, index) => (
              <div
                key={`day-${index}`}
                className={`h-2.5 w-2.5 rounded-[1.5px] transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer ${getColorClass(level)}`}
                title={`Day ${index + 1}: Activity Level ${level}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}