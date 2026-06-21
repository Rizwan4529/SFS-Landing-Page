export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'How it works', href: '#how' },
  { label: 'Categories', href: '#categories' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Learn', href: '#education' },
]

export const WAITLIST_ID = 'waitlist'
