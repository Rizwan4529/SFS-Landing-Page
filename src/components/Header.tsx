import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WAITLIST_ID } from '../lib/nav'
import { scrollToId } from '../lib/cn'
import { GoldButton } from './GoldButton'

const MENU_EASE = [0.16, 0.84, 0.34, 1] as const

const menuPanelVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: MENU_EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.28, ease: MENU_EASE },
  },
}

const menuListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: MENU_EASE },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2, ease: MENU_EASE },
  },
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  function handleNav(href: string) {
    setMenuOpen(false)
    scrollToId(href.replace('#', ''))
  }

  return (
    <header
      id="sfs-header"
      className="fixed inset-x-0 top-0 z-200 flex items-center justify-between px-6 py-[18px] transition-[background,box-shadow,padding] duration-[450ms] ease-[cubic-bezier(0.16,0.84,0.34,1)] md:px-12"
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('top')
        }}
        className="relative block h-[34px] w-[82px] shrink-0"
        aria-label="SFS, back to top"
      >
        <img
          id="logo-light"
          src="/assets/logo-light.png"
          alt="SFS"
          className="absolute inset-0 h-full w-auto object-contain object-left opacity-100 transition-opacity duration-[450ms] ease-[cubic-bezier(0.16,0.84,0.34,1)]"
        />
        <img
          id="logo-dark"
          src="/assets/logo.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-auto object-contain object-left opacity-0 transition-opacity duration-[450ms] ease-[cubic-bezier(0.16,0.84,0.34,1)]"
        />
      </a>

      <nav id="sfs-nav" className="hidden items-center gap-9 lg:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            data-navlink
            href={link.href}
            onClick={(e) => {
              e.preventDefault()
              handleNav(link.href)
            }}
            className="text-[14.5px] font-medium tracking-wide text-white/82 transition-colors duration-[450ms] ease-[cubic-bezier(0.16,0.84,0.34,1)] whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
        <GoldButton
          href={`#${WAITLIST_ID}`}
          onClick={(e) => {
            e.preventDefault()
            handleNav(`#${WAITLIST_ID}`)
          }}
          className="px-5 py-2.5 text-[14.5px] shadow-[0_6px_20px_rgba(207,159,52,0.32)] hover:shadow-[0_10px_28px_rgba(207,159,52,0.45)]"
        >
          Join the waitlist
        </GoldButton>
      </nav>

      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-brand text-white lg:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="relative block h-[26px] w-[26px]">
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                className="absolute inset-0 flex items-center justify-center"
                initial={reduceMotion ? false : { opacity: 0, rotate: -45, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: 45, scale: 0.85 }}
                transition={{ duration: 0.22, ease: MENU_EASE }}
              >
                <X size={26} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                className="absolute inset-0 flex items-center justify-center"
                initial={reduceMotion ? false : { opacity: 0, rotate: 45, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: -45, scale: 0.85 }}
                transition={{ duration: 0.22, ease: MENU_EASE }}
              >
                <Menu size={26} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-white/95 px-6 py-6 shadow-lg backdrop-blur-md lg:hidden"
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
            exit={reduceMotion ? undefined : 'exit'}
            variants={menuPanelVariants}
          >
            <motion.nav
              className="flex flex-col gap-4"
              aria-label="Mobile"
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'visible'}
              exit={reduceMotion ? undefined : 'exit'}
              variants={menuListVariants}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className="text-base font-medium text-ink-heading"
                  variants={menuItemVariants}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div variants={menuItemVariants} className="mt-2">
                <GoldButton
                  className="w-full"
                  onClick={() => handleNav(`#${WAITLIST_ID}`)}
                >
                  Join the waitlist
                </GoldButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
