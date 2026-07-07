import { useState, useEffect } from 'react'
import type { Unit, ExamQuestion } from '../data/curriculum'
import { Icon } from './Icon'

interface TestPhaseProps {
  unit: Unit
  answers: Record<string, number>
  variantIndex: Record<string, number>
  wrongAttempts: Record<string, boolean>
  onAnswer: (questionId: string, answerIndex: number) => void
  onWrong: (questionId: string) => void
  onResetToLearn: () => void
  onPass: () => void
}

type AnswerState = 'idle' | 'checking' | 'wrong' | 'correct'

export function TestPhase({
  unit,
  answers,
  variantIndex,
  wrongAttempts,
  onAnswer,
  onWrong,
  onResetToLearn,
  onPass,
}: TestPhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [showGoBack, setShowGoBack] = useState(false)

  const question: ExamQuestion = unit.exam[currentIndex]
  const currentVariantIdx = variantIndex[question.id] ?? 0
  const variant = question.variants[currentVariantIdx]
  const wasWrongBefore = wrongAttempts[question.id] ?? false

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null)
    setAnswerState('idle')
    setShowGoBack(false)
  }, [currentIndex])

  const handleSelect = (index: number) => {
    if (answerState === 'checking' || answerState === 'wrong' || answerState === 'correct') return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setAnswerState('checking')

    // Simulate AI Moderator checking
    setTimeout(() => {
      const isCorrect = selectedAnswer === variant.correctIndex
      onAnswer(question.id, selectedAnswer)

      if (isCorrect) {
        setAnswerState('correct')
        // Auto-advance after showing correct
        setTimeout(() => {
          if (currentIndex < unit.exam.length - 1) {
            setCurrentIndex(currentIndex + 1)
          } else {
            // All questions correct — pass!
            onPass()
          }
        }, 1500)
      } else {
        setAnswerState('wrong')
        onWrong(question.id)
        setShowGoBack(true)
      }
    }, 1800)
  }

  const handleGoBack = () => {
    onResetToLearn()
  }

  return (
    <div className="space-y-6">
      {/* AI Moderator Header */}
      <div className="flex items-center justify-between rounded-xl border border-neon-cyan/30 bg-slate-900/50 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border border-neon-cyan/40 bg-slate-900 ${answerState === 'checking' ? 'animate-pulse' : ''}`}>
              <Icon name="cpu" className="h-5 w-5 text-neon-cyan" />
            </div>
            {answerState === 'checking' && (
              <div className="absolute -inset-1 animate-ping rounded-lg border border-neon-cyan/40" />
            )}
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white">AI Moderator</h3>
            <p className="font-mono text-[10px] text-slate-400">
              {answerState === 'checking'
                ? 'Checking your response...'
                : answerState === 'wrong'
                  ? 'Response rejected'
                  : answerState === 'correct'
                    ? 'Response validated'
                    : 'Exam simulation active'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-bold text-neon-cyan">
            Q{currentIndex + 1}/{unit.exam.length}
          </span>
          <div className="mt-0.5 flex gap-1">
            {unit.exam.map((_: ExamQuestion, i) => (
              <div
                key={i}
                className={`h-1 w-4 rounded-full ${
                  i < currentIndex ? 'bg-neon-green' : i === currentIndex ? 'bg-neon-cyan' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Strict pass warning */}
      <div className="flex items-center gap-2 rounded-lg border border-neon-yellow/20 bg-neon-yellow/5 p-3">
        <Icon name="alert" className="h-4 w-4 shrink-0 text-neon-yellow" />
        <p className="text-xs text-slate-300">
          <span className="font-bold text-neon-yellow">Strict Mode:</span> You must answer ALL questions correctly to pass. Any incorrect answer resets the section.
        </p>
      </div>

      {/* Dynamic Exam Rephraser Block */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-inner">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest font-bold">
          {wasWrongBefore ? (
            <span className="inline-flex items-center gap-1 rounded bg-neon-red/10 border border-neon-red/30 px-2 py-0.5 text-neon-red animate-pulse">
              ⚠️ ADAPTIVE ENGINE: REPHRASED VARIANT ACTIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 text-neon-cyan">
              🛡️ STANDARD TESTING MODE
            </span>
          )}
        </div>

        <h4 className="font-mono text-sm font-bold text-white leading-relaxed">
          {variant.question}
        </h4>
      </div>

      {/* Mutation notice */}
      {wasWrongBefore && answerState === 'idle' && (
        <div className="flex items-center gap-2 rounded-lg border border-neon-pink/20 bg-neon-pink/5 p-3 view-enter">
          <Icon name="refresh" className="h-4 w-4 shrink-0 text-neon-pink" />
          <p className="text-xs text-slate-300">
            <span className="font-bold text-neon-pink">Question Mutated:</span> This question has been rephrased with a new scenario to test true understanding, not memorization.
          </p>
        </div>
      )}

      {/* Question card */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {question.concept}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {variant.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const showResult = answerState === 'wrong' || answerState === 'correct'
            const isThisCorrect = index === variant.correctIndex
            const isThisWrong = isSelected && !isThisCorrect

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={answerState !== 'idle'}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                  showResult
                    ? isThisCorrect
                      ? 'border-neon-green/50 bg-neon-green/10'
                      : isThisWrong
                        ? 'border-neon-red/50 bg-neon-red/10'
                        : 'border-slate-700 bg-slate-800/30'
                    : isSelected
                      ? 'border-neon-cyan bg-neon-cyan/10'
                      : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded font-mono text-xs font-bold ${
                    showResult
                      ? isThisCorrect
                        ? 'bg-neon-green/20 text-neon-green'
                        : isThisWrong
                          ? 'bg-neon-red/20 text-neon-red'
                          : 'bg-slate-700 text-slate-400'
                      : isSelected
                        ? 'bg-neon-cyan/20 text-neon-cyan'
                        : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {showResult && isThisCorrect ? (
                    <Icon name="check" className="h-4 w-4" />
                  ) : showResult && isThisWrong ? (
                    <span className="text-sm">✕</span>
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className={`text-sm sm:text-base ${showResult && isThisCorrect ? 'text-neon-green' : showResult && isThisWrong ? 'text-neon-red' : 'text-slate-200'}`}>
                  {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* AI Moderator checking animation */}
        {answerState === 'checking' && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 p-4 view-enter">
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-mono text-sm text-neon-cyan">
              Moderator checking your response<span className="cursor"></span>
            </span>
          </div>
        )}

        {/* Correct feedback */}
        {answerState === 'correct' && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-neon-green/30 bg-neon-green/5 p-4 view-enter">
            <Icon name="checkCircle" className="h-5 w-5 text-neon-green" />
            <span className="font-mono text-sm font-bold text-neon-green">
              Correct! Advancing to next question...
            </span>
          </div>
        )}

        {/* Wrong feedback — detailed red alert */}
        {answerState === 'wrong' && (
          <div className="mt-6 view-enter">
            <div className="rounded-lg border border-neon-red/50 bg-neon-red/10 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Icon name="alert" className="h-5 w-5 text-neon-red" />
                <span className="font-mono text-sm font-bold text-neon-red">
                  INCORRECT — Moderator Feedback
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-200">
                {question.feedback}
              </p>
              <div className="rounded-md border border-neon-red/20 bg-slate-950/50 p-3">
                <p className="text-xs text-slate-400">
                  <span className="font-bold text-neon-red">Required Action:</span> You must go back and re-read the relevant syllabus section. When you return, this question will be mutated with a new scenario to test true understanding.
                </p>
              </div>
            </div>

            {showGoBack && (
              <button
                onClick={handleGoBack}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neon-red/40 bg-neon-red/10 px-6 py-3 font-mono text-sm font-bold text-neon-red transition-all hover:bg-neon-red/20 view-enter"
              >
                <Icon name="arrowLeft" className="h-4 w-4" />
                Go Back and Re-read
              </button>
            )}
          </div>
        )}
      </div>

      {/* Submit button */}
      {answerState === 'idle' && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex items-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-6 py-2.5 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Icon name="cpu" className="h-4 w-4" />
            Submit to Moderator
          </button>
        </div>
      )}
    </div>
  )
}
