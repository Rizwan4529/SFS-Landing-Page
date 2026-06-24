export type WaitlistPayload = {
  name: string
  email: string
  campaign: string
  campaignValue: string
  message: string
  signedUpAt: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  referrer: string
  landingPage: string
}

function isAppsScriptEndpoint(endpoint: string) {
  return endpoint.includes('script.google.com')
}

/**
 * Google Apps Script cannot be read back from the browser (CORS redirect).
 * no-cors + text/plain is the reliable pattern — the row is still written server-side.
 */
export async function submitWaitlist(endpoint: string, payload: WaitlistPayload): Promise<void> {
  const body = JSON.stringify(payload)

  if (isAppsScriptEndpoint(endpoint)) {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    })
    return
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body,
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
  if (data?.ok === false) {
    throw new Error(data.error || 'Waitlist submission failed')
  }
}
