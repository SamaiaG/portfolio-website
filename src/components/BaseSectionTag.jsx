export default function BaseSectionTag({ label, style = {}, labelStyle = {}, className = '' }) {
  return (
    <div className={className} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      margin: '32px 0 32px 0',
      ...style,
    }}>
      <span className="section-tag-label" style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1.2rem',
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: 'var(--color-text-subtle)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        ...labelStyle,
      }}>
        {label}
      </span>
      <span style={{
        flex: 1,
        height: '1px',
        backgroundColor: 'var(--color-border)',
      }} />
    </div>
  )
}
