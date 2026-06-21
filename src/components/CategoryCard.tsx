import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface CategoryCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  delay?: number
}

export function CategoryCard({ children, className, innerClassName, delay }: CategoryCardProps) {
  return (
    <div
      data-reveal
      className={cn(className)}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      <article
        data-cat
        className={cn(
          'interactive-card group relative h-full min-h-0 w-full',
          innerClassName ?? 'flex flex-col justify-between',
        )}
      >
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
