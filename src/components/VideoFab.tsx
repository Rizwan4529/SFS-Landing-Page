import { useEffect, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  EXPLAINER_VIDEO_ID,
  EXPLAINER_VIDEO_SRC,
  EXPLAINER_VIDEO_TITLE,
  SUCCESS_CENTER_VIDEO_ID,
  SUCCESS_CENTER_VIDEO_SRC,
  SUCCESS_CENTER_VIDEO_TITLE,
} from '../lib/video'
import { WAITLIST_ID } from '../lib/nav'
import { scrollToId } from '../lib/cn'
import { trackVideoClick } from '../lib/analytics'

const FOOTER_HIDE_OFFSET = 200
const MENU_EASE = [0.16, 0.84, 0.34, 1] as const

const VIDEO_TARGETS = [
  {
    id: EXPLAINER_VIDEO_ID,
    title: EXPLAINER_VIDEO_TITLE,
    src: EXPLAINER_VIDEO_SRC,
    label: 'SFS Introduction',
    desc: 'How Share Fund System works',
  },
  {
    id: SUCCESS_CENTER_VIDEO_ID,
    title: SUCCESS_CENTER_VIDEO_TITLE,
    src: SUCCESS_CENTER_VIDEO_SRC,
    label: 'Success Centers',
    desc: 'Activate, plan, and track with BMIS',
  },
] as const

export function VideoFab() {
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pulse, setPulse] = useState(true)
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    const intro = document.getElementById(EXPLAINER_VIDEO_ID)
    const success = document.getElementById(SUCCESS_CENTER_VIDEO_ID)
    const waitlist = document.getElementById(WAITLIST_ID)

    function sectionInView(el: HTMLElement | null) {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      return rect.top < vh * 0.6 && rect.bottom > vh * 0.25
    }

    function update() {
      const vh = window.innerHeight

      let nearFooter = false
      if (footer) {
        nearFooter = footer.getBoundingClientRect().top < vh + FOOTER_HIDE_OFFSET
      }

      const videoInView = sectionInView(intro) || sectionInView(success)

      let stickyLikely = false
      if (waitlist) {
        const rect = waitlist.getBoundingClientRect()
        const waitlistInView = rect.top < vh * 0.85 && rect.bottom > 0
        stickyLikely = window.scrollY > 100 && !waitlistInView && !nearFooter
      }

      if (videoInView) setMenuOpen(false)
      setVisible(!nearFooter && !videoInView)

      document.documentElement.style.setProperty(
        '--video-fab-bottom',
        stickyLikely ? '5.75rem' : '1.25rem',
      )
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.documentElement.style.removeProperty('--video-fab-bottom')
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setPulse(false)
      return
    }
    const timer = window.setTimeout(() => setPulse(false), 10000)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  useEffect(() => {
    if (!menuOpen) return

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  if (!visible) return null

  function jumpToVideo(target: (typeof VIDEO_TARGETS)[number]) {
    trackVideoClick(target.title, target.src || target.id)
    setMenuOpen(false)
    scrollToId(target.id)
  }

  return (
    <div
      ref={rootRef}
      className="fixed right-4 z-[185] flex flex-col items-end gap-3 sm:right-6"
      style={{ bottom: 'max(1.25rem, var(--video-fab-bottom, 1.25rem))' }}
    >
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="video-fab-menu"
            role="menu"
            aria-label="Choose a video"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.28, ease: MENU_EASE }}
            className="w-[min(292px,calc(100vw-2rem))] overflow-hidden rounded-panel border border-gold/30 bg-gradient-to-br from-[#0c2150] to-[#06122e] shadow-[0_18px_48px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <p className="m-0 text-[11px] font-bold tracking-[1.4px] text-gold uppercase">
                Watch &amp; learn
              </p>
              <p className="m-0 mt-1 text-sm text-[rgba(214,224,244,0.78)]">
                Jump to either explainer video.
              </p>
            </div>
            <div className="flex flex-col p-2">
              {VIDEO_TARGETS.map((target) => (
                <button
                  key={target.id}
                  type="button"
                  role="menuitem"
                  onClick={() => jumpToVideo(target)}
                  className="interactive-btn flex items-start gap-3 rounded-brand px-3 py-3 text-left hover:bg-white/8"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_16px_rgba(207,159,52,0.35)]">
                    <Play
                      size={15}
                      fill="#0b1f44"
                      stroke="#0b1f44"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {target.label}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-[rgba(206,218,242,0.7)]">
                      {target.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={menuOpen ? 'Close video menu' : 'Watch SFS videos'}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((open) => !open)}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: MENU_EASE, delay: 0.8 }}
        className="interactive-btn relative flex items-center gap-2.5 rounded-full border border-gold/45 bg-gradient-to-br from-[#0c2150] to-[#06122e] px-4 py-3 text-left shadow-[0_12px_36px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(232,194,90,0.2)] backdrop-blur-md sm:px-5"
      >
        {pulse && !reduceMotion && !menuOpen && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-gold/25"
          />
        )}
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_20px_rgba(207,159,52,0.45)]">
          {menuOpen ? (
            <X size={18} stroke="#0b1f44" strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Play size={18} fill="#0b1f44" stroke="#0b1f44" aria-hidden="true" />
          )}
        </span>
        <span className="relative hidden pr-1 sm:block">
          <span className="block text-[11px] font-bold tracking-[1.4px] text-gold uppercase">
            Videos
          </span>
          <span className="block text-sm font-semibold text-white">
            {menuOpen ? 'Close menu' : 'Watch explainers'}
          </span>
        </span>
      </motion.button>
    </div>
  )
}
