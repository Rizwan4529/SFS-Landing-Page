# SFS Landing Page — Analytics Setup

This guide is for Todd Kit (Founder) and site administrators.

## Overview

The landing page tracks market validation data through two channels:

1. **Google Analytics 4 (GA4)** — visitors, page views, traffic sources, CTA clicks, video clicks, conversion rate
2. **Google Sheet waitlist log** — signup name, email, timestamp, UTM parameters, referrer, landing page URL

---

## 1. Google Analytics 4

### Create a property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create an account and GA4 property for `sharefundsystem.com`
3. Add a **Web** data stream for your domain
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Configure the site

Add to `.env` (local) and the same keys in **Vercel → Settings → Environment Variables** for production:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Rebuild and deploy the site. Analytics only loads when this variable is set.

### Grant admin access

1. In GA4: **Admin** → **Account access management**
2. Add Todd's Google account as **Administrator**
3. Todd can view all reports, audiences, and conversions

### Mark waitlist signup as a conversion

1. In GA4: **Admin** → **Events**
2. Wait for `waitlist_signup` events to appear (submit a test signup)
3. Toggle **Mark as conversion** for `waitlist_signup`

### Custom events tracked

| Event | Description |
|-------|-------------|
| `page_view` | Each page load |
| `waitlist_signup` | Successful waitlist form submission |
| `cta_click` | Waitlist button clicks (`hero`, `sticky`, `header`, `closing`) |
| `video_click` | Videos card click when `VITE_INTRO_VIDEO_URL` is set |

### Conversion rate

In GA4: **Reports** → **Engagement** → **Conversions**

Compare `waitlist_signup` conversions against total sessions for conversion rate.

### Traffic source tracking

GA4 automatically captures traffic sources. For campaign tracking, use UTM links:

```
https://sharefundsystem.com/?utm_source=facebook&utm_medium=social&utm_campaign=prelaunch
https://sharefundsystem.com/?utm_source=instagram&utm_medium=social&utm_campaign=prelaunch
https://sharefundsystem.com/?utm_source=youtube&utm_medium=video&utm_campaign=prelaunch
```

UTM parameters are also saved with each waitlist signup in the Google Sheet.

### Debug in development

1. Install the [GA Debugger Chrome extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
2. Set `VITE_GA_MEASUREMENT_ID` in `.env`
3. Open GA4 → **Admin** → **DebugView** to see live events

---

## 2. Waitlist Google Sheet

### Setup

1. Create a Google Sheet named **SFS Waitlist**
2. Add a tab named `Waitlist` with headers in row 1:

   `Timestamp | Name | Email | Campaign | Message | UTM Source | UTM Medium | UTM Campaign | UTM Content | Referrer | Landing Page`

3. **Extensions** → **Apps Script**
4. Paste the code from [`scripts/waitlist-apps-script.gs`](../scripts/waitlist-apps-script.gs)
5. **Deploy** → **New deployment** → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the deployment URL into `.env`:

   ```
   VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
   ```

### What gets logged per signup

- ISO timestamp (`signedUpAt`)
- Name and email
- Campaign category (dropdown selection)
- Optional message from the visitor
- UTM source, medium, campaign, content (from URL or empty)
- HTTP referrer (e.g. facebook.com, direct)
- Full landing page URL

### Owner access

Todd has full access to the Google Sheet as owner. Use **File** → **Share** to add collaborators.

---

## 3. Optional intro video

When an intro video URL is available (YouTube, Vimeo, etc.):

```
VITE_INTRO_VIDEO_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
```

The Education **Videos** card becomes a clickable link and fires `video_click` in GA4.

---

## 4. Metrics checklist (client requirements)

| Requirement | Solution |
|-------------|----------|
| Total visitors | GA4 → Users / Active users |
| Page views | GA4 → Views |
| Video views/clicks | GA4 → `video_click` events |
| Waitlist signups | GA4 `waitlist_signup` + Google Sheet rows |
| Date/time of signups | Sheet `Timestamp` column |
| Traffic source | GA4 acquisition reports + Sheet UTM columns |
| Conversion rates | GA4 conversions / sessions |
| Google Analytics integration | `VITE_GA_MEASUREMENT_ID` |
| Owner/admin access | GA4 admin + Sheet owner |
