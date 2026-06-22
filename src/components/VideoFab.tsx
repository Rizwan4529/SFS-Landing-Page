import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { EXPLAINER_VIDEO_ID, EXPLAINER_VIDEO_SRC, EXPLAINER_VIDEO_TITLE } from '../lib/video'
import { WAITLIST_ID } from '../lib/nav'
import { scrollToId } from '../lib/cn'
import { trackVideoClick } from '../lib/analytics'

const FOOTER_HIDE_OFFSET = 200
const MENU_EASE = [0.16, 0.84, 0.34, 1] as const

export function VideoFab() {
  const [visible, setVisible] = useState(true)
  const [pulse, setPulse] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    const explainer = document.getElementById(EXPLAINER_VIDEO_ID)
    const waitlist = document.getElementById(WAITLIST_ID)

    function update() {
      const vh = window.innerHeight

      let nearFooter = false
      if (footer) {
        nearFooter = footer.getBoundingClientRect().top < vh + FOOTER_HIDE_OFFSET
      }

      let explainerInView = false
      if (explainer) {
        const rect = explainer.getBoundingClientRect()
        explainerInView = rect.top < vh * 0.6 && rect.bottom > vh * 0.25
      }

      let stickyLikely = false
      if (waitlist) {
        const rect = waitlist.getBoundingClientRect()
        const waitlistInView = rect.top < vh * 0.85 && rect.bottom > 0
        stickyLikely = window.scrollY > 100 && !waitlistInView && !nearFooter
      }

      setVisible(!nearFooter && !explainerInView)
      // Extra bottom offset when sticky waitlist bar is showing
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

  if (!visible) return null

  function handleClick() {
    trackVideoClick(EXPLAINER_VIDEO_TITLE, EXPLAINER_VIDEO_SRC)
    scrollToId(EXPLAINER_VIDEO_ID)
  }

  return (
    <motion.button
      type="button"
      aria-label="Watch the SFS explainer video"
      onClick={handleClick}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: MENU_EASE, delay: 0.8 }}
      className="interactive-btn fixed right-4 z-[185] flex items-center gap-2.5 rounded-full border border-gold/45 bg-gradient-to-br from-[#0c2150] to-[#06122e] px-4 py-3 text-left shadow-[0_12px_36px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(232,194,90,0.2)] backdrop-blur-md sm:right-6 sm:px-5"
      style={{ bottom: 'max(1.25rem, var(--video-fab-bottom, 1.25rem))' }}
    >
      {pulse && !reduceMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-gold/25"
        />
      )}
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_20px_rgba(207,159,52,0.45)]">
        <Play size={18} fill="#0b1f44" stroke="#0b1f44" aria-hidden="true" />
      </span>
      <span className="relative hidden pr-1 sm:block">
        <span className="block text-[11px] font-bold tracking-[1.4px] text-gold uppercase">
          Explainer
        </span>
        <span className="block text-sm font-semibold text-white">Watch how SFS works</span>
      </span>
    </motion.button>
  )
}
