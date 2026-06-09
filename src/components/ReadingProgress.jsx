import { useEffect, useRef } from 'react'

export default function ReadingProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let raf = null

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        const pct = total > 0 ? (scrolled / total) * 100 : 0
        if (barRef.current) barRef.current.style.width = `${pct}%`
        raf = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      zIndex: 60,
      backgroundColor: 'transparent',
    }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          backgroundColor: 'var(--color-accent)',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  )
}
