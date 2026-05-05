import { useState, useEffect, useRef, useCallback } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import DevTransition from './DevTransition'

interface NavbarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDevTransition, setShowDevTransition] = useState(false)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => {
    if (hintTimer.current) clearTimeout(hintTimer.current)
    if (navTimer.current) clearTimeout(navTimer.current)
  }, [])

  const handleLogoClick = () => {
    setShowDevTransition(true)
  }

  const handleTransitionDone = useCallback(() => {
    setShowDevTransition(false)
    navigate('/dev')
  }, [navigate])

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ]

  const handleNav = (href: string) => {
    setMenuOpen(false)
    navigate(href)
  }

  return (
    <>
      {/* Dev transition overlay */}
      {showDevTransition && <DevTransition onDone={handleTransitionDone} />}
      {/* Custom cursor */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        #crys-cursor {
          position: fixed;
          top: 0; left: 0;
          width: 18px; height: 18px;
          pointer-events: none;
          z-index: 999999;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-geist-mono, 'JetBrains Mono', monospace);
          font-size: 10px;
          font-weight: 700;
          color: var(--text);
          mix-blend-mode: difference;
          user-select: none;
          letter-spacing: -0.05em;
          white-space: nowrap;
          transition: opacity 0.2s ease;
        }
        #crys-cursor.hovering {
          transform: scale(1.5);
          transition: transform 0.15s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
        }
        @media (max-width: 768px) {
          *, *::before, *::after { cursor: auto !important; }
          #crys-cursor { display: none !important; }        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Logo → triggers dev transition */}
        <button
          onClick={handleLogoClick}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: '10px', padding: 0,
          }}
        >
          <img
            src="https://dev.dash.crysoline.moe/crysoline.svg"
            alt="Crysoline"
            style={{ width: 28, height: 28 }}
          />
          <span style={{
            color: 'var(--text)', fontWeight: 700, fontSize: 16,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
          }}>Crysoline</span>
        </button>

        {/* Desktop — separate pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
          {links.map(link => {
            const active = location.pathname === link.href
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                style={{
                  background: active ? 'var(--text)' : 'var(--bg2)',
                  color: active ? 'var(--bg)' : 'var(--text2)',
                  border: `1px solid ${active ? 'var(--text)' : 'var(--border)'}`,
                  cursor: 'none',
                  padding: '6px 16px',
                  borderRadius: 100,
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: '-0.01em',
                  transition: 'background 0.25s cubic-bezier(0.16,1,0.3,1), color 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'var(--bg3)'
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.borderColor = 'var(--border-hover)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'var(--bg2)'
                    e.currentTarget.style.color = 'var(--text2)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }
                }}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: 8, padding: '6px 8px',
              cursor: 'none', color: 'var(--text2)',
              display: 'flex', alignItems: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: 8, padding: '6px 8px',
              cursor: 'none', color: 'var(--text)',
              display: 'none',
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '64px', left: 0, right: 0,
            background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
            padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {links.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text2)', fontSize: 15, fontWeight: 500,
                  textAlign: 'left', padding: 0,
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

      {/* Custom cursor element */}
      <CustomCursor />
    </>
  )
}

function CustomCursor() {
  useEffect(() => {
    const el = document.getElementById('crys-cursor')
    if (!el) return

    // Start at center so it doesn't jump from top-left
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x, ty = y
    let raf: number
    let hasMoved = false

    // Hide until first mouse move
    el.style.opacity = '0'

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!hasMoved) {
        x = tx; y = ty
        el.style.opacity = '1'
        hasMoved = true
      }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.left = `${x - 9}px`
      el.style.top = `${y - 9}px`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onEnter = () => el.classList.add('hovering')
    const onLeave = () => el.classList.remove('hovering')

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return <div id="crys-cursor">&lt;/&gt;</div>
}
