export const EXPLAINER_VIDEO_ID = 'explainer-video'

/** Google Drive file ID — must be shared as "Anyone with the link" */
export const EXPLAINER_VIDEO_DRIVE_ID = '1U_n-Gn2k81VMSm1UimT11MaiCyfU6VG6'

export const EXPLAINER_VIDEO_DRIVE_VIEW_URL = `https://drive.google.com/file/d/${EXPLAINER_VIDEO_DRIVE_ID}/view?usp=sharing`

/** Local file copied into dist/ on build — place at public/assets/SFS-explainer.mp4 (gitignored) */
export const LOCAL_VIDEO_SRC = '/assets/SFS-explainer.mp4'

const DRIVE_EMBED_SRC = `https://drive.google.com/file/d/${EXPLAINER_VIDEO_DRIVE_ID}/preview`

/**
 * GoDaddy / static hosting (commented — enable when self-hosting the mp4):
 *
 * 1. Add SFS-explainer.mp4 to public/assets/ (file stays out of git; see .gitignore)
 * 2. Uncomment the LOCAL_VIDEO_SRC line below and comment out the Drive/env line
 * 3. Run npm run build — Vite copies public/ into dist/, including the mp4
 * 4. Upload the entire dist/ folder to GoDaddy public_html (or your web root)
 *
 * Yes, that works: dist/ is a complete static site (index.html + assets + your video).
 */
// export const EXPLAINER_VIDEO_SRC = LOCAL_VIDEO_SRC
export const EXPLAINER_VIDEO_SRC =
  import.meta.env.VITE_EXPLAINER_VIDEO_URL ??
  (import.meta.env.PROD ? DRIVE_EMBED_SRC : LOCAL_VIDEO_SRC)

export const EXPLAINER_VIDEO_TITLE = 'SFS Explainer'

export function isDriveVideoEmbed(url: string) {
  return url.includes('drive.google.com')
}
