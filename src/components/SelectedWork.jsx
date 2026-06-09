import allProjects from '../data/projects.json'
import ProjectCard from './ProjectCard'
import FadeIn from './FadeIn'
import '../pages/home.css'

const projects = allProjects.filter(p => p.featured && p.status === 'live')

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

export default function SelectedWork() {
  return (
    <section id="work" className="container" style={{ padding: '80px 0' }}>

      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: '32px',
          lineHeight: 1.2,
          margin: 0,
          color: 'var(--color-text)',
        }}>
          Selected{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-accent)' }}>
            work
          </em>
        </h2>

        <a
          href="/work"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          All projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M6 12H19M19 12L13 6M19 12L13 18" />
          </svg>
        </a>
      </div>

      {/* Cards grid */}
      <div className="selected-work-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '20px',
      }}>
        {projects.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.1} style={i === 0 ? { gridColumn: '1 / -1' } : undefined}>
            <ProjectCard {...p} variant="compact" />
          </FadeIn>
        ))}
      </div>

    </section>
  )
}
