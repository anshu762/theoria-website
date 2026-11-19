import { useEffect, useRef, useState } from 'react'

// text is exactly as supplied (label + description)
const ITEMS = [
  {
    icon: 'globe',
    label: 'International validation',
    text: "Independent recognition can establish that a student's work stands out beyond school-level achievements.",
  },
  {
    icon: 'cap',
    label: 'Stronger university candidature',
    text: 'Competitive distinctions can provide compelling evidence of intellectual ability, originality, initiative and achievement.',
  },
  {
    icon: 'flask',
    label: 'Higher-quality research',
    text: 'Preparing for rigorous judging encourages stronger methods, evidence, innovation and presentation.',
  },
  {
    icon: 'mic',
    label: 'Exposure and confidence',
    text: 'Students learn to communicate their work to experts and compete alongside talented peers internationally.',
  },
]

// where each icon sits on the orbit ring (x, y in %)
const POS = [
  ['50%', '0%'],
  ['100%', '50%'],
  ['50%', '100%'],
  ['0%', '50%'],
]

function Ico({ n }) {
  const shapes = {
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3.2 3 14.8 0 18" />
        <path d="M12 3c-3 3.2-3 14.8 0 18" />
      </>
    ),
    cap: (
      <>
        <path d="M2 9l10-5 10 5-10 5-10-5z" />
        <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
        <path d="M22 9v6" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6" />
        <path d="M10 3v6.2L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.2V3" />
        <path d="M7.5 15h9" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="2.5" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3.5" />
        <path d="M8.5 21.5h7" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.9.7 1.6 1.7 1.6 2.7V17h4v-.5c0-1 .7-2 1.6-2.7A6 6 0 0 0 12 3z" />
      </>
    ),
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[n]}
    </svg>
  )
}

export default function ResearchImportance() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  // reveal once, when the section scrolls into view
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={'ri-section' + (seen ? ' is-in' : '')}
      id="why-research-matters"
      aria-labelledby="ri-title"
    >
      <div className="shell">
        <div className="ri-wrap">
          {/* left: title + animated orbit */}
          <div className="ri-left">
            <div className="ri-head">
              <h2 id="ri-title">
                Why is research important for a high school student?
              </h2>
              <span className="ri-rule" aria-hidden="true" />
            </div>

            <div className="ri-orbit" aria-hidden="true">
              <span className="ri-glow" />
              <span className="ri-ring ri-ring-a">
                {ITEMS.map((it, i) => (
                  <span key={it.icon} className="ri-node" style={{ '--x': POS[i][0], '--y': POS[i][1] }}>
                    <span className="ri-node-in"><Ico n={it.icon} /></span>
                  </span>
                ))}
              </span>
              <span className="ri-ring ri-ring-b" />
              <span className="ri-core"><Ico n="bulb" /></span>
            </div>
          </div>

          {/* right: the four points */}
          <ul className="ri-list">
            {ITEMS.map((it, i) => (
              <li key={it.label} className="ri-item" style={{ '--i': i }}>
                <span className="ri-ico"><Ico n={it.icon} /></span>
                <div className="ri-body">
                  <h3 className="ri-label">{it.label}</h3>
                  <p className="ri-text">{it.text}</p>
                </div>
                <span className="ri-bar" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}