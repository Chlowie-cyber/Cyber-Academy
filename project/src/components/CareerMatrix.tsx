import { CAREER_PHASES } from '../data/curriculum'
import { Icon } from './Icon'

const ESSENTIAL_TOOLS = [
  { name: 'Wireshark', use: 'Packet capture & network analysis' },
  { name: 'Nmap', use: 'Port scanning & network discovery' },
  { name: 'Kali Linux', use: 'Penetration testing OS toolkit' },
  { name: 'Burp Suite', use: 'Web application security testing' },
  { name: 'Metasploit', use: 'Exploit development & testing framework' },
  { name: 'Splunk', use: 'SIEM log aggregation & analysis' },
  { name: 'Microsoft Defender', use: 'Endpoint detection & response' },
  { name: 'John the Ripper', use: 'Password strength auditing' },
]

const LEARNING_RESOURCES = [
  { name: 'TryHackMe', type: 'Hands-on labs' },
  { name: 'Hack The Box', type: 'Hands-on labs' },
  { name: 'OWASP', type: 'Web security standards' },
  { name: 'SANS Institute', type: 'Professional training' },
  { name: 'Coursera', type: 'Structured courses' },
  { name: 'Udemy', type: 'Structured courses' },
  { name: 'YouTube', type: 'Free video tutorials' },
]

const CAREER_PATHS = [
  'SOC Analyst',
  'Security Engineer',
  'Penetration Tester',
  'Incident Responder',
  'Threat Hunter',
  'Security Architect',
  'GRC Analyst',
  'Cloud Security Engineer',
  'CISO',
]

export function CareerMatrix() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-slate-900 px-3 py-1">
          <Icon name="target" className="h-3.5 w-3.5 text-neon-cyan" />
          <span className="font-mono text-xs font-medium text-neon-cyan">CAREER MATRIX</span>
        </div>
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          The 5-Phase Career Roadmap
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          From foundation to elite — your complete cybersecurity certification journey
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-green to-neon-cyan md:left-1/2" />

        <div className="space-y-8">
          {CAREER_PHASES.map((phase) => (
            <div
              key={phase.id}
              className={`relative flex items-start gap-6 ${
                phase.id % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neon-cyan bg-slate-950">
                  <span className="font-mono text-xs font-bold text-neon-cyan">{phase.id}</span>
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-12 flex-1 md:ml-0 md:w-1/2 ${phase.id % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-5 transition-all hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  {/* Phase header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-neon-cyan">
                        PHASE {phase.id}
                      </span>
                      <h3 className="font-mono text-lg font-bold text-white">{phase.name}</h3>
                    </div>
                    <div className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1">
                      <span className="font-mono text-[10px] font-medium text-slate-300">
                        {phase.timeframe}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-slate-400">{phase.description}</p>

                  {/* Certifications */}
                  <div className="space-y-2">
                    {phase.certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                          cert.status === 'active'
                            ? 'border-neon-cyan/30 bg-neon-cyan/5'
                            : cert.status === 'elite'
                              ? 'border-neon-yellow/30 bg-neon-yellow/5'
                              : 'border-slate-700/50 bg-slate-800/30'
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded ${
                            cert.status === 'active'
                              ? 'bg-neon-cyan/20'
                              : cert.status === 'elite'
                                ? 'bg-neon-yellow/20'
                                : 'bg-slate-700'
                          }`}
                        >
                          {cert.status === 'active' ? (
                            <Icon name="zap" className="h-3.5 w-3.5 text-neon-cyan" />
                          ) : cert.status === 'elite' ? (
                            <Icon name="award" className="h-3.5 w-3.5 text-neon-yellow" />
                          ) : (
                            <Icon name="target" className="h-3.5 w-3.5 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-white">{cert.name}</span>
                            {cert.status === 'active' && (
                              <span className="rounded bg-neon-cyan/20 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-neon-cyan">
                                Active
                              </span>
                            )}
                            {cert.status === 'elite' && (
                              <span className="rounded bg-neon-yellow/20 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-neon-yellow">
                                Elite
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-slate-400">{cert.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
      {/* Essential Tools */}
      <div className="mt-16">
        <div className="mb-6 text-center">
          <h3 className="font-mono text-xl font-bold text-white">Essential Tools</h3>
          <p className="mt-1 text-sm text-slate-400">The toolkit every security analyst reaches for</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ESSENTIAL_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-4 transition-colors hover:border-neon-cyan/40"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md border border-neon-cyan/30 bg-neon-cyan/10">
                <Icon name="terminal" className="h-4 w-4 text-neon-cyan" />
              </div>
              <p className="font-mono text-sm font-bold text-white">{tool.name}</p>
              <p className="mt-1 text-xs text-slate-400">{tool.use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="mt-16">
        <div className="mb-6 text-center">
          <h3 className="font-mono text-xl font-bold text-white">Learning Resources</h3>
          <p className="mt-1 text-sm text-slate-400">Where to practice and go deeper</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {LEARNING_RESOURCES.map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-2.5 transition-colors hover:border-neon-cyan/40"
            >
              <Icon name="book" className="h-4 w-4 text-neon-cyan" />
              <span className="font-mono text-sm font-bold text-white">{r.name}</span>
              <span className="font-mono text-[10px] text-slate-500">· {r.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Career Paths */}
      <div className="mt-16">
        <div className="mb-6 text-center">
          <h3 className="font-mono text-xl font-bold text-white">Career Paths</h3>
          <p className="mt-1 text-sm text-slate-400">Where this journey can take you</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {CAREER_PATHS.map((path) => (
            <span
              key={path}
              className="flex items-center gap-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 px-3 py-1.5 font-mono text-xs font-bold text-neon-green"
            >
              <Icon name="briefcase" className="h-3 w-3" />
              {path}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
