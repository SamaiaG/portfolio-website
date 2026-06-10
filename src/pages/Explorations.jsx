import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BaseSectionTag from '../components/BaseSectionTag'
import BaseCard from '../components/BaseCard'
import FadeIn from '../components/FadeIn'
import './explorations.css'

const illustrations = [
  { title: 'Flower pot',                 src: 'https://samaiag.github.io/css-fun/flower%20pot/index.html' },
  { title: 'Rabbit in the hat',          src: 'https://samaiag.github.io/css-fun/rabbit/index.html' },
  { title: 'Anxiety',                    src: 'https://samaiag.github.io/css-fun/anxiety/index.html' },
  { title: 'Superman',                   src: 'https://samaiag.github.io/css-fun/superman/index.html' },
  { title: 'My Duolingo avatar',         src: 'https://samaiag.github.io/css-fun/duolingoavatar/index.html' },
  { title: 'A curious cat',              src: 'https://samaiag.github.io/css-fun/cat/index.html' },
  { title: 'The elephant of my childhood', src: 'https://samaiag.github.io/css-fun/elephant/index.html' },
  { title: 'Happy puppy',               src: 'https://samaiag.github.io/css-fun/minimalist%20dog/index.html' },
  { title: 'Family guy',                src: 'https://samaiag.github.io/css-fun/peter%20griffin/index.html' },
  { title: 'A cute shark',              src: 'https://samaiag.github.io/css-fun/shark/index.html' },
  { title: 'Me at 6 drawing sunsets',   src: 'https://samaiag.github.io/css-fun/sunset/index.html' },
  {
    title: 'Visit my Github →',
    src: 'https://samaiag.github.io/css-fun/githubLogo/index.html',
    link: 'https://github.com/SamaiaG/css-fun',
  },
]

function IllustrationCard({ title, src, link }) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        breakInside: 'avoid',
        marginBottom: '16px',
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        backgroundColor: '#fff',
        cursor: link ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
        boxShadow: hovered ? '0 8px 24px rgba(46,42,53,0.08)' : 'none',
      }}
    >
      <div style={{ width: '100%', height: '240px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <iframe
          src={src}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
          loading="lazy"
        />
      </div>

      {/* Title overlay — visible only on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(4px)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '14px',
          fontWeight: 500,
          color: link ? 'var(--color-accent)' : 'var(--color-text)',
          textAlign: 'center',
          padding: '0 16px',
        }}>
          {title}
        </span>
      </div>
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'block' }}>
        {card}
      </a>
    )
  }
  return card
}

export default function Explorations() {
  usePageTitle('Explorations · Samaia Gahramanov')
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="container" style={{ padding: '120px 0 80px' }}>

        {/* Header */}
        <FadeIn>
          <div className="explorations-header" style={{ marginBottom: '48px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.2,
              margin: 0,
              color: 'var(--color-text)',
            }}>
              Coding{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-accent)' }}>
                explorations
              </em>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.6rem',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
              maxWidth: '70%',
              margin: 0,
            }}>
              Here's a fun collection of my CSS illustrations! I create these whenever I'm feeling tired,
              using them as a way to unwind. Some are inspired by other artists, while others come straight
              from my imagination or everyday life. Enjoy exploring a few of my colorful creations!
            </p>
          </div>
        </FadeIn>

        {/* Masonry grid */}
        <FadeIn delay={0.05}>
          <div className="explorations-grid" style={{
            columns: '3 220px',
            columnGap: '16px',
          }}>
            {illustrations.map((item) => (
              <IllustrationCard key={item.title} {...item} />
            ))}
          </div>
        </FadeIn>

        {/* PickPerfect section */}
        <FadeIn>
        <section className="explorations-pickperfect" style={{ marginTop: '80px' }}>
          {/* Title row */}
          <BaseSectionTag label="Pick Perfect" style={{ margin: '32px 0 32px 0' }} />


          {/* Content row */}
          <div className="explorations-pickperfect-row" style={{
            display: 'flex',
            gap: '48px',
            flexWrap: 'nowrap',
            alignItems: 'stretch',
            width: '100%',
          }}>
            {/* Text */}
            <div style={{              
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
            }}>
              <p style={{ margin: 0 }}>
                While these illustrations are how I unwind, sometimes my curiosity leads me to build
                something more functional.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--color-text)' }}>PickPerfect</strong> was born out of a
                personal struggle with decision-making — those small but frequent choices like picking a
                gift or deciding what to eat. This tool simplifies the process by introducing an element
                of chance while keeping the user in control.
              </p>
              <p style={{ margin: 0 }}>
                Creating this project allowed me to push my coding skills beyond static illustrations to
                build a tool I actually needed. By designing it in{' '}
                <strong style={{ color: 'var(--color-text)' }}>Figma</strong> and developing it with{' '}
                <strong style={{ color: 'var(--color-text)' }}>Vue.js</strong>, I challenged myself to
                bridge the gap between user experience and technical implementation.
              </p>
              <p style={{ margin: 0 }}>
                You can try it live at{' '}
                <a
                  href="https://samaiag.github.io/the-pick/"
                  target="_blank"
                  rel="noopener"
                  style={{ color: 'var(--color-text)', fontWeight: 500, textDecoration: 'underline' }}
                >
                  this link
                </a>
                . Give it a go!
              </p>
            </div>

            {/* Screenshot */}
            <BaseCard padding="0" hover={false} style={{  width: '45%', flexShrink: 0, overflow: 'hidden' }}>
              <img
                src="/assets/pickperfect.webp"
                alt="PickPerfect screenshot"
                loading="lazy"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'left center' }}
              />
            </BaseCard>
          </div>
        </section>
        </FadeIn>
      </main>

      <FadeIn><Footer /></FadeIn>
    </div>
  )
}
