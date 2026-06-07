export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Properties', href: '/properties' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
] as const

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Projects', href: '/projects' },
    { label: 'Properties', href: '/properties' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact' },
    { label: 'Budget Calculator', href: '/budget' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
} as const

export const LOCATIONS = [
  'Noida',
  'Greater Noida',
  'Greater Noida West',
  'Ghaziabad',
  'Delhi',
] as const

export const BHK_TYPES = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  '5 BHK',
  'Studio',
  'Villa',
  'Plot',
  'Shop',
] as const

export const PROPERTY_TYPES = [
  { value: 'FLAT', label: 'Flat / Apartment' },
  { value: 'SHOP', label: 'Shop / Commercial' },
  { value: 'PLOT', label: 'Plot' },
  { value: 'STUDIO_APARTMENT', label: 'Studio Apartment' },
] as const

export const PROJECT_STATUSES = [
  { value: 'UNDER_CONSTRUCTION', label: 'Under Construction' },
  { value: 'READY_TO_MOVE', label: 'Ready to Move' },
  { value: 'NEW_LAUNCH', label: 'New Launch' },
] as const
