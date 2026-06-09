const skills = [
  'UX Research',
  'UX Design',
  'UI Design',
  'Wireframing',
  'Prototyping',
  'Figma',
  'User Testing',
  'Webflow',
  'Design Systems',
  'Framer',
  'Systems Thinking',
  'HTML',
  'CSS',
]

const dot = (
  <span style={{
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#c08f8f',
    display: 'inline-block',
    opacity: 0.7,
    flexShrink: 0,
  }} />
)

function Item({ label }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#8C8690',
      flexShrink: 0,
      fontFamily: 'var(--font-heading)',
    }}>
      {label}
      {dot}
    </span>
  )
}

export default function Skills() {
  const doubled = [...skills, ...skills]

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      borderTop: '1px solid rgba(46, 42, 53, 0.1)',
      borderBottom: '1px solid rgba(46, 42, 53, 0.1)',
      background: '#ffffff',
      padding: '18px 0',
    }}>
      <div style={{
        display: 'flex',
        gap: '48px',
        whiteSpace: 'nowrap',
        animation: 'marquee 28s linear infinite',
        willChange: 'transform',
      }}>
        {doubled.map((skill, i) => (
          <Item key={i} label={skill} />
        ))}
      </div>
    </div>
  )
}
