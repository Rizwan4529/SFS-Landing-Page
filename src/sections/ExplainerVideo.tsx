import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  EXPLAINER_VIDEO_DRIVE_VIEW_URL,
  EXPLAINER_VIDEO_ID,
  EXPLAINER_VIDEO_SRC,
  EXPLAINER_VIDEO_TITLE,
  isDriveVideoEmbed,
} from "../lib/video";
import { trackEvent } from "../lib/analytics";
import { cn } from "../lib/cn";

const AUTOPLAY_VISIBLE_RATIO = 0.5;
const PAUSE_VISIBLE_RATIO = 0.15;
const MOBILE_VIDEO_QUERY = "(max-width: 767px)";

function DriveMobileVideoPrompt({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-darkest to-navy-card px-6 py-10 text-center sm:min-h-[260px]">
      <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_28px_rgba(207,159,52,0.45)]">
        <Play size={28} fill="#0b1f44" stroke="#0b1f44" aria-hidden="true" />
      </span>
      <div>
        <p className="m-0 font-display text-lg font-bold text-white">
          SFS platform explainer
        </p>
        <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-[rgba(206,218,242,0.75)]">
          Tap below for the full-screen mobile player with responsive controls.
        </p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="interactive-btn rounded-brand bg-gradient-gold px-6 py-3.5 font-display text-[15px] font-bold tracking-wide text-[#0b1f44] shadow-[0_12px_34px_rgba(207,159,52,0.4)]"
      >
        Watch explainer video
      </button>
    </div>
  );
}

export function ExplainerVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedPlayRef = useRef(false);
  const userPausedRef = useRef(false);
  const programmaticPauseRef = useRef(false);
  const [loadError, setLoadError] = useState(false);
  const isMobile = useMediaQuery(MOBILE_VIDEO_QUERY);
  const useDriveEmbed = isDriveVideoEmbed(EXPLAINER_VIDEO_SRC);
  const useDriveIframe = useDriveEmbed && !isMobile;
  const useNativeVideo = !useDriveIframe;

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
    if (userPausedRef.current || !useNativeVideo) return;

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
  }, [trackEngagement, useNativeVideo]);

  useEffect(() => {
    if (!useNativeVideo) return;

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
  }, [pauseVideo, tryAutoplay, useNativeVideo]);

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

  function handleOpenDriveMobile() {
    trackEngagement();
    window.open(EXPLAINER_VIDEO_DRIVE_VIEW_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id={EXPLAINER_VIDEO_ID}
      ref={sectionRef}
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
          <div
            className={cn(
              "explainer-video-shell relative rounded-brand bg-black",
              useNativeVideo
                ? "overflow-visible"
                : "aspect-video overflow-hidden",
            )}
          >
            {useDriveIframe ? (
              <iframe
                src={EXPLAINER_VIDEO_SRC}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="SFS platform explainer video"
                onLoad={trackEngagement}
              />
            ) : useDriveEmbed && isMobile ? (
              <DriveMobileVideoPrompt onOpen={handleOpenDriveMobile} />
            ) : (
              <video
                ref={videoRef}
                className="explainer-video-player block w-full bg-black"
                src={EXPLAINER_VIDEO_SRC}
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload"
                aria-label="SFS platform explainer video"
                onPlay={handlePlay}
                onPause={handlePause}
                onError={() => setLoadError(true)}
              />
            )}
            {loadError && useNativeVideo && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-6 text-center">
                <p className="m-0 text-sm text-white/90">
                  The video could not be loaded. Place{" "}
                  <code className="text-gold-light">SFS-explainer.mp4</code> in{" "}
                  <code className="text-gold-light">public/assets/</code>, or open
                  it on Google Drive.
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
