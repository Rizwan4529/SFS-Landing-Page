export const EXPLAINER_VIDEO_ID = 'explainer-video'
export const SUCCESS_CENTER_VIDEO_ID = 'success-centers-video'

/** Google Drive file ID — must be shared as "Anyone with the link" */
export const EXPLAINER_VIDEO_DRIVE_ID = '1U_n-Gn2k81VMSm1UimT11MaiCyfU6VG6'

export function extractDriveFileId(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const fromPath = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fromPath) return fromPath[1]

  const fromQuery = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (fromQuery) return fromQuery[1]

  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) return trimmed

  return null
}

export function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export function driveViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
}

/**
 * Accepts a Drive view/preview URL, raw file ID, or direct media URL.
 * Returns embed + view URLs suitable for desktop iframe / mobile open.
 */
export function resolveVideoUrls(input: string | undefined, fallbackDriveId?: string) {
  const raw = input?.trim() ?? ''
  const driveId = extractDriveFileId(raw) ?? fallbackDriveId ?? null

  if (driveId) {
    return {
      src: drivePreviewUrl(driveId),
      viewUrl: driveViewUrl(driveId),
      configured: true,
    }
  }

  if (raw) {
    return { src: raw, viewUrl: raw, configured: true }
  }

  return { src: '', viewUrl: '', configured: false }
}

export const EXPLAINER_VIDEO_DRIVE_VIEW_URL = driveViewUrl(EXPLAINER_VIDEO_DRIVE_ID)

/** Local file copied into dist/ on build — place at public/assets/SFS-explainer.mp4 (gitignored) */
export const LOCAL_VIDEO_SRC = '/assets/SFS-explainer.mp4'

const DRIVE_EMBED_SRC = drivePreviewUrl(EXPLAINER_VIDEO_DRIVE_ID)

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

export const EXPLAINER_VIDEO_TITLE = 'SFS Introduction'

const successCenterResolved = resolveVideoUrls(
  import.meta.env.VITE_SUCCESS_CENTER_VIDEO_URL,
)

/** Desktop embed / native src — set VITE_SUCCESS_CENTER_VIDEO_URL in .env */
export const SUCCESS_CENTER_VIDEO_SRC = successCenterResolved.src

/** Mobile open / fallback link */
export const SUCCESS_CENTER_VIDEO_VIEW_URL = successCenterResolved.viewUrl

export const SUCCESS_CENTER_VIDEO_CONFIGURED = successCenterResolved.configured

export const SUCCESS_CENTER_VIDEO_TITLE = 'Success Centers Explainer'

export function isDriveVideoEmbed(url: string) {
  return url.includes('drive.google.com')
}
