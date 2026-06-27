import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn'

const ACCORDION_EASE = [0.16, 0.84, 0.34, 1] as const

interface FaqAccordionItemProps {
  id: string
  question: string
  answer: ReactNode
  isOpen: boolean
  onToggle: () => void
}

export function FaqAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const reduceMotion = useReducedMotion()
  const panelId = `${id}-panel`
  const triggerId = `${id}-trigger`

  return (
    <article
      className={cn(
        'group rounded-card border bg-bg shadow-[0_10px_30px_-22px_rgba(12,31,68,0.35)] transition-[border-color,box-shadow] duration-400',
        isOpen
          ? 'border-gold-dark/35 shadow-[0_16px_40px_-24px_rgba(207,159,52,0.28)]'
          : 'border-line hover:border-gold-dark/20',
      )}
    >
      <h3 className="m-0">
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="interactive-btn flex w-full items-start justify-between gap-4 px-[22px] py-[18px] text-left md:px-[26px] md:py-5"
        >
          <span className="font-display text-[16.5px] leading-snug font-bold tracking-tight text-ink-heading md:text-[17px]">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border transition-[background,border-color,transform] duration-400',
              isOpen
                ? 'border-gold-dark/30 bg-bg-gold text-gold-dark'
                : 'border-line bg-bg-card text-muted-soft group-hover:border-gold-dark/25 group-hover:text-gold-dark',
            )}
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: ACCORDION_EASE,
              }}
              className="inline-flex"
            >
              <ChevronDown size={18} strokeWidth={2.2} />
            </motion.span>
          </span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: {
            duration: reduceMotion ? 0 : 0.42,
            ease: ACCORDION_EASE,
          },
          opacity: {
            duration: reduceMotion ? 0 : 0.28,
            ease: ACCORDION_EASE,
          },
        }}
        className="overflow-hidden"
      >
        <div className="border-t border-line/80 px-[22px] pt-3 pb-[18px] text-[15px] leading-[1.72] text-muted md:px-[26px] md:pb-5">
          {answer}
        </div>
      </motion.div>
    </article>
  )
}
