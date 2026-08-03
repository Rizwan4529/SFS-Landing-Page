import { useCallback, useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { isDriveVideoEmbed } from '../lib/video'
import { trackEvent } from '../lib/analytics'
import { cn } from '../lib/cn'

const AUTOPLAY_VISIBLE_RATIO = 0.5
const PAUSE_VISIBLE_RATIO = 0.15
const MOBILE_VIDEO_QUERY = '(max-width: 767px)'

interface SiteVideoPlayerProps {
  src: string
  viewUrl: string
  title: string
  mobileLabel: string
  configured?: boolean
  localHintFileName?: string
}

function DriveMobileVideoPrompt({
  label,
  onOpen,
}: {
  label: string
  onOpen: () => void
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-darkest to-navy-card px-6 py-10 text-center sm:min-h-[260px]">
      <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_28px_rgba(207,159,52,0.45)]">
        <Play size={28} fill="#0b1f44" stroke="#0b1f44" aria-hidden="true" />
      </span>
      <div>
        <p className="m-0 font-display text-lg font-bold text-white">{label}</p>
        <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-[rgba(206,218,242,0.75)]">
          Tap below for the full-screen mobile player with responsive controls.
        </p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="interactive-btn rounded-brand bg-gradient-gold px-6 py-3.5 font-display text-[15px] font-bold tracking-wide text-[#0b1f44] shadow-[0_12px_34px_rgba(207,159,52,0.4)]"
      >
        Watch video
      </button>
    </div>
  )
}

export function SiteVideoPlayer({
  src,
  viewUrl,
  title,
  mobileLabel,
  configured = true,
  localHintFileName = 'video.mp4',
}: SiteVideoPlayerProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasTrackedPlayRef = useRef(false)
  const userPausedRef = useRef(false)
  const programmaticPauseRef = useRef(false)
  const [loadError, setLoadError] = useState(false)
  const isMobile = useMediaQuery(MOBILE_VIDEO_QUERY)
  const useDriveEmbed = configured && isDriveVideoEmbed(src)
  const useDriveIframe = useDriveEmbed && !isMobile
  const useNativeVideo = configured && !useDriveIframe && !useDriveEmbed

  const trackEngagement = useCallback(() => {
    if (!hasTrackedPlayRef.current) {
      hasTrackedPlayRef.current = true
      trackEvent('video_play', {
        video_title: title,
        video_url: src || viewUrl,
      })
    }
  }, [src, title, viewUrl])

  const pauseVideo = useCallback(() => {
    const video = videoRef.current
    if (!video || video.paused) return
    programmaticPauseRef.current = true
    video.pause()
  }, [])

  const tryAutoplay = useCallback(() => {
    if (userPausedRef.current || !useNativeVideo) return

    const video = videoRef.current
    if (!video || (!video.paused && !video.ended)) return

    void video
      .play()
      .then(() => trackEngagement())
      .catch(() => {
        video.muted = true
        void video
          .play()
          .then(() => trackEngagement())
          .catch(() => {})
      })
  }, [trackEngagement, useNativeVideo])

  useEffect(() => {
    if (!useNativeVideo) return

    const root = shellRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        const shouldPlay =
          entry.isIntersecting && ratio >= AUTOPLAY_VISIBLE_RATIO
        const shouldPause =
          !entry.isIntersecting || ratio < PAUSE_VISIBLE_RATIO

        if (shouldPlay) {
          tryAutoplay()
        } else if (shouldPause) {
          pauseVideo()
        }
      },
      { threshold: [0, PAUSE_VISIBLE_RATIO, AUTOPLAY_VISIBLE_RATIO, 0.75] },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [pauseVideo, tryAutoplay, useNativeVideo])

  function handlePlay() {
    userPausedRef.current = false
    trackEngagement()
  }

  function handlePause() {
    if (programmaticPauseRef.current) {
      programmaticPauseRef.current = false
      return
    }
    const video = videoRef.current
    if (video && !video.ended) {
      userPausedRef.current = true
    }
  }

  function handleOpenDriveMobile() {
    trackEngagement()
    window.open(viewUrl, '_blank', 'noopener,noreferrer')
  }

  if (!configured) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-darkest to-navy-card px-6 py-10 text-center sm:min-h-[260px]">
        <p className="m-0 font-display text-lg font-bold text-white">{title}</p>
        <p className="mx-auto max-w-[320px] text-sm leading-relaxed text-[rgba(206,218,242,0.75)]">
          Video link not configured yet. Add the Google Drive URL to your{' '}
          <code className="text-gold-light">.env</code> and restart the
          dev server.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={shellRef}
      className={cn(
        'explainer-video-shell relative rounded-brand bg-black',
        useNativeVideo || (useDriveEmbed && isMobile)
          ? 'overflow-visible'
          : 'aspect-video overflow-hidden',
      )}
    >
      {useDriveIframe ? (
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={title}
          onLoad={trackEngagement}
        />
      ) : useDriveEmbed && isMobile ? (
        <DriveMobileVideoPrompt label={mobileLabel} onOpen={handleOpenDriveMobile} />
      ) : (
        <video
          ref={videoRef}
          className="explainer-video-player block w-full bg-black"
          src={src}
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
          aria-label={title}
          onPlay={handlePlay}
          onPause={handlePause}
          onError={() => setLoadError(true)}
        />
      )}
      {loadError && useNativeVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-6 text-center">
          <p className="m-0 text-sm text-white/90">
            The video could not be loaded. Place{' '}
            <code className="text-gold-light">{localHintFileName}</code> in{' '}
            <code className="text-gold-light">public/assets/</code>, or open it
            on Google Drive.
          </p>
          {viewUrl ? (
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gold-light underline"
            >
              Open video in Google Drive
            </a>
          ) : null}
        </div>
      )}
    </div>
  )
}
