import { Link, useNavigate } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { useContact } from '../context/ContactContext'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

const textStyle = {
  fontFamily: 'var(--font-heading)',
  color: 'var(--color-text)',
}

const mutedStyle = {
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text-muted)',
}

function QuickLink({ href, onClick, label }) {
  const shared = {
    ...mutedStyle,
    fontSize: '15px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'opacity 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        style={shared}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <span style={{ fontSize: '14px' }}>→</span>
        {label}
      </button>
    )
  }

  return (
    <Link
      to={href}
      style={shared}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      <span style={{ fontSize: '14px' }}>→</span>
      {label}
    </Link>
  )
}

export default function PageNotFound() {
  usePageTitle('Page Not Found · Samaia Gahramanov')
  const { open: openContact } = useContact()
  const navigate = useNavigate()

  function handleContact() {
    if (window.innerWidth < 768) {
      navigate('/contact')
    } else {
      openContact()
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '120px 24px 80px',
        textAlign: 'center',
      }}>

        {/* 404 illustration block */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
        }}>
          {/* Left "4" */}
          <span style={{
            ...textStyle,
            fontSize: 'clamp(100px, 18vw, 180px)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--color-text)',
            letterSpacing: '-4px',
            userSelect: 'none',
          }}>4</span>

          {/* Centre illustration placeholder */}
          <div style={{
            width: 'clamp(80px, 12vw, 120px)',
            height: 'clamp(80px, 12vw, 120px)',
            borderRadius: '50%',
            border: '2px solid var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg)',
            margin: '0 8px',
            flexShrink: 0,
            overflow: 'hidden',
          }}>
            <iframe
              src="https://samaiag.github.io/css-fun/anxiety/index.html"
              title="404 illustration"
              style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
            />
          </div>

          {/* Right "4" */}
          <span style={{
            ...textStyle,
            fontSize: 'clamp(100px, 18vw, 180px)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--color-text)',
            letterSpacing: '-4px',
            userSelect: 'none',
          }}>4</span>
        </div>

        {/* Heading */}
        <h2 style={{
          ...textStyle,
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 500,
          marginBottom: '16px',
        }}>
          Page{' '}
          <em style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: 'var(--color-accent)',
          }}>not found</em>
        </h2>

        {/* Description */}
        <p style={{
          ...mutedStyle,
          fontSize: '16px',
          lineHeight: 1.7,
          maxWidth: '400px',
          margin: '0 0 40px',
        }}>
          Looks like this page wandered off. It might have been moved, deleted, or perhaps it never existed in the first place.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
          <Button href="/" variant="primary">Back to home</Button>
          <Button href="/work" variant="secondary">View my work</Button>
        </div>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <QuickLink href="/work" label="Projects" />
          <QuickLink href="/about" label="About" />
          <QuickLink onClick={handleContact} label="Contact" />
        </div>

      </main>
    </div>
  )
}
