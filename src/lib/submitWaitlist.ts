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

/**
 * Google Apps Script web apps block browser POSTs that use application/json (CORS preflight).
 * text/plain avoids preflight; no-cors is the fallback when the response cannot be read.
 */
export async function submitWaitlist(endpoint: string, payload: WaitlistPayload): Promise<void> {
  const body = JSON.stringify(payload)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    })

    const text = await res.text()
    if (text) {
      const data = JSON.parse(text) as { ok?: boolean; error?: string }
      if (data.ok === false) {
        throw new Error(data.error || 'Waitlist submission failed')
      }
    }
    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const corsBlocked =
      error instanceof TypeError ||
      message.includes('Failed to fetch') ||
      message.includes('NetworkError')

    if (!corsBlocked) throw error

    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    })
  }
}
