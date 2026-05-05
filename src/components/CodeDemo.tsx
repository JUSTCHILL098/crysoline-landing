import { useState, useEffect } from 'react'
import AnimatedSection from './AnimatedSection'
import { Copy, Check, Terminal, Zap, Globe, Lock } from 'lucide-react'

const examples = [
  {
    label: 'Search',
    lang: 'bash',
    code: `curl "https://api.crysoline.moe/api/anime/animeparadise/search?q=one%20piece"`,
  },
  {
    label: 'Info',
    lang: 'javascript',
    code: `const res = await fetch(
  'https://api.crysoline.moe/api/anime/animekai/info/one-piece'
)
const data = await res.json()
console.log(data.title, data.episodes)`,
  },
  {
    label: 'Sources',
    lang: 'python',
    code: `import requests

r = requests.get(
    "https://api.crysoline.moe/api/anime/animekai/sources",
    params={"id": "one-piece", "episodeId": "ep-1"}
)
print(r.json()["sources"])`,
  },
]

function highlight(code: string, lang: string) {
  if (lang === 'bash') {
    return code
      .replace(/(curl)/g, '<span style="color:#a78bfa">$1</span>')
      .replace(/(".*?")/g, '<span style="color:#86efac">$1</span>')
  }
  if (lang === 'javascript') {
    return code
      .replace(/\b(const|await|async|let|var)\b/g, '<span style="color:#a78bfa">$1</span>')
      .replace(/\b(fetch|console|log|json)\b/g, '<span style="color:#60a5fa">$1</span>')
      .replace(/('.*?')/g, '<span style="color:#86efac">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color:#6b7280">$1</span>')
  }
  if (lang === 'python') {
    return code
      .replace(/\b(import|print)\b/g, '<span style="color:#a78bfa">$1</span>')
      .replace(/\b(requests|get|json)\b/g, '<span style="color:#60a5fa">$1</span>')
      .replace(/(".*?")/g, '<span style="color:#86efac">$1</span>')
      .replace(/(#.*)/g, '<span style="color:#6b7280">$1</span>')
  }
  return code
}

// Looping typewriter: type → pause → delete → repeat across all examples
function useLoopTypewriter(examples: { code: string }[], typeSpeed = 18, deleteSpeed = 8, pauseMs = 1800) {
  const [exIdx, setExIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const code = examples[exIdx].code
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < code.length) {
        timeout = setTimeout(() => setDisplayed(code.slice(0, displayed.length + 1)), typeSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), deleteSpeed)
      } else {
        setExIdx(i => (i + 1) % examples.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, phase, exIdx, examples, typeSpeed, deleteSpeed, pauseMs])

  return { displayed, exIdx, phase }
}

const pills = [
  { icon: Zap, label: '< 50ms avg response' },
  { icon: Globe, label: '60+ providers' },
  { icon: Lock, label: 'API key auth' },
]

export default function CodeDemo() {
  const [copied, setCopied] = useState(false)
  const { displayed, exIdx, phase } = useLoopTypewriter(examples)
  const currentExample = examples[exIdx]

  const copy = () => {
    navigator.clipboard.writeText(currentExample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      padding: '100px 2rem',
      background: '#000',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '5rem',
          alignItems: 'center',
        }} className="code-grid">

          {/* ── Left ── */}
          <AnimatedSection direction="left">
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--text3)',
              marginBottom: '1rem',
              fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
            }}>Quick Start</p>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              lineHeight: 1.15, marginBottom: '1.25rem',
            }}>
              One request.<br />
              <span style={{ color: 'var(--text2)', fontWeight: 400 }}>Any provider.</span>
            </h2>

            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, marginBottom: '2rem', maxWidth: 400 }}>
              No SDKs, no wrappers. Just a clean REST API with consistent JSON responses across every source.
            </p>

            {/* Stat pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {pills.map(({ icon: Icon, label }) => (
                <div key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '8px 14px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  width: 'fit-content',
                }}>
                  <Icon size={14} style={{ color: 'var(--text3)' }} />
                  <span style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Base URL chip */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
            }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>BASE URL</span>
              <code style={{ fontSize: 12, color: '#86efac', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>
                api.crysoline.moe
              </code>
            </div>
          </AnimatedSection>

          {/* ── Right — terminal ── */}
          <AnimatedSection direction="right">
            <div style={{
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              background: '#0d0d0d',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}>
              {/* Title bar */}
              <div style={{
                padding: '10px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#111',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                  <Terminal size={11} style={{ color: 'rgba(255,255,255,0.25)' }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>
                    crysoline — api
                  </span>
                </div>
                <button
                  onClick={copy}
                  style={{
                    background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 5, padding: '3px 8px',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.35)',
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 11, transition: 'all 0.2s',
                    fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >
                  {copied ? <Check size={10} /> : <Copy size={10} />}
                  {copied ? 'copied' : 'copy'}
                </button>
              </div>

              {/* Tabs — show which example is active */}
              <div style={{
                display: 'flex', gap: 0,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: '#0d0d0d',
                padding: '0 4px',
              }}>
                {examples.map((ex, i) => (
                  <div
                    key={ex.label}
                    style={{
                      padding: '9px 16px',
                      borderBottom: exIdx === i ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
                      fontSize: 12,
                      fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
                      color: exIdx === i ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                      transition: 'color 0.3s, border-color 0.3s',
                      userSelect: 'none',
                    }}
                  >
                    {ex.label}
                  </div>
                ))}
              </div>

              {/* Code */}
              <div style={{ padding: '1.25rem 1.5rem', overflowX: 'auto', minHeight: 110 }}>
                <pre style={{
                  margin: 0,
                  fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
                  fontSize: 13, lineHeight: 1.9,
                  color: 'rgba(255,255,255,0.7)',
                  whiteSpace: 'pre',
                }}>
                  <span dangerouslySetInnerHTML={{ __html: highlight(displayed, currentExample.lang) }} />
                  <span style={{
                    display: 'inline-block', width: 2, height: '1em',
                    background: phase === 'pausing' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.65)',
                    marginLeft: 1, verticalAlign: 'text-bottom',
                    animation: phase === 'pausing' ? 'blink 0.8s step-end infinite' : 'none',
                  }} />
                </pre>
              </div>

              {/* Status bar */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '9px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>
                    200 OK
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>
                  application/json · ~42ms
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .code-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
