import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

/**
 * variant="full"    — Work page card: image + title/type/year + description + tags
 * variant="compact" — Home page card: image + title + type + arrow only
 */
export default function ProjectCard({
  title,
  type,
  cardColor,
  cardImage,
  shortDescription,
  slug,
  variant = 'full',
  style: styleProp = {},
}) {
  const [hovered, setHovered] = useState(false)

  const isCompact = variant === 'compact'

  return (
    <Link
      to={slug}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        border: '0.5px solid rgba(46, 42, 53, 0.1)',
        overflow: 'hidden',
        textDecoration: 'none',
        backgroundColor: 'var(--color-surface)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        ...(hovered && {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 40px rgba(46, 42, 53, 0.1)',
        }),
        ...styleProp,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area — fixed height, image absolutely contained within padded bounds */}
      <div style={{
        backgroundColor: cardColor,
        flex: `0 0 ${isCompact ? '26rem' : '22rem'}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={cardImage}
          alt={title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: isCompact ? '24px' : '32px',
            left: isCompact ? '24px' : '32px',
            right: isCompact ? '24px' : '32px',
            bottom: 0,
            width: isCompact ? 'calc(100% - 48px)' : 'calc(100% - 64px)',
            height: 'calc(100% - 50px)',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Info area — fills the rest of the card exactly */}
      <div style={{
        padding: isCompact ? '28px 28px' : '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? 0 : '1rem',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: isCompact ? '2rem' : '1.8rem',
            color: 'var(--color-text)',
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
          }}>
            {title}
          </h3>
        </div>

        {/* Type row */}
        {type && (
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: 'var(--color-text-muted)',
            margin: 0,
          }}>
            {type}
          </p>
        )}

        {/* Description — full variant only */}
        {!isCompact && shortDescription && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            lineHeight: 1.65,
            color: 'var(--color-text-muted)',
            margin: 0,
          }}>
            {shortDescription}
          </p>
        )}

        {/* Spacer + arrow pinned to bottom right */}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="arrow" hovered={hovered} />
        </div>
 
      </div>
    </Link>
  )
}
