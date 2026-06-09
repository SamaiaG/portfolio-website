import { useEffect, useRef } from 'react'

export default function SectionDivider() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'scaleX(1)'
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="container">
      <div
        ref={ref}
        style={{
          height: '1px',
          backgroundColor: 'var(--color-border)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </div>
  )
}
