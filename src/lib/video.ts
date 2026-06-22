export const EXPLAINER_VIDEO_ID = 'explainer-video'

/** Google Drive file ID (for sharing link; embed does not support scroll autoplay) */
export const EXPLAINER_VIDEO_DRIVE_ID = '1H1Ap9GYpoJQlKt79QirsCAfgoZa-YFRP'

export const EXPLAINER_VIDEO_DRIVE_VIEW_URL = `https://drive.google.com/file/d/${EXPLAINER_VIDEO_DRIVE_ID}/view`

/**
 * Self-hosted file — required for reliable scroll-to-play autoplay.
 * Google Drive iframes cannot be started via JavaScript when scrolled into view.
 */
export const EXPLAINER_VIDEO_SRC = '/assets/SFS-explainer.mp4?v=2'

export const EXPLAINER_VIDEO_TITLE = 'SFS Explainer'

export function isDriveVideoEmbed(url: string) {
  return url.includes('drive.google.com')
}
