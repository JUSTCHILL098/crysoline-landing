import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'

export default function DevPage() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 2rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Purple glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(134,59,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Breadcrumb tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(134,59,255,0.3)', borderRadius: 100,
            padding: '5px 16px', marginBottom: '2.5rem',
            background: 'rgba(134,59,255,0.08)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#863bff', boxShadow: '0 0 8px #863bff', display: 'inline-block' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>
            crysoline / dev
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 10rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            marginBottom: '1.75rem',
            fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
            background: 'linear-gradient(135deg, #fff 30%, rgba(134,59,255,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          kiruzen
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 500,
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          Building the infrastructure that powers the next generation of anime applications.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex', gap: '3rem', flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: '3rem',
          }}
        >
          {[
            { value: '60+', label: 'Providers' },
            { value: '99.9%', label: 'Uptime' },
            { value: 'v0.1.6', label: 'API Version' },
            { value: '2026', label: 'Founded' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                color: '#fff',
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="https://docs.crysoline.moe"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#fff', color: '#000',
              border: '1px solid #fff',
              padding: '11px 24px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
          >
            API Docs
          </a>
          <button
            onClick={() => navigate('/pricing')}
            style={{
              background: 'transparent', color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '11px 24px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            Pricing
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent', color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '11px 24px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            ← Back to Home
          </button>
        </motion.div>
      </main>
    </div>
  )
}
