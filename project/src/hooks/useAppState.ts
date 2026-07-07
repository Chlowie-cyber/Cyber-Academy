import { useState, useEffect, useCallback } from 'react'
import { UNITS } from '../data/curriculum'

export type UnitStatus = 'locked' | 'unlocked' | 'completed'
export type Phase = 'learn' | 'check' | 'test' | 'unlock'

export interface UnitProgress {
  status: UnitStatus
  currentPhase: Phase
  syllabusReadSections: number[] // indices of read sections
  checkInAnswers: Record<string, number> // questionId -> selected index
  checkInCompleted: boolean
  examAnswers: Record<string, number> // questionId -> selected index
  examPassed: boolean
  examVariantIndex: Record<string, number> // questionId -> which variant is active
  examWrongAttempts: Record<string, boolean> // questionId -> was wrong at least once
  unlocked: boolean // has the "Unlock Next Unit" button been clicked
}

export interface AppState {
  xp: number
  units: Record<number, UnitProgress>
  currentUnitId: number | null // which unit is open in the detail view
}

const STORAGE_KEY = 'cyber-academy-state-v1'
const XP_PER_UNIT = 300

function createInitialUnitProgress(status: UnitStatus): UnitProgress {
  return {
    status,
    currentPhase: 'learn',
    syllabusReadSections: [],
    checkInAnswers: {},
    checkInCompleted: false,
    examAnswers: {},
    examPassed: false,
    examVariantIndex: {},
    examWrongAttempts: {},
    unlocked: false,
  }
}

function getInitialState(): AppState {
  const units: Record<number, UnitProgress> = {}
  UNITS.forEach((unit, index) => {
    units[unit.id] = createInitialUnitProgress(index === 0 ? 'unlocked' : 'locked')
  })
  return {
    xp: 0,
    units,
    currentUnitId: null,
  }
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getInitialState()
    const parsed = JSON.parse(raw) as AppState
    // Validate structure — if unit count doesn't match, reset
    if (!parsed.units || Object.keys(parsed.units).length !== UNITS.length) {
      return getInitialState()
    }
    return parsed
  } catch {
    return getInitialState()
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(getInitialState)

  // Load from localStorage on mount
  useEffect(() => {
    setState(loadState())
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore quota errors
    }
  }, [state])

  const openUnit = useCallback((unitId: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit || unit.status === 'locked') return prev // strict gating
      return { ...prev, currentUnitId: unitId }
    })
  }, [])

  const closeUnit = useCallback(() => {
    setState((prev) => ({ ...prev, currentUnitId: null }))
  }, [])

  const markSectionRead = useCallback((unitId: number, sectionIndex: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      if (unit.syllabusReadSections.includes(sectionIndex)) return prev
      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: {
            ...unit,
            syllabusReadSections: [...unit.syllabusReadSections, sectionIndex],
          },
        },
      }
    })
  }, [])

  const setPhase = useCallback((unitId: number, phase: Phase) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      return {
        ...prev,
        units: { ...prev.units, [unitId]: { ...unit, currentPhase: phase } },
      }
    })
  }, [])

  const answerCheckIn = useCallback((unitId: number, questionId: string, answerIndex: number, correct: boolean) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: {
            ...unit,
            checkInAnswers: { ...unit.checkInAnswers, [questionId]: answerIndex },
          },
        },
      }
    })
  }, [])

  const completeCheckIns = useCallback((unitId: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: { ...unit, checkInCompleted: true, currentPhase: 'test' },
        },
      }
    })
  }, [])

  const answerExamQuestion = useCallback((unitId: number, questionId: string, answerIndex: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: {
            ...unit,
            examAnswers: { ...unit.examAnswers, [questionId]: answerIndex },
          },
        },
      }
    })
  }, [])

const markExamWrong = useCallback((unitId: number, questionId: string) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev

      // If we already logged this wrong attempt, just make sure the exam is reset — don't re-flip variant twice for the same mistake
      const alreadyWrong = unit.examWrongAttempts?.[questionId]

      const currentVariantIdx = unit.examVariantIndex[questionId] ?? 0

      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: {
            ...unit,
            examWrongAttempts: {
              ...unit.examWrongAttempts,
              [questionId]: true,
            },
            examVariantIndex: alreadyWrong
              ? unit.examVariantIndex
              : {
                  ...unit.examVariantIndex,
                  [questionId]: currentVariantIdx + 1,
                },
          },
        },
      }
    })
  }, [])

  const resetExam = useCallback((unitId: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: {
            ...unit,
            examAnswers: {},
            examPassed: false,
            currentPhase: 'learn', // force back to learn phase
          },
        },
      }
    })
  }, [])

  const passExam = useCallback((unitId: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit) return prev
      return {
        ...prev,
        units: {
          ...prev.units,
          [unitId]: { ...unit, examPassed: true, currentPhase: 'unlock' },
        },
      }
    })
  }, [])

  const unlockNextUnit = useCallback((unitId: number) => {
    setState((prev) => {
      const unit = prev.units[unitId]
      if (!unit || !unit.examPassed) return prev
      const nextUnitId = unitId + 1
      const nextUnit = prev.units[nextUnitId]
      const newUnits = {
        ...prev.units,
        [unitId]: { ...unit, status: 'completed' as UnitStatus, unlocked: true },
      }
      if (nextUnit && nextUnit.status === 'locked') {
        newUnits[nextUnitId] = { ...nextUnit, status: 'unlocked' as UnitStatus }
      }
      return {
        ...prev,
        xp: prev.xp + XP_PER_UNIT,
        units: newUnits,
        currentUnitId: null, // close the unit view, show the grid
      }
    })
  }, [])

  const resetAllProgress = useCallback(() => {
    const fresh = getInitialState()
    setState(fresh)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const getUnitProgress = useCallback((unitId: number): UnitProgress | undefined => {
    return state.units[unitId]
  }, [state])

  const totalCompleted = UNITS.filter((u) => state.units[u.id]?.status === 'completed').length
  const totalXP = state.xp

  return {
    state,
    totalCompleted,
    totalXP,
    XP_PER_UNIT,
    openUnit,
    closeUnit,
    markSectionRead,
    setPhase,
    answerCheckIn,
    completeCheckIns,
    answerExamQuestion,
    markExamWrong,
    resetExam,
    passExam,
    unlockNextUnit,
    resetAllProgress,
    getUnitProgress,
  }
}
