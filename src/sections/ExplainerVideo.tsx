import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";
import {
  EXPLAINER_VIDEO_DRIVE_VIEW_URL,
  EXPLAINER_VIDEO_ID,
  EXPLAINER_VIDEO_SRC,
  EXPLAINER_VIDEO_TITLE,
  isDriveVideoEmbed,
} from "../lib/video";
import { trackEvent } from "../lib/analytics";

const AUTOPLAY_VISIBLE_RATIO = 0.5;
const PAUSE_VISIBLE_RATIO = 0.15;

export function ExplainerVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedPlayRef = useRef(false);
  const userPausedRef = useRef(false);
  const programmaticPauseRef = useRef(false);
  const [loadError, setLoadError] = useState(false);
  const useDriveEmbed = isDriveVideoEmbed(EXPLAINER_VIDEO_SRC);

  const trackEngagement = useCallback(() => {
    if (!hasTrackedPlayRef.current) {
      hasTrackedPlayRef.current = true;
      trackEvent("video_play", {
        video_title: EXPLAINER_VIDEO_TITLE,
        video_url: EXPLAINER_VIDEO_SRC,
      });
    }
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.paused) return;
    programmaticPauseRef.current = true;
    video.pause();
  }, []);

  const tryAutoplay = useCallback(() => {
    if (userPausedRef.current || useDriveEmbed) return;

    const video = videoRef.current;
    if (!video || (!video.paused && !video.ended)) return;

    void video
      .play()
      .then(() => trackEngagement())
      .catch(() => {
        video.muted = true;
        void video
          .play()
          .then(() => trackEngagement())
          .catch(() => {});
      });
  }, [trackEngagement, useDriveEmbed]);

  useEffect(() => {
    if (useDriveEmbed) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const shouldPlay =
          entry.isIntersecting && ratio >= AUTOPLAY_VISIBLE_RATIO;
        const shouldPause =
          !entry.isIntersecting || ratio < PAUSE_VISIBLE_RATIO;

        if (shouldPlay) {
          tryAutoplay();
        } else if (shouldPause) {
          pauseVideo();
        }
      },
      { threshold: [0, PAUSE_VISIBLE_RATIO, AUTOPLAY_VISIBLE_RATIO, 0.75] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [pauseVideo, tryAutoplay, useDriveEmbed]);

  function handlePlay() {
    userPausedRef.current = false;
    trackEngagement();
  }

  function handlePause() {
    if (programmaticPauseRef.current) {
      programmaticPauseRef.current = false;
      return;
    }
    const video = videoRef.current;
    if (video && !video.ended) {
      userPausedRef.current = true;
    }
  }

  return (
    <section
      id={EXPLAINER_VIDEO_ID}
      ref={sectionRef}
      aria-labelledby="explainer-video-heading"
      className="section-anchor bg-bg px-gutter py-section"
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

        <div className="relative overflow-hidden rounded-panel border border-navy-border-alt bg-gradient-to-br from-navy to-navy-card p-3 shadow-[0_40px_80px_-40px_rgba(12,31,68,0.55)] sm:p-2">
          <div className="relative aspect-video overflow-hidden rounded-brand bg-black">
            {useDriveEmbed ? (
              <iframe
                src={EXPLAINER_VIDEO_SRC}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="SFS platform explainer video"
                onLoad={trackEngagement}
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full bg-black object-contain"
                src={EXPLAINER_VIDEO_SRC}
                controls
                playsInline
                preload="auto"
                controlsList="nodownload"
                aria-label="SFS platform explainer video"
                onPlay={handlePlay}
                onPause={handlePause}
                onError={() => setLoadError(true)}
              />
            )}
            {loadError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-6 text-center">
                <p className="m-0 text-sm text-white/90">
                  The video could not be loaded. Please hard-refresh the page
                  (Ctrl+Shift+R) and try again.
                </p>
                <a
                  href={EXPLAINER_VIDEO_DRIVE_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gold-light underline"
                >
                  Open video in Google Drive
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
