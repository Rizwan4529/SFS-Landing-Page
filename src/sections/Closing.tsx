import { Reveal } from '../components/Reveal'
import { ParallaxImage } from '../components/ParallaxImage'
import { GoldButton } from '../components/GoldButton'
import { WAITLIST_ID } from '../lib/nav'
import { scrollToId } from '../lib/cn'

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden bg-gradient-to-b from-navy-darkest to-[#040c1e] px-gutter pt-[150px] pb-0">
      <ParallaxImage
        src="/assets/world-white.png"
        speed={0.05}
        positionClassName="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2"
        className="w-[118%] max-w-[1500px] opacity-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(207,159,52,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[820px] text-center">
        <svg
          viewBox="0 0 600 120"
          className="mx-auto mb-1.5 block h-auto w-[min(420px,80%)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="arcGoldClosing" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b5841f" stopOpacity="0" />
              <stop offset="0.18" stopColor="#cf9f34" />
              <stop offset="0.5" stopColor="#fbe6a6" />
              <stop offset="0.82" stopColor="#cf9f34" />
              <stop offset="1" stopColor="#b5841f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M40 96 Q300 18 560 96"
            fill="none"
            stroke="url(#arcGoldClosing)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="300" cy="38" r="3.4" fill="#fff6da" className="animate-glint-pulse" />
        </svg>

        <Reveal>
          <h2 className="m-0 font-display text-[clamp(40px,6vw,80px)] leading-[1.02] font-bold tracking-[-2px] text-white">
            Funding goals. <span className="text-shimmer-gold">Simplified.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-[30px] max-w-[600px] text-[19px] leading-[1.7] text-[rgba(214,224,244,0.78)]">
            SFS was created to help individuals and families work toward important financial goals
            through participation, education, innovation, and community.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <GoldButton
            href={`#${WAITLIST_ID}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(WAITLIST_ID)
            }}
            className="mt-[38px] px-[34px] py-[17px] text-[16.5px]"
          >
            Join the waitlist
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b1f44" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </GoldButton>
        </Reveal>
      </div>

      <footer className="relative mt-[120px] border-t border-white/10 py-12 pb-10">
        <div className="mx-auto flex max-w-page flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:gap-7 md:text-left">
          <div className="flex flex-col items-center gap-3.5 md:items-start">
            <img src="/assets/logo-light.png" alt="SFS" className="h-[38px] w-auto" />
            <span className="text-[15px] tracking-wide text-[rgba(180,194,222,0.7)]">
              Funding goals, simplified.
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end md:text-right">
            <a
              href="https://sharefundsystem.com"
              className="font-display text-base font-semibold tracking-wide text-gold"
            >
              sharefundsystem.com
            </a>
            <span className="text-[13.5px] text-[rgba(150,166,196,0.6)]">
              © 2026 SFS · Share Funding System. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </section>
  )
}
