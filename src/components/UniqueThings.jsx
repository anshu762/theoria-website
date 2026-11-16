import { useEffect, useRef, useState } from 'react'

/* Content copied from your data */
const ITEMS = [
  {
    id: 'projects',
    title: 'Projects',
    text: 'Build projects that solve real-world problems and create meaningful impact.',
    icon: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      </>
    ),
  },
  {
    id: 'novel-research',
    title: 'Novel research',
    text: 'Explore niche topics and produce original, differentiated research.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    id: 'methodology',
    title: 'Methodology',
    text: 'Master advanced research methodologies and structured academic writing',
    icon: (
      <>
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
  },
  {
    id: 'mentors',
    title: 'Ivy/Oxbridge mentors',
    text: 'Work 1:1 with dedicated mentors from your dream university throughout the research journey.',
    icon: (
      <>
        <path d="M22 9 12 4 2 9l10 5 10-5Z" />
        <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
        <path d="M22 9v6" />
      </>
    ),
  },
  {
    id: 'lor',
    title: 'Mentor LOR',
    text: 'Earn impactful recommendation letters from your research mentor.',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    id: 'narrative',
    title: 'Application narrative',
    text: 'Build a compelling profile through personalised U360 assessments and gap analysis.',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </>
    ),
  },
  {
    id: 'publication',
    title: 'Publication',
    text: 'Make your research ready to publish in reputed academic journals.',
    icon: (
      <>
        <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2Z" />
        <path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7Z" />
      </>
    ),
  },
  {
    id: 'competitions',
    title: 'Competition readiness',
    text: 'Prepare for prestigious competitions like RSI and MIT Solve.',
    icon: (
      <>
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
        <path d="M7 6H4v1a3 3 0 0 0 3 3" />
        <path d="M17 6h3v1a3 3 0 0 1-3 3" />
      </>
    ),
  },
]

const Sparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" />
  </svg>
)

/* reveal on scroll (self-contained) */
function useReveal() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export default function UniqueThings() {
  const [ref, seen] = useReveal()

  return (
    <section ref={ref} className={`uq-section${seen ? ' is-in' : ''}`} aria-labelledby="uq-title">
      <span className="uq-sp uq-s1" aria-hidden="true"><Sparkle /></span>
      <span className="uq-sp uq-s2" aria-hidden="true"><Sparkle /></span>

      <div className="shell">
        <div className="uq-head">
          <h2 id="uq-title">What makes us <span className="uq-accent">unique</span>?</h2>
        </div>

        <ul className="uq-grid" role="list">
          {ITEMS.map((it, i) => (
            <li key={it.id} className="uq-item" style={{ '--i': i }}>
              <article className="uq-card">
                <span className="uq-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="uq-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                    {it.icon}
                  </svg>
                </span>
                <h3 className="uq-title">{it.title}</h3>
                <p className="uq-text">{it.text}</p>
                <span className="uq-bar" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}