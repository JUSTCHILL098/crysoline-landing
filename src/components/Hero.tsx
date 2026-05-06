import { useState, useEffect, useRef } from 'react'

const WORDS = ['Anime', 'Manga', 'Hentai', 'Light Novels']

function BlurWord() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length)
        setFading(false)
      }, 350)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{
      display: 'inline-block',
      filter: fading ? 'blur(8px)' : 'blur(0px)',
      opacity: fading ? 0 : 1,
      transform: fading ? 'translateY(4px)' : 'translateY(0)',
      transition: 'filter 0.35s ease, opacity 0.35s ease, transform 0.35s ease',
      minWidth: '6ch',
      textAlign: 'left',
    }}>
      {WORDS[index]}
    </span>
  )
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6
    }
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 1.5rem',
      overflow: 'hidden',
    }}>
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.22,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <source src="https://lightbox.shadcn.io/hero_bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content — fixed layout, no shifting */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        width: '100%', maxWidth: 860,
        gap: 0,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid var(--border)',
          borderRadius: 100, padding: '5px 14px',
          marginBottom: '1.75rem',
          background: 'rgba(255,255,255,0.04)',
          animation: 'fadeIn 0.6s ease forwards',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#22c55e', boxShadow: '0 0 8px #22c55e',
            display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
            Trusted by developers worldwide
          </span>
        </div>

        {/* Headline — fixed height, no layout shift */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.7s ease 0.1s both',
          whiteSpace: 'nowrap',
        }}>
          The API for{' '}
          <BlurWord />
        </h1>

        {/* Subheading — static, no animation */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'var(--text2)',
          maxWidth: 520,
          lineHeight: 1.7,
          fontWeight: 400,
          marginBottom: '2.5rem',
          animation: 'fadeIn 0.7s ease 0.2s both',
        }}>
          Access anime, manga, hentai, and light novel data from 60+ providers
          through one clean REST API.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '4rem',
          animation: 'fadeIn 0.7s ease 0.3s both',
        }}>
          <button
            onClick={() => {
              const el = document.getElementById('quick-start')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="cta-btn cta-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 0,
              background: '#fff', color: '#000',
              padding: '12px 26px', borderRadius: 10,
              fontSize: 14, fontWeight: 700,
              border: '1px solid #fff',
              transition: 'all 0.25s ease',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <span>Get Started</span>
            <span className="cta-arrow" style={{
              display: 'inline-block', maxWidth: 0, opacity: 0, overflow: 'hidden',
              transition: 'max-width 0.25s ease, opacity 0.25s ease, margin 0.25s ease',
              marginLeft: 0,
            }}>→</span>
          </button>
          <a
            href="https://docs.crysoline.moe"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 0,
              background: 'transparent', color: '#fff',
              padding: '12px 26px', borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.25s ease',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <span>View Docs</span>
            <span className="cta-arrow" style={{
              display: 'inline-block', maxWidth: 0, opacity: 0, overflow: 'hidden',
              transition: 'max-width 0.25s ease, opacity 0.25s ease, margin 0.25s ease',
              marginLeft: 0,
            }}>→</span>
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: '2.5rem',
          flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeIn 0.7s ease 0.4s both',
        }}>
          {[
            { value: '60+', label: 'Providers' },
            { value: '99.9%', label: 'Uptime' },
            { value: '<50ms', label: 'Avg Response' },
            { value: 'Free', label: 'To Start' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: '#fff',
              }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cta-btn:hover .cta-arrow {
          max-width: 24px !important;
          opacity: 1 !important;
          margin-left: 8px !important;
        }
        .cta-primary:hover {
          background: transparent !important;
          color: #fff !important;
        }
        .cta-secondary:hover {
          border-color: rgba(255,255,255,0.5) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        @media (max-width: 600px) {
          h1 { white-space: normal !important; }
        }
      `}</style>
    </section>
  )
}
