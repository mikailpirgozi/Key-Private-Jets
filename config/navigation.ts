/**
 * Navigation menu structure
 */

export interface NavItem {
  name: string
  href: string
  description?: string
  featured?: boolean
  external?: boolean
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

/**
 * Main navigation items (desktop header)
 */
export const mainNavigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Routes',
    href: '/routes',
    description: 'Popular private jet routes with instant pricing',
  },
  {
    name: 'Aircraft',
    href: '/aircraft',
    description: 'Browse our fleet of luxury private jets',
  },
  {
    name: 'Charter',
    href: '/charter',
    description: 'City-specific charter services',
  },
  {
    name: 'Empty Legs',
    href: '/empty-legs',
    description: 'Save up to 75% on one-way flights',
    featured: true,
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

/**
 * Footer navigation groups
 */
export const footerNavigation: NavGroup[] = [
  {
    title: 'Services',
    items: [
      { name: 'Private Jet Charter', href: '/routes' },
      { name: 'Empty Leg Flights', href: '/empty-legs' },
      { name: 'Aircraft Fleet', href: '/aircraft' },
      { name: 'City Charter', href: '/charter' },
      { name: 'Get a Quote', href: '/#quote' },
    ],
  },
  {
    title: 'Popular Routes',
    items: [
      { name: 'New York to Miami', href: '/routes/new-york-to-miami' },
      { name: 'Los Angeles to Las Vegas', href: '/routes/los-angeles-to-las-vegas' },
      { name: 'London to Dubai', href: '/routes/london-to-dubai' },
      { name: 'New York to London', href: '/routes/new-york-to-london' },
      { name: 'View All Routes', href: '/routes' },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Partners', href: '/about#partners' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
    ],
  },
]

/**
 * Quick links (sidebar, mobile menu)
 */
export const quickLinks: NavItem[] = [
  {
    name: 'Get Instant Quote',
    href: '/#quote',
    featured: true,
  },
  {
    name: 'Empty Legs',
    href: '/empty-legs',
    featured: true,
  },
  {
    name: 'Popular Routes',
    href: '/routes',
  },
  {
    name: 'Aircraft Fleet',
    href: '/aircraft',
  },
]

/**
 * Social media links
 */
export const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/keyprivatejet',
    icon: 'twitter',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/keyprivatejet',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/keyprivatejet',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/keyprivatejet',
    icon: 'linkedin',
  },
] as const

