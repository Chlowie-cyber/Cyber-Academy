import { useState } from 'react'
import type { Unit, SyllabusSection } from '../data/curriculum'
import { Icon } from './Icon'

interface LearnPhaseProps {
  unit: Unit
  readSections: number[]
  onMarkRead: (sectionIndex: number) => void
  onProceedToCheck: () => void
}

export function LearnPhase({ unit, readSections, onMarkRead, onProceedToCheck }: LearnPhaseProps) {
  const [activeSection, setActiveSection] = useState(0)
  const allRead = readSections.length === unit.syllabus.length

  const currentSection = unit.syllabus[activeSection]

  const handleNext = () => {
    onMarkRead(activeSection)
    if (activeSection < unit.syllabus.length - 1) {
      setActiveSection(activeSection + 1)
    }
  }

  const handleSectionClick = (index: number) => {
    setActiveSection(index)
  }

  return (
    <div className="space-y-6">
      {/* Section navigator */}
      <div className="flex flex-wrap gap-2">
        {unit.syllabus.map((_: SyllabusSection, index) => {
          const isRead = readSections.includes(index)
          const isActive = index === activeSection
          return (
            <button
              key={index}
              onClick={() => handleSectionClick(index)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                isActive
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                  : isRead
                    ? 'border-neon-green/30 bg-neon-green/5 text-neon-green'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              {isRead ? (
                <Icon name="check" className="h-3 w-3" />
              ) : (
                <span className="text-[10px]">{(index + 1).toString().padStart(2, '0')}</span>
              )}
              <span>{unit.syllabus[index].heading.length > 25 ? unit.syllabus[index].heading.slice(0, 25) + '...' : unit.syllabus[index].heading}</span>
            </button>
          )
        })}
      </div>

      {/* Section content */}
      <div key={activeSection} className="view-enter rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neon-cyan">
            SECTION {activeSection + 1} / {unit.syllabus.length}
          </span>
          {readSections.includes(activeSection) && (
            <span className="flex items-center gap-1 rounded bg-neon-green/10 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-green">
              <Icon name="check" className="h-2.5 w-2.5" /> READ
            </span>
          )}
        </div>

        <h3 className="mb-4 font-mono text-xl font-bold text-white sm:text-2xl">
          {currentSection.heading}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">
          {currentSection.body}
        </p>

        {/* Key Terms */}
        {currentSection.keyTerms && currentSection.keyTerms.length > 0 && (
          <div className="rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 p-4">
            <h4 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neon-cyan">
              <Icon name="book" className="h-3.5 w-3.5" />
              Key Terms
            </h4>
            <div className="space-y-2">
              {currentSection.keyTerms.map((kt) => (
                <div key={kt.term} className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                  <span className="shrink-0 font-mono text-sm font-bold text-neon-cyan sm:w-48">
                    {kt.term}
                  </span>
                  <span className="text-sm text-slate-300">{kt.definition}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 font-mono text-sm font-medium text-slate-300 transition-all disabled:cursor-not-allowed disabled:opacity-30 hover:border-slate-600 hover:text-white"
          >
            <Icon name="arrowLeft" className="h-4 w-4" />
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={activeSection === unit.syllabus.length - 1 && readSections.includes(activeSection)}
            className="flex items-center gap-1.5 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 font-mono text-sm font-medium text-neon-cyan transition-all hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {activeSection < unit.syllabus.length - 1 ? 'Mark Read & Next' : 'Mark as Read'}
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </div>

        {allRead && (
          <button
            onClick={onProceedToCheck}
            className="flex items-center justify-center gap-2 rounded-lg border border-neon-green/40 bg-neon-green/10 px-6 py-2 font-mono text-sm font-bold text-neon-green transition-all hover:bg-neon-green/20 animate-fade-in"
          >
            <Icon name="clipboardCheck" className="h-4 w-4" />
            Proceed to Check Phase
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-500"
            style={{ width: `${(readSections.length / unit.syllabus.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs font-medium text-slate-400">
          {readSections.length}/{unit.syllabus.length} sections
        </span>
      </div>
    </div>
  )
}
