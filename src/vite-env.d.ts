/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAITLIST_ENDPOINT?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_EXPLAINER_VIDEO_URL?: string
  readonly VITE_INTRO_VIDEO_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
