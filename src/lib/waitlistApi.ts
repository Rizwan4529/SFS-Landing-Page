import { apiUrl } from './api'
import type { CampaignCategory } from './campaignCategories'

export type WaitlistApiPayload = {
  name: string
  email: string
  campaignCategory: string
  message: string
}

type CategoriesResponse = {
  success?: boolean
  message?: string
  data?: CampaignCategory[]
}

type WaitlistResponse = {
  success?: boolean
  message?: string
  error?: string
}

export async function fetchWaitlistCampaignCategories(): Promise<
  CampaignCategory[]
> {
  const res = await fetch(apiUrl('/waitlist/campaign-categories'), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to load campaign categories (${res.status})`)
  }

  const body = (await res.json()) as CategoriesResponse
  const data = Array.isArray(body.data) ? body.data : []

  return data
    .filter(
      (item): item is CampaignCategory =>
        Boolean(item?.value) && Boolean(item?.label),
    )
    .map((item) => ({
      value: String(item.value),
      label: String(item.label),
    }))
}

export async function submitWaitlistToApi(
  payload: WaitlistApiPayload,
): Promise<void> {
  const url = apiUrl('/waitlist')

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await res.json().catch(() => null)) as WaitlistResponse | null

  if (!res.ok || data?.success === false) {
    throw new Error(
      data?.message || data?.error || `Waitlist API failed (${res.status})`,
    )
  }
}
