import Button from './Button'
import './footer.css'

function LinkRow({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="footer-link-label"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 0',
        borderBottom: '1px solid rgba(46, 42, 53, 0.5)',
        fontFamily: 'var(--font-heading)',
        fontSize: '16px',
        color: 'var(--color-text)',
        textDecoration: 'none',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: 'rotate(-26deg)', flexShrink: 0 }}
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{ backgroundColor: '#ffffff', width: '100%' }}
    >
      {/* CTA + links row */}
      <div className="container" style={{
        padding: '30px 0 64px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>

        {/* Left: CTA text + button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: '1 1 300px' }}>
          <span className="footer-eyebrow" style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
          }}>
            Let's work together
          </span>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(22px, 3vw, 28px)',
            lineHeight: 1.4,
            letterSpacing: '0.09em',
            color: 'var(--color-text)',
            margin: 0,
          }}>
            Have something<br />
            in <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>mind</em>
            <em style={{ fontStyle: 'italic' }}>?</em>
          </p>

          <div className="footer-button">
            <Button
              href="mailto:samaiagahramanov@gmail.com"
              variant="primary"
              arrow
              style={{ padding: '6px 24px', fontSize: '1rem' }}
            >
              Say hello
            </Button>
          </div>
        </div>

        {/* Right: Resume + LinkedIn */}
        <div style={{ flex: '1 1 220px', alignSelf: 'center', width: '100%' }}>
          <LinkRow
            href="https://drive.google.com/file/d/1EgJ6MqRQmT7_guZtThFwSn7cDFkXl-4Y/view"
            label="Resume"
          />
          <LinkRow
            href="https://www.linkedin.com/in/samaia-gahramanov/"
            label="LinkedIn"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container" style={{
        padding: '20px 0',
        borderTop: '1px solid rgba(46, 42, 53, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <p className="footer-copy" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          letterSpacing: '0.08em',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          © Samaia Gahramanov 2026
        </p>
        <p className="footer-tagline" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          UX/UI Designer · Germany
        </p>
      </div>
    </footer>
  )
}
