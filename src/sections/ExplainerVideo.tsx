import { Reveal } from '../components/Reveal'
import { SiteVideoPlayer } from '../components/SiteVideoPlayer'
import {
  EXPLAINER_VIDEO_DRIVE_VIEW_URL,
  EXPLAINER_VIDEO_ID,
  EXPLAINER_VIDEO_SRC,
  EXPLAINER_VIDEO_TITLE,
  isDriveVideoEmbed,
} from '../lib/video'

export function ExplainerVideo() {
  const configured =
    Boolean(EXPLAINER_VIDEO_SRC.trim()) ||
    isDriveVideoEmbed(EXPLAINER_VIDEO_DRIVE_VIEW_URL)

  return (
    <section
      id={EXPLAINER_VIDEO_ID}
      aria-labelledby="explainer-video-heading"
      className="section-anchor bg-bg px-gutter pb-section"
    >
      <div className="mx-auto max-w-[920px]">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="mb-[18px] inline-block text-[13px] font-bold tracking-[2px] text-gold-dark uppercase">
              Watch &amp; learn
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="explainer-video-heading"
              className="m-0 font-display text-[clamp(32px,4.2vw,52px)] leading-[1.06] font-bold tracking-[-1.2px] text-ink-heading"
            >
              See how Share Fund System works.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-[580px] text-lg leading-[1.7] text-muted">
              A quick explainer on the SFS journey — campaign categories,
              participation, and early access at launch.
            </p>
          </Reveal>
        </div>

        <div className="relative overflow-hidden rounded-panel border border-navy-border-alt bg-gradient-to-br from-navy to-navy-card p-2.5 shadow-[0_40px_80px_-40px_rgba(12,31,68,0.55)] sm:p-3">
          <SiteVideoPlayer
            src={EXPLAINER_VIDEO_SRC}
            viewUrl={EXPLAINER_VIDEO_DRIVE_VIEW_URL}
            title={EXPLAINER_VIDEO_TITLE}
            mobileLabel="SFS platform explainer"
            configured={configured}
            localHintFileName="SFS-explainer.mp4"
          />
        </div>
      </div>
    </section>
  )
}
