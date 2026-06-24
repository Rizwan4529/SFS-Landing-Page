export const CAMPAIGN_TOOLTIP =
  'A campaign is your funding goal on Share Fund System — the category you are raising support for, such as housing, medical expenses, or business growth.'

export const CAMPAIGN_CATEGORIES = [
  { value: 'housing', label: 'Housing', description: 'Rent, mortgage, and housing expenses.' },
  { value: 'food-groceries', label: 'Food & Groceries', description: 'Household food and grocery needs.' },
  { value: 'utilities', label: 'Utilities', description: 'Electricity, water, internet, and bills.' },
  { value: 'debt-reduction', label: 'Debt Reduction', description: 'Reducing personal debt.' },
  { value: 'vehicle', label: 'Vehicle', description: 'Transportation and vehicle goals.' },
  { value: 'medical', label: 'Medical', description: 'Health-related financial needs.' },
  {
    value: 'business-growth',
    label: 'Business Growth',
    description: 'Startup, expansion, equipment, and operations for small business owners.',
  },
] as const

export type CampaignCategoryValue = (typeof CAMPAIGN_CATEGORIES)[number]['value']
