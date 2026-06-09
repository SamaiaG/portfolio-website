import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import SelectedWork from '../components/SelectedWork'
import Footer from '../components/Footer'
import FadeIn from '../components/FadeIn'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle('Samaia Gahramanov · UX/UI Designer')
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main>
        <Hero />
        <FadeIn><Skills /></FadeIn>
        <FadeIn delay={0.05}><SelectedWork /></FadeIn>
      </main>
      <FadeIn><Footer /></FadeIn>
    </div>
  )
}
