import { useState } from 'react'

const variants = {
  primary: {
    backgroundColor: 'rgb(46, 42, 53)',
    color: 'rgb(240, 242, 244)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'rgb(240, 242, 244)',
    color: 'rgb(46, 42, 53)',
    border: '1px solid rgba(46, 42, 53, 0.1)',
  },
}

const hoverIn = (e, variant) => {
  if (variant === 'secondary') {
    e.currentTarget.style.backgroundColor = 'white'
    e.currentTarget.style.borderColor = 'rgb(21, 21, 31)'
  } else {
    e.currentTarget.style.opacity = '0.8'
  }
}

const hoverOut = (e, variant) => {
  if (variant === 'secondary') {
    e.currentTarget.style.backgroundColor = variants.secondary.backgroundColor
    e.currentTarget.style.borderColor = 'rgba(16, 15, 16, 0.1)'
  } else {
    e.currentTarget.style.opacity = '1'
  }
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12H19M19 12L13 6M19 12L13 18" />
    </svg>
  )
}

function ArrowButton({ hovered: cardHovered = false, onClick, href, target, rel }) {
  const [selfHovered, setSelfHovered] = useState(false)
  const active = cardHovered || selfHovered

  const style = {
    width: '36px',
    height: '36px',
    borderRadius: '100px',
    border: `1px solid ${active ? 'rgb(46, 42, 53)' : 'rgba(46, 42, 53, 0.1)'}`,
    backgroundColor: active ? 'rgb(46, 42, 53)' : 'transparent',
    color: active ? 'rgb(240, 242, 244)' : 'rgb(46, 42, 53)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease',
  }

  const handlers = {
    onMouseEnter: () => setSelfHovered(true),
    onMouseLeave: () => setSelfHovered(false),
  }

  if (href) {
    return <a href={href} target={target} rel={rel} style={style} {...handlers}><ArrowIcon /></a>
  }

  return <button onClick={onClick} style={style} {...handlers}><ArrowIcon /></button>
}

export default function Button({ variant = 'primary', href, target, rel, children, onClick, hovered, type, disabled, arrow, style: styleProp }) {
  if (variant === 'arrow') {
    return <ArrowButton hovered={hovered} onClick={onClick} href={href} target={target} rel={rel} />
  }

  const style = {
    ...variants[variant],
    borderRadius: '54px',
    boxShadow: 'rgba(51, 51, 51, 0.1) 0px 2px 4px 0px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '1.4rem',
    fontWeight: 400,
    padding: '14px 28px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    opacity: disabled ? 0.6 : 1,
    transition: 'opacity 0.2s, background-color 0.2s, border-color 0.2s',
    ...styleProp,
  }

  const content = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="sg-btn" style={style} onMouseEnter={e => hoverIn(e, variant)} onMouseLeave={e => hoverOut(e, variant)}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className="sg-btn" style={style} onMouseEnter={e => !disabled && hoverIn(e, variant)} onMouseLeave={e => !disabled && hoverOut(e, variant)}>
      {content}
    </button>
  )
}
