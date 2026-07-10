import { useState, useEffect, useCallback, useMemo } from 'react'
import { Icon } from './Icon'
import {
  EXAM_META,
  ISC2_CC_QUESTIONS,
  SECPLUS_QUESTIONS,
  type ExamQuestionItem,
} from '../data/practiceExams'

type ExamId = 'isc2cc' | 'secplus'
type Stage = 'select' | 'running' | 'results'

interface PracticeExamProps {
  onBack: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return h > 0
    ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    : `${m}:${s.toString().padStart(2, '0')}`
}

export function PracticeExam({ onBack }: PracticeExamProps) {
  const [stage, setStage] = useState<Stage>('select')
  const [examId, setExamId] = useState<ExamId | null>(null)
  const [questions, setQuestions] = useState<ExamQuestionItem[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)

  const startExam = (id: ExamId) => {
    const bank = id === 'isc2cc' ? ISC2_CC_QUESTIONS : SECPLUS_QUESTIONS
    setExamId(id)
    setQuestions(shuffle(bank))
    setAnswers({})
    setFlagged(new Set())
    setCurrentIndex(0)
    setSecondsLeft(EXAM_META[id].timeLimitMinutes * 60)
    setStage('running')
  }

  const submitExam = useCallback(() => {
    setStage('results')
  }, [])

  useEffect(() => {
    if (stage !== 'running') return
    if (secondsLeft <= 0) {
      submitExam()
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [stage, secondsLeft, submitExam])

  if (stage === 'select') {
    return <ExamSelect onStart={startExam} onBack={onBack} />
  }

  if (stage === 'running' && examId) {
    return (
      <ExamRunner
        examId={examId}
        questions={questions}
        answers={answers}
        setAnswers={setAnswers}
        flagged={flagged}
        setFlagged={setFlagged}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        secondsLeft={secondsLeft}
        onSubmit={submitExam}
      />
    )
  }

  if (stage === 'results' && examId) {
    return (
      <ExamResults
        examId={examId}
        questions={questions}
        answers={answers}
        onRetake={() => setStage('select')}
        onBack={onBack}
      />
    )
  }

  return null
}

function ExamSelect({ onStart, onBack }: { onStart: (id: ExamId) => void; onBack: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Practice <span className="text-neon-cyan neon-text-cyan">Exam Simulator</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          Full-length, timed mock exams. Once you start, the clock is running — just like the real thing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {(Object.keys(EXAM_META) as ExamId[]).map((id) => {
          const meta = EXAM_META[id]
          return (
            <div
              key={id}
              className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 transition-all hover:border-neon-cyan/40"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10">
                <Icon name="exam" className="h-6 w-6 text-neon-cyan" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white">{meta.name}</h3>
              <p className="text-xs text-slate-400">{meta.fullName}</p>

              <div className="mt-4 space-y-1.5 font-mono text-xs text-slate-400">
                <p>Questions: {meta.totalQuestions}</p>
                <p>Time limit: {meta.timeLimitMinutes} minutes</p>
                <p>Passing score: {meta.passingScorePercent}%</p>
              </div>

              <div className="mt-4 space-y-1">
                {meta.domains.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{d.name}</span>
                    <span className="font-bold text-slate-400">{d.weight}%</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onStart(id)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2.5 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/20"
              >
                <Icon name="cpu" className="h-4 w-4" />
                Start Timed Exam
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-2 font-mono text-sm font-medium text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan mx-auto"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back to Training Modules
        </button>
      </div>
    </div>
  )
}

interface ExamRunnerProps {
  examId: ExamId
  questions: ExamQuestionItem[]
  answers: Record<string, number>
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>
  flagged: Set<string>
  setFlagged: React.Dispatch<React.SetStateAction<Set<string>>>
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  secondsLeft: number
  onSubmit: () => void
}

function ExamRunner({
  examId,
  questions,
  answers,
  setAnswers,
  flagged,
  setFlagged,
  currentIndex,
  setCurrentIndex,
  secondsLeft,
  onSubmit,
}: ExamRunnerProps) {
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const question = questions[currentIndex]
  const meta = EXAM_META[examId]
  const answeredCount = Object.keys(answers).length
  const isLowTime = secondsLeft <= 300

  const selectAnswer = (index: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: index }))
  }

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(question.id)) next.delete(question.id)
      else next.add(question.id)
      return next
    })
  }

  if (!question) return null

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="sticky top-0 z-20 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700/50 bg-slate-950/95 p-4 backdrop-blur">
        <div>
          <span className="font-mono text-xs font-bold text-neon-cyan">{meta.name}</span>
          <p className="font-mono text-[10px] text-slate-400">
            Question {currentIndex + 1} / {questions.length} · {answeredCount} answered
          </p>
        </div>
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-sm font-bold ${
            isLowTime
              ? 'border-neon-red/50 bg-neon-red/10 text-neon-red animate-pulse'
              : 'border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan'
          }`}
        >
          <Icon name="alert" className="h-4 w-4" />
          {formatTime(secondsLeft)}
        </div>
        <button
          onClick={() => setShowConfirmSubmit(true)}
          className="rounded-lg border border-neon-green/40 bg-neon-green/10 px-4 py-1.5 font-mono text-xs font-bold text-neon-green transition-all hover:bg-neon-green/20"
        >
          Submit Exam
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {questions.map((q, i) => {
          const isAnswered = answers[q.id] !== undefined
          const isFlagged = flagged.has(q.id)
          const isCurrent = i === currentIndex
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`flex h-7 w-7 items-center justify-center rounded font-mono text-[10px] font-bold transition-all ${
                isCurrent
                  ? 'border-2 border-neon-cyan text-neon-cyan'
                  : isFlagged
                    ? 'border border-neon-yellow/50 bg-neon-yellow/10 text-neon-yellow'
                    : isAnswered
                      ? 'border border-neon-green/40 bg-neon-green/10 text-neon-green'
                      : 'border border-slate-700 bg-slate-800/30 text-slate-500'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {question.domain}
          </span>
          <button
            onClick={toggleFlag}
            className={`flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-bold transition-colors ${
              flagged.has(question.id)
                ? 'bg-neon-yellow/20 text-neon-yellow'
                : 'bg-slate-800 text-slate-500 hover:text-neon-yellow'
            }`}
          >
            <Icon name="alert" className="h-3 w-3" />
            {flagged.has(question.id) ? 'Flagged' : 'Flag for review'}
          </button>
        </div>

        <p className="mb-6 font-mono text-base font-medium leading-relaxed text-white sm:text-lg">
          {question.question}
        </p>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === index
            return (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-neon-cyan bg-neon-cyan/10'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded font-mono text-xs font-bold ${
                    isSelected ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-sm text-slate-200 sm:text-base">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 font-mono text-sm font-medium text-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:border-slate-600"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Previous
        </button>
        <button
          onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          disabled={currentIndex === questions.length - 1}
          className="flex items-center gap-1.5 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 font-mono text-sm font-bold text-neon-cyan transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:bg-neon-cyan/20"
        >
          Next
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-xl border border-neon-cyan/30 bg-slate-900 p-6">
            <h3 className="mb-3 font-mono text-lg font-bold text-white">Submit Exam?</h3>
            <p className="mb-2 text-sm text-slate-400">
              You've answered {answeredCount} of {questions.length} questions.
            </p>
            {answeredCount < questions.length && (
              <p className="mb-4 text-sm text-neon-yellow">
                {questions.length - answeredCount} questions are still unanswered.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm font-medium text-slate-300 hover:border-slate-600"
              >
                Keep Going
              </button>
              <button
                onClick={onSubmit}
                className="flex-1 rounded-lg border border-neon-green/40 bg-neon-green/10 px-4 py-2 font-mono text-sm font-bold text-neon-green hover:bg-neon-green/20"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ExamResults({
  examId,
  questions,
  answers,
  onRetake,
  onBack,
}: {
  examId: ExamId
  questions: ExamQuestionItem[]
  answers: Record<string, number>
  onRetake: () => void
  onBack: () => void
}) {
  const meta = EXAM_META[examId]

  const { scorePercent, correctCount, domainStats, passed } = useMemo(() => {
    let correct = 0
    const stats: Record<string, { correct: number; total: number }> = {}

    questions.forEach((q) => {
      if (!stats[q.domain]) stats[q.domain] = { correct: 0, total: 0 }
      stats[q.domain].total += 1
      if (answers[q.id] === q.correctIndex) {
        correct += 1
        stats[q.domain].correct += 1
      }
    })

    const percent = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0
    return {
      scorePercent: percent,
      correctCount: correct,
      domainStats: stats,
      passed: percent >= meta.passingScorePercent,
    }
  }, [questions, answers, meta.passingScorePercent])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div
        className={`mb-8 rounded-xl border p-8 text-center ${
          passed ? 'border-neon-green/30 bg-neon-green/5' : 'border-neon-red/30 bg-neon-red/5'
        }`}
      >
        <Icon
          name={passed ? 'checkCircle' : 'alert'}
          className={`mx-auto mb-3 h-12 w-12 ${passed ? 'text-neon-green' : 'text-neon-red'}`}
        />
        <p className={`font-mono text-4xl font-bold ${passed ? 'text-neon-green' : 'text-neon-red'}`}>
          {scorePercent}%
        </p>
        <p className="mt-1 font-mono text-sm text-slate-400">
          {correctCount} / {questions.length} correct · {passed ? 'PASS' : 'FAIL'} (need {meta.passingScorePercent}%)
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
        <h3 className="mb-4 font-mono text-sm font-bold text-white">Score by Domain</h3>
        <div className="space-y-3">
          {Object.entries(domainStats).map(([domain, stat]) => {
            const pct = Math.round((stat.correct / stat.total) * 100)
            return (
              <div key={domain}>
                <div className="mb-1 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-300">{domain}</span>
                  <span className={pct >= meta.passingScorePercent ? 'text-neon-green' : 'text-neon-yellow'}>
                    {stat.correct}/{stat.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${pct >= meta.passingScorePercent ? 'bg-neon-green' : 'bg-neon-yellow'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-mono text-sm font-bold text-white">Review Incorrect Answers</h3>
        <div className="space-y-4">
          {questions
            .filter((q) => answers[q.id] !== q.correctIndex)
            .map((q) => (
              <div key={q.id} className="rounded-lg border border-neon-red/20 bg-slate-900/50 p-4">
                <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-slate-400">
                  {q.domain}
                </span>
                <p className="mt-2 font-mono text-sm font-medium text-white">{q.question}</p>
                <p className="mt-2 text-xs text-neon-red">
                  Your answer: {answers[q.id] !== undefined ? q.options[answers[q.id]] : 'Not answered'}
                </p>
                <p className="text-xs text-neon-green">Correct answer: {q.options[q.correctIndex]}</p>
                <p className="mt-2 text-xs text-slate-400">{q.explanation}</p>
              </div>
            ))}
          {questions.every((q) => answers[q.id] === q.correctIndex) && (
            <p className="text-center text-sm text-neon-green">Perfect score — no incorrect answers!</p>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={onRetake}
          className="flex items-center justify-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-6 py-2.5 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/20"
        >
          <Icon name="refresh" className="h-4 w-4" />
          Retake / Choose Different Exam
        </button>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 px-6 py-2.5 font-mono text-sm font-medium text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back to Training Modules
        </button>
      </div>
    </div>
  )
}