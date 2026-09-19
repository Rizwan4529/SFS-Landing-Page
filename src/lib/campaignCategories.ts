export const CAMPAIGN_TOOLTIP =
  'A campaign is your funding goal on Share Fund System — the category you are raising support for, such as housing, medical expenses, or business growth.'

export type CampaignCategory = {
  value: string
  label: string
  description?: string
}

/** Fallback categories if the API is unavailable — values match backend API */
export const CAMPAIGN_CATEGORIES: CampaignCategory[] = [
  { value: 'housing', label: 'Housing' },
  { value: 'food_groceries', label: 'Food & Groceries' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'debt_reduction', label: 'Debt Reduction' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'medical', label: 'Medical' },
  { value: 'business_growth', label: 'Business Growth' },
]

export type CampaignCategoryValue = string
