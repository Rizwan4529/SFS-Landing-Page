import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";
import { WAITLIST_ID } from "../lib/nav";

export function WaitlistSection() {
  return (
    <section
      id={WAITLIST_ID}
      className="section-anchor bg-bg px-gutter py-section"
    >
      <div className="mx-auto max-w-[660px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel border border-navy-border-alt bg-gradient-to-br from-navy to-navy-card px-8 py-[54px] shadow-[0_40px_80px_-40px_rgba(12,31,68,0.6)] md:px-12">
            <img
              src="/assets/world-white.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 w-[min(140%,480px)] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-10"
            />
            <div className="relative text-center">
              <span className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[12px] font-bold tracking-[2px] text-gold uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-glow-pulse" />
                Launching soon · Pre-access waitlist
              </span>
              <h2
                id="waitlist-heading"
                className="m-0 font-display text-[clamp(30px,3.6vw,42px)] leading-[1.08] font-bold tracking-tight text-white"
              >
                Reserve your spot for launch day.
              </h2>
              <p className="mx-auto mt-5 max-w-[520px] text-base leading-relaxed text-[rgba(206,218,242,0.78)]">
                Join now and be among the first to receive early access when
                Share Fund System officially launches. No payment required.
              </p>
              {/* <PreLaunchCallout variant="panel" className="mx-auto mt-6 max-w-[520px] text-left" /> */}
              <WaitlistForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
