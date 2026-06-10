import './project-page.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import ReadingProgress from '../components/ReadingProgress'
import SectionDivider from '../components/SectionDivider'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import projects from '../data/projects.json'
import BaseCard from '../components/BaseCard'
import Button from '../components/Button'
import FadeIn from '../components/FadeIn'
import BaseSectionTag from '../components/BaseSectionTag'
import ImageLightbox from '../components/ImageLightbox'

/* ─── shared style tokens ─────────────────────────────────────────── */
const heading = {
  fontFamily: 'var(--font-heading)',
  color: 'var(--color-text)',
  margin: 0,
}
const body = {
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text-muted)',
  lineHeight: 1.8,
  margin: 0,
}
const eyebrow = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: 'var(--color-text-subtle)',
}

/* ─── Section wrapper (eyebrow label + content) ────────────────────── */
function Section({ id, label, children, style }) {
  return (
    <>
      <SectionDivider />
      <FadeIn>
        <section id={id} style={{ padding: '2rem 0', ...style }}>
          <div className="container">
            <BaseSectionTag label={label} />
            {children}
          </div>
        </section>
      </FadeIn>
    </>
  )
}

/* ─── Sub-heading ───────────────────────────────────────────────────── */
function SubHeading({ children }) {
  return (
    <h2 style={{ ...heading, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '3rem', lineHeight: 1.2}}>
      {children}
    </h2>
  )
}


/* ─── Persona card ───────────────────────────────────────────────────── */
function PersonaCard({ persona }) {
  return (
    <BaseCard hover={false} gap="20px" align="flex-start" className="persona-card" style={{ flex: '1 1 280px', padding: '0px' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'start', backgroundColor: 'rgb(222, 222, 222)', width: '100%', padding: '26px 30px'}}>
        <img
          src={persona.photo}
          alt={persona.name}
          style={{ width: '7rem', height: '7rem', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '1px solid white' }}
        />
        <div>
          <p style={{ ...heading, fontSize: '1.6rem', fontWeight: 500 }}>{persona.name}</p>
          <p style={{ ...body, fontSize: '1.2rem', marginTop: '2px' }}>📍 {persona.location}</p>
        </div>
      </div>

      {/* Goals */}
      <div style={{ padding: '0 30px', width: '100%' }}>
        <p style={{ ...eyebrow, marginBottom: '8px', fontSize: '1rem' }}>Goals</p>
        <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {persona.goals.map((g, i) => (
            <li key={i} style={{ ...body, fontSize: '1.1rem' }}>{g}</li>
          ))}
        </ul>
      </div>

      {/* Frustrations */}
      <div style={{ padding: '0 30px', width: '100%' }}>
        <p style={{ ...eyebrow, marginBottom: '8px', fontSize: '1rem' }}>Frustrations</p>
        <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {persona.frustrations.map((f, i) => (
            <li key={i} style={{ ...body, fontSize: '1.1rem' }}>{f}</li>
          ))}
        </ul>
      </div>

      {/* Behavior */}
      {persona.behavior && persona.behavior.length > 0 && (
        <div style={{ padding: '0 30px', width: '100%' }}>
          <p style={{ ...eyebrow, marginBottom: '8px', fontSize: '1rem' }}>Behavior</p>
          <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {persona.behavior.map((b, i) => (
              <li key={i} style={{ ...body, fontSize: '1.1rem' }}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Quote */}
      {persona.quote && (
        <blockquote style={{
          margin: '30px',
          padding: '14px 16px',
          borderLeft: '3px solid var(--color-accent)',
          backgroundColor: 'var(--color-bg)',
          borderRadius: '0 8px 8px 0',
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: 'var(--color-text-muted)',
        }}>
          "{persona.quote}"
        </blockquote>
      )}
    </BaseCard>
  )
}

/* ─── Metric card ────────────────────────────────────────────────────── */
function MetricCard({ value, label }) {
  return (
    <BaseCard hover={false} padding="28px 28px" align="center" className="metric-card" style={{ flex: '1 1 160px' }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'clamp(28px, 4vw, 3rem)',
        color: 'var(--color-accent)',
        lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{ ...body, fontSize: '1rem', textAlign: 'center' }}>{label}</span>
    </BaseCard>
  )
}

/* ─── Video card ─────────────────────────────────────────────────────── */
function VideoCard({ src }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    videoRef.current.play()
    setPlaying(true)
  }

  function handlePause() {
    setPlaying(false)
  }

  return (
    <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 0, borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: '#fff' }}>
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        onPause={handlePause}
        onEnded={handlePause}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <button
        onClick={playing ? () => { videoRef.current.pause() } : handlePlay}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: playing ? 'transparent' : 'rgba(0,0,0,0.25)',
          border: 'none', cursor: 'pointer',
        }}
      >
        {!playing && (
          <span style={{
            width: '56px', height: '56px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 4l12 6-12 6V4z" fill="var(--color-text)" />
            </svg>
          </span>
        )}
      </button>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function ProjectPage({ project }) {
  usePageTitle(`${project.title} · Samaia Gahramanov`)
  const nextProject = project.nextProjectId
    ? projects.find(p => p.id === project.nextProjectId)
    : null
  const prevProject = project.previousProjectId
    ? projects.find(p => p.id === project.previousProjectId)
    : null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <ReadingProgress />
      <Navbar />

      {/* ── Hero ── */}
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '0' }}>

        {/* Back link */}
        <Link
          to="/work"
          style={{ ...body, fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginBottom: '100px' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
            <path d="M6 12H19M19 12L13 6M19 12L13 18" />
          </svg>
          All projects
        </Link>

        {/* Hero row: info column + image */}
        <div className="project-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px', alignItems: 'end', marginBottom: '100px' }}>

          {/* Left: tags + name + description */}
          <div className="project-hero-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  ...eyebrow,
                  backgroundColor: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '100px',
                  padding: '10px 20px',
                  fontSize: '0.8rem',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 style={{ ...heading, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(36px, 6vw, 5.5rem)', lineHeight: 1.1 }}>
              {(() => {
                const [first, ...rest] = project.title.split(' ')
                return <>
                  {first}{rest.length > 0 && <> <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>{rest.join(' ')}</em></>}
                </>
              })()}
            </h1>

            <p style={{ ...body, fontSize: '1.6rem' }}>
              {project.shortDescription}
            </p>
          </div>

          {/* Right: hero image, no background */}
          <div className="project-hero-image">
            <img
              src={project.heroImage || project.cardImage}
              alt={project.title}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Meta row */}
        <div
          className="project-meta-row"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 0, padding: 0, marginBottom: '48px', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}
        >
          {[
            { label: 'ROLE', value: project.roles?.join(', ') },
            { label: 'DURATION', value: project.duration },
            { label: 'TOOLS', value: project.tools?.join(', ') },
            { label: 'TYPE', value: project.type },
          ].filter(m => m.value).map((m, i, arr) => (
            <div key={m.label} style={{
              flex: '1 1 140px',
              padding: '34px 24px',
              borderRight: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
              <p style={{ ...eyebrow, marginBottom: '6px', fontSize: '0.8rem' }}>{m.label}</p>
              <p style={{ ...heading, fontSize: '1.3rem', fontWeight: 500 }}>{m.value}</p>
            </div>
          ))}
          {(project.liveUrl || project.prototypeUrlWeb || project.prototypeUrlMobile) && (
            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--color-border)' }}>
              {project.liveUrl && (
                <Button variant="primary" arrow href={project.liveUrl} target="_blank" rel="noopener">
                  Live website
                </Button>
              )}
              {project.prototypeUrlMobile && (
                <Button variant="primary" arrow href={project.prototypeUrlMobile} target="_blank" rel="noopener">
                  App prototype
                </Button>
              )}
              {project.prototypeUrlWeb && (
                <Button variant="secondary" arrow href={project.prototypeUrlWeb} target="_blank" rel="noopener">
                  Website prototype
                </Button>
              )}
              
            </div>
          )}
        </div>
      </div>

      {/* ── Overview ── */}
      {project.overviewText && (
        <Section id="overview" label="overview">

          <div className="project-overview-row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '48px', flexWrap: 'nowrap', alignItems: 'flex-start' }}>

            {/* Left: body text + blockquote */}

            <div style={{ display: 'flex', flexDirection: 'column', width: '70%', gap: '2rem' }}>
              <SubHeading>Where it <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>started</em></SubHeading>

              <p style={{ ...body, fontSize: '1.4rem', lineHeight: 1.8 }}>{project.overviewText}</p>
              {project.overviewText2 && (
                <p style={{ ...body, fontSize: '1.4rem', lineHeight: 1.8 }}>{project.overviewText2}</p>
              )}
              {project.problemText && (
                <blockquote style={{
                  margin: 0,
                  borderLeft: '7px solid var(--color-accent)',
                  padding: '20px 40px 20px 20px',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: '2rem',
                  lineHeight: 1.4,
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'white',
                  borderRadius: '0 20px 20px 0',
                }}>
                  {project.problemText}
                </blockquote>
              )}
            </div>

            {/* Right: goal + responsibilities in one card */}
            {(project.goal || project.responsibilities?.length > 0) && (
              <BaseCard hover={false} padding="28px" align="flex-start" gap="0" style={{ width: '25%', borderRadius: '16px' }}>
                {project.goal && (
                  <div style={{ paddingBottom: project.responsibilities?.length > 0 ? '24px' : 0 }}>
                    <p style={{ ...eyebrow, marginBottom: '14px', fontSize: '0.8rem' }}>Goal</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 1.7, color: 'var(--color-text)', margin: 0 }}>{project.goal}</p>
                  </div>
                )}
                {project.goal && project.responsibilities?.length > 0 && (
                  <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0 0 24px' }} />
                )}
                {project.responsibilities?.length > 0 && (
                  <div>
                    <p style={{ ...eyebrow, marginBottom: '14px', fontSize: '0.8rem' }}>My Responsibilities</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {project.responsibilities.map((r, i) => (
                        <li key={i} style={{ ...body, fontSize: '1.1rem' , fontFamily: 'var(--font-heading)',display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ color: 'var(--color-text-muted)', flexShrink: 0, lineHeight: 1.8 }}>·</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </BaseCard>
            )}
          </div>
        </Section>
      )}

      {/* ── Research ── */}
      {project.researchInsights?.length > 0 && (
        <Section id="research" label="research">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

            {/* Understanding the problem */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <SubHeading>Understanding <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>the problem</em></SubHeading>
              {project.researchIntro && (
                <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.researchIntro}</p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {project.researchInsights.map((f, i) => {
                  const radii = ['20px 0 0 0', '0 20px 0 0', '0 0 0 20px', '0 0 20px 0']
                  return (
                    <BaseCard key={i} hover={false} padding="60px" align="flex-start" style={{ border: 'none', borderRadius: radii[i] ?? '0' }}>
                      <p style={{ ...heading, fontSize: '1.4rem', fontWeight: 500, fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{f.label}</p>
                      <p style={{ ...body, fontSize: '1.2rem', lineHeight: 1.7 }}>{f.text}</p>
                    </BaseCard>
                  )
                })}
              </div>
            </div>

            {/* User personas */}
            {(project.persona1 || project.persona2) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>User <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>personas</em></SubHeading>
                {project.personasIntro && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.personasIntro}</p>
                )}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {project.persona1 && <PersonaCard persona={project.persona1} />}
                  {project.persona2 && <PersonaCard persona={project.persona2} />}
                </div>
              </div>
            )}

            {/* Competitive audit */}
            {(project.auditIntro || project.auditImages) && (
              <div className="competitive-audit-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>Competitive <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>audit</em></SubHeading>
                {project.auditIntro && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.auditIntro}</p>
                )}
                {project.auditImages && (
                  <div className="audit-image">
                    <ImageLightbox src={project.auditImages} alt="Competitive audit">
                      <div style={{
                        borderRadius: '16px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#fff',
                        padding: '20px',
                        overflow: 'hidden',
                      }}>
                        <img src={project.auditImages} alt="Competitive audit" loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      </div>
                    </ImageLightbox>
                  </div>
                )}
              </div>
            )}

            {/* Information architecture */}
            {project.sitemapImage && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>Information <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>architecture</em></SubHeading>
                {project.sitemapDescription && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.sitemapDescription}</p>
                )}
                <ImageLightbox src={project.sitemapImage} alt="Sitemap">
                    <div style={{
                      borderRadius: '16px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#fff',
                      padding: '20px',
                      overflow: 'hidden',
                    }}>
                      <img src={project.sitemapImage} alt="Sitemap" loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  </ImageLightbox>
              </div>
            )}

          </div>
        </Section>
      )}

      {/* ── Ideate ── */}
      {project.sketchImages?.length > 0 && (
        <Section id="ideate" label="ideate">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <SubHeading>Sketching <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>the structure</em></SubHeading>
            {project.ideateIntro && (
              <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.ideateIntro}</p>
            )}
            <div>
              <p className="scroll-hint" style={{ ...eyebrow, marginBottom: '12px', textAlign: 'right' }}>scroll within the cards to view more</p>
              <div className="sketch-images-row" style={{ display: 'flex', width: '100%', gap: '16px' }}>
                {project.sketchImages.map((item, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 0 }}>
                    <ImageLightbox src={item.image} alt={item.caption ?? ''}>
                      <div
                        style={{
                          height: '400px',
                          overflowY: 'auto',
                          borderRadius: '16px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: '#fff',
                          padding: '30px',
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                      >
                        {item.caption && (
                          <p style={{ ...eyebrow, textAlign: 'center', fontSize: '0.85rem', marginBottom: '16px' }}>{item.caption}</p>
                        )}
                        <img
                          src={item.image}
                          alt={item.caption ?? ''}
                          loading="lazy"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    </ImageLightbox>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── Design ── */}
      {(project.moodboardImage || project.visualDirectionText || project.designIntro || project.lofiImages?.length > 0 || project.hifiImages?.length > 0) && (
        <Section id="design" label="design">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

            {/* Visual direction */}
            {(project.visualDirectionText || project.designIntro || project.moodboardImage || project.uiKitImage) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>Visual <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}> direction</em></SubHeading>
                {(project.visualDirectionText || project.designIntro) && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.visualDirectionText || project.designIntro}</p>
                )}
                {(project.moodboardImage || project.uiKitImage) && (
                  <div className="visual-direction-row" style={{ display: 'flex', width: '100%', gap: '16px', height: '400px' }}>
                    {project.moodboardImage && (
                      <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
                        <ImageLightbox src={project.moodboardImage} alt="Moodboard">
                          <div style={{ height: '100%', borderRadius: '16px', border: '1px solid var(--color-border)', backgroundColor: '#fff', overflow: 'hidden' }}>
                            <img src={project.moodboardImage} alt="Moodboard" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block' }} />
                          </div>
                        </ImageLightbox>
                      </div>
                    )}
                    {project.uiKitImage && (
                      <div style={{ flex: 2, minWidth: 0, height: '100%' }}>
                        <ImageLightbox src={project.uiKitImage} alt="UI elements & design system">
                          <div style={{ height: '100%', borderRadius: '16px', border: '1px solid var(--color-border)', backgroundColor: '#fff', overflow: 'hidden' }}>
                            <img src={project.uiKitImage} alt="UI elements & design system" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block' }} />
                          </div>
                        </ImageLightbox>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Lo-fi */}
            {project.lofiImages?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>Lo-fi <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>wireframes</em></SubHeading>
                {project.lofiDescription && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.lofiDescription}</p>
                )}
                <p className="scroll-hint" style={{ ...eyebrow, marginBottom: '4px', textAlign: 'right' }}>scroll within the cards to view more</p>
                <div className="lofi-images-row" style={{ display: 'flex', width: '100%', gap: '16px' }}>
                  {project.lofiImages.map((src, i) => (
                    <div key={i} style={{ flex: 1, minWidth: 0 }}>
                      <ImageLightbox src={src} alt="">
                        <div
                          style={{
                            height: '400px',
                            overflowY: 'auto',
                            borderRadius: '16px',
                            border: '1px solid var(--color-border)',
                            backgroundColor: '#fff',
                            padding: '20px 0 0 0',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          }}
                          className="hide-scrollbar"
                        >
                          <img src={src} alt="" loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                      </ImageLightbox>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hi-fi */}
            {project.hifiImages?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>Hi-fi <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>wireframes</em></SubHeading>
                {project.hifiDescription && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.hifiDescription}</p>
                )}
                <div className="hifi-images-row" style={{ display: 'flex', width: '100%', gap: '16px', alignItems: 'stretch' }}>
                  {project.hifiImages.map((src, i) => (
                    <div key={i} style={{ flex: 1, minWidth: 0 }}>
                      <ImageLightbox src={src} alt="">
                        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                          <img src={src} alt="" loading="lazy" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
                        </div>
                      </ImageLightbox>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </Section>
      )}

      {/* ── Testing ── */}
      {project.metrics?.length > 0 && (
        <Section id="testing" label="testing">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SubHeading>Validating with <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>real users</em></SubHeading>
          {project.testingIntro && (
            <p style={{ ...body, fontSize: '1.4rem', width: '70%', marginBottom: '32px' }}>{project.testingIntro}</p>
          )}

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' , marginBottom: '24px' }}>
            {project.metrics.map((m, i) => (
              <MetricCard key={i} value={m.value} label={m.label}/>
            ))}
          </div>

          {project.testingOverall && (
            <blockquote style={{
              margin: 0,
              borderLeft: '7px solid var(--color-accent)',
              padding: '20px 40px 20px 20px',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '2rem',
              lineHeight: 1.4,
              color: 'var(--color-text-muted)',
              backgroundColor: 'white',
              borderRadius: '0 20px 20px 0',
              width: '70%',
            }}>{project.testingOverall}</blockquote>
          )}
          </div>
        </Section>
      )}

      {/* ── Refinements ── */}
      {project.refinements?.length > 0 && (
        <Section id="refinements" label="refinements">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SubHeading>Iterating <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>on feedback</em></SubHeading>
          <p style={{ ...body, fontSize: '1.4rem', width: '70%', marginBottom: '32px' }}>{project.refinementsIntro}</p>
          <BaseCard hover={false} padding="0" gap="0" align="flex-start">
            {project.refinements.map((r, i) => (
              <div key={i} className="refinement-row" style={{
                display: 'flex',
                gap: '20px',
                padding: '20px 28px',
                borderBottom: i < project.refinements.length - 1 ? '1px solid var(--color-border)' : 'none',
                alignItems: 'flex-start',
                width: '100%',
              }}>
                <span style={{ ...eyebrow, flex: '0 0 180px', paddingTop: '3px', fontSize: '0.8rem' }}>{r.title}</span>
                <p style={{ ...body, fontSize: '1.2rem', flex: 1 }}>{r.text}</p>
              </div>
            ))}
          </BaseCard>
          </div>
        </Section>
      )}

      {/* ── Results ── */}
      {(project.resultImages?.length > 0 || project.resultsDescription || project.resultsText || project.resultVideos?.filter(Boolean).length > 0 || project.prototypeUrlWeb || project.prototypeUrlMobile) && (
        <Section id="results" label="results">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

            {/* Final outcome */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <SubHeading>The final <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>outcome</em></SubHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexWrap: 'wrap' }}>
                {(project.resultsDescription || project.resultsText) && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.resultsDescription || project.resultsText}</p>
                )}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {project.liveUrl && (
                    <Button variant="primary" arrow href={project.liveUrl} target="_blank" rel="noopener">
                      Live website
                    </Button>
                  )} 
                  {project.prototypeUrlMobile && (
                    <Button variant="primary" arrow href={project.prototypeUrlMobile} target="_blank" rel="noopener">
                      App prototype
                    </Button>
                  )}
                  {project.prototypeUrlWeb && (
                    <Button variant="secondary" arrow href={project.prototypeUrlWeb} target="_blank" rel="noopener">
                      Web prototype
                    </Button>
                  )}
                 
                </div>
              </div>
              {project.resultImages?.length > 0 && (
                <>
                  <p className="scroll-hint" style={{ ...eyebrow, marginBottom: '4px', textAlign: 'right' }}>scroll within the cards to view more</p>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                    {project.resultImages.map((r, i) => (
                      <div key={i} style={{ flex: 1, minWidth: 0 }}>
                        <ImageLightbox src={r.image} alt={r.caption ?? ''}>
                          <div
                            style={{
                              height: '600px',
                              overflowY: 'auto',
                              borderRadius: '16px',
                              border: '1px solid var(--color-border)',
                              backgroundColor: '#fff',
                              padding: '30px',
                              scrollbarWidth: 'none',
                              msOverflowStyle: 'none',
                            }}
                            className="hide-scrollbar result-image-card"
                          >
                            {r.caption && (
                              <p style={{ ...eyebrow, textAlign: 'center', fontSize: '0.85rem', marginBottom: '16px' }}>{r.caption}</p>
                            )}
                            <img src={r.image} alt={r.caption ?? ''} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>
                        </ImageLightbox>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {project.resultVideos?.filter(Boolean).length > 0 && (
                <div className="result-videos-grid" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {project.resultVideos.filter(Boolean).map((src, i) => (
                    <VideoCard key={i} src={src} />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile */}
            {project.mobileImages?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SubHeading>Mobile <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>version</em></SubHeading>
                {project.mobileDescription && (
                  <p style={{ ...body, fontSize: '1.4rem', width: '70%' }}>{project.mobileDescription}</p>
                )}
                <div className="mobile-images-row" style={{ display: 'flex', justifyContent: 'space-around', gap: '12px', overflowX: 'auto', paddingBottom: '12px', scrollSnapType: 'x mandatory' }}>
                  {project.mobileImages.map((src, i) => (
                    <div key={i} style={{ flexShrink: 0, scrollSnapAlign: 'start', width: 'auto' }}>
                      <ImageLightbox src={src} alt="" imageStyle={{ width: 'auto', maxHeight: 'calc(90vh - 96px)', margin: '0 auto' }}>
                        <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
                          <img src={src} alt="" loading="lazy" style={{ height: '30rem', width: 'auto', display: 'block' }} />
                        </div>
                      </ImageLightbox>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </Section>
      )}

      {/* ── Reflection ── */}
      {project.reflections?.length > 0 && (
        <Section id="reflection" label="reflection">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SubHeading>What I <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>learned</em></SubHeading>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {project.reflections.map((r, i) => (
              <BaseCard key={i} hover={false} padding="28px" gap="12px" align="flex-start" className="reflection-card" style={{ flex: '1 1 260px', borderRadius: '16px' }}>
                <p style={{ ...heading, fontSize: '1.6rem', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{r.title}</p>
                <p style={{ ...body, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{r.text}</p>
              </BaseCard>
            ))}
          </div>
          </div>
        </Section>
      )}

      {/* ── Prev / Next navigation ── */}
      {(prevProject || nextProject) && (
        <FadeIn>
          <div
            className="container project-nav"
            style={{ padding: '40px', margin: '6rem auto 6rem auto', backgroundColor: 'rgb(46, 42, 53)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '24px', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >

            {/* Previous */}
            {prevProject ? (
              <Link to={prevProject.slug} style={{ display: 'flex', flexDirection: 'column', gap: '4px', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  Previous project
                </span>
                <span
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '2rem', color: 'var(--color-surface)', fontStyle: 'italic', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-surface)'}
                >
                  ‹ {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            {/* Next */}
            {nextProject ? (
              <Link to={nextProject.slug} style={{ display: 'flex', flexDirection: 'column', gap: '4px', textDecoration: 'none', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  Next project
                </span>
                <span
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '2rem', color: 'var(--color-surface)', fontStyle: 'italic', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-surface)'}
                >
                  {nextProject.title} ›
                </span>
              </Link>
            ) : <div />}

          </div>
        </FadeIn>
      )}

      <FadeIn><Footer /></FadeIn>
    </div>
  )
}
