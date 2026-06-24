import { CircleHelp } from 'lucide-react'

interface FieldTooltipProps {
  id: string
  text: string
}

export function FieldTooltip({ id, text }: FieldTooltipProps) {
  return (
    <span className="group relative ml-1.5 inline-flex align-middle">
      <button
        type="button"
        aria-describedby={id}
        className="inline-flex h-[18px] w-[18px] cursor-help items-center justify-center rounded-full text-white/55 transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <CircleHelp size={14} strokeWidth={2.2} aria-hidden="true" />
        <span className="sr-only">More information</span>
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 rounded-brand border border-white/12 bg-[#0f2448] px-3.5 py-2.5 text-left text-[12.5px] leading-relaxed font-normal text-white/90 opacity-0 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.65)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
        <span
          className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#0f2448]"
          aria-hidden="true"
        />
      </span>
    </span>
  )
}
