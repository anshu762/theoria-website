export const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfbTp1eoSYns_cTaeNVxF7v-u7WvdEqRN4LryuiMmpbIX1GrA/viewform?usp=header';

// Theoria brand files (put them in /public)
export const LOGO_SRC = '/Theoria-logo.png';
export const ICON_SRC = '/Theoria-favicon.png';

// Where the UniVisory images (mentors, elite, research papers) are loaded from.
// Default: UniVisory CDN. After running the download script, set VITE_IMG_BASE=/images
const IMG_BASE = (import.meta.env.VITE_IMG_BASE || 'https://univisory.org/cdn/images').replace(/\/$/, '');
export const img = (path) => `${IMG_BASE}/${path}`;

export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '';

export const CONTACT = {
  address: '919, Tower A, Spaze IT Park, Sec-49, Sohna Road, Gurugram, Haryana-122001',
  phone: '+91 9535386869',
  email: 'info@univisory.org',
};

// Verify these paths on univisory.org
const U = 'https://www.univisory.org';
export const UNIVISORY_LINKS = {
  about: [
    { label: 'What We Do', href: `${U}/about.html` },
    { label: "Director's Note", href: `${U}/directors-note.html` },
    { label: 'Our Blogs', href: `${U}/blogs.html` },
  ],
  useful: [
    { label: 'Privacy Policy', href: `${U}/privacy-policy.html` },
    { label: 'Terms of Service', href: `${U}/terms.html` },
    { label: 'Careers', href: `${U}/careers.html` },
  ],
  home: U,
};