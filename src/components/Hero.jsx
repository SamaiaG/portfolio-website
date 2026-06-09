import Button from './Button'
import './hero.css'

export default function Hero() {
  return (
    <section className="hero-section" style={{ height: '100vh', width: '100%', overflow: 'hidden', position: 'relative' }}>

      <div className="container hero-container" style={{ height: '100%' }}>

        {/* Illustration */}
        <div className="hero-illustration">
          <iframe
            src="https://samaiag.github.io/css-fun/girl/index.html"
            title="girl"
            style={{ width: '100%', height: '100%', border: 'none', overflow: 'visible', display: 'block' }}
          />
        </div>

        {/* Text: badge, heading, body */}
        <div className="hero-text">
          <span className="hero-badge" style={{
            display: 'inline-block',
            width: 'fit-content',
            border: '1px solid var(--color-border)',
            borderRadius: '54px',
            padding: '5px 14px',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
          }}>
            BASED IN GERMANY
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: '6rem',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            <span className="word-reveal">
              <span className="word-inner" style={{ color: 'var(--color-text)', animationDelay: '0.1s' }}>Hi,</span>
            </span>
            {' '}
            <span className="word-reveal">
              <span className="word-inner" style={{ color: 'var(--color-text)', animationDelay: '0.22s' }}>I'm</span>
            </span>
            <br />
            <span className="word-reveal">
              <span className="word-inner" style={{ fontStyle: 'italic', color: 'var(--color-accent)', animationDelay: '0.36s' }}>Samaia.</span>
            </span>
          </h1>

          <p style={{
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '1.6rem',
            lineHeight: 2,
            margin: 0,
          }}>
            A UX/UI Designer crafting thoughtful, intuitive digital experiences.
            I turn complex problems into clear, human-centered solutions.
          </p>
        </div>

        {/* Buttons — separate so they can be ordered after illustration on mobile */}
        <div className="hero-buttons">
          <Button href="/work">View my projects</Button>
          <Button
            variant="secondary"
            href="https://drive.google.com/file/d/1EgJ6MqRQmT7_guZtThFwSn7cDFkXl-4Y/view"
            target="_blank"
            rel="noopener"
          >
            See my resume
          </Button>
        </div>

      </div>

      {/* Scroll indicator */}
      <style>{`
        @keyframes scrollFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div className="hero-scroll" style={{
        position: 'absolute',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'scrollFloat 2.2s ease-in-out infinite',
        }}>
          <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} />
          <span style={{
            fontSize: '1rem',
            letterSpacing: '0.15em',
            color: 'var(--color-text-subtle)',
            fontFamily: 'var(--font-body)',
          }}>
            SCROLL
          </span>
        </div>
      </div>

    </section>
  )
}
