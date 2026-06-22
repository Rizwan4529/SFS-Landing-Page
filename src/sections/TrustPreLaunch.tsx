import { Reveal } from "../components/Reveal";
import { CategoryCard, CategoryIcon } from "../components/CategoryCard";

const PILLARS = [
  {
    title: "Educational-first approach",
    desc: "SFS is built around learning first — understand your options and goals before the platform goes live.",
    delay: 0,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cf9f34"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 1.5z" />
        <path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 1.5z" />
      </svg>
    ),
  },
  {
    title: "No payment required",
    desc: "Joining the waitlist is completely free. No credit card, no commitment — just early access when we launch.",
    delay: 0.05,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cf9f34"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Learn how SFS works",
    desc: "Explore the six-step journey, campaign categories, and rewards model before the platform launches.",
    delay: 0.1,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cf9f34"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Early access updates",
    desc: "Waitlist members receive launch announcements, educational content, and first access to Share Fund System.",
    delay: 0.15,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cf9f34"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export function TrustPreLaunch() {
  return (
    <section
      id="trust"
      className="section-anchor bg-bg-alt px-gutter pb-section"
    >
      <div className="mx-auto max-w-page">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              Pre-SFS · Trust &amp; education
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="m-0 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading">
              Platform launching soon — join for early access.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[560px] text-[19px] leading-[1.7] text-muted">
              Share Fund System is launching soon. Join the waitlist now to
              learn how the platform works and be first in line for early access
              when we go live.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <CategoryCard
              key={pillar.title}
              delay={pillar.delay}
              className="rounded-card border border-line bg-bg px-[26px] py-8 shadow-[0_10px_30px_-22px_rgba(12,31,68,0.4)]"
            >
              <CategoryIcon className="mb-5 h-[50px] w-[50px] rounded-[9px] border border-border-gold bg-bg-icon">
                {pillar.icon}
              </CategoryIcon>
              <h3 className="m-0 font-display text-[19px] font-bold tracking-tight text-ink-heading">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-snug text-muted-soft">
                {pillar.desc}
              </p>
            </CategoryCard>
          ))}
        </div>
      </div>
    </section>
  );
}
