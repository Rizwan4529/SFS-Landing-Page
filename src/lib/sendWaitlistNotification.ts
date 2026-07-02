import emailjs from '@emailjs/browser'
import type { WaitlistPayload } from './submitWaitlist'
import {
  buildWaitlistNotificationHtml,
  buildWaitlistNotificationPlainText,
  buildWaitlistNotificationSubject,
} from './waitlistNotificationEmail'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
const NOTIFY_EMAIL =
  (import.meta.env.VITE_WAITLIST_NOTIFY_EMAIL as string | undefined) ??
  'Ktodd702@gmail.com'

export function isWaitlistNotificationConfigured() {
  return Boolean(
    SERVICE_ID?.trim() && TEMPLATE_ID?.trim() && PUBLIC_KEY?.trim(),
  )
}

/**
 * Sends a branded admin notification via EmailJS after a successful signup.
 * Failures are logged only — they do not block the user-facing success state.
 */
export async function sendWaitlistNotification(
  payload: WaitlistPayload,
): Promise<void> {
  if (!isWaitlistNotificationConfigured()) {
    if (import.meta.env.DEV) {
      console.warn(
        '[SFS] Waitlist email notification skipped — set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env',
      )
    }
    return
  }

  const templateParams = {
    to_email: NOTIFY_EMAIL,
    reply_to: payload.email,
    from_name: 'Share Fund System',
    signup_name: payload.name,
    signup_email: payload.email,
    signup_campaign: payload.campaign,
    signup_message: payload.message || 'No message provided.',
    signup_date: payload.signedUpAt,
    signup_utm_source: payload.utmSource || '—',
    signup_utm_medium: payload.utmMedium || '—',
    signup_utm_campaign: payload.utmCampaign || '—',
    signup_landing_page: payload.landingPage || '—',
    subject_line: buildWaitlistNotificationSubject(payload.name),
    email_html: buildWaitlistNotificationHtml(payload),
    message_plain: buildWaitlistNotificationPlainText(payload),
  }

  await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams, {
    publicKey: PUBLIC_KEY!,
  })
}
