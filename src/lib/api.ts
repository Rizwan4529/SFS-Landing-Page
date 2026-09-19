const DEFAULT_API_BASE =
  'https://share-fund-system-be-production.up.railway.app/api/v1'

/** Backend API base — no trailing slash */
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE
).replace(/\/$/, '')

export function apiUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalized}`
}
