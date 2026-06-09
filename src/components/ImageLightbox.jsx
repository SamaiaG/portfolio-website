import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ImageLightbox({ src, alt = '', radius = '20px', style, triggerStyle, imageStyle, children }) {
  const [open, setOpen] = useState(false)
  const [closeHovered, setCloseHovered] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {children
        ? <div
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              cursor: 'zoom-in',
              height: '100%',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hovered ? '0 8px 24px rgba(46, 42, 53, 0.1)' : 'none',
              borderRadius: '16px',
              ...triggerStyle,
            }}
          >{children}</div>
        : (
          <div
            onClick={() => setOpen(true)}
            style={{
              borderRadius: radius,
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              backgroundColor: '#fff',
              padding: '30px',
              cursor: 'zoom-in',
              ...style,
            }}
          >
            <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )
      }

      {open && createPortal(
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(46, 42, 53, 0.45)',
            backdropFilter: 'blur(6px)',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: '28px',
              padding: '48px',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
              width: '90vw',
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              onMouseEnter={() => setCloseHovered(true)}
              onMouseLeave={() => setCloseHovered(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '100px',
                border: `1px solid ${closeHovered ? 'rgb(46, 42, 53)' : 'rgba(46, 42, 53, 0.15)'}`,
                backgroundColor: closeHovered ? 'rgb(46, 42, 53)' : 'transparent',
                color: closeHovered ? '#fff' : 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                lineHeight: 1,
                flexShrink: 0,
                transition: 'background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease',
              }}
            >
              ✕
            </button>

            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '12px',
                ...imageStyle,
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
