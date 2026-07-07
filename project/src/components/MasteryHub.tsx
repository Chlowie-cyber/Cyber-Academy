import { useState } from 'react'
import type { MasteryHub } from '../data/curriculum'
import { Icon } from './Icon'

interface MasteryHubProps {
  hub: MasteryHub
  unitTitle: string
  unitId: number
  onUnlockNext: () => void
  isLastUnit: boolean
}

export function MasteryHub({ hub, unitTitle, unitId, onUnlockNext, isLastUnit }: MasteryHubProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-neon-green/30 bg-gradient-to-r from-neon-green/5 to-transparent p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neon-green/40 bg-neon-green/10">
            <Icon name="award" className="h-6 w-6 text-neon-green" />
          </div>
          <div>
            <h3 className="font-mono text-lg font-bold text-neon-green">Mastery Achievement Hub</h3>
            <p className="text-sm text-slate-400">
              You've mastered <span className="font-bold text-white">{unitTitle}</span> — now showcase your skills.
            </p>
          </div>
        </div>
      </div>

      {/* GitHub Block */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Icon name="github" className="h-5 w-5 text-white" />
          <h4 className="font-mono text-sm font-bold text-white">Push to GitHub</h4>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400">
            PORTFOLIO LAB
          </span>
        </div>
        <p className="mb-3 text-sm text-slate-300">{hub.github.description}</p>

        {/* Code block */}
        <div className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-3 py-2">
            <span className="font-mono text-xs text-slate-400">{hub.github.title}</span>
            <button
              onClick={() => handleCopy(hub.github.code, 'github')}
              className="flex items-center gap-1.5 rounded border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              {copiedField === 'github' ? (
                <>
                  <Icon name="check" className="h-3 w-3 text-neon-green" />
                  <span className="text-neon-green">Copied!</span>
                </>
              ) : (
                <>
                  <Icon name="copy" className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="max-h-64 overflow-auto p-3 text-xs leading-relaxed">
            <code className="font-mono text-slate-300">{hub.github.code}</code>
          </pre>
        </div>
      </div>

      {/* LinkedIn Block */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Icon name="linkedin" className="h-5 w-5 text-[#0A66C2]" />
          <h4 className="font-mono text-sm font-bold text-white">Post on LinkedIn</h4>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400">
            LEARN IN PUBLIC
          </span>
        </div>
        <p className="mb-3 text-sm text-slate-400">
          Share your progress to attract recruiters and build your professional brand.
        </p>

        <div className="relative rounded-lg border border-slate-700 bg-slate-950 p-4">
          <p className="mb-3 text-sm leading-relaxed text-slate-200">{hub.linkedin.copy}</p>
          <div className="flex flex-wrap gap-1.5">
            {hub.linkedin.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-neon-cyan/10 px-2 py-0.5 font-mono text-xs font-medium text-neon-cyan"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => handleCopy(`${hub.linkedin.copy}\n\n${hub.linkedin.hashtags.join(' ')}`, 'linkedin')}
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
          >
            {copiedField === 'linkedin' ? (
              <>
                <Icon name="check" className="h-3 w-3 text-neon-green" />
                <span className="text-neon-green">Copied!</span>
              </>
            ) : (
              <>
                <Icon name="copy" className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Forage Simulation Block */}
      {hub.forage && (
        <div className="rounded-xl border border-neon-pink/30 bg-neon-pink/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Icon name="briefcase" className="h-5 w-5 text-neon-pink" />
            <h4 className="font-mono text-sm font-bold text-white">Virtual Job Simulation Challenge</h4>
            <span className="rounded bg-neon-pink/20 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-pink">
              FORAGE
            </span>
          </div>
          <p className="mb-2 text-sm text-slate-300">{hub.forage.description}</p>
          <div className="mb-4 rounded-lg border border-slate-700/50 bg-slate-950/50 p-3">
            <p className="font-mono text-sm font-bold text-neon-pink">{hub.forage.program}</p>
          </div>
          <a
            href={hub.forage.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-neon-pink/40 bg-neon-pink/10 px-4 py-2 font-mono text-sm font-bold text-neon-pink transition-all hover:bg-neon-pink/20"
          >
            <Icon name="external" className="h-4 w-4" />
            Start Virtual Simulation
          </a>
        </div>
      )}

      {/* Unlock Next Unit */}
      <div className="rounded-xl border border-neon-cyan/30 bg-gradient-to-r from-neon-cyan/5 to-transparent p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neon-cyan bg-neon-cyan/10">
            <Icon name="unlock" className="h-7 w-7 text-neon-cyan" />
          </div>
          <div>
            <h4 className="font-mono text-lg font-bold text-white">
              {isLastUnit ? 'Course Complete!' : 'Ready to Unlock Next Unit?'}
            </h4>
            <p className="mt-1 text-sm text-slate-400">
              {isLastUnit
                ? 'You have completed all 8 units of Cyber Academy. Time to pursue your certifications!'
                : `Click below to mark Unit ${unitId} as completed and unlock Unit ${unitId + 1}. You'll earn +300 XP!`}
            </p>
          </div>
          <button
            onClick={onUnlockNext}
            className="flex items-center gap-2 rounded-lg border border-neon-cyan/50 bg-neon-cyan/15 px-8 py-3 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/25 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            <Icon name="unlock" className="h-5 w-5" />
            {isLastUnit ? 'Finish Course' : `Unlock Unit ${unitId + 1}`}
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
