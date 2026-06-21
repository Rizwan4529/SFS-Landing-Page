import { cn } from '../lib/cn'

interface ParallaxImageProps {
  src: string
  speed?: number
  alt?: string
  className?: string
  /** Tailwind classes for the centered wrapper (positioning only) */
  positionClassName?: string
}

export function ParallaxImage({
  src,
  speed = 0.05,
  alt = '',
  className,
  positionClassName = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
}: ParallaxImageProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden={alt === ''}>
      <div className={positionClassName}>
        <img
          data-parallax={speed}
          src={src}
          alt={alt}
          className={cn('block h-auto max-w-none object-contain', className)}
        />
      </div>
    </div>
  )
}
