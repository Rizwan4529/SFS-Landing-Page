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

function captureFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get('utm_source') ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    utmContent: params.get('utm_content') ?? '',
    referrer: document.referrer || '',
    landingPage: window.location.href,
  }
}

/** Parse UTM params and referrer on first visit; persist for the session. */
export function initAttribution(): Attribution {
  const stored = readStored()
  if (stored) return stored

  const attribution = captureFromUrl()
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // sessionStorage unavailable
  }
  return attribution
}

export function getAttribution(): Attribution {
  return readStored() ?? captureFromUrl()
}
