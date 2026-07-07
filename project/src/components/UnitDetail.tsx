import { useState } from 'react'
import type { Unit } from '../data/curriculum'
import type { UnitProgress, Phase } from '../hooks/useAppState'
import { Icon } from './Icon'
import { LearnPhase } from './LearnPhase'
import { CheckPhase } from './CheckPhase'
import { TestPhase } from './TestPhase'
import { MasteryHub } from './MasteryHub'

interface UnitDetailProps {
  unit: Unit
  progress: UnitProgress
  onBack: () => void
  onMarkRead: (sectionIndex: number) => void
  onSetPhase: (phase: Phase) => void
  onAnswerCheckIn: (questionId: string, answerIndex: number) => void
  onCompleteCheckIns: () => void
  onAnswerExam: (questionId: string, answerIndex: number) => void
  onExamWrong: (questionId: string) => void
  onResetToLearn: () => void
  onPassExam: () => void
  onUnlockNext: () => void
  isLastUnit: boolean
}

export function UnitDetail({
  unit,
  progress,
  onBack,
  onMarkRead,
  onSetPhase,
  onAnswerCheckIn,
  onCompleteCheckIns,
  onAnswerExam,
  onExamWrong,
  onResetToLearn,
  onPassExam,
  onUnlockNext,
  isLastUnit,
}: UnitDetailProps) {
  const phase = progress.currentPhase

  const phases: { id: Phase; label: string; icon: string }[] = [
    { id: 'learn', label: 'Learn', icon: 'book' },
    { id: 'check', label: 'Check', icon: 'clipboardCheck' },
    { id: 'test', label: 'Test', icon: 'exam' },
    { id: 'unlock', label: 'Unlock', icon: 'unlock' },
  ]

  const phaseOrder = ['learn', 'check', 'test', 'unlock']
  const currentPhaseIdx = phaseOrder.indexOf(phase)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 py-1.5 font-mono text-xs font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
      >
        <Icon name="arrowLeft" className="h-3.5 w-3.5" />
        Back to Modules
      </button>

      {/* Unit header */}
      <div className="mb-6 rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/40 bg-neon-cyan/10">
            <Icon name={unit.icon} className="h-7 w-7 text-neon-cyan" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neon-cyan">
                UNIT {unit.id.toString().padStart(2, '0')}
              </span>
              {progress.status === 'completed' && (
                <span className="flex items-center gap-1 rounded bg-neon-green/10 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-green">
                  <Icon name="check" className="h-2.5 w-2.5" /> COMPLETED
                </span>
              )}
            </div>
            <h2 className="mt-1 font-mono text-xl font-bold text-white sm:text-2xl">{unit.title}</h2>
            <p className="text-sm text-slate-400">{unit.subtitle}</p>
            <div className="mt-2 rounded-md border border-slate-700/50 bg-slate-800/30 px-3 py-1.5">
              <p className="font-mono text-[10px] text-slate-400">
                <span className="font-bold text-slate-300">Domain Mapping:</span> {unit.domainMapping}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Gate Workflow Indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-1 rounded-xl border border-slate-700/50 bg-slate-900/50 p-2">
          {phases.map((p, i) => {
            const isDone = i < currentPhaseIdx || progress.status === 'completed'
            const isCurrent = i === currentPhaseIdx && progress.status !== 'completed'
            const isClickable = i <= currentPhaseIdx || progress.status === 'completed'

            return (
              <div key={p.id} className="flex flex-1 items-center">
                <button
                  onClick={() => isClickable && onSetPhase(p.id)}
                  disabled={!isClickable}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 font-mono text-xs font-bold transition-all sm:text-sm ${
                    isDone
                      ? 'text-neon-green'
                      : isCurrent
                        ? 'bg-neon-cyan/10 text-neon-cyan neon-border-cyan'
                        : 'text-slate-600'
                  } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  <Icon name={isDone ? 'checkCircle' : p.icon} className="h-4 w-4" />
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
                {i < phases.length - 1 && (
                  <Icon
                    name="arrowRight"
                    className={`mx-0.5 h-3 w-3 ${isDone ? 'text-neon-green' : 'text-slate-700'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Phase content */}
      <div key={phase} className="view-enter">
        {phase === 'learn' && (
          <LearnPhase
            unit={unit}
            readSections={progress.syllabusReadSections}
            onMarkRead={onMarkRead}
            onProceedToCheck={() => onSetPhase('check')}
          />
        )}

        {phase === 'check' && (
          <CheckPhase
            unit={unit}
            answers={progress.checkInAnswers}
            onAnswer={onAnswerCheckIn}
            onComplete={onCompleteCheckIns}
          />
        )}

        {phase === 'test' && (
          <TestPhase
            unit={unit}
            answers={progress.examAnswers}
            variantIndex={progress.examVariantIndex}
            wrongAttempts={progress.examWrongAttempts}
            onAnswer={onAnswerExam}
            onWrong={onExamWrong}
            onResetToLearn={onResetToLearn}
            onPass={onPassExam}
          />
        )}

        {phase === 'unlock' && progress.examPassed && (
          <MasteryHub
            hub={unit.mastery}
            unitTitle={unit.title}
            unitId={unit.id}
            onUnlockNext={onUnlockNext}
            isLastUnit={isLastUnit}
          />
        )}

        {phase === 'unlock' && !progress.examPassed && (
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8 text-center">
            <Icon name="lockClosed" className="mx-auto mb-3 h-10 w-10 text-slate-600" />
            <p className="font-mono text-sm text-slate-400">
              You must pass the unit test to unlock the Mastery Hub.
            </p>
            <button
              onClick={() => onSetPhase('test')}
              className="mt-4 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/20"
            >
              Go to Test
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
