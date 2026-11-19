export const CONTACT_EMAIL = 'info@univisory.org'

// Where the bottom banner's "Get Started" button goes.
// '/apply' = the internal Apply page (same tab).
// Or use a full URL like 'https://your-form-link.com' to open it in a new tab.
export const APPLY_URL = '/contact'

// Optional: put theoria-logo.png in /public and set to '/theoria-logo.png'
export const LOGO_PNG = ''

// Set to true to show the editorial "REVIEW NOTE" boxes again
export const SHOW_REVIEW_NOTES = false

export const NAV_LINKS = [
  { to: '/programs', label: 'Research programs' },
  {
    to: '/program/publications',
    label: 'Research library',
    children: [
      { to: '/program/publications', label: 'Publications' },
      { to: '/program/projects', label: 'Projects' },
    ],
  },
  { to: '/success-stories', label: 'Success stories' },
  { to: '/beyond-research', label: 'Beyond Research' },
  { to: '/podcast', label: 'Podcast' },
  { to: '/about', label: 'About' },
]

export const TITLES = {
  '/': 'Theoria | Research for Young Scholars',
  '/why-research': 'Why Research? | Theoria',
  '/programs': 'Programs | Theoria',
  '/program': 'Research Library | Theoria',
  '/program/publications': 'Publications | Theoria',
  '/program/projects': 'Projects | Theoria',
  '/research': 'Research Library | Theoria',
  '/why-theoria': 'Why Theoria? | Theoria',
  '/podcast': 'Podcast | Theoria',
  '/about': 'About | Theoria',
  '/apply': 'Apply | Theoria',
  '/beyond-research': 'Beyond Research | Theoria'
}