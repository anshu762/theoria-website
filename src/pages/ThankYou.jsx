import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CONTACT_INFO } from '../data/contactInfo'

const Ico = {
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
    wa: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        transform="translate(6.6 6.4) scale(.5)"
        strokeWidth="3"
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
      />
    </svg>
  ),
}

export default function ThankYou() {
  const { state } = useLocation()
  const first =
    state && typeof state.name === 'string' ? state.name.trim().split(/\s+/)[0] : ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { address, phone, email } = CONTACT_INFO
  const phoneHref = phone ? 'tel:' + phone.replace(/[^+\d]/g, '') : ''
  const waHref = phone ? 'https://wa.me/' + phone.replace(/\D/g, '') : ''
  const mapsLink =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address)

  return (
    <div className="page ty-page">
      <div className="ty-wrap">
        <div className="ty-card">
          <span className="ty-badge" aria-hidden="true">
            <svg viewBox="0 0 52 52">
              <path className="ty-tick" d="M15 27l8 8 14-16" />
            </svg>
          </span>

          <h1>
            Thank <span className="ty-accent">you</span>
            {first ? ', ' + first : ''}!
          </h1>
          <p className="ty-lead">
            Your application has been submitted successfully. We’ll get back to you soon!
          </p>

          <div className="ty-divider" />

          <h2 className="ty-sub">Reach out to us</h2>
          <p className="ty-subtext">You can also contact us directly:</p>

          <div className="ty-contact">
            {phone && (
              <a className="ty-tile" href={phoneHref}>
                <span className="ty-ico">{Ico.phone}</span>
                <span>
                  <span className="ty-tile-k">Phone</span>
                  <span className="ty-tile-v">{phone}</span>
                </span>
              </a>
            )}
            {phone && (
              <a className="ty-tile" href={waHref} target="_blank" rel="noopener noreferrer">
                <span className="ty-ico">{Ico.wa}</span>
                <span>
                  <span className="ty-tile-k">WhatsApp</span>
                  <span className="ty-tile-v">{phone}</span>
                </span>
              </a>
            )}
            {email && (
              <a className="ty-tile ty-tile-wide" href={'mailto:' + email}>
                <span className="ty-ico">{Ico.mail}</span>
                <span>
                  <span className="ty-tile-k">Email</span>
                  <span className="ty-tile-v">{email}</span>
                </span>
              </a>
            )}
            <a className="ty-tile ty-tile-wide" href={mapsLink} target="_blank" rel="noopener noreferrer">
              <span className="ty-ico">{Ico.pin}</span>
              <span>
                <span className="ty-tile-k">Address</span>
                <span className="ty-tile-v">{address}</span>
              </span>
            </a>
          </div>

          <div className="ty-actions">
            <Link to="/" className="cf-btn cf-btn-primary">Back to home</Link>
            <Link to="/success-stories" className="cf-btn cf-btn-ghost">Read success stories</Link>
          </div>
        </div>
      </div>
    </div>
  )
}