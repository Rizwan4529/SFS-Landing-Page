/**
 * SFS Waitlist — Google Apps Script
 *
 * DEPLOY AS WEB APP (not Library):
 * 1. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 2. Copy the URL ending in /exec (NOT /library/...)
 * 3. Paste into VITE_WAITLIST_ENDPOINT (.env + Vercel) then redeploy site
 */

const SPREADSHEET_ID = '1gEiAnDffjCIgJ3VuUo_277S2hKRzjBvpWAsCIR6bxA8'
const SHEET_NAME = 'Waitlist'

function getWaitlistSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
  const sheet = spreadsheet.getSheetByName(SHEET_NAME)

  if (!sheet) {
    throw new Error('Tab "' + SHEET_NAME + '" not found in ' + spreadsheet.getName())
  }

  return sheet
}

function parsePayload(e) {
  if (!e) return {}

  if (e.postData && e.postData.contents) {
    const type = e.postData.type || ''
    if (type.indexOf('json') !== -1 || type.indexOf('text/plain') !== -1) {
      try {
        return JSON.parse(e.postData.contents)
      } catch (err) {
        // fall through to form fields
      }
    }
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter
  }

  return {}
}

function appendSignup(data) {
  const sheet = getWaitlistSheet()

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
}

function doPost(e) {
  try {
    const data = parsePayload(e)
    appendSignup(data)
    return jsonResponse({ ok: true })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) })
  }
}

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.name && e.parameter.email) {
      appendSignup(e.parameter)
      return jsonResponse({ ok: true, via: 'get' })
    }

    const sheet = getWaitlistSheet()
    const spreadsheet = sheet.getParent()

    return jsonResponse({
      ok: true,
      message: 'SFS waitlist web app is running. Use POST from the site form.',
      spreadsheetName: spreadsheet.getName(),
      spreadsheetId: spreadsheet.getId(),
      sheetName: SHEET_NAME,
      rowCount: sheet.getLastRow(),
    })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) })
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
