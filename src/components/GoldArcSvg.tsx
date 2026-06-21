interface GoldArcSvgProps {
  animated?: boolean
  className?: string
}

export function GoldArcSvg({ animated = false, className }: GoldArcSvgProps) {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b5841f" stopOpacity="0" />
          <stop offset="0.18" stopColor="#cf9f34" />
          <stop offset="0.5" stopColor="#fbe6a6" />
          <stop offset="0.82" stopColor="#cf9f34" />
          <stop offset="1" stopColor="#b5841f" stopOpacity="0" />
        </linearGradient>
        <filter id="arcGlow" x="-20%" y="-40%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 95 360 Q 600 70 1105 360"
        fill="none"
        stroke="url(#arcGold)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#arcGlow)"
        strokeDasharray="1500"
        strokeDashoffset={animated ? '1500' : '0'}
        className={animated ? 'animate-arc-draw' : undefined}
      />
      {animated && (
        <g transform="translate(600 198)" className="animate-glint-pulse">
          <circle r="4.5" fill="#fff6da" />
          <path
            d="M0 -16 L2 -3 L16 0 L2 3 L0 16 L-2 3 L-16 0 L-2 -3 Z"
            fill="#fbe6a6"
            opacity="0.95"
          />
        </g>
      )}
    </svg>
  )
}
