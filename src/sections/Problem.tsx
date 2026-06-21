import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '../components/Reveal'

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

function CostTrendChart() {
  const reduce = useReducedMotion()
  const lineDelay = 0.15 + (BARS.length - 1) * BAR_STAGGER + BAR_DURATION * 0.45
  const captionDelay = lineDelay + (reduce ? 0 : 0.45)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: CHART_EASE }}
      className="relative overflow-hidden rounded-[14px] border border-line bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] px-[34px] py-[38px] shadow-[0_30px_60px_-30px_rgba(12,31,68,0.22)]"
    >
      <div className="relative h-[200px]">
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
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              pathLength: { duration: reduce ? 0 : 0.75, delay: reduce ? 0 : lineDelay, ease: CHART_EASE },
              opacity: { duration: reduce ? 0 : 0.3, delay: reduce ? 0 : lineDelay },
            }}
          />
        </svg>

        <div className="relative z-10 flex h-full items-end gap-[18px]">
          {BARS.map((bar, i) => (
            <div key={bar.h} className="flex h-full flex-1 flex-col justify-end overflow-hidden">
              <motion.div
                className="w-full origin-bottom rounded-t-md"
                style={{
                  height: `${bar.h}%`,
                  background: bar.bg,
                  boxShadow: 'glow' in bar ? bar.glow : undefined,
                }}
                initial={reduce ? false : { scaleY: 0, opacity: 0.6 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: reduce ? 0 : BAR_DURATION,
                  delay: reduce ? 0 : 0.15 + i * BAR_STAGGER,
                  ease: CHART_EASE,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
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
