import './work.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import allProjects from '../data/projects.json'
import BaseSectionTag from '../components/BaseSectionTag'
import ProjectCard from '../components/ProjectCard'
import FadeIn from '../components/FadeIn'
import { usePageTitle } from '../hooks/usePageTitle'

const projects = allProjects.filter(p => p.status === 'live')

export default function Work() {
  usePageTitle('Projects · Samaia Gahramanov')
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="container" style={{ padding: '140px 0 100px' }}>

        {/* Header */}
        <FadeIn>
          <BaseSectionTag label="My projects" className="work-section-tag" style={{ margin: '32px 0 32px 0' }} />
        </FadeIn>

        {/* Projects grid */}
        <FadeIn delay={0.05}>
          <div className="work-projects-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(30%, 1fr))',
            gap: '3%',
          }}>
            {projects.map(project => (
              <ProjectCard key={project.id} {...project} variant="full" />
            ))}
          </div>
        </FadeIn>

      </main>

      <FadeIn><Footer /></FadeIn>
    </div>
  )
}
