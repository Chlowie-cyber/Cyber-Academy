import { Icon } from './Icon'

interface HeaderProps {
  xp: number
  totalCompleted: number
  totalUnits: number
  onReset: () => void
  showSimulationJobs: boolean
  setShowSimulationJobs: (show: boolean) => void
  streakCount: number
}

export function Header({ xp, totalCompleted, totalUnits, onReset, showSimulationJobs, setShowSimulationJobs, streakCount }: HeaderProps) {
  const phases = ['Learn', 'Check', 'Test', 'Unlock']

    return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-slow rounded-lg bg-neon-cyan/20 blur-md" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-neon-cyan/40 bg-slate-900">
                <Icon name="shield" className="h-6 w-6 text-neon-cyan" />
              </div>
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold tracking-tight text-white sm:text-xl">
                Cyber<span className="text-neon-cyan neon-text-cyan"> Academy</span>
              </h1>
              <p className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:block">
                For Chlowie · Learn · Check · Test · Unlock
              </p>
            </div>
          </div>

          {/* Progression Loop Indicator */}
          <div className="hidden items-center gap-1 md:flex">
            {phases.map((phase, i) => (
              <div key={phase} className="flex items-center">
                <div className="flex items-center gap-1.5 rounded-md border border-slate-700/50 bg-slate-900/50 px-2.5 py-1">
                  <span className="font-mono text-[10px] font-bold text-neon-cyan">{i + 1}</span>
                  <span className="font-mono text-xs font-medium text-slate-300">{phase}</span>
                </div>
                {i < phases.length - 1 && (
                  <Icon name="arrowRight" className="mx-0.5 h-3 w-3 text-slate-600" />
                )}
              </div>
            ))}
          </div>

          {/* XP Counter + Progress Dashboard Controls */}
          <div className="flex items-center gap-3">
            {/* Streak Tracker */}
            <div className="flex items-center gap-1.5 rounded-lg border border-orange-500/30 bg-slate-900 px-3 py-1.5" title="Daily Learning Streak">
              <Icon name="zap" className="h-4 w-4 text-orange-500" />
              <span className="font-mono text-sm font-bold text-orange-400 tabular-nums">
                {streakCount} Days
              </span>
            </div>

            {/* XP Counter */}
            <div className="flex items-center gap-1.5 rounded-lg border border-neon-cyan/30 bg-slate-900 px-3 py-1.5">
              <Icon name="zap" className="h-4 w-4 text-neon-cyan" />
              <span className="font-mono text-sm font-bold text-neon-cyan tabular-nums">
                {xp.toLocaleString()} XP
              </span>
            </div>

            {/* Simulation Jobs Toggle Button */}
            <button
              onClick={() => setShowSimulationJobs(!showSimulationJobs)}
              className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
                showSimulationJobs 
                  ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan neon-text-cyan' 
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              {showSimulationJobs ? '💻 Exit Sim' : '🛡️ Simulation Jobs'}
            </button>

            {/* Progress Stats & Reset */}
            <div className="hidden items-center gap-2 sm:flex">
              <div className="text-right">
                <div className="font-mono text-xs font-bold text-white tabular-nums">
                  {totalCompleted}/{totalUnits}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Units</div>
              </div>
              <button
                onClick={onReset}
                title="Reset all progress"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-900 text-slate-400 transition-colors hover:border-neon-red/50 hover:text-neon-red"
              >
                <Icon name="refresh" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile progression loop */}
        <div className="flex items-center justify-center gap-1 pb-2 md:hidden">
          {phases.map((phase, i) => (
            <div key={phase} className="flex items-center">
              <span className="font-mono text-[10px] font-medium text-slate-400">
                {i + 1}.{phase}
              </span>
              {i < phases.length - 1 && (
                <Icon name="arrowRight" className="mx-0.5 h-2.5 w-2.5 text-slate-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}