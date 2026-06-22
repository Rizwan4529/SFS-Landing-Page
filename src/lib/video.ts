export const EXPLAINER_VIDEO_ID = 'explainer-video'

/** Google Drive file ID — must be shared as "Anyone with the link" */
export const EXPLAINER_VIDEO_DRIVE_ID = '1H1Ap9GYpoJQlKt79QirsCAfgoZa-YFRP'

export const EXPLAINER_VIDEO_DRIVE_VIEW_URL = `https://drive.google.com/file/d/${EXPLAINER_VIDEO_DRIVE_ID}/view`

const LOCAL_VIDEO_SRC = '/assets/SFS-explainer.mp4?v=2'
const DRIVE_EMBED_SRC = `https://drive.google.com/file/d/${EXPLAINER_VIDEO_DRIVE_ID}/preview`

/**
 * Dev: local file in public/assets (gitignored, not on Vercel).
 * Production: Google Drive embed unless VITE_EXPLAINER_VIDEO_URL is set.
 */
export const EXPLAINER_VIDEO_SRC =
  import.meta.env.VITE_EXPLAINER_VIDEO_URL ??
  (import.meta.env.PROD ? DRIVE_EMBED_SRC : LOCAL_VIDEO_SRC)

export const EXPLAINER_VIDEO_TITLE = 'SFS Explainer'

export function isDriveVideoEmbed(url: string) {
  return url.includes('drive.google.com')
}
