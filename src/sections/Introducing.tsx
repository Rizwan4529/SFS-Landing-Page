import { Reveal } from '../components/Reveal'
import { ParallaxImage } from '../components/ParallaxImage'

const TAGS = ['Participation', 'Education', 'Rewards credits', 'Marketing support']

export function Introducing() {
  return (
    <section id="about" className="section-anchor relative overflow-hidden bg-bg-alt px-gutter py-[150px]">
      <ParallaxImage
        src="/assets/world-slate.png"
        speed={0.04}
        className="pointer-events-none absolute top-1/2 left-1/2 w-[96%] max-w-[1300px] -translate-x-1/2 -translate-y-1/2 opacity-50"
      />
      <div className="relative mx-auto max-w-[920px] text-center">
        <Reveal>
          <span className="mb-[22px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
            Introducing SFS
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mx-auto m-0 max-w-[840px] font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-1.5px] text-ink-heading">
            One platform for real-life financial goals.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-[30px] max-w-[660px] text-xl leading-[1.7] text-muted">
            Instead of focusing on a single challenge, SFS lets you explore multiple campaign
            categories based on your own needs — campaign participation, education, rewards credits,
            and centralized marketing support, together in one place.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-[42px] flex flex-wrap justify-center gap-3.5">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-brand border border-line bg-bg px-[22px] py-[11px] text-[15px] font-semibold text-ink-tag shadow-[0_8px_24px_-16px_rgba(12,31,68,0.4)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
