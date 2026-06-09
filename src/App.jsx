import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import Work from './pages/Work'
import Explorations from './pages/Explorations'
import About from './pages/About'
import Contact from './pages/Contact'
import ProjectPage from './pages/ProjectPage'
import PageNotFound from './pages/PageNotFound'
import { ContactProvider } from './context/ContactContext'
import ContactOverlay from './components/ContactOverlay'
import projects from './data/projects.json'

function ProjectRoute() {
  const { slug } = useParams()
  const project = projects.find(p => p.id === slug)
  if (!project || project.status !== 'live') return <PageNotFound />
  return <ProjectPage project={project} />
}

export default function App() {
  return (
    <ContactProvider>
<BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/explorations" element={<Explorations />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection/:slug" element={<ProjectRoute />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ContactOverlay />
    </ContactProvider>
  )
}
