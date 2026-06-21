import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Variant = 'gold' | 'ghost'

interface BaseProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type GoldButtonProps = BaseProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  )

const variants: Record<Variant, string> = {
  gold: 'bg-gradient-gold text-[#0b1f44] font-bold shadow-[0_12px_34px_rgba(207,159,52,0.4)] hover:shadow-[0_18px_44px_rgba(207,159,52,0.55)]',
  ghost:
    'bg-white/5 border border-white/22 text-[#eaf0fb] font-semibold hover:bg-white/10 hover:border-white/40',
}

export function GoldButton({
  variant = 'gold',
  children,
  className,
  href,
  ...props
}: GoldButtonProps) {
  const classes = cn(
    'interactive-btn inline-flex items-center justify-center gap-2.5 rounded-brand px-7 py-4 text-base tracking-wide',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
