import { useEffect, useRef, useState } from 'react'

/**
 * Wraps children in a fade-up-on-scroll effect.
 *
 * Props:
 *   delay    — seconds before animation starts (use for staggering siblings)
 *   duration — animation duration in seconds (default 0.65)
 *   distance — how many px to travel upward (default 28)
 *   as       — HTML element to render (default 'div')
 *   style    — additional styles merged onto the wrapper
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  distance = 28,
  as: Tag = 'div',
  style = {},
  className = '',
}) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
