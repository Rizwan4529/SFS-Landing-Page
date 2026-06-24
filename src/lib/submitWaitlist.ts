export type WaitlistPayload = {
  name: string;
  email: string;
  campaign: string;
  campaignValue: string;
  message: string;
  signedUpAt: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  referrer: string;
  landingPage: string;
};

function isAppsScriptEndpoint(endpoint: string) {
  return endpoint.includes("script.google.com/macros/s/");
}

const FORM_FIELDS: (keyof WaitlistPayload)[] = [
  "name",
  "email",
  "campaign",
  "message",
  "signedUpAt",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "referrer",
  "landingPage",
];

/**
 * Hidden form POST → hidden iframe.
 * Most reliable way to send data to Google Apps Script from a browser.
 */
function submitViaHiddenForm(
  endpoint: string,
  payload: WaitlistPayload,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const frameName = `sfs-waitlist-${Date.now()}`;
    const frame = document.createElement("iframe");
    frame.name = frameName;
    frame.style.cssText =
      "position:absolute;width:0;height:0;border:0;visibility:hidden";
    frame.setAttribute("aria-hidden", "true");
    document.body.appendChild(frame);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoint;
    form.target = frameName;
    form.enctype = "application/x-www-form-urlencoded";
    form.acceptCharset = "UTF-8";
    form.style.display = "none";

    for (const key of FORM_FIELDS) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = payload[key] ?? "";
      form.appendChild(input);
    }

    const cleanup = () => {
      form.remove();
      frame.remove();
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve();
    }, 2500);

    frame.addEventListener("load", () => {
      clearTimeout(timer);
      cleanup();
      resolve();
    });

    frame.addEventListener("error", () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error("Waitlist submission failed"));
    });

    document.body.appendChild(form);
    form.submit();
  });
}

export async function submitWaitlist(
  endpoint: string,
  payload: WaitlistPayload,
): Promise<void> {
  if (isAppsScriptEndpoint(endpoint)) {
    console.log("submitting via hidden form");
    await submitViaHiddenForm(endpoint, payload);
    return;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;
  if (data?.ok === false) {
    throw new Error(data.error || "Waitlist submission failed");
  }
}
