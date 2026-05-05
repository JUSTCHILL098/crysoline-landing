import { useEffect, useRef } from 'react'
import BlurText from './BlurText'
import TypeWriter from './TypeWriter'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
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
      padding: '120px 2rem 80px',
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
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <source src="https://lightbox.shadcn.io/hero_bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, var(--bg) 100%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Badge */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        border: '1px solid var(--border)',
        borderRadius: 100, padding: '6px 16px',
        marginBottom: '2rem',
        background: 'var(--bg2)',
        animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        opacity: 0,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#22c55e', boxShadow: '0 0 8px #22c55e',
          display: 'inline-block',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500, letterSpacing: '0.02em' }}>
          Trusted by developers worldwide
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        position: 'relative', zIndex: 2,
        fontSize: 'clamp(2rem, 5vw, 3.8rem)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 1.1,
        textAlign: 'center',
        maxWidth: 820,
        marginBottom: '1.5rem',
        animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards',
        opacity: 0,
      }}>
        The Ultimate API for{' '}
        <TypeWriter
          words={['Anime', 'Manga', 'Hentai', 'Light Novels']}
          style={{ color: 'var(--text)', display: 'inline' }}
        />
        {' '}& More
      </h1>

      {/* Subheading with BlurText */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '2.5rem' }}>
        <BlurText
          text="Access comprehensive data for anime, manga, and light novels through our powerful REST API. Built for developers who move fast."
          delay={60}
          animateBy="words"
          direction="bottom"
          stepDuration={0.35}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'var(--text2)',
            textAlign: 'center',
            maxWidth: 560,
            lineHeight: 1.7,
            fontWeight: 400,
            justifyContent: 'center',
          }}
        />
      </div>

      {/* CTA Buttons */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
        animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s forwards',
        opacity: 0,
      }}>
        <button
          onClick={() => navigate('/docs')}
          className="cta-btn cta-primary"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 0,
            background: 'var(--text)', color: 'var(--bg)',
            padding: '13px 28px', borderRadius: 10,
            fontSize: 14, fontWeight: 700,
            border: '1px solid var(--text)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <span>Get Started</span>
          <span className="cta-arrow" style={{
            display: 'inline-block', maxWidth: 0, opacity: 0, overflow: 'hidden',
            transition: 'max-width 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, margin 0.3s ease',
            marginLeft: 0,
          }}>→</span>
        </button>
        <button
          onClick={() => navigate('/docs')}
          className="cta-btn cta-secondary"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 0,
            background: 'transparent', color: 'var(--text)',
            padding: '13px 28px', borderRadius: 10,
            fontSize: 14, fontWeight: 600,
            border: '1px solid var(--border)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <span>View Docs</span>
          <span className="cta-arrow" style={{
            display: 'inline-block', maxWidth: 0, opacity: 0, overflow: 'hidden',
            transition: 'max-width 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, margin 0.3s ease',
            marginLeft: 0,
          }}>→</span>
        </button>
      </div>

      <style>{`
        .cta-btn:hover .cta-arrow {
          max-width: 24px !important;
          opacity: 1 !important;
          margin-left: 8px !important;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px var(--glow);
        }
        .cta-secondary:hover {
          border-color: var(--border-hover) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Stats row */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', gap: '3rem', marginTop: '5rem',
        flexWrap: 'wrap', justifyContent: 'center',
        animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s forwards',
        opacity: 0,
      }}>
        {[
          { value: '60+', label: 'Providers' },
          { value: '99.9%', label: 'Uptime' },
          { value: '< 50ms', label: 'Avg Response' },
          { value: '∞', label: 'Possibilities' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
            }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4, fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 3s ease-in-out infinite',
        zIndex: 2,
      }}>
        <span style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text3), transparent)' }} />
      </div>
    </section>
  )
}
