import { useState } from 'react'
import { Copy, Check, Terminal, ArrowRight, BookOpen, Layers } from 'lucide-react'

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

// Syntax highlight — returns HTML string
function highlight(code: string, lang: string): string {
  // Escape HTML first
  const esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  if (lang === 'bash') {
    return esc
      .replace(/\b(curl)\b/g, '<span class="kw">$1</span>')
      .replace(/(&quot;[^&]*&quot;)/g, '<span class="str">$1</span>')
  }
  if (lang === 'javascript') {
    return esc
      .replace(/\b(const|await|async|let|var|return)\b/g, '<span class="kw">$1</span>')
      .replace(/\b(fetch|console|log|json|res|data)\b/g, '<span class="fn">$1</span>')
      .replace(/(&#x27;[^&#]*&#x27;|'[^']*')/g, '<span class="str">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="cm">$1</span>')
  }
  if (lang === 'python') {
    return esc
      .replace(/\b(import|print|params)\b/g, '<span class="kw">$1</span>')
      .replace(/\b(requests|get|json|r)\b/g, '<span class="fn">$1</span>')
      .replace(/(&quot;[^&]*&quot;)/g, '<span class="str">$1</span>')
      .replace(/(#.*)/g, '<span class="cm">$1</span>')
  }
  return esc
}

const features = [
  { icon: ArrowRight, text: 'One endpoint pattern across all providers' },
  { icon: BookOpen, text: 'Consistent JSON — no provider-specific parsing' },
  { icon: Layers, text: 'Switch sources with a single query param' },
]

export default function CodeDemo() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(examples[active].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="quick-start" style={{
      padding: '80px 1.5rem',
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="code-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '4rem',
          alignItems: 'start',
        }}>

          {/* ── Left ── */}
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              marginBottom: '1rem',
              fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
            }}>Quick Start</p>

            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              lineHeight: 1.2, marginBottom: '1rem', color: '#fff',
            }}>
              Ship faster.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                Skip the scraping.
              </span>
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 14,
              lineHeight: 1.8, marginBottom: '2rem', maxWidth: 380,
            }}>
              Every provider follows the same URL pattern. Learn once, use everywhere — no custom adapters, no brittle scrapers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {features.map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Icon size={14} style={{ color: 'rgba(255,255,255,0.3)', marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Base URL */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
              }}>BASE URL</span>
              <code style={{
                fontSize: 12, color: '#86efac',
                fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
              }}>api.crysoline.moe</code>
            </div>
          </div>

          {/* ── Right — static terminal ── */}
          <div style={{
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            background: '#0d0d0d',
          }}>
            {/* Title bar */}
            <div style={{
              padding: '10px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#111',
            }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                <Terminal size={10} style={{ color: 'rgba(255,255,255,0.2)' }} />
                <span style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.2)',
                  fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                }}>crysoline — api</span>
              </div>
              <button
                onClick={copy}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 5, padding: '3px 8px', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 11, transition: 'color 0.15s',
                  fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {copied ? <Check size={10} /> : <Copy size={10} />}
                {copied ? 'copied' : 'copy'}
              </button>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#0d0d0d',
              padding: '0 4px',
            }}>
              {examples.map((ex, i) => (
                <button
                  key={ex.label}
                  onClick={() => setActive(i)}
                  style={{
                    padding: '8px 14px', background: 'none', border: 'none',
                    borderBottom: active === i ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
                    cursor: 'pointer', fontSize: 12,
                    fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                    color: active === i ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { if (active !== i) e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                  onMouseLeave={e => { if (active !== i) e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            {/* Static highlighted code */}
            <div style={{ padding: '1.25rem 1.5rem', overflowX: 'auto' }}>
              <pre style={{
                margin: 0,
                fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                fontSize: 13, lineHeight: 1.85,
                color: 'rgba(255,255,255,0.65)',
                whiteSpace: 'pre',
              }}
                dangerouslySetInnerHTML={{ __html: highlight(examples[active].code, examples[active].lang) }}
              />
            </div>

            {/* Status bar */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '8px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 4px #22c55e' }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>200 OK</span>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>
                application/json · ~42ms
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .kw  { color: #a78bfa; }
        .fn  { color: #60a5fa; }
        .str { color: #86efac; }
        .cm  { color: #4b5563; }
        @media (max-width: 768px) {
          .code-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
