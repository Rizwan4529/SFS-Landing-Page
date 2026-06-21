import { Reveal } from '../components/Reveal'
import { CategoryCard, CategoryIcon } from '../components/CategoryCard'

const CATEGORIES = [
  {
    title: 'Housing',
    desc: 'Rent, mortgage, and housing expenses.',
    featured: true,
    col: 'col-span-12 md:col-span-6',
    minH: 'min-h-[236px]',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8c25a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-7 9 7" />
        <path d="M5 9.6V20h14V9.6" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    title: 'Food & Groceries',
    desc: 'Household food and grocery needs.',
    col: 'col-span-12 sm:col-span-6 md:col-span-3',
    minH: 'min-h-[236px]',
    delay: 0.04,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .9H8.2a1 1 0 0 1-1-.9Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
    ),
  },
  {
    title: 'Utilities',
    desc: 'Electricity, water, internet, and bills.',
    col: 'col-span-12 sm:col-span-6 md:col-span-3',
    minH: 'min-h-[236px]',
    delay: 0.08,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7l-1 8 10-12h-7z" />
      </svg>
    ),
  },
  {
    title: 'Debt Reduction',
    desc: 'Reducing personal debt.',
    col: 'col-span-12 sm:col-span-6 md:col-span-4',
    minH: 'min-h-[210px]',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7l6 6 4-4 6 6" />
        <path d="M16 15h4v-4" />
      </svg>
    ),
  },
  {
    title: 'Vehicle',
    desc: 'Transportation and vehicle goals.',
    col: 'col-span-12 sm:col-span-6 md:col-span-4',
    minH: 'min-h-[210px]',
    delay: 0.04,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13l2-5h11l3 5" />
        <path d="M2.5 13h19v4h-2" />
        <path d="M5 17H2.5v-4" />
        <circle cx="7" cy="17.5" r="1.6" />
        <circle cx="17" cy="17.5" r="1.6" />
      </svg>
    ),
  },
  {
    title: 'Medical',
    desc: 'Health-related financial needs.',
    col: 'col-span-12 sm:col-span-6 md:col-span-4',
    minH: 'min-h-[210px]',
    delay: 0.08,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 9.5C20.5 6.5 18.2 4.5 15.7 4.5c-1.7 0-3 .9-3.7 2-0.7-1.1-2-2-3.7-2C5.8 4.5 3.5 6.5 3.5 9.5c0 5 8.5 10 8.5 10s8.5-5 8.5-10Z" />
        <path d="M12 8.5v5" />
        <path d="M9.5 11h5" />
      </svg>
    ),
  },
]

export function Categories() {
  return (
    <section id="categories" className="section-anchor bg-bg px-gutter py-section">
      <div className="mx-auto max-w-page">
        <div className="mb-14 max-w-[680px]">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              Campaign categories
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="m-0 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading">
              Built around the categories that matter.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-[18px]">
          {CATEGORIES.map((cat) =>
            cat.featured ? (
              <CategoryCard
                key={cat.title}
                gridClassName={`${cat.col} ${cat.minH}`}
                className="overflow-hidden rounded-card border border-navy-border bg-gradient-to-br from-navy to-navy-card p-9 shadow-[0_24px_50px_-34px_rgba(12,31,68,0.6)]"
              >
                <img
                  src="/assets/world-white.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 w-[min(140%,420px)] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-12"
                />
                <CategoryIcon className="relative h-[54px] w-[54px] rounded-[9px] border border-gold/30 bg-gold/12">
                  {cat.icon}
                </CategoryIcon>
                <div className="relative">
                  <h3 className="m-0 font-display text-[25px] font-bold tracking-tight text-white">{cat.title}</h3>
                  <p className="mt-2 text-base leading-snug text-[rgba(206,218,242,0.78)]">{cat.desc}</p>
                </div>
              </CategoryCard>
            ) : (
              <CategoryCard
                key={cat.title}
                delay={cat.delay}
                gridClassName={`${cat.col} ${cat.minH}`}
                className="rounded-card border border-line bg-bg-card p-7 md:p-[30px_28px]"
              >
                <CategoryIcon className="h-[50px] w-[50px] rounded-[9px] border border-border-gold bg-bg-icon">
                  {cat.icon}
                </CategoryIcon>
                <div>
                  <h3 className="m-0 font-display text-xl font-bold tracking-tight text-ink-heading">{cat.title}</h3>
                  <p className="mt-2 text-[15px] leading-normal text-muted-soft">{cat.desc}</p>
                </div>
              </CategoryCard>
            ),
          )}

          <CategoryCard
            gridClassName="col-span-12"
            className="overflow-hidden rounded-card border border-border-gold bg-gradient-to-br from-bg-gold to-bg-gold-alt p-9 md:px-10"
            innerClassName="flex flex-wrap items-center gap-8 md:flex-nowrap"
          >
            <CategoryIcon className="h-[62px] w-[62px] shrink-0 rounded-[10px] bg-gradient-gold shadow-[0_10px_26px_-10px_rgba(207,159,52,0.7)]">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0b1f44" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20V13" />
                <path d="M10 20V9" />
                <path d="M16 20v-7" />
                <path d="M3 20h18" />
                <path d="M4 11l5-4 4 3 7-6" />
                <path d="M16 4h4v4" />
              </svg>
            </CategoryIcon>
            <div className="min-w-[260px] flex-1">
              <h3 className="m-0 font-display text-[25px] font-bold tracking-tight text-ink-heading">
                Business Growth
              </h3>
              <p className="mt-2 max-w-[620px] text-[16.5px] leading-snug text-[#5b5333]">
                Startup, expansion, equipment, and operations — funding to help a small business grow.
              </p>
            </div>
            <span className="font-display text-[15px] font-bold tracking-wide whitespace-nowrap text-[#a9842a]">
              For small business owners
            </span>
          </CategoryCard>
        </div>
      </div>
    </section>
  )
}
