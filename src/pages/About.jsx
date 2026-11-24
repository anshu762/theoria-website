import { useState } from 'react'

const d = (ms) => ({ '--d': `${ms}ms` })

/* own copy first (public/aboutUs/dir.webp), UniVisory copy as backup */
const LOCAL_PHOTO = `${import.meta.env.BASE_URL}aboutUs/dir.webp`

function FounderPhoto({ alt }) {
  const [step, setStep] = useState(0)
  const srcs = [LOCAL_PHOTO, FOUNDER.photo]
  if (step >= srcs.length) return null
  return (
    <img
      key={srcs[step]}
      src={srcs[step]}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setStep((s) => s + 1)}
    />
  )
}

/* ───────── FILL THESE IN ───────── */
const FOUNDER = {
  name: 'Rohit Shorey',
  role: 'Founder & CEO',
  photo: 'https://univisory.org/cdn/images/aboutUs/dir.webp',
}
/* ───────────────────────────────── */

const NOTE = [
  'We started Theoria with a simple belief: young students are capable of much more than we give them the opportunity to explore.',
  'Over the years at UniVisory, I have sat across the table from hundreds of students. Many were brilliant: top grades, long lists of achievements, big ambitions. But one question kept coming back to me after those conversations.',
  'How many of them had the chance to find something out for themselves?',
  'That question became the inspiration for Theoria.',
  'I believe young minds can do far more than we usually let them. Theoria gives high school students a place to go beyond the textbook and feel what real research is like: the uncertainty, the dead ends, the breakthroughs. Accomplished researchers and mentors walk alongside them the whole way.',
  'We believe credible research demands curiosity, originality, academic rigor and independent validation. A publication in a respected journal or conference is a meaningful achievement, but its real value comes from the quality of thinking and work behind it.',
  'As part of UniVisory, Theoria brings a broader perspective helping students connect their research with their evolving academic interests, future opportunities and university aspirations.',
  'Our ambition is not simply to help students build impressive profiles. It is to help them become independent thinkers, confident investigators and young scholars capable of making meaningful contributions.',
  'Because the greatest outcome of research is not always what a student discovers. Sometimes, it is discovering what they are capable of.',
]

const CONTACT = {
  address: '919, Tower A, Spaze iTech Park, Sohna - Gurgaon Rd, Block S, Sector 49, Gurugram, Haryana 122018',
  phone: '+91 96500 94276',   // ← fill in, e.g. '+91 00000 00000'
  email: 'shubhangi@univisory.org',   // ← fill in, e.g. 'name@univisory.org'
  mapSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.178946849094!2d77.03731228091152!3d28.413856813348104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae151cabd9773d%3A0x80c824a03513e34f!2sUniVisory%20Global%20Education!5e0!3m2!1sen!2sin!4v1794995970251!5m2!1sen!2sin',
}

function CIco({ n }) {
  const p = {
    viewBox: '0 0 24 24', width: 22, height: 22, fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, focusable: 'false',
  }
  if (n === 'pin') {
    return (
      <svg {...p}>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    )
  }
    if (n === 'wa') {
    return (
      <svg {...p}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path
          transform="translate(6.6 6.4) scale(.5)"
          strokeWidth="3"
          d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        />
      </svg>
    )
  }
  if (n === 'phone') {
    return (
      <svg {...p}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </svg>
    )
  }
  return (
    <svg {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export default function About() {
    const mapsLink =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONTACT.address)
    const phoneHref = 'tel:' + CONTACT.phone.replace(/[^+\d]/g, '')
    const waHref = CONTACT.phone ? 'https://wa.me/' + CONTACT.phone.replace(/\D/g, '') : ''
  return (
    <div className="page fn-page">
      <section className="fn-founder" aria-labelledby="fn-title">
        <div className="shell">
          <div className="fn-grid">
            {/* LEFT — Founder image */}
            <div className="fn-side rv" style={d(0)}>
              <figure className="fn-photo">
               <div className="fn-photo-frame">
                  <FounderPhoto
                    alt={
                      FOUNDER.name
                        ? `${FOUNDER.name}, ${FOUNDER.role || 'Founder'}`
                        : 'Founder of Theoria'
                    }
                  />
                </div>

                {(FOUNDER.name || FOUNDER.role) && (
                  <figcaption className="fn-caption">
                    {FOUNDER.name && <strong>{FOUNDER.name}</strong>}
                    {FOUNDER.role && <span>{FOUNDER.role}</span>}
                  </figcaption>
                )}
              </figure>

              <div className="fn-side-glow" aria-hidden="true" />
            </div>

            {/* RIGHT — Simple founder note */}
            <article className="fn-note" aria-labelledby="fn-title">
              <header className="fn-head rv" style={d(120)}>
                <h2 id="fn-title">
                  Founder&rsquo;s <span className="fn-accent">note</span>
                </h2>
              </header>

              <div className="fn-note-body">
                {NOTE.map((text, i) => (
                  <p
                    key={i}
                    className="fn-note-line rv"
                    style={d(240 + i * 70)}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ───────── CONTACT ───────── */}
      <section className="fn-contact" aria-labelledby="fn-ct-title">
        <div className="shell">
          <header className="fn-ct-head rv" style={d(0)}>
            <h2 id="fn-ct-title">Contact <span className="fn-accent">us</span></h2>
          </header>

          <div className="fn-ct-grid">
            {/* LEFT — map */}
            <div className="fn-ct-map rv" style={d(80)}>
              <iframe
                src={CONTACT.mapSrc}
                title="UniVisory location on Google Maps"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* RIGHT — address, phone, email */}
            <div className="fn-ct-card rv" style={d(160)}>
              <ul className="fn-ct-list">
                <li className="fn-ct-row">
                  <span className="fn-ct-ico"><CIco n="pin" /></span>
                  <div>
                    <h3>Address</h3>
                    <p>{CONTACT.address}</p>
                  </div>
                </li>

                {CONTACT.phone && (
                  <li className="fn-ct-row">
                    <span className="fn-ct-ico"><CIco n="phone" /></span>
                    <div>
                      <h3>Phone</h3>
                      <p><a href={phoneHref}>{CONTACT.phone}</a></p>
                    </div>
                  </li>
                )}

                {/* {CONTACT.phone && (
                  <li className="fn-ct-row">
                    <span className="fn-ct-ico"><CIco n="wa" /></span>
                    <div>
                      <h3>WhatsApp</h3>
                      <p>
                        <a href={waHref} target="_blank" rel="noopener noreferrer">{CONTACT.phone}</a>
                      </p>
                    </div>
                  </li>
                )} */}

                {CONTACT.email && (
                  <li className="fn-ct-row">
                    <span className="fn-ct-ico"><CIco n="mail" /></span>
                    <div>
                      <h3>Email</h3>
                      <p><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a></p>
                    </div>
                  </li>
                )}
              </ul>

              <a className="fn-ct-btn" href={mapsLink} target="_blank" rel="noreferrer">
                <span>Get directions</span>
                <span className="fn-ct-arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}