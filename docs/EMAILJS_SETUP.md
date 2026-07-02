# EmailJS setup — waitlist signup notifications

When someone joins the waitlist, the site sends a branded notification email to your team inbox via [EmailJS](https://www.emailjs.com/), using the **sharefundsystem@gmail.com** Gmail account.

Default recipient: **Ktodd702@gmail.com** (override with `VITE_WAITLIST_NOTIFY_EMAIL`).

---

## What you need to provide (for `.env` + Vercel)

After setup, add these four values:

| Variable | Example | Where to find it |
|----------|---------|------------------|
| `VITE_EMAILJS_PUBLIC_KEY` | `aBcDeFgHiJkLmNoPq` | EmailJS → Account → API Keys → **Public Key** |
| `VITE_EMAILJS_SERVICE_ID` | `service_abc1234` | Email Services → your Gmail service → **Service ID** |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_xyz5678` | Email Templates → your template → **Template ID** |
| `VITE_WAITLIST_NOTIFY_EMAIL` | `Ktodd702@gmail.com` | Optional — defaults to Ktodd702@gmail.com |

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_WAITLIST_NOTIFY_EMAIL=Ktodd702@gmail.com
```

Restart `npm run dev` after changing `.env`. On Vercel, add the same keys under **Settings → Environment Variables**, then redeploy.

---

## Step-by-step EmailJS setup

### 1. Create an EmailJS account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up (free tier allows 200 emails/month — enough to start)
3. Verify your email address

### 2. Connect Gmail (`sharefundsystem@gmail.com`)

1. In EmailJS dashboard, open **Email Services**
2. Click **Add New Service**
3. Choose **Gmail**
4. Click **Connect Account** and sign in with **sharefundsystem@gmail.com**
5. Allow EmailJS access when Google prompts you
6. Copy the **Service ID** (e.g. `service_abc1234`) — this is `VITE_EMAILJS_SERVICE_ID`

> Sending from your own Gmail improves deliverability vs. random SMTP servers.

### 3. Create the email template

1. Open **Email Templates** → **Create New Template**
2. Set these fields:

| Field | Value |
|-------|--------|
| **To Email** | `{{to_email}}` |
| **From Name** | `Share Fund System` |
| **Reply To** | `{{reply_to}}` |
| **Subject** | `{{subject_line}}` |

3. Switch the body editor to **HTML** (code view if available)
4. Paste only this in the content area:

```html
{{{email_html}}}
```

> **Important:** Use **triple braces** `{{{email_html}}}` so EmailJS renders the full HTML design. Double braces would escape the HTML.

5. Save the template and copy the **Template ID** (e.g. `template_xyz5678`) — this is `VITE_EMAILJS_TEMPLATE_ID`

Reference file: [`scripts/emailjs-waitlist-template.html`](../scripts/emailjs-waitlist-template.html)

The HTML design is built in code (`src/lib/waitlistNotificationEmail.ts`) so you do not need to maintain the layout inside EmailJS — only the `{{{email_html}}}` placeholder.

### 4. Get your Public Key

1. Go to **Account** → **API Keys** (or **General**)
2. Copy the **Public Key** — this is `VITE_EMAILJS_PUBLIC_KEY**

> The public key is safe to use in the browser. Do **not** put your **Private Key** in the site.

### 5. Restrict the Public Key (recommended)

1. In **Account** → **API Keys** → edit restrictions
2. Enable **Domain restrictions** and add:
   - `localhost`
   - `sharefundsystem.com`
   - `www.sharefundsystem.com`
   - Your Vercel preview domain if used
3. Enable **Template restrictions** and allow only your waitlist template

This reduces abuse if someone copies your public key.

### 6. Add env vars to the project

Add the keys to `.env` locally and to Vercel for production (see table above).

### 7. Test

1. Run `npm run dev`
2. Submit a test waitlist signup
3. Check **Ktodd702@gmail.com** (and spam folder once)
4. In EmailJS dashboard, open **Email History** to confirm the send

The form still saves to Google Sheets via Apps Script even if the email fails. Email errors are logged to the browser console only.

---

## Deliverability tips (avoid spam)

- **Use the connected Gmail service** (sharefundsystem@gmail.com) — already configured above
- **Reply-To** is set to the signup’s email so you can reply directly
- **From Name** in template: `Share Fund System` (not `{{name}}`)
- Logo is **embedded in the email** (no external image URL) — broken images hurt deliverability
- On the **first** notification: Gmail → **Report as not spam**, add **sharefundsystem@gmail.com** to Contacts
- Subject line: `SFS Waitlist signup: [Name]` (plain, no spammy punctuation)
- Optional: add **Plain text** body in EmailJS with `{{message_plain}}` if available

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No email received | Check EmailJS **Email History** for errors |
| `Invalid public key` | Re-copy `VITE_EMAILJS_PUBLIC_KEY`, restart dev server |
| Template shows raw HTML tags | Use `{{{email_html}}}` (triple braces), enable HTML mode |
| Gmail “blocked” | Re-authorize the Gmail service in EmailJS |
| Works locally, not on Vercel | Add all `VITE_EMAILJS_*` vars in Vercel and redeploy |
| 200/month limit hit | Upgrade EmailJS plan or switch to server-side sending later |

---

## How it works in the codebase

1. User submits the waitlist form
2. Data is saved via Google Apps Script (unchanged)
3. `sendWaitlistNotification()` calls EmailJS with the branded HTML
4. EmailJS sends from **sharefundsystem@gmail.com** to **Ktodd702@gmail.com**

Related files:

- `src/lib/waitlistNotificationEmail.ts` — HTML + plain-text content
- `src/lib/sendWaitlistNotification.ts` — EmailJS send logic
- `src/components/WaitlistForm.tsx` — triggers notification after successful signup
