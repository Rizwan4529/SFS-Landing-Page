import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WAITLIST_ID } from '../lib/nav'
import { scrollToId } from '../lib/cn'
import { GoldButton } from './GoldButton'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-white/95 px-6 py-6 shadow-lg backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.href)
                }}
                className="text-base font-medium text-ink-heading"
              >
                {link.label}
              </a>
            ))}
            <GoldButton
              className="mt-2 w-full"
              onClick={() => handleNav(`#${WAITLIST_ID}`)}
            >
              Join the waitlist
            </GoldButton>
          </nav>
        </div>
      )}
    </header>
  )
}
