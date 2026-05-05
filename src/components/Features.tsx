import AnimatedSection from './AnimatedSection'
import { Zap, Shield, Globe, Code2, Database, Layers } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Intelligent caching layers deliver near-instant responses. Most endpoints respond in under 50ms.',
    tag: 'performance',
  },
  {
    icon: Shield,
    title: '99.9% Uptime',
    desc: 'Active monitoring and redundant infrastructure keep your app running when it matters most.',
    tag: 'reliability',
  },
  {
    icon: Globe,
    title: '60+ Providers',
    desc: 'Anime, manga, hentai, and light novels across multiple languages — all in one unified API.',
    tag: 'coverage',
  },
  {
    icon: Code2,
    title: 'Simple REST',
    desc: 'Clean, predictable endpoints with consistent JSON responses. Ship in minutes, not days.',
    tag: 'dx',
  },
  {
    icon: Database,
    title: 'Rich Metadata',
    desc: 'Episodes, streaming sources, chapters, pages, and detailed info — everything in one request.',
    tag: 'data',
  },
  {
    icon: Layers,
    title: 'Multi-Provider',
    desc: 'One interface, dozens of sources. Switch providers with a single query param.',
    tag: 'flexibility',
  },
]

const tagColors: Record<string, string> = {
  performance: '#f59e0b',
  reliability: '#22c55e',
  coverage: '#60a5fa',
  dx: '#a78bfa',
  data: '#f472b6',
  flexibility: '#34d399',
}

export default function Features() {
  return (
    <section id="features" style={{ padding: '100px 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--text3)',
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
        }}>Why Crysoline</p>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.1, marginBottom: '1rem',
        }}>
          Everything you need,<br />nothing you don't
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
          Built for developers who want to ship fast without compromising on quality or coverage.
        </p>
      </AnimatedSection>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {features.map((f, i) => {
          const Icon = f.icon
          const color = tagColors[f.tag]
          return (
            <AnimatedSection key={f.title} delay={i * 70}>
              <div
                style={{
                  padding: '1.75rem',
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'default',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color + '60'
                  e.currentTarget.style.background = 'var(--bg3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--bg2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Subtle glow in corner */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 80, height: 80,
                  background: `radial-gradient(circle at top right, ${color}12, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Icon + tag row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 9,
                    background: color + '15',
                    border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color,
                  }}>
                    <Icon size={17} />
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: color,
                    background: color + '12',
                    border: `1px solid ${color}25`,
                    padding: '2px 8px', borderRadius: 4,
                    fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
                  }}>{f.tag}</span>
                </div>

                <h3 style={{
                  fontSize: 15, fontWeight: 700,
                  letterSpacing: '-0.02em', marginBottom: '0.5rem',
                }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            </AnimatedSection>
          )
        })}
      </div>
    </section>
  )
}
