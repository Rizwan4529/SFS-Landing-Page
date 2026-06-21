import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { CardBorderTrace } from './CardBorderTrace'

interface CategoryCardProps {
  children: ReactNode
  /** Grid placement + min-height on the outer wrapper */
  gridClassName?: string
  /** Card surface styles (border, background, padding) — hovers as one unit */
  className?: string
  innerClassName?: string
  delay?: number
}

export function CategoryCard({
  children,
  gridClassName,
  className,
  innerClassName,
  delay,
}: CategoryCardProps) {
  return (
    <div
      data-reveal
      className={cn('card-reveal h-full', gridClassName)}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      <article
        data-cat
        className={cn(
          'group interactive-card relative h-full w-full overflow-hidden',
          className,
          innerClassName ?? 'flex flex-col justify-between',
        )}
      >
        <CardBorderTrace />
        {children}
      </article>
    </div>
  )
}

export function CategoryIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('interactive-card-icon flex items-center justify-center', className)}>
      {children}
    </div>
  )
}
