import { UNITS } from '../data/curriculum'
import type { UnitProgress } from '../hooks/useAppState'
import { Icon } from './Icon'

interface UnitGridProps {
  units: Record<number, UnitProgress>
  onOpenUnit: (unitId: number) => void
}

export function UnitGrid({ units, onOpenUnit }: UnitGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Training Modules
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Progress through 8 units · Each unit unlocks the next · +300 XP per completion
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {UNITS.map((unit) => {
          const progress = units[unit.id]
          if (!progress) return null
          const isLocked = progress.status === 'locked'
          const isCompleted = progress.status === 'completed'
          const isUnlocked = progress.status === 'unlocked'

          return (
            <button
              key={unit.id}
              onClick={() => !isLocked && onOpenUnit(unit.id)}
              disabled={isLocked}
              className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                isLocked
                  ? 'cursor-not-allowed border-slate-800 bg-slate-900/30'
                  : isCompleted
                    ? 'border-neon-green/40 bg-slate-900/50 hover:border-neon-green/60 hover:shadow-[0_0_20px_rgba(0,255,148,0.15)]'
                    : 'border-neon-cyan/40 bg-slate-900/50 hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]'
              }`}
            >
              {/* Scanline effect for unlocked */}
              {isUnlocked && (
                <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
              )}

              <div className={`relative p-5 ${isLocked ? 'locked-blur' : ''}`}>
                {/* Unit number badge */}
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      isCompleted
                        ? 'border-neon-green/40 bg-neon-green/10'
                        : 'border-neon-cyan/40 bg-neon-cyan/10'
                    }`}
                  >
                    <Icon
                      name={isCompleted ? 'checkCircle' : unit.icon}
                      className={`h-5 w-5 ${isCompleted ? 'text-neon-green' : 'text-neon-cyan'}`}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    UNIT {unit.id.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`mb-1 font-mono text-sm font-bold leading-tight ${
                    isCompleted ? 'text-neon-green' : 'text-white'
                  }`}
                >
                  {unit.title}
                </h3>
                <p className="mb-3 text-xs text-slate-400">{unit.subtitle}</p>

                {/* Phase progress indicator */}
                {!isLocked && (
                  <div className="mb-3 flex items-center gap-1">
                    {['learn', 'check', 'test', 'unlock'].map((phase) => {
                      const phaseOrder = ['learn', 'check', 'test', 'unlock']
                      const currentIdx = phaseOrder.indexOf(progress.currentPhase)
                      const phaseIdx = phaseOrder.indexOf(phase)
                      const isDone = isCompleted || phaseIdx < currentIdx
                      const isCurrent = !isCompleted && phaseIdx === currentIdx
                      return (
                        <div
                          key={phase}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            isDone
                              ? 'bg-neon-green'
                              : isCurrent
                                ? 'bg-neon-cyan'
                                : 'bg-slate-700'
                          }`}
                        />
                      )
                    })}
                  </div>
                )}

                {/* Status badge */}
                <div className="flex items-center justify-between">
                  {isLocked ? (
                    <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-500">
                      <Icon name="lockClosed" className="h-3.5 w-3.5" />
                      LOCKED
                    </span>
                  ) : isCompleted ? (
                    <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-neon-green">
                      <Icon name="checkCircle" className="h-3.5 w-3.5" />
                      COMPLETED · +300 XP
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-neon-cyan">
                      <Icon name="unlock" className="h-3.5 w-3.5" />
                      UNLOCKED
                    </span>
                  )}
                  {!isLocked && (
                    <Icon
                      name="arrowRight"
                      className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-neon-cyan"
                    />
                  )}
                </div>
              </div>

              {/* Locked overlay */}
              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                  <Icon name="lockClosed" className="mb-2 h-8 w-8 text-slate-600" />
                  <span className="font-mono text-xs font-bold text-slate-500">LOCKED</span>
                  <span className="mt-1 text-center text-[10px] text-slate-600">
                    Complete Unit {unit.id - 1} to unlock
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
