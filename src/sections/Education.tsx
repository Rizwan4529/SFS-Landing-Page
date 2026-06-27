import { Reveal } from '../components/Reveal'
import { CategoryCard, CategoryIcon } from '../components/CategoryCard'
import { scrollToId } from '../lib/cn'
import { trackVideoClick } from '../lib/analytics'
import { EXPLAINER_VIDEO_ID, EXPLAINER_VIDEO_SRC, EXPLAINER_VIDEO_TITLE } from '../lib/video'

const ITEMS = [
  {
    title: 'Guides',
    desc: 'Step-by-step help for every category.',
    delay: 0,
    href: undefined as string | undefined,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 1.5z" />
        <path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 1.5z" />
      </svg>
    ),
  },
  {
    title: 'Videos',
    desc: 'Watch the SFS explainer and learn at your own pace.',
    delay: 0.05,
    href: `#${EXPLAINER_VIDEO_ID}`,
    isExplainer: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M10 9l5 3-5 3z" fill="#cf9f34" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'FAQs',
    desc: 'Clear answers to common questions.',
    delay: 0.1,
    href: '#faqs',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.9" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Knowledge center',
    desc: 'A growing library, all in one place.',
    delay: 0.15,
    href: undefined,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cf9f34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
        <path d="M3 12l9 4.5 9-4.5" />
        <path d="M3 16.5L12 21l9-4.5" />
      </svg>
    ),
  },
]

function EducationCard({
  item,
}: {
  item: (typeof ITEMS)[number]
}) {
  const cardClass =
    'rounded-card border border-line bg-bg px-[26px] py-8 shadow-[0_10px_30px_-22px_rgba(12,31,68,0.4)]'

  const content = (
    <>
      <CategoryIcon className="mb-5 h-[50px] w-[50px] rounded-[9px] border border-border-gold bg-bg-icon">
        {item.icon}
      </CategoryIcon>
      <h3 className="m-0 font-display text-[19px] font-bold tracking-tight text-ink-heading">
        {item.title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-snug text-muted-soft">{item.desc}</p>
    </>
  )

  if (item.href && 'isExplainer' in item && item.isExplainer) {
    return (
      <CategoryCard delay={item.delay} className={cardClass}>
        <a
          href={item.href}
          className="block no-underline text-inherit"
          onClick={(e) => {
            e.preventDefault()
            trackVideoClick(EXPLAINER_VIDEO_TITLE, EXPLAINER_VIDEO_SRC)
            scrollToId(EXPLAINER_VIDEO_ID)
          }}
        >
          {content}
        </a>
      </CategoryCard>
    )
  }

  if (item.href?.startsWith('#')) {
    const sectionId = item.href.slice(1)
    return (
      <CategoryCard delay={item.delay} className={cardClass}>
        <a
          href={item.href}
          className="block no-underline text-inherit"
          onClick={(e) => {
            e.preventDefault()
            scrollToId(sectionId)
          }}
        >
          {content}
        </a>
      </CategoryCard>
    )
  }

  if (item.href) {
    return (
      <CategoryCard delay={item.delay} className={cardClass}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-underline text-inherit"
          onClick={() => trackVideoClick(item.title, item.href!)}
        >
          {content}
        </a>
      </CategoryCard>
    )
  }

  return (
    <CategoryCard delay={item.delay} className={cardClass}>
      {content}
    </CategoryCard>
  )
}

export function Education() {
  return (
    <section id="education" className="section-anchor bg-bg-alt px-gutter py-section">
      <div className="mx-auto max-w-page">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              Educational resources
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="m-0 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading">
              More than a platform. A place to learn.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[560px] text-[19px] leading-[1.7] text-muted">
              Learn how SFS works before launch — guides, videos, and resources to help you
              understand your goals and options.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <EducationCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
