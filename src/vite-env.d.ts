/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAITLIST_ENDPOINT?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_EXPLAINER_VIDEO_URL?: string
  readonly VITE_SUCCESS_CENTER_VIDEO_URL?: string
  readonly VITE_INTRO_VIDEO_URL?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_WAITLIST_NOTIFY_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
