import { Reveal } from '../components/Reveal'
import { WaitlistForm } from '../components/WaitlistForm'
import { WAITLIST_ID } from '../lib/nav'

export function WaitlistSection() {
  return (
    <section id={WAITLIST_ID} className="section-anchor bg-bg px-gutter py-section">
      <div className="mx-auto max-w-[660px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel border border-navy-border-alt bg-gradient-to-br from-navy to-navy-card px-8 py-[54px] shadow-[0_40px_80px_-40px_rgba(12,31,68,0.6)] md:px-12">
            <img
              src="/assets/world-white.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -top-[60px] -right-20 w-[420px] opacity-10"
            />
            <div className="relative text-center">
              <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold uppercase">
                Join the waitlist
              </span>
              <h2
                id="waitlist-heading"
                className="m-0 font-display text-[clamp(30px,3.6vw,42px)] leading-[1.08] font-bold tracking-tight text-white"
              >
                Be first to know when SFS launches.
              </h2>
              <WaitlistForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
