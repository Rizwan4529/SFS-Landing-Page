import { useEffect } from 'react'

export function useScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf: number | null = null

    function revealInView() {
      const vh = window.innerHeight
      document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.92 && r.bottom > -40) {
          el.setAttribute('data-shown', '1')
        }
      })
    }

    function updateScroll() {
      revealInView()
      const y = window.scrollY || window.pageYOffset || 0
      const vh = window.innerHeight

      const header = document.getElementById('sfs-header')
      const ld = document.getElementById('logo-dark')
      const ll = document.getElementById('logo-light')
      const solid = y > 60

      if (header) {
        header.style.background = solid ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)'
        header.style.backdropFilter = solid ? 'saturate(1.4) blur(14px)' : 'none'
        ;(header.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter =
          solid ? 'saturate(1.4) blur(14px)' : 'none'
        header.style.boxShadow = solid
          ? '0 1px 0 rgba(12,31,68,0.07), 0 10px 30px -18px rgba(12,31,68,0.3)'
          : 'none'
        header.style.paddingTop = solid ? '12px' : '18px'
        header.style.paddingBottom = solid ? '12px' : '18px'
      }
      if (ld) ld.style.opacity = solid ? '1' : '0'
      if (ll) ll.style.opacity = solid ? '0' : '1'
      document.querySelectorAll('[data-navlink]').forEach((a) => {
        ;(a as HTMLElement).style.color = solid ? '#33425f' : 'rgba(255,255,255,0.82)'
      })

      if (!reduceMotion) {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const node = el as HTMLElement
          const sp = parseFloat(node.getAttribute('data-parallax') || '0') || 0
          const r = node.getBoundingClientRect()
          const center = r.top + r.height / 2 - vh / 2
          const base = node.getAttribute('data-px-base') || ''
          node.style.transform = `${base} translate3d(0,${(center * sp).toFixed(1)}px,0)`
        })
      }

      const hs = document.getElementById('how-section')
      const fill = document.getElementById('how-fill')
      if (hs && fill) {
        const r = hs.getBoundingClientRect()
        const prog = Math.max(0, Math.min(1, (vh * 0.5 - r.top) / (r.height - vh * 0.2 || 1)))
        fill.style.height = `${(prog * 100).toFixed(1)}%`
        document.querySelectorAll('[data-step-node]').forEach((n) => {
          const node = n as HTMLElement
          const nr = node.getBoundingClientRect()
          const active = nr.top + nr.height / 2 < vh * 0.56
          if (active) {
            node.style.background = 'linear-gradient(135deg,#e8c25a,#cf9f34)'
            node.style.color = '#0b1f44'
            node.style.borderColor = 'transparent'
            node.style.boxShadow =
              '0 0 0 6px rgba(232,194,90,0.12), 0 10px 26px -10px rgba(207,159,52,0.6)'
          } else {
            node.style.background = 'rgba(255,255,255,0.92)'
            node.style.color = '#cf9f34'
            node.style.borderColor = '#dfe6f1'
            node.style.boxShadow = 'none'
          }
        })
      }
    }

    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        updateScroll()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('load', onScroll)
    updateScroll()
    const timers = [60, 200, 500, 1000, 1800].map((t) => setTimeout(updateScroll, t))

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', onScroll)
      timers.forEach(clearTimeout)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
