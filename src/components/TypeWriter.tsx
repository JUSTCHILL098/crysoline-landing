import { useState, useEffect } from 'react'

interface TypeWriterProps {
  words: string[]
  speed?: number
  deleteSpeed?: number
  pause?: number
  style?: React.CSSProperties
}

export default function TypeWriter({ words, speed = 80, deleteSpeed = 40, pause = 2000, style }: TypeWriterProps) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pause)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) setIsPaused(true)
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(t)
  }, [text, isDeleting, isPaused, wordIndex, words, speed, deleteSpeed, pause])

  return (
    <span style={style}>
      {text}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1.1em',
        background: 'currentColor',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        borderRadius: '1px',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}
