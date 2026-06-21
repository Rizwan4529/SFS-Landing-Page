import { Reveal } from '../components/Reveal'
import { ParallaxImage } from '../components/ParallaxImage'

const STEPS = [
  {
    num: '01',
    title: 'Create your free account',
    desc: 'Sign up in moments — no payment required to get started.',
  },
  {
    num: '02',
    title: 'Choose the category that fits your goal',
    desc: 'Housing, food, utilities, debt, vehicle, medical, or business growth.',
  },
  {
    num: '03',
    title: 'Activate your campaign',
    desc: 'Launch the campaign built around the goal you care about.',
  },
  {
    num: '04',
    title: 'Track progress from your dashboard',
    desc: 'See where you stand and stay oriented toward your goal.',
  },
  {
    num: '05',
    title: 'Earn rewards credits as you participate',
    desc: 'Participation is recognized with credits you can put to use.',
  },
  {
    num: '06',
    title: 'Access educational resources and platform tools',
    desc: 'Keep learning with guides and tools that support your goals.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-gradient-to-b from-navy-darkest to-navy px-gutter py-[150px]"
    >
      <ParallaxImage
        src="/assets/world-white.png"
        speed={0.05}
        base="translate(-50%,0)"
        className="pointer-events-none absolute top-[14%] left-1/2 w-[110%] max-w-[1400px] -translate-x-1/2 opacity-8"
      />

      <div className="relative mx-auto max-w-[760px]">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold uppercase">
              How SFS works
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="how-heading"
              className="m-0 font-display text-[clamp(34px,4.6vw,58px)] leading-[1.06] font-bold tracking-[-1.2px] text-white"
            >
              Six steps, start to goal.
            </h2>
          </Reveal>
        </div>

        <div id="how-section" className="relative">
          <div
            aria-hidden="true"
            className="absolute top-[30px] bottom-[30px] left-[31px] w-0.5 rounded-sm bg-gold/16"
          />
          <div
            id="how-fill"
            aria-hidden="true"
            className="absolute top-[30px] left-[31px] w-0.5 rounded-sm bg-gradient-to-b from-gold to-gold-dark shadow-[0_0_14px_rgba(232,194,90,0.5)] transition-[height] duration-150"
            style={{ height: '0%' }}
          />

          <div className="flex flex-col gap-[30px]">
            {STEPS.map((step) => (
              <Reveal key={step.num} className="relative flex items-center gap-[26px]">
                <div
                  data-step-node
                  className="relative z-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-line bg-white font-display text-xl font-bold text-gold-dark transition-[background,color,box-shadow,border-color] duration-400"
                >
                  {step.num}
                </div>
                <div className="flex-1 rounded-card border border-white/8 bg-white/4 px-[26px] py-[22px]">
                  <h3 className="m-0 font-display text-[21px] font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-[7px] text-[15.5px] leading-snug text-[rgba(206,218,242,0.7)]">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
