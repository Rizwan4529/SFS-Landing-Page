import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '../components/Reveal'

const CHART_HEIGHT = 200

const BARS = [
  { h: 38, bg: 'linear-gradient(180deg,#c9d4e6,#aab9d4)' },
  { h: 55, bg: 'linear-gradient(180deg,#b9c6df,#9aabca)' },
  { h: 72, bg: 'linear-gradient(180deg,#aab9d4,#8a9dc0)' },
  {
    h: 100,
    bg: 'linear-gradient(180deg,#e8c25a,#cf9f34)',
    glow: '0 0 30px rgba(207,159,52,0.4)',
  },
] as const

const BAR_STAGGER = 0.12
const BAR_DURATION = 0.55
const CHART_EASE = [0.16, 0.84, 0.34, 1] as const

const VIEWPORT = { once: true, amount: 0.15 as const, margin: '0px 0px -40px 0px' as const }

const barGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: BAR_STAGGER,
      delayChildren: 0.15,
    },
  },
}

const barVariants = {
  hidden: { scaleY: 0, opacity: 0.5 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: BAR_DURATION, ease: CHART_EASE },
  },
}

function CostTrendChart() {
  const reduce = useReducedMotion()
  const lineDelay = 0.15 + (BARS.length - 1) * BAR_STAGGER + BAR_DURATION * 0.45
  const captionDelay = lineDelay + (reduce ? 0 : 0.45)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: CHART_EASE }}
      className="relative overflow-hidden rounded-[14px] border border-line bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] px-5 py-8 shadow-[0_30px_60px_-30px_rgba(12,31,68,0.22)] sm:px-[34px] sm:py-[38px]"
    >
      <div className="relative h-[200px] w-full">
        <svg
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        >
          <motion.path
            d="M50 124 L150 90 L250 56 L350 0"
            fill="none"
            stroke="#cf9f34"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 6"
            initial={reduce ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={VIEWPORT}
            transition={{
              pathLength: { duration: reduce ? 0 : 0.75, delay: reduce ? 0 : lineDelay, ease: CHART_EASE },
              opacity: { duration: reduce ? 0 : 0.3, delay: reduce ? 0 : lineDelay },
            }}
          />
        </svg>

        <motion.div
          className="absolute inset-0 z-10 flex items-end gap-2.5 sm:gap-[18px]"
          variants={reduce ? undefined : barGroupVariants}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={VIEWPORT}
        >
          {BARS.map((bar, i) => {
            const barHeight = Math.round((bar.h / 100) * CHART_HEIGHT)
            return (
              <motion.div
                key={i}
                className="min-h-0 flex-1 origin-bottom rounded-t-md"
                style={{
                  height: barHeight,
                  background: bar.bg,
                  boxShadow: 'glow' in bar ? bar.glow : undefined,
                }}
                variants={reduce ? undefined : barVariants}
                initial={reduce ? false : undefined}
                animate={reduce ? { scaleY: 1, opacity: 1 } : undefined}
              />
            )
          })}
        </motion.div>
      </div>

      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{
          duration: reduce ? 0 : 0.5,
          delay: reduce ? 0 : captionDelay,
          ease: CHART_EASE,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#cf9f34"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M17 7h4v4" />
        </svg>
        <span className="text-sm font-semibold tracking-wide text-muted-soft">
          The cost of everyday life — trending up
        </span>
      </motion.div>
    </motion.div>
  )
}

export function Problem() {
  return (
    <section id="problem" className="section-anchor bg-bg px-gutter py-section">
      <div className="mx-auto grid max-w-page items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[72px]">
        <div>
          <Reveal>
            <span className="mb-5 inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              The problem
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="m-0 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading">
              Everyday costs keep climbing.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[540px] text-[19px] leading-[1.7] text-muted">
              Millions of people feel the squeeze every month — housing, food, utilities,
              transportation, and medical costs keep rising, and small businesses struggle to find
              funding to grow. Most people just want a clearer way to organize and pursue their
              goals.
            </p>
          </Reveal>
        </div>

        <CostTrendChart />
      </div>
    </section>
  )
}
