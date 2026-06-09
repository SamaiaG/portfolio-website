import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import { useContact } from '../context/ContactContext'

const linkStyle = {
  fontFamily: '"DM Sans", sans-serif',
  color: 'rgb(69, 74, 106)',
  fontSize: '1.2rem',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { open: openContact } = useContact()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const navStyle = (path) => ({
    ...linkStyle,
    fontWeight: pathname === path ? 700 : undefined,
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center md:top-4 md:px-4">
      <nav
        className="container rounded-none md:rounded-[54px] backdrop-blur-[25px] bg-white/90 border-b border-white/30"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 24px 0px',
          height: menuOpen ? '100dvh' : undefined,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex items-center justify-between px-5 py-2 md:px-10 md:py-3">
          {/* Logo */}
          <a href="/" className="opacity-100 md:opacity-80 md:hover:opacity-100 transition-opacity flex items-center md:w-auto">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 w-auto md:h-20"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10" style={linkStyle}>
            <li><a href="/" className="hover:opacity-60 transition-opacity" style={navStyle('/')}>Home</a></li>
            <li>
              <Link to="/work" className="hover:opacity-60 transition-opacity" style={navStyle('/work')}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/explorations" className="hover:opacity-60 transition-opacity" style={navStyle('/explorations')}>
                Explorations
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:opacity-60 transition-opacity" style={navStyle('/about')}>
                About
              </Link>
            </li>
          </ul>

          {/* Get in touch — desktop only */}
          <div className="hidden md:block">
            <Button onClick={openContact} variant="secondary"> Get in touch </Button>
          </div>

          {/* Mobile hamburger / close */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-11"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'rgb(45, 42, 53)', position: 'relative' }}
          >
            {menuOpen ? (
              <div style={{ position: 'relative', width: '36px', height: '36px' }}>
                <span className="block w-9 h-0.5 bg-current rounded-full" style={{ position: 'absolute', top: '50%', left: 0, transform: 'rotate(45deg)' }} />
                <span className="block w-9 h-0.5 bg-current rounded-full" style={{ position: 'absolute', top: '50%', left: 0, transform: 'rotate(-45deg)' }} />
              </div>
            ) : (
              <div className="flex flex-col gap-[8px]">
                <span className="block w-9 h-0.5 bg-current rounded-full" />
                <span className="block w-9 h-0.5 bg-current rounded-full" />
                <span className="block w-9 h-0.5 bg-current rounded-full" />
              </div>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center justify-start flex-1 w-full" style={{ gap: '50px', paddingTop: '40px' }}>
            <a href="/" onClick={() => setMenuOpen(false)} className="hover:opacity-60 active:scale-95 transition-all" style={navStyle('/')}>Home</a>
            <Link to="/work" onClick={() => setMenuOpen(false)} className="hover:opacity-60 active:scale-95 transition-all" style={navStyle('/work')}>Projects</Link>
            <Link to="/explorations" onClick={() => setMenuOpen(false)} className="hover:opacity-60 active:scale-95 transition-all" style={navStyle('/explorations')}>Explorations</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:opacity-60 active:scale-95 transition-all" style={navStyle('/about')}>About</Link>
            <Button onClick={() => { setMenuOpen(false); navigate('/contact') }} variant="secondary">Get in touch</Button>
          </div>
        )}
      </nav>
    </div>
  )
}
