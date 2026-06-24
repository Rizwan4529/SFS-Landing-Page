/**
 * SFS Waitlist — Google Apps Script
 *
 * SETUP (important):
 * 1. Open your Google Sheet → copy the ID from the URL:
 *    https://docs.google.com/spreadsheets/d/PASTE_THIS_ID/edit
 * 2. Paste it into SPREADSHEET_ID below
 * 3. Tab name must be "Waitlist" with headers in row 1:
 *    Timestamp | Name | Email | Campaign | Message | UTM Source | UTM Medium | UTM Campaign | UTM Content | Referrer | Landing Page
 * 4. Deploy → Manage deployments → Edit → New version → Deploy
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the web app URL into VITE_WAITLIST_ENDPOINT (.env + Vercel)
 */

/** Required — paste your Sheet ID here */
const SPREADSHEET_ID = "1gEiAnDffjCIgJ3VuUo_277S2hKRzjBvpWAsCIR6bxA8";

const SHEET_NAME = "Waitlist";

function getWaitlistSheet() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SHEET_ID_HERE") {
    throw new Error(
      "Set SPREADSHEET_ID at the top of the script to your Google Sheet ID.",
    );
  }

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(
      'Tab "' +
        SHEET_NAME +
        '" was not found in spreadsheet "' +
        spreadsheet.getName() +
        '".',
    );
  }

  return sheet;
}

function doPost(e) {
  try {
    const raw = e.postData ? e.postData.contents : "{}";
    const data = JSON.parse(raw);
    const sheet = getWaitlistSheet();

    sheet.appendRow([
      data.signedUpAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.campaign || "",
      data.message || "",
      data.utmSource || "",
      data.utmMedium || "",
      data.utmCampaign || "",
      data.utmContent || "",
      data.referrer || "",
      data.landingPage || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  try {
    const sheet = getWaitlistSheet();
    const spreadsheet = sheet.getParent();

    return jsonResponse({
      ok: true,
      message: "SFS waitlist endpoint is running.",
      spreadsheetName: spreadsheet.getName(),
      spreadsheetId: spreadsheet.getId(),
      sheetName: SHEET_NAME,
      rowCount: sheet.getLastRow(),
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
