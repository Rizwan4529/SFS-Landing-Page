import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";
import { getAttribution } from "../lib/attribution";
import { trackWaitlistSignup } from "../lib/analytics";
import {
  CAMPAIGN_CATEGORIES,
  CAMPAIGN_TOOLTIP,
} from "../lib/campaignCategories";
import { submitWaitlist } from "../lib/submitWaitlist";
import { FieldTooltip } from "./FieldTooltip";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 500;
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

const labelClass =
  "mb-[7px] flex items-center text-[13px] font-semibold tracking-wide text-muted-light";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [campaign, setCampaign] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [firstName, setFirstName] = useState("there");
  const [status, setStatus] = useState<Status>("idle");

  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const selectedCampaign = CAMPAIGN_CATEGORIES.find(
      (c) => c.value === campaign,
    );

    if (!trimmedName) {
      setErr("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!selectedCampaign) {
      setErr("Please select a campaign category.");
      return;
    }

    setErr("");
    setStatus("submitting");

    const attribution = getAttribution();
    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      campaign: selectedCampaign.label,
      campaignValue: selectedCampaign.value,
      message: trimmedMessage,
      signedUpAt: new Date().toISOString(),
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      referrer: attribution.referrer,
      landingPage: attribution.landingPage,
    };

    try {
      if (ENDPOINT) {
        await submitWaitlist(ENDPOINT, payload);
      } else {
        console.warn(
          "VITE_WAITLIST_ENDPOINT is not set. Submission was not sent anywhere.",
        );
        await new Promise((r) => setTimeout(r, 600));
      }
      trackWaitlistSignup(selectedCampaign.label);
      setFirstName(trimmedName.split(" ")[0] || "there");
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mt-[34px] flex flex-col items-center gap-[18px] px-0 py-3.5 text-center outline-none"
      >
        <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_0_8px_rgba(232,194,90,0.14),0_14px_34px_rgba(207,159,52,0.45)]">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0b1f44"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3 className="font-display text-[26px] font-bold tracking-tight text-white">
          You&apos;re on the list, {firstName}.
        </h3>
        <p className="max-w-[400px] text-base leading-relaxed text-[rgba(206,218,242,0.78)]">
          Thanks for joining. We&apos;ll email you launch updates — you&apos;ll
          get early access when Share Fund System goes live.
        </p>
      </div>
    );
  }

  const fieldClass = cn(
    "w-full rounded-brand border border-white/16 bg-white/6 px-4 py-[15px] text-base text-white outline-none transition-[border-color,background-color] duration-[400ms] ease-[cubic-bezier(0.16,0.84,0.34,1)]",
    "placeholder:text-white/40 focus:border-gold focus:bg-white/10",
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-[34px] flex flex-col gap-3.5 text-left"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          ref={honeypotRef}
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="wl-name" className={labelClass}>
          Name
        </label>
        <input
          id="wl-name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="wl-email" className={labelClass}>
          Email
        </label>
        <input
          id="wl-email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="wl-campaign" className={labelClass}>
          Campaign
          <FieldTooltip id="wl-campaign-tooltip" text={CAMPAIGN_TOOLTIP} />
        </label>
        <select
          id="wl-campaign"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          className={cn(
            fieldClass,
            "cursor-pointer appearance-none bg-[length:16px] bg-position-[right_14px_center] bg-no-repeat pr-10",
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          }}
        >
          <option value="" disabled className="bg-[#0f2448] text-white">
            Select a campaign category
          </option>
          {CAMPAIGN_CATEGORIES.map((cat) => (
            <option
              key={cat.value}
              value={cat.value}
              className="bg-[#0f2448] text-white"
            >
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="wl-message" className={labelClass}>
          Message{" "}
          <span className="ml-1 font-normal text-white/45">(optional)</span>
        </label>
        <textarea
          id="wl-message"
          placeholder="Tell us about your goal or what you hope to fund..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MESSAGE_MAX}
          rows={4}
          className={cn(fieldClass, "resize-y min-h-[108px]")}
        />
        <p className="mt-1.5 text-right text-[12px] text-white/40">
          {message.length}/{MESSAGE_MAX}
        </p>
      </div>

      <p className="m-0 min-h-[18px] text-[13.5px] text-[#f0a48a]">{err}</p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="interactive-btn mt-1 w-full cursor-pointer rounded-brand border-none bg-gradient-gold py-[17px] font-display text-[16.5px] font-bold tracking-wide text-[#0b1f44] shadow-[0_12px_30px_rgba(207,159,52,0.4)] hover:shadow-[0_16px_40px_rgba(207,159,52,0.55)] disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} aria-hidden="true" />
            Joining...
          </span>
        ) : (
          "Join the waitlist"
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="text-center text-[13px] font-medium text-[#f0a48a]"
        >
          Something went wrong. Please try again.
        </p>
      )}

      <p className="m-0 mt-1.5 text-center text-[13px] leading-relaxed text-[rgba(180,194,222,0.65)]">
        Free to join. Early access when the platform launches.
      </p>
    </form>
  );
}
