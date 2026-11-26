import { Link } from 'react-router-dom'
import BookIcon from './BookIcon'

const socials = [
  {
    name: 'YouTube',
    label: 'Watch Theoria Podcast on YouTube',
    href: 'https://www.youtube.com/@TheoriaPodcast',
    className: 'social-youtube',
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    name: 'Instagram',
    label: 'Follow Theoria on Instagram',
    href: 'https://www.instagram.com/theoriaresearch',
    className: 'social-instagram',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    name: 'LinkedIn',
    label: 'Connect with Theoria on LinkedIn',
    href: 'https://www.linkedin.com/company/theoria-research-academy/',
    className: 'social-linkedin',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="brand">
          <div className="flex flex-row items-start justify-start gap-2">
            <BookIcon width="52" height="43" />
            <span className="wordmark">THEORIA<small>RESEARCH FOR YOUNG SCHOLARS</small></span>
          </div>
        </div>

        <div className="footer-row">
          <div className="footerlinks">
            <Link to="/programs">Research programs</Link>
            <Link to="/program/publications">Research library</Link>
            <Link to="/success-stories">Success stories</Link>
            <Link to="/beyond-research">Beyond Research</Link>
            <Link to="/podcast">Podcast</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="footer-social" aria-label="Theoria social media">
            <span className="footer-social-title">Follow us</span>
            <ul className="footer-social-list">
              {socials.map((s, i) => (
                <li key={s.name} style={{ '--i': i }}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.name}
                    className={`social-btn ${s.className}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {s.icon}
                    </svg>
                    <span className="social-tip" aria-hidden="true">{s.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />
        <p className="copy">© 2026 Theoria. Concept website for design and content approval. Research claims and program terms require verification before launch.</p>
      </div>
    </footer>
  )
}