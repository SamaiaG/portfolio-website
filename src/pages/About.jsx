import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BaseSectionTag from '../components/BaseSectionTag'
import FadeIn from '../components/FadeIn'
import './about.css'

const principles = [
  {
    title: 'Never stop learning',
    body: 'Knowledge is limitless, and learning is the key in our fast-moving world. Learn languages, learn inline skating, learn baking, and cooking your favorite foods. At the end of the day, all that you have learned will contribute to moving you forward.',
  },
  {
    title: 'Listen and empathize',
    body: 'True understanding comes from active listening. Putting yourself in others\' shoes helps create meaningful connections and better solutions.',
  },
  {
    title: 'Be flexible to changes',
    body: 'Things are often not going as planned. Embrace change with an open mind, calmness, and see challenges as opportunities for growth.',
  },
  {
    title: 'Do good out of what you have',
    body: 'It is not about having the best tools, it\'s about making the best of what\'s available, using your brain, flexibility, and empathy to turn limitations into results.',
  },
]

const interests = [
  { emoji: '🎨', label: 'CSS Art',     action: 'navigate', target: '/explorations' },
  { emoji: '🌍', label: 'Languages',   action: 'panel',    panel: 'languages' },
  { emoji: '✈️', label: 'Travel',      action: 'none',     padding: '8px 16px' },
  { emoji: '📷', label: 'Photography', action: 'external', target: 'https://unsplash.com/@samy_96g', padding: '8px 16px' },
]

export default function About() {
  usePageTitle('About · Samaia Gahramanov')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activePanel, setActivePanel] = useState(null)
  const [hoveredInterest, setHoveredInterest] = useState(null)
  const navigate = useNavigate()

  function handleInterestClick(item) {
    if (item.action === 'navigate') {
      navigate(item.target)
    } else if (item.action === 'external') {
      window.open(item.target, '_blank', 'noopener')
    } else if (item.action === 'panel') {
      setActivePanel(prev => prev === item.panel ? null : item.panel)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="about-main">

        {/* ── Hero ── */}
        <section className="container about-hero-section" style={{ padding: '140px 0 0', display: 'flex', flexDirection: 'column', gap: '100px', height: '100vh', justifyContent: 'center' }}>
          
          <FadeIn>
          <div className="about-hero-row">

            {/* Left: name, location */}
            <div className="about-hero-left">
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(36px, 6vw, 6.5rem)',
                lineHeight: 1.1,
                margin: 0,
                color: 'var(--color-text)',
              }}>
                Samaia<br />
                <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Gahramanov</em>
              </h1>
              {/* Badge */}
              <span style={{
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
                COLOGNE, GERMANY
              </span>
            </div>

            {/* Right: portrait */}
            <div className="about-hero-photo">
              <img
                src="/my-image.jpg"
                alt="Samaia Gahramanov"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

          </div>
          </FadeIn>
          <FadeIn delay={0.1}>
          <p className="about-hero-desc" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            lineHeight: 1.75,
            color: 'var(--color-text-muted)',
            margin: 0,
          }}>
            I'm a UX/UI Designer with a background in Applied Informatics, driven by curiosity
            about how people experience digital products. My path into UX wasn't straightforward,
            but exploring different roles helped me develop a thoughtful, user-centered way of designing.
          </p>
          </FadeIn>
        </section>

        {/* ── My Journey ── */}
        <FadeIn>
        <section className="container about-journey-section" style={{ padding: '80px 0' }}>

          <BaseSectionTag label="My Journey" style={{ marginBottom: '40px' }} />

          <div className="about-journey-grid">
            {[
              {
                src: 'https://samaiag.github.io/css-fun/scene_1/index.html',
                text: 'Born and raised in the countryside, later moved to the capital to study Applied Informatics — a field that challenged me and pushed me beyond my comfort zone.',
              },
              {
                src: 'https://samaiag.github.io/css-fun/girl_moved/index.html',
                text: 'After moving in 2020, I explored UX design, coding, and software testing. A design phase during a development internship sparked something that felt exactly right.',
              },
              {
                src: 'https://samaiag.github.io/css-fun/girl_current/index.html',
                text: 'I turn problems into thoughtful, user-centered solutions through research, design, and iteration — while keeping curiosity and creativity at the center of everything.',
              },
            ].map(({ src, text }, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: '#ffffff',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: hoveredCard === i ? '0 8px 24px rgba(46, 42, 53, 0.12)' : 'none',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                <div style={{
                  height: '320px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                  <iframe
                    src={src}
                    title={`journey-${i}`}
                    style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', overflow: 'visible' }}
                    loading="lazy"
                  />
                </div>
                <div style={{
                  padding: '20px 24px 28px',
                  borderTop: '0.5px solid rgba(46, 42, 53, 0.1)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.2rem',
                    lineHeight: 1.75,
                    color: 'var(--color-text-muted)',
                    margin: 0,
                  }}>
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>
        </FadeIn>

        {/* ── My Approach ── */}
        <FadeIn>
        <section className="container about-approach-section" style={{ padding: '80px 0' }}>

          <BaseSectionTag label="My approach" style={{ marginBottom: '40px' }} />

          <div className="about-approach-grid">
            {principles.map((p, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border)',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
               
                <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}> {i + 1}</em>
                
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: '2rem',
                  color: 'var(--color-text)',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.2rem',
                  lineHeight: 1.75,
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>

        </section>
        </FadeIn>

        {/* ── Beyond the Screen ── */}
        <FadeIn>
        <section className="container about-beyond-section" style={{ padding: '80px 0' }}>
          <BaseSectionTag label="Beyond the screen" style={{ marginBottom: '40px' }} />

          <div style={{
            display: 'flex',
            gap: '64px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>

            {/* Right content */}
            <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <p className="about-beyond-desc" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                lineHeight: 1.8,
                color: 'var(--color-text-muted)',
                margin: 0,
                maxWidth: '60%',
              }}>
                Outside of UX, I explore ideas through travel, photography, and building small
                HTML/CSS illustrations — an exercise in observation, patience, and creativity
                that keeps my eye sharp.
              </p>

              {/* Interest pills */}
              <div className="about-interest-tags">
                {interests.map((item) => {
                  const isNone = item.action === 'none'
                  const pillPadding = item.padding || '14px 28px'
                  const isActive = item.action === 'panel' && activePanel === item.panel
                  const isHovered = hoveredInterest === item.label

                  // Single SVG arrow, rotated per direction
                  const arrowRotation = isNone ? null
                    : item.action === 'navigate' || item.action === 'external' ? '-45deg'
                    : activePanel === item.panel ? '-90deg' : '90deg'

                  const pillStyle = {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: isActive ? 'var(--color-text)' : (!isNone && isHovered) ? '#ddeeff' : '#ffffff',
                    border: '1px solid var(--color-border)',
                    borderRadius: '100px',
                    padding: pillPadding,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    color: isActive ? '#ffffff' : 'var(--color-text)',
                    transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                    transform: (!isNone && isHovered) ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: (!isNone && isHovered) ? '0 6px 16px rgba(0,0,0,0.10)' : 'none',
                  }

                  const inner = (
                    <>
                      <span>{item.emoji}</span>
                      {item.label}
                      {arrowRotation && (
                        <svg
                          width="14" height="14" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                          style={{ opacity: 0.6, transform: `rotate(${arrowRotation})`, flexShrink: 0, transition: 'transform 0.2s ease' }}
                        >
                          <path d="M6 12H19M19 12L13 6M19 12L13 18" />
                        </svg>
                      )}
                    </>
                  )

                  if (isNone) {
                    return <span key={item.label} style={{ ...pillStyle, cursor: 'default', width: 'auto' }}>{inner}</span>
                  }

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleInterestClick(item)}
                      onMouseEnter={() => setHoveredInterest(item.label)}
                      onMouseLeave={() => setHoveredInterest(null)}
                      style={{ ...pillStyle, cursor: 'pointer' }}
                    >
                      {inner}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Expanding panels */}
          {activePanel === 'languages' && (
            <div style={{ marginTop: '48px', padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-subtle)', margin: 0, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Languages</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {[
                  { lang: 'Romanian', level: 'Native', levelColor: 'rgb(88, 120, 156)' },
                  { lang: 'Russian',  level: 'C1',     levelColor: 'rgb(192, 143, 143)' },
                  { lang: 'German',   level: 'C1',     levelColor: 'rgb(192, 143, 143)' },
                  { lang: 'English',  level: 'B2',     levelColor: 'rgb(72, 140, 96)' },
                ].map(({ lang, level, levelColor }) => (
                  <div key={lang} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', padding: '14px 24px', border: '1px solid var(--color-border)', borderRadius: '100px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-text)' }}>{lang}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: levelColor, fontWeight: 600 }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}


        </section>
        </FadeIn>

      </main>

      <FadeIn><Footer /></FadeIn>
    </div>
  )
}
