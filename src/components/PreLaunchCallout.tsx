import { cn } from '../lib/cn'

type PreLaunchCalloutVariant = 'hero' | 'panel'

interface PreLaunchCalloutProps {
  variant?: PreLaunchCalloutVariant
  className?: string
}

export function PreLaunchCallout({ variant = 'hero', className }: PreLaunchCalloutProps) {
  const isHero = variant === 'hero'

  return (
    <div
      className={cn(
        'rounded-brand border text-left',
        isHero
          ? 'border-gold/45 bg-gold/8 px-5 py-4 shadow-[0_0_0_1px_rgba(232,194,90,0.08),0_16px_40px_-24px_rgba(207,159,52,0.35)]'
          : 'border-gold/35 bg-white/6 px-5 py-4',
        className,
      )}
    >
      <p
        className={cn(
          'm-0 font-display text-[15px] font-bold tracking-tight sm:text-base',
          isHero ? 'text-gold-chip' : 'text-gold',
        )}
      >
        Platform launching soon — early access at launch
      </p>
      <p
        className={cn(
          'm-0 mt-2 text-[14px] leading-[1.6] sm:text-[15px]',
          isHero ? 'text-[rgba(214,224,244,0.88)]' : 'text-[rgba(206,218,242,0.82)]',
        )}
      >
        Share Fund System is in its{' '}
        <strong className="font-semibold text-white">pre-launch</strong> phase. Join the waitlist
        now and be <strong className="font-semibold text-white">first in line</strong> for early
        access when we officially go live.
      </p>
    </div>
  )
}
