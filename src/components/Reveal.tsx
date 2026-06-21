import type { ReactNode, CSSProperties, ElementType } from 'react'
import { cn } from '../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  as?: ElementType
}

export function Reveal({ children, className, style, delay = 0, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag
      data-reveal
      className={cn(className)}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </Tag>
  )
}
