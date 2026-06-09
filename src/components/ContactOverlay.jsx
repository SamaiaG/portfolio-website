import { useEffect, useState } from 'react'
import { useContact } from '../context/ContactContext'
import Button from './Button'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handle = e => setIsDesktop(e.matches)
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])
  return isDesktop
}

function FormField({ label, type = 'text', value, onChange, multiline }) {
  const [focused, setFocused] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: `1px solid ${focused ? 'rgb(46, 42, 53)' : 'rgba(46, 42, 53, 0.18)'}`,
    fontFamily: 'var(--font-body)',
    fontSize: '20px',
    lineHeight: 1.55,
    color: 'var(--color-text)',
    backgroundColor: '#fff',
    outline: 'none',
    resize: multiline ? 'vertical' : 'none',
    transition: 'border-color 0.18s ease',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
        fontWeight: 500,
        color: 'var(--color-text)',
      }}>
        {label}{' '}
        <span style={{ color: 'var(--color-accent)' }}>•</span>
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          required
          rows={6}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  )
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export default function ContactOverlay() {
  const { isOpen, close } = useContact()
  const isDesktop = useIsDesktop()
  const [form, setForm] = useState({ Name: '', Email: '', Message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [closeHovered, setCloseHovered] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm({ Name: '', Email: '', Message: '' })
        setStatus('idle')
      }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  if (!isOpen) return null

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const backdropStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    display: 'flex',
    alignItems: isDesktop ? 'center' : 'flex-start',
    justifyContent: 'center',
    backgroundColor: isDesktop ? 'rgba(46, 42, 53, 0.45)' : '#fff',
    backdropFilter: isDesktop ? 'blur(6px)' : 'none',
    padding: isDesktop ? '24px' : 0,
    overflowY: 'auto',
  }

  const cardStyle = isDesktop
    ? {
        backgroundColor: '#fff',
        borderRadius: '28px',
        padding: '48px',
        width: '100%',
        maxWidth: '1000px',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
        flexShrink: 0,
      }
    : {
        backgroundColor: '#fff',
        width: '100%',
        minHeight: '100vh',
        padding: '72px 24px 48px',
        position: 'relative',
        boxSizing: 'border-box',
      }

  return (
    <div style={backdropStyle} onClick={isDesktop ? close : undefined}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button
          onClick={close}
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

        {status === 'success' ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '3rem',
              color: 'var(--color-text)',
              margin: '0 0 16px',
            }}>
              Message sent!
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '2rem',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
              margin: 0,
            }}>
              Thanks for reaching out. I'll get back to you within 1–2 days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: '3rem',
                color: 'var(--color-text)',
                margin: 0,
              }}>
                Let's get in touch!
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.4rem',
                lineHeight: 1.65,
                color: 'var(--color-text-muted)',
                margin: 0,
              }}>
                Have a question, idea, or opportunity? Leave a message and I'll get back to you.
                I usually reply within 1–2 days.
              </p>
            </div>

            <FormField label="Your name" value={form.Name} onChange={set('Name')} />
            <FormField label="Email address" type="email" value={form.Email} onChange={set('Email')} />
            <FormField label="Your message" multiline value={form.Message} onChange={set('Message')} />

            {status === 'error' && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#c0392b',
                margin: 0,
              }}>
                Something went wrong. Please try again or email me directly at samaiagahramanov@gmail.com
              </p>
            )}

            <div>
              <Button variant="primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send your message →'}
              </Button>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}
