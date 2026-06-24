/**
 * SFS Waitlist — Google Apps Script
 *
 * Setup:
 * 1. Create a Google Sheet with headers in row 1:
 *    Timestamp | Name | Email | Campaign | Message | UTM Source | UTM Medium | UTM Campaign | UTM Content | Referrer | Landing Page
 * 2. Extensions → Apps Script → paste this file
 * 3. Set SHEET_NAME below if your tab is not "Waitlist"
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the web app URL into VITE_WAITLIST_ENDPOINT in .env
 */

const SHEET_NAME = 'Waitlist'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)

    if (!sheet) {
      return jsonResponse({ ok: false, error: 'Sheet not found' }, 500)
    }

    sheet.appendRow([
      data.signedUpAt || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.campaign || '',
      data.message || '',
      data.utmSource || '',
      data.utmMedium || '',
      data.utmCampaign || '',
      data.utmContent || '',
      data.referrer || '',
      data.landingPage || '',
    ])

    return jsonResponse({ ok: true })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500)
  }
}

function doGet() {
  return jsonResponse({ ok: true, message: 'SFS waitlist endpoint is running. Use POST.' })
}

function jsonResponse(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)

  // Apps Script Web Apps don't support custom status codes directly;
  // return 200 with error payload on failure for compatibility.
  return output
}
