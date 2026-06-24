type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFn
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

let initialized = false

function loadGtag(): void {
  if (initialized || !GA_ID || typeof window === 'undefined') return

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  initialized = true
}

export function initAnalytics(): void {
  loadGtag()
  trackPageView()
}

export function trackPageView(): void {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  })
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', name, params)
}

export type CtaLocation = 'hero' | 'sticky' | 'header' | 'closing' | 'waitlist'

export function trackCtaClick(location: CtaLocation): void {
  trackEvent('cta_click', { location })
}

export function trackWaitlistSignup(campaign?: string): void {
  trackEvent('waitlist_signup', {
    method: 'form',
    ...(campaign ? { campaign_category: campaign } : {}),
  })
}

export function trackVideoClick(videoTitle: string, videoUrl: string): void {
  trackEvent('video_click', { video_title: videoTitle, video_url: videoUrl })
}
