import { useState } from 'react'
import type { Unit, CheckInQuestion } from '../data/curriculum'
import { Icon } from './Icon'

interface CheckPhaseProps {
  unit: Unit
  answers: Record<string, number>
  onAnswer: (questionId: string, answerIndex: number) => void
  onComplete: () => void
}

export function CheckPhase({ unit, answers, onAnswer, onComplete }: CheckPhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const question = unit.checkIns[currentIndex]
  const allAnswered = unit.checkIns.every((q) => answers[q.id] !== undefined)

  const handleSelect = (index: number) => {
    if (showFeedback) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    onAnswer(question.id, selectedAnswer)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentIndex < unit.checkIns.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      onComplete()
    }
  }

  const isCorrect = selectedAnswer === question.correctIndex

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="clipboardCheck" className="h-5 w-5 text-neon-cyan" />
            <h3 className="font-mono text-lg font-bold text-white">Comprehension Check-In</h3>
          </div>
          <span className="font-mono text-xs font-medium text-slate-400">
            {currentIndex + 1} / {unit.checkIns.length}
          </span>
        </div>

        <p className="mb-4 text-sm text-slate-400">
          Answer these quick questions to verify your understanding before taking the unit test.
        </p>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {unit.checkIns.map((_: CheckInQuestion, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentIndex
                  ? 'bg-neon-green'
                  : i === currentIndex
                    ? 'bg-neon-cyan'
                    : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <div key={currentIndex} className="view-enter">
          <p className="mb-4 font-mono text-base font-medium text-white">
            {question.question}
          </p>

          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const showResult = showFeedback
              const isThisCorrect = index === question.correctIndex
              const isThisWrong = isSelected && !isThisCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
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
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-xs font-bold ${
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
                      <Icon name="check" className="h-3.5 w-3.5" />
                    ) : showResult && isThisWrong ? (
                      <span>✕</span>
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={`text-sm ${showResult && isThisCorrect ? 'text-neon-green' : showResult && isThisWrong ? 'text-neon-red' : 'text-slate-200'}`}>
                    {option}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`mt-4 rounded-lg border p-4 view-enter ${
                isCorrect
                  ? 'border-neon-green/30 bg-neon-green/5'
                  : 'border-neon-yellow/30 bg-neon-yellow/5'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Icon
                  name={isCorrect ? 'checkCircle' : 'alert'}
                  className={`h-4 w-4 ${isCorrect ? 'text-neon-green' : 'text-neon-yellow'}`}
                />
                <span className={`font-mono text-sm font-bold ${isCorrect ? 'text-neon-green' : 'text-neon-yellow'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite — but this is a check-in, so let\'s learn!'}
                </span>
              </div>
              <p className="text-sm text-slate-300">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex justify-end">
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-6 py-2 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-6 py-2 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/20"
            >
              {currentIndex < unit.checkIns.length - 1 ? 'Next Question' : 'Start Unit Test'}
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {allAnswered && currentIndex === unit.checkIns.length - 1 && showFeedback && (
        <div className="rounded-lg border border-neon-green/30 bg-neon-green/5 p-4 text-center view-enter">
          <p className="font-mono text-sm font-bold text-neon-green">
            All check-ins complete! You're ready for the unit test.
          </p>
        </div>
      )}
    </div>
  )
}
