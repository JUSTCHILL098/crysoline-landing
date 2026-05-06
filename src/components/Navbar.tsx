import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import DevTransition from './DevTransition'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDevTransition, setShowDevTransition] = useState(false)
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => {
    if (navTimer.current) clearTimeout(navTimer.current)
  }, [])

  const handleLogoClick = () => setShowDevTransition(true)

  const handleTransitionDone = useCallback(() => {
    setShowDevTransition(false)
    navigate('/dev')
  }, [navigate])

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
  ]

  const handleNav = (href: string) => {
    setMenuOpen(false)
    navigate(href)
  }

  return (
    <>
      {showDevTransition && <DevTransition onDone={handleTransitionDone} />}

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        {/* Logo → dev transition */}
        <button
          onClick={handleLogoClick}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px', padding: 0,
          }}
        >
          <img src="https://dev.dash.crysoline.moe/crysoline.svg" alt="Crysoline" style={{ width: 28, height: 28 }} />
          <span style={{
            color: '#fff', fontWeight: 700, fontSize: 16,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
          }}>Crysoline</span>
        </button>

        {/* Desktop pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
          {links.map(link => {
            const active = location.pathname === link.href
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                style={{
                  background: active ? '#fff' : 'rgba(255,255,255,0.06)',
                  color: active ? '#000' : 'rgba(255,255,255,0.6)',
                  border: `1px solid ${active ? '#fff' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                  padding: '6px 16px',
                  borderRadius: 100,
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: '-0.01em',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '6px 8px',
            cursor: 'pointer', color: '#fff',
            display: 'none',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '64px', left: 0, right: 0,
            background: 'rgba(0,0,0,0.95)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '1rem 2rem',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            {links.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 500,
                  textAlign: 'left', padding: '0.5rem 0',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
        `}</style>
      </nav>
    </>
  )
}
