import { Reveal } from "../components/Reveal";
import { CategoryCard, CategoryIcon } from "../components/CategoryCard";
import { SiteVideoPlayer } from "../components/SiteVideoPlayer";
import {
  SUCCESS_CENTER_VIDEO_CONFIGURED,
  SUCCESS_CENTER_VIDEO_ID,
  SUCCESS_CENTER_VIDEO_SRC,
  SUCCESS_CENTER_VIDEO_TITLE,
  SUCCESS_CENTER_VIDEO_VIEW_URL,
} from "../lib/video";

const POINTS = [
  {
    title: "Activate a Success Center",
    desc: "Choose the Success Program that fits your goal and activate it to unlock personalized BMIS planning.",
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
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "BMIS builds your plan",
    desc: "BMIS reviews your Success Profile and creates a recommended budget, activation amount, and projected timeline for your goal.",
    delay: 0.06,
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
        aria-hidden="true"
      >
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16V10" />
        <path d="M13 16V7" />
        <path d="M18 16v-4" />
      </svg>
    ),
  },
  {
    title: "Track your progress",
    desc: "Follow your plan from your dashboard, see your projected budget and timeline, and watch your progress toward your goal.",
    delay: 0.12,
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
        aria-hidden="true"
      >
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    ),
  },
];

export function SuccessCentersVideo() {
  return (
    <section
      id={SUCCESS_CENTER_VIDEO_ID}
      aria-labelledby="success-centers-video-heading"
      className="section-anchor bg-bg-alt px-gutter pb-section"
    >
      <div className="mx-auto max-w-[920px]">
        <div className="mb-10 pt-10 text-center">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              How Success Centers work
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="success-centers-video-heading"
              className="m-0 font-display text-[clamp(32px,4.2vw,52px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading"
            >
              See how Success Centers work.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-[620px] text-lg leading-[1.7] text-muted">
              A closer look at how you activate a Success Center, how BMIS
              builds your funding plan, and how you track your progress along
              the way.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-panel border border-navy-border-alt bg-gradient-to-br from-navy to-navy-card p-2.5 shadow-[0_40px_80px_-40px_rgba(12,31,68,0.55)] sm:p-3">
            <SiteVideoPlayer
              src={SUCCESS_CENTER_VIDEO_SRC}
              viewUrl={SUCCESS_CENTER_VIDEO_VIEW_URL}
              title={SUCCESS_CENTER_VIDEO_TITLE}
              mobileLabel="Success Centers explainer"
              configured={SUCCESS_CENTER_VIDEO_CONFIGURED}
              localHintFileName="SFS-success-centers.mp4"
            />
          </div>
          <p className="mt-3 text-center text-[13px] font-medium tracking-wide text-muted-soft">
            Watch: Activating a Success Center with BMIS
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {POINTS.map((point) => (
            <CategoryCard
              key={point.title}
              delay={point.delay}
              className="rounded-card border border-line bg-bg px-[24px] py-7 shadow-[0_10px_30px_-22px_rgba(12,31,68,0.4)]"
            >
              <CategoryIcon className="mb-5 h-[50px] w-[50px] rounded-[9px] border border-border-gold bg-bg-icon">
                {point.icon}
              </CategoryIcon>
              <h3 className="m-0 font-display text-[18px] font-bold tracking-tight text-ink-heading">
                {point.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-snug text-muted-soft">
                {point.desc}
              </p>
            </CategoryCard>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-[520px] text-center text-[15px] leading-relaxed text-muted">
            Funding activation and distribution become available at launch. Join
            the waitlist for early access.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
