import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })
  const hovered = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }
    }
    window.addEventListener('mousemove', move)

    let raf: number
    const animate = () => {
      const ease = hovered.current ? 0.08 : 0.14
      const trailEase = 0.06

      ring.current.x += (pos.current.x - ring.current.x) * ease
      ring.current.y += (pos.current.y - ring.current.y) * ease
      trail.current.x += (pos.current.x - trail.current.x) * trailEase
      trail.current.y += (pos.current.y - trail.current.y) * trailEase

      if (ringRef.current) {
        const size = hovered.current ? 44 : 28
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.opacity = hovered.current ? '0.8' : '0.35'
        ringRef.current.style.borderColor = hovered.current ? 'var(--text)' : 'var(--text2)'
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 4}px, ${trail.current.y - 4}px)`
        trailRef.current.style.opacity = hovered.current ? '0' : '0.15'
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onEnter = () => { hovered.current = true }
    const onLeave = () => { hovered.current = false }

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Sharp dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--text)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid var(--text2)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0.35,
          transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, border-color 0.25s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Slow ghost trail */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--text)',
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: 0.15,
          filter: 'blur(2px)',
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
