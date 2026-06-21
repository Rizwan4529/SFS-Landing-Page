import { useId } from 'react'

interface CardBorderTraceProps {
  radius?: number
}

export function CardBorderTrace({ radius = 10 }: CardBorderTraceProps) {
  const uid = useId().replace(/:/g, '')
  const gradientId = `card-border-gold-${uid}`

  return (
    <svg
      className="card-border-trace pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b5841f" />
          <stop offset="45%" stopColor="#e8c25a" />
          <stop offset="100%" stopColor="#cf9f34" />
        </linearGradient>
      </defs>
      <rect
        className="card-border-trace-path"
        x="0.75"
        y="0.75"
        width="calc(100% - 1.5px)"
        height="calc(100% - 1.5px)"
        rx={radius}
        ry={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        pathLength="100"
      />
    </svg>
  )
}
