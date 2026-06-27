import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { FaqAccordionItem } from '../components/FaqAccordionItem'
import { Reveal } from '../components/Reveal'
import { FAQ_ENTRIES } from '../lib/faqData'
import { useFaqBatchSize } from '../hooks/useFaqBatchSize'
import { cn } from '../lib/cn'

const REVEAL_EASE = [0.16, 0.84, 0.34, 1] as const

export function Faq() {
  const batchSize = useFaqBatchSize()
  const reduceMotion = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set())
  const previousVisibleCount = useRef(batchSize)

  useEffect(() => {
    setVisibleCount((current) => Math.min(Math.max(current, batchSize), FAQ_ENTRIES.length))
    previousVisibleCount.current = Math.min(batchSize, FAQ_ENTRIES.length)
  }, [batchSize])

  const visibleFaqs = FAQ_ENTRIES.slice(0, visibleCount)
  const totalFaqs = FAQ_ENTRIES.length
  const showControls = totalFaqs > batchSize
  const allVisible = visibleCount >= totalFaqs
  const canShowLess = visibleCount > batchSize

  function toggleItem(id: string) {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleLoadMore() {
    previousVisibleCount.current = visibleCount
    setVisibleCount((current) => Math.min(current + batchSize, totalFaqs))
  }

  function handleShowLess() {
    previousVisibleCount.current = visibleCount
    setVisibleCount((current) => Math.max(current - batchSize, batchSize))
  }

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="section-anchor bg-bg px-gutter py-section"
    >
      <div className="mx-auto max-w-page">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              Frequently asked questions
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="faqs-heading"
              className="m-0 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading"
            >
              Clear answers before you join.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[560px] text-[19px] leading-[1.7] text-muted">
              Everything you need to know about Share Funding System, Success Centers,
              and joining the waitlist.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2 lg:gap-4">
          {visibleFaqs.map((faq, index) => {
            const isNewlyRevealed = index >= previousVisibleCount.current

            return (
              <motion.div
                key={faq.id}
                initial={
                  reduceMotion || !isNewlyRevealed
                    ? false
                    : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: REVEAL_EASE,
                  delay: isNewlyRevealed
                    ? (index - previousVisibleCount.current) * 0.05
                    : 0,
                }}
              >
                <FaqAccordionItem
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIds.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              </motion.div>
            )
          })}
        </div>

        {showControls && (
          <Reveal delay={0.08} className="mt-10 flex justify-center">
            {allVisible && canShowLess ? (
              <button
                type="button"
                onClick={handleShowLess}
                className={cn(
                  'interactive-btn inline-flex items-center gap-2.5 rounded-brand border border-line bg-bg-alt px-7 py-3.5',
                  'font-display text-[15px] font-semibold tracking-wide text-ink-heading',
                  'hover:border-gold-dark/35 hover:bg-bg-gold',
                )}
              >
                Show essential questions
                <ChevronUp size={17} strokeWidth={2.2} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLoadMore}
                className={cn(
                  'interactive-btn inline-flex items-center gap-2.5 rounded-brand border border-line bg-bg-alt px-7 py-3.5',
                  'font-display text-[15px] font-semibold tracking-wide text-ink-heading',
                  'hover:border-gold-dark/35 hover:bg-bg-gold',
                )}
              >
                Browse more answers
                <ChevronDown size={17} strokeWidth={2.2} aria-hidden="true" />
              </button>
            )}
          </Reveal>
        )}
      </div>
    </section>
  )
}
