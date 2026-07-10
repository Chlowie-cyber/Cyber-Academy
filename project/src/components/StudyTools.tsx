import { useState, useEffect } from 'react'
import { UNITS } from '../data/curriculum'
import { Icon } from './Icon'

interface FlashcardData {
  term: string
  definition: string
  unitTitle: string
}

function getAllFlashcards(): FlashcardData[] {
  const cards: FlashcardData[] = []
  UNITS.forEach((unit) => {
    unit.syllabus.forEach((section) => {
      section.keyTerms?.forEach((kt) => {
        cards.push({ term: kt.term, definition: kt.definition, unitTitle: unit.title })
      })
    })
  })
  return cards
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type StudyMode = 'hub' | 'flashcards' | 'matching' | 'cram'

interface StudyToolsProps {
  onBack: () => void
}

export function StudyTools({ onBack }: StudyToolsProps) {
  const [mode, setMode] = useState<StudyMode>('hub')

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {mode !== 'hub' && (
        <button
          onClick={() => setMode('hub')}
          className="mb-6 flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 py-1.5 font-mono text-xs font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
        >
          <Icon name="arrowLeft" className="h-3.5 w-3.5" />
          Back to Study Tools
        </button>
      )}

      {mode === 'hub' && <StudyHub onSelect={setMode} onBack={onBack} />}
      {mode === 'flashcards' && <Flashcards />}
      {mode === 'matching' && <MatchingGame />}
      {mode === 'cram' && <CramSheet />}
    </div>
  )
}

function StudyHub({ onSelect, onBack }: { onSelect: (m: StudyMode) => void; onBack: () => void }) {
  const tools = [
    { id: 'flashcards' as const, icon: 'book', title: 'Flashcards', desc: 'Flip through every key term across all 8 units.' },
    { id: 'matching' as const, icon: 'target', title: 'Matching Game', desc: 'Match terms to definitions against the clock.' },
    { id: 'cram' as const, icon: 'clipboardCheck', title: 'Cram Sheet', desc: 'One-page scrollable review for exam day.' },
  ]

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Study <span className="text-neon-cyan neon-text-cyan">Tools</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          Reinforce everything you've learned across all 8 units.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelect(tool.id)}
            className="group rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 text-left transition-all hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.08)]"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10">
              <Icon name={tool.icon} className="h-6 w-6 text-neon-cyan" />
            </div>
            <h3 className="font-mono text-base font-bold text-white group-hover:text-neon-cyan transition-colors">
              {tool.title}
            </h3>
            <p className="mt-2 text-xs text-slate-400">{tool.desc}</p>
          </button>
        ))}
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

// ── FLASHCARDS ──────────────────────────────────────────
function Flashcards() {
  const [cards, setCards] = useState<FlashcardData[]>(() => shuffle(getAllFlashcards()))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[index]

  const next = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % cards.length)
  }
  const prev = () => {
    setFlipped(false)
    setIndex((i) => (i - 1 + cards.length) % cards.length)
  }
  const reshuffle = () => {
    setCards(shuffle(getAllFlashcards()))
    setIndex(0)
    setFlipped(false)
  }

  if (!card) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium text-slate-400">
          Card {index + 1} / {cards.length}
        </span>
        <button
          onClick={reshuffle}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <Icon name="refresh" className="h-3.5 w-3.5" />
          Shuffle
        </button>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-xl border border-neon-cyan/30 bg-slate-900/50 p-8 text-center transition-all hover:border-neon-cyan/50"
      >
        <span className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-neon-cyan/70">
          {card.unitTitle} · {flipped ? 'Definition' : 'Term'}
        </span>
        <p className="font-mono text-xl font-bold text-white sm:text-2xl">
          {flipped ? card.definition : card.term}
        </p>
        <span className="mt-6 font-mono text-[10px] text-slate-500">Click to flip</span>
      </button>

      <div className="flex justify-between gap-3">
        <button
          onClick={prev}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 font-mono text-sm font-medium text-slate-300 transition-colors hover:border-slate-600"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Prev
        </button>
        <button
          onClick={next}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2.5 font-mono text-sm font-bold text-neon-cyan transition-colors hover:bg-neon-cyan/20"
        >
          Next
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ── MATCHING GAME ───────────────────────────────────────
interface Tile {
  id: string
  pairId: number
  type: 'term' | 'def'
  text: string
  matched: boolean
}

function buildTiles(): Tile[] {
  const all = shuffle(getAllFlashcards()).slice(0, 6)
  const tiles: Tile[] = []
  all.forEach((c, i) => {
    tiles.push({ id: `t${i}`, pairId: i, type: 'term', text: c.term, matched: false })
    tiles.push({ id: `d${i}`, pairId: i, type: 'def', text: c.definition, matched: false })
  })
  return shuffle(tiles)
}

function MatchingGame() {
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles())
  const [selected, setSelected] = useState<string[]>([])
  const [wrongPair, setWrongPair] = useState<string[]>([])
  const [moves, setMoves] = useState(0)

  const allMatched = tiles.every((t) => t.matched)

  useEffect(() => {
    if (selected.length !== 2) return
    const [a, b] = selected.map((id) => tiles.find((t) => t.id === id)!)
    setMoves((m) => m + 1)

    if (a.pairId === b.pairId && a.type !== b.type) {
      setTiles((prev) => prev.map((t) => (t.pairId === a.pairId ? { ...t, matched: true } : t)))
      setSelected([])
    } else {
      setWrongPair([a.id, b.id])
      const timeout = setTimeout(() => {
        setWrongPair([])
        setSelected([])
      }, 700)
      return () => clearTimeout(timeout)
    }
  }, [selected])

  const handleClick = (id: string) => {
    if (selected.length === 2 || selected.includes(id)) return
    const tile = tiles.find((t) => t.id === id)
    if (tile?.matched) return
    setSelected((prev) => [...prev, id])
  }

  const newGame = () => {
    setTiles(buildTiles())
    setSelected([])
    setWrongPair([])
    setMoves(0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium text-slate-400">Moves: {moves}</span>
        <button
          onClick={newGame}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <Icon name="refresh" className="h-3.5 w-3.5" />
          New Game
        </button>
      </div>

      {allMatched ? (
        <div className="rounded-xl border border-neon-green/30 bg-neon-green/5 p-8 text-center">
          <Icon name="checkCircle" className="mx-auto mb-3 h-10 w-10 text-neon-green" />
          <p className="font-mono text-lg font-bold text-neon-green">All matched in {moves} moves!</p>
          <button
            onClick={newGame}
            className="mt-4 rounded-lg border border-neon-green/40 bg-neon-green/10 px-6 py-2 font-mono text-sm font-bold text-neon-green transition-all hover:bg-neon-green/20"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tiles.map((tile) => {
            const isSelected = selected.includes(tile.id)
            const isWrong = wrongPair.includes(tile.id)
            return (
              <button
                key={tile.id}
                onClick={() => handleClick(tile.id)}
                disabled={tile.matched}
                className={`flex min-h-[90px] items-center justify-center rounded-lg border p-3 text-center text-xs font-medium transition-all sm:text-sm ${
                  tile.matched
                    ? 'border-neon-green/30 bg-neon-green/5 text-neon-green opacity-50'
                    : isWrong
                      ? 'border-neon-red/50 bg-neon-red/10 text-neon-red'
                      : isSelected
                        ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                        : 'border-slate-700 bg-slate-800/30 text-slate-200 hover:border-slate-600'
                }`}
              >
                {tile.text}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── CRAM SHEET ───────────────────────────────────────────
function CramSheet() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xl font-bold text-white">Exam-Day Cram Sheet</h2>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <Icon name="copy" className="h-3.5 w-3.5" />
          Print
        </button>
      </div>

      {UNITS.map((unit) => (
        <div key={unit.id} className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-5">
          <h3 className="mb-3 font-mono text-sm font-bold text-neon-cyan">
            UNIT {unit.id.toString().padStart(2, '0')} · {unit.title}
          </h3>
          <div className="space-y-3">
            {unit.syllabus.map((section, i) => (
              <div key={i}>
                <p className="font-mono text-xs font-bold text-white">{section.heading}</p>
                {section.keyTerms && section.keyTerms.length > 0 && (
                  <div className="mt-1 space-y-1 pl-3">
                    {section.keyTerms.map((kt) => (
                      <p key={kt.term} className="text-xs text-slate-400">
                        <span className="font-bold text-slate-300">{kt.term}:</span> {kt.definition}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}