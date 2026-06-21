import { Reveal } from '../components/Reveal'
import { CategoryCard, CategoryIcon } from '../components/CategoryCard'

const REWARDS = [
  {
    title: 'Future campaign activations',
    delay: 0,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v9" />
        <path d="M9.5 10h3.2a1.8 1.8 0 0 1 0 3.6H10" />
      </svg>
    ),
  },
  {
    title: 'Marketplace purchases',
    delay: 0.05,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 7h15l-1.4 9.2a1 1 0 0 1-1 .8H8a1 1 0 0 1-1-.8L5 4H3" />
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
      </svg>
    ),
  },
  {
    title: 'Platform services and benefits',
    delay: 0.05,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.4 2.1 3.1-.5.6 3.1L20.7 10 19 12.6l1.4 2.8-2.6 1.8-.6 3.1-3.1-.5L12 21l-2.4-1.7-3.1.5-.6-3.1L3.3 14.8 4.7 12 3.3 9.2l2.6-1.8.6-3.1 3.1.5z" />
        <path d="M9.5 12l1.8 1.8 3.4-3.6" />
      </svg>
    ),
  },
  {
    title: 'Future promotional opportunities',
    delay: 0.1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13.5V7a2 2 0 0 0-1-1.7l-6-3.4a2 2 0 0 0-2 0L5 5.3A2 2 0 0 0 4 7v6.5a2 2 0 0 0 1 1.7l6 3.4a2 2 0 0 0 2 0" />
        <path d="M16 17l2 2 4-4" />
      </svg>
    ),
  },
]

export function Rewards() {
  return (
    <section id="rewards" className="section-anchor bg-bg px-gutter py-section">
      <div className="mx-auto grid max-w-page items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="mb-5 inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              Rewards credits
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="m-0 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading">
              Participation that gives back.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-[26px] max-w-[460px] text-[19px] leading-[1.7] text-muted">
              SFS includes a rewards credit system that recognizes your participation. Credits can go
              toward what matters to you on the platform.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {REWARDS.map((item) => (
            <CategoryCard
              key={item.title}
              delay={item.delay}
              className="rounded-card border border-line bg-bg-card p-7"
            >
              <CategoryIcon className="mb-[18px] h-[46px] w-[46px] rounded-[9px] border border-border-gold bg-bg-icon">
                {item.icon}
              </CategoryIcon>
              <h3 className="m-0 font-display text-lg font-bold tracking-tight text-ink-heading">
                {item.title}
              </h3>
            </CategoryCard>
          ))}
        </div>
      </div>
    </section>
  )
}
