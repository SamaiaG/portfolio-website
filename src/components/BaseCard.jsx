import { useState } from 'react'

export default function BaseCard({
  children,
  padding = '30px',
  gap = '10px',
  align = 'center',
  justify = 'flex-start',
  scrollable = false,
  hover = true,
  as: Tag = 'div',
  style = {},
  className = '',
  ...rest
}) {
  const [hovered, setHovered] = useState(false)

  const cardStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: justify,
    alignItems: align,
    flexWrap: 'nowrap',
    gap,
    padding,
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '0.5px solid rgba(46, 42, 53, 0.1)',
    overflowX: 'hidden',
    overflowY: scrollable ? 'auto' : 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ...(hover && hovered && {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px rgba(46, 42, 53, 0.08)',
    }),
    ...style,
  }

  return (
    <Tag
      style={cardStyle}
      className={`${scrollable ? 'hide-scrollbar' : ''} ${className}`.trim()}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
