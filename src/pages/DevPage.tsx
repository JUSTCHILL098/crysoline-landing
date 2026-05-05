import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurText from '../components/BlurText'
import { Moon, Sun } from 'lucide-react'

export default function DevPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.scrollTo(0, 0)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Minimal nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 56, padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}
        >
          <img src="https://dev.dash.crysoline.moe/crysoline.svg" alt="Crysoline" style={{ width: 22, height: 22 }} />
          <span style={{ color: 'var(--text)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>
            Crysoline
          </span>
        </button>
        <button
          onClick={toggleTheme}
          style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 8, padding: '5px 8px', cursor: 'pointer',
            color: 'var(--text2)', display: 'flex', alignItems: 'center',
            transition: 'all 0.2s',
          }}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      {/* Main content */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 2rem 4rem',
        textAlign: 'center',
      }}>
        {/* Glow */}
        <div style={{
          position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(134,59,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid var(--border)', borderRadius: 100,
          padding: '5px 14px', marginBottom: '2rem',
          background: 'var(--bg2)',
          animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
          opacity: 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#863bff', boxShadow: '0 0 8px #863bff', display: 'inline-block' }} />
          <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500, fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)' }}>
            crysoline / dev
          </span>
        </div>

        {/* Big name */}
        <h1 style={{
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
          animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards',
          opacity: 0,
          background: 'linear-gradient(135deg, var(--text) 0%, rgba(134,59,255,0.8) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          kiruzen
        </h1>

        {/* Blur animated description */}
        <BlurText
          text="Building the infrastructure that powers the next generation of anime applications."
          delay={80}
          animateBy="words"
          direction="bottom"
          stepDuration={0.4}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text2)',
            maxWidth: 560,
            lineHeight: 1.7,
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        />

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s forwards',
          opacity: 0,
          marginBottom: '3rem',
        }}>
          {[
            { value: '60+', label: 'Providers' },
            { value: '99.9%', label: 'Uptime' },
            { value: 'v0.1.6', label: 'API Version' },
            { value: '∞', label: 'Possibilities' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s forwards',
          opacity: 0,
        }}>
          <button
            onClick={() => navigate('/docs')}
            style={{
              background: 'var(--text)', color: 'var(--bg)',
              border: '1px solid var(--text)',
              padding: '11px 24px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--text)'; e.currentTarget.style.color = 'var(--bg)' }}
          >
            API Docs
          </button>
          <button
            onClick={() => navigate('/pricing')}
            style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '11px 24px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            Pricing
          </button>
        </div>
      </main>
    </div>
  )
}
