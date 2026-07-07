import { useAppState } from './hooks/useAppState'
import { UNITS } from './data/curriculum'
import { Header } from './components/Header'
import { UnitGrid } from './components/UnitGrid'
import { UnitDetail } from './components/UnitDetail'
import { CareerMatrix } from './components/CareerMatrix'
import { Icon } from './components/Icon'
import { useState } from 'react'
import { ActivityGrid } from './components/ActivityGrid'

export default function App() {
  const app = useAppState()
  const [showCareer, setShowCareer] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const[showSimulationJobs, setShowSimulationJobs] = useState(false)
  const[streakCount, setStreakCount] = useState(0)

  const currentUnitId = app.state.currentUnitId
  const currentUnit = currentUnitId ? UNITS.find((u) => u.id === currentUnitId) : null
  const currentProgress = currentUnitId ? app.getUnitProgress(currentUnitId) : null

  const handleReset = () => {
    setShowResetConfirm(true)
  }

  const confirmReset = () => {
    app.resetAllProgress()
    setShowResetConfirm(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />

      {/* Header */}
      <Header 
        xp={app.state.xp}   
        totalCompleted={app.totalCompleted} 
        totalUnits={UNITS.length} 
        onReset={() => setShowResetConfirm(true)}
        showSimulationJobs={showSimulationJobs}
        setShowSimulationJobs={setShowSimulationJobs}
        streakCount={streakCount}
      />


            {/* Main content */}
      {/* Main content */}
      <main className="relative">
        {showSimulationJobs ? (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn space-y-8">
            
            {/* Real-time Activity Sync Section */}
            <ActivityGrid />

            {/* Forage Recommended Jobs Dashboard */}
            <div>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold font-mono text-white tracking-tight">
                    RECOMMENDED <span className="text-neon-cyan neon-text-cyan">FORAGE EXPERIENCES</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Complete these free virtual simulator projects to build your portfolio, display them on your LinkedIn, and impress tech hiring managers.
                  </p>
                </div>
                <span className="inline-flex self-start sm:self-center items-center gap-1 rounded border border-dashed border-neon-cyan/40 bg-neon-cyan/5 px-2.5 py-1 font-mono text-xs text-neon-cyan font-bold">
                  TARGET MATCH: JUNIOR SOC ANALYST
                </span>
              </div>

              {/* Grid of Forage Simulations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Job 1 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col justify-between group hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.08)] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-2">
                      <span>J.P. MORGAN CHASE & CO.</span>
                      <span className="text-neon-green font-bold">FREE ACCESS</span>
                    </div>
                    <h4 className="font-mono text-base font-bold text-white group-hover:text-neon-cyan transition-colors">
                      Cybersecurity Virtual Experience
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                      Analyze a real-world system breach scenario. Walk through technical data collection, identify compromised endpoints, and practice setting up foundational firewall filtering rules.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="bg-slate-950 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800">Log Analysis</span>
                      <span className="bg-slate-950 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800">Spam Filtering</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.theforage.com/simulations/jpmorgan-chase/cybersecurity-awv3" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-5 w-full text-center rounded-lg bg-slate-950 border border-slate-800 py-2 font-mono text-xs font-bold text-slate-300 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all flex items-center justify-center gap-1.5"
                  >
                    Launch Simulation <Icon name="arrowRight" className="h-3 w-3" />
                  </a>
                </div>

                {/* Job 2 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col justify-between group hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.08)] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-2">
                      <span>MASTERCARD</span>
                      <span className="text-neon-green font-bold">FREE ACCESS</span>
                    </div>
                    <h4 className="font-mono text-base font-bold text-white group-hover:text-neon-cyan transition-colors">
                      Cybersecurity Talent Accelerator
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                      Dive deep into enterprise security principles. Learn how to conduct professional vulnerability assessments, triage corporate data architecture design issues, and defend against corporate phishing campaigns.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="bg-slate-950 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800">Phishing Triage</span>
                      <span className="bg-slate-950 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800">Risk Assessment</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.theforage.com/simulations/mastercard/cybersecurity-v9as" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-5 w-full text-center rounded-lg bg-slate-950 border border-slate-800 py-2 font-mono text-xs font-bold text-slate-300 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all flex items-center justify-center gap-1.5"
                  >
                    Launch Simulation <Icon name="arrowRight" className="h-3 w-3" />
                  </a>
                </div>

                {/* Job 3 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col justify-between group hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.08)] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-2">
                      <span>AIG</span>
                      <span className="text-neon-green font-bold">FREE ACCESS</span>
                    </div>
                    <h4 className="font-mono text-base font-bold text-white group-hover:text-neon-cyan transition-colors">
                      Cybersecurity Virtual Simulator
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                      Act as an incident responder investigating a suspicious network data spike. Walk through network topology logs, identify unauthorized IP connections, and plan a containment strategy.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="bg-slate-950 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800">Incident Response</span>
                      <span className="bg-slate-950 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800">Wireshark Basics</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.theforage.com/simulations/aig/cybersecurity-eubn" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-5 w-full text-center rounded-lg bg-slate-950 border border-slate-800 py-2 font-mono text-xs font-bold text-slate-300 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all flex items-center justify-center gap-1.5"
                  >
                    Launch Simulation <Icon name="arrowRight" className="h-3 w-3" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        ) : currentUnit && currentProgress ? (
          <UnitDetail
            unit={currentUnit}
            progress={currentProgress}
            onBack={app.closeUnit}
            onMarkRead={(sectionIndex) => app.markSectionRead(currentUnit.id, sectionIndex)}
            onSetPhase={(phase) => app.setPhase(currentUnit.id, phase)}
            onAnswerCheckIn={(questionId, answerIndex) => app.answerCheckIn(currentUnit.id, questionId, answerIndex, false)}
            onCompleteCheckIns={() => app.completeCheckIns(currentUnit.id)}
            onAnswerExam={(questionId, answerIndex) => app.answerExamQuestion(currentUnit.id, questionId, answerIndex)}
            onExamWrong={(questionId) => app.markExamWrong(currentUnit.id, questionId)}
            onResetToLearn={() => app.resetExam(currentUnit.id)}
            onPassExam={() => app.passExam(currentUnit.id)}
            onUnlockNext={() => app.unlockNextUnit(currentUnit.id)}
            isLastUnit={currentUnit.id === UNITS.length}
          />
        ) : showCareer ? (
          <div>
            <CareerMatrix />
            <div className="mx-auto max-w-7xl px-4 pb-12 text-center sm:px-6 lg:px-8">
              <button
                onClick={() => setShowCareer(false)}
                className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-2 font-mono text-sm font-medium text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan mx-auto"
              >
                <Icon name="arrowLeft" className="h-4 w-4" />
                Back to Training Modules
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Hero section */}
            <div className="relative overflow-hidden border-b border-slate-800">
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-slate-900 px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
                    </span>
                    <span className="font-mono text-xs font-medium text-neon-cyan">SYSTEM ACTIVE</span>
                  </div>
                  <h2 className="font-mono text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Welcome, <span className="text-neon-cyan neon-text-cyan">Chlowie</span>
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
                    Your personalized cybersecurity training academy. Master 8 units, earn XP, and build a portfolio
                    that launches your career. Progress through the loop: <span className="font-mono text-neon-cyan">Learn → Check → Test → Unlock</span>
                  </p>

                  {/* Stats */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-5 py-3">
                      <div className="font-mono text-2xl font-bold text-neon-cyan">{app.totalXP || app.state.xp}</div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">Total XP</div>
                    </div>
                    <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-5 py-3">
                      <div className="font-mono text-2xl font-bold text-neon-green">{app.totalCompleted}/{UNITS.length}</div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">Units Completed</div>
                    </div>
                    <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-5 py-3">
                      <div className="font-mono text-2xl font-bold text-white">
                        {UNITS.length > 0 ? Math.round((app.totalCompleted / UNITS.length) * 100) : 0}%
                      </div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Grid */}
            <UnitGrid units={app.state.units} onOpenUnit={app.openUnit} />

            {/* Career Matrix toggle */}
            <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
              <button
                onClick={() => setShowCareer(true)}
                className="group flex items-center gap-3 rounded-xl border border-neon-cyan/30 bg-slate-900/50 px-6 py-4 font-mono text-sm font-bold text-neon-cyan transition-all hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] mx-auto"
              >
                <Icon name="target" className="h-5 w-5" />
                View 5-Phase Career Matrix
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <Icon name="shield" className="h-4 w-4 text-neon-cyan" />
              <span className="font-mono text-xs text-slate-500">
                Cyber Academy · Built for Chlowie · Progress saved locally
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span className="text-neon-cyan">●</span> System Online
            </div>
          </div>
        </div>
      </footer>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-xl border border-neon-red/30 bg-slate-900 p-6 view-enter">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neon-red/40 bg-neon-red/10">
                <Icon name="alert" className="h-5 w-5 text-neon-red" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white">Reset All Progress?</h3>
            </div>
            <p className="mb-6 text-sm text-slate-400">
              This will erase all XP, completed units, and progress. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm font-medium text-slate-300 transition-colors hover:border-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 rounded-lg border border-neon-red/40 bg-neon-red/10 px-4 py-2 font-mono text-sm font-bold text-neon-red transition-colors hover:bg-neon-red/20"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}