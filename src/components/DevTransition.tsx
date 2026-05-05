import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface DevTransitionProps {
  onDone: () => void
}

const LINES = [
  { text: 'oh, look who is here.', delay: 0 },
  { text: 'a dev ?', delay: 1200 },
  { text: 'you found the hidden path.', delay: 2600 },
  { text: 'initializing dev portal...', delay: 4000 },
]

export default function DevTransition({ onDone }: DevTransitionProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Show lines one by one
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })

    // Start exit after last line + pause
    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 700)
    }, 5400)

    return () => clearTimeout(exitTimer)
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99998,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Scanline effect */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
          }} />

          {/* Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'center', padding: '0 2rem' }}>
            {LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
                animate={visibleLines.includes(i)
                  ? { opacity: i === LINES.length - 1 ? [0, 0.6, 0.4, 0.7, 0.5, 1] : 1, filter: 'blur(0px)', y: 0 }
                  : { opacity: 0, filter: 'blur(12px)', y: 10 }
                }
                transition={{
                  duration: i === LINES.length - 1 ? 0.8 : 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
                  fontSize: i === 1
                    ? 'clamp(2.5rem, 8vw, 5rem)'
                    : i === 0
                      ? 'clamp(1rem, 2.5vw, 1.4rem)'
                      : 'clamp(0.85rem, 1.8vw, 1rem)',
                  fontWeight: i === 1 ? 900 : i === 0 ? 600 : 400,
                  color: i === 1 ? '#fff' : i === LINES.length - 1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)',
                  letterSpacing: i === 1 ? '-0.04em' : '0.02em',
                  lineHeight: 1.1,
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: 0, left: 0, height: 1,
              background: 'rgba(255,255,255,0.3)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5.4, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
