const STORAGE_KEY = 'sfs_attribution'

export interface Attribution {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  referrer: string
  landingPage: string
}

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Attribution
  } catch {
    return null
  }
}

function writeStored(attribution: Attribution): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // sessionStorage unavailable
  }
}

function inferFromClickIds(params: URLSearchParams): Partial<Attribution> {
  if (params.get('gclid')) {
    return {
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: params.get('utm_campaign') ?? '',
    }
  }

  if (params.get('fbclid')) {
    return {
      utmSource: 'facebook',
      utmMedium: 'paid_social',
      utmCampaign: params.get('utm_campaign') ?? '',
    }
  }

  return {}
}

function inferFromReferrer(referrer: string): Partial<Attribution> {
  if (!referrer) return {}

  try {
    const host = new URL(referrer).hostname.toLowerCase()

    if (host.includes('instagram')) {
      return { utmSource: 'instagram', utmMedium: 'social' }
    }
    if (host.includes('facebook') || host.includes('fb.com')) {
      return { utmSource: 'facebook', utmMedium: 'social' }
    }
    if (host.includes('google.')) {
      return { utmSource: 'google', utmMedium: 'organic' }
    }
    if (host.includes('youtube') || host.includes('youtu.be')) {
      return { utmSource: 'youtube', utmMedium: 'social' }
    }
    if (host.includes('linkedin')) {
      return { utmSource: 'linkedin', utmMedium: 'social' }
    }
    if (host.includes('twitter') || host.includes('t.co') || host.includes('x.com')) {
      return { utmSource: 'twitter', utmMedium: 'social' }
    }

    return {
      utmSource: host.replace(/^www\./, ''),
      utmMedium: 'referral',
    }
  } catch {
    return {}
  }
}

function mergeAttribution(
  base: Attribution,
  incoming: Partial<Attribution>,
): Attribution {
  return {
    utmSource: base.utmSource || incoming.utmSource || '',
    utmMedium: base.utmMedium || incoming.utmMedium || '',
    utmCampaign: base.utmCampaign || incoming.utmCampaign || '',
    utmContent: base.utmContent || incoming.utmContent || '',
    referrer: base.referrer || incoming.referrer || '',
    landingPage: base.landingPage || incoming.landingPage || '',
  }
}

function captureFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const referrer = document.referrer || ''

  const fromUrl: Attribution = {
    utmSource: params.get('utm_source') ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    utmContent: params.get('utm_content') ?? '',
    referrer,
    landingPage: window.location.href,
  }

  const empty: Attribution = {
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmContent: '',
    referrer: '',
    landingPage: '',
  }

  return mergeAttribution(
    mergeAttribution(empty, fromUrl),
    {
      ...inferFromClickIds(params),
      ...inferFromReferrer(referrer),
    },
  )
}

/** Parse UTM params, ad click IDs, and referrer on first visit; persist for the session. */
export function initAttribution(): Attribution {
  const current = captureFromUrl()
  const stored = readStored()

  if (!stored) {
    writeStored(current)
    return current
  }

  const upgraded = mergeAttribution(stored, current)
  if (JSON.stringify(upgraded) !== JSON.stringify(stored)) {
    writeStored(upgraded)
  }

  return upgraded
}

export function getAttribution(): Attribution {
  return readStored() ?? captureFromUrl()
}
