import type { WaitlistPayload } from './submitWaitlist'
import { SFS_EMAIL_LOGO_DATA_URI } from './emailLogoData'

const SFS_SITE_URL = 'https://www.sharefundsystem.com'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatSignupDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

function detailRow(label: string, value: string) {
  const safeValue = escapeHtml(value || '—')

  return `
    <tr>
      <td style="padding:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.3px;text-transform:uppercase;color:#cf9f34;vertical-align:top;width:128px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1b2c52;vertical-align:top;">
        ${safeValue}
      </td>
    </tr>
  `
}

export function buildWaitlistNotificationSubject(name: string) {
  return `SFS Waitlist signup: ${name}`
}

export function buildWaitlistNotificationPlainText(payload: WaitlistPayload) {
  const lines = [
    'Share Fund System — waitlist signup',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Campaign: ${payload.campaign}`,
    `Signed up: ${formatSignupDate(payload.signedUpAt)}`,
    `Message: ${payload.message || '—'}`,
    '',
    'Attribution',
    `UTM Source: ${payload.utmSource || '—'}`,
    `UTM Medium: ${payload.utmMedium || '—'}`,
    `UTM Campaign: ${payload.utmCampaign || '—'}`,
    `Landing page: ${payload.landingPage || '—'}`,
    '',
    `Reply to the signup: ${payload.email}`,
    SFS_SITE_URL,
  ]

  return lines.join('\n')
}

export function buildWaitlistNotificationHtml(payload: WaitlistPayload) {
  const name = escapeHtml(payload.name)
  const email = escapeHtml(payload.email)
  const campaign = escapeHtml(payload.campaign)
  const signedUpAt = escapeHtml(formatSignupDate(payload.signedUpAt))
  const message = escapeHtml(payload.message || 'No message provided.')
  const utmSource = escapeHtml(payload.utmSource || '—')
  const utmMedium = escapeHtml(payload.utmMedium || '—')
  const utmCampaign = escapeHtml(payload.utmCampaign || '—')
  const landingPage = escapeHtml(payload.landingPage || '—')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SFS waitlist signup</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fc;">
  <span style="display:none;font-size:1px;color:#f4f7fc;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${name} joined the SFS waitlist (${campaign}).
  </span>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f7fc;margin:0;padding:20px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e4e9f2;">
          <tr>
            <td style="background-color:#0a1c40;padding:26px 28px 22px 28px;text-align:center;">
              <img src="${SFS_EMAIL_LOGO_DATA_URI}" width="140" height="48" alt="Share Fund System" style="display:block;margin:0 auto 14px auto;border:0;outline:none;text-decoration:none;width:140px;height:48px;" />
              <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#cf9f34;">
                Waitlist notification
              </p>
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">
                New signup received
              </h1>
              <p style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#d6e0f4;">
                A visitor joined the Share Fund System waitlist on your website.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 28px 10px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f7f9fd;border:1px solid #e4e9f2;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#cf9f34;">
                      Signup details
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${detailRow('Name', name)}
                      ${detailRow('Email', email)}
                      ${detailRow('Campaign', campaign)}
                      ${detailRow('Signed up', signedUpAt)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:6px 28px 10px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fbf6e8;border:1px solid #f0e2bd;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#b5841f;">
                      Message
                    </p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1b2c52;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:6px 28px 22px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e4e9f2;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#5c6f93;">
                      Attribution
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${detailRow('UTM source', utmSource)}
                      ${detailRow('UTM medium', utmMedium)}
                      ${detailRow('UTM campaign', utmCampaign)}
                      ${detailRow('Landing page', landingPage)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 24px 28px;text-align:center;">
              <a href="mailto:${email}?subject=${encodeURIComponent('Re: Your SFS waitlist signup')}" style="display:inline-block;background-color:#e8c25a;color:#0b1f44;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:6px;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <tr>
            <td style="background-color:#06122e;padding:18px 28px;text-align:center;border-top:1px solid #102a5c;">
              <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#e8c25a;">
                Share Fund System
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:#b4c2de;">
                Funding goals, simplified.<br />
                <a href="${SFS_SITE_URL}" style="color:#f0d489;text-decoration:underline;">sharefundsystem.com</a>
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:14px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.45;color:#9fb0d4;text-align:center;">
          Internal notification from sharefundsystem.com waitlist form.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
