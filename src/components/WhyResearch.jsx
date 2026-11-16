import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  {
    id: 'curiosity',
    title: 'Intellectual curiosity',
    d: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  },
  {
    id: 'evidence',
    title: 'Evidence literacy',
    d: 'M6 3h8l5 5v13H6z M14 3v5h5 M9 14l2 2 4-4',
  },
  {
    id: 'problem',
    title: 'Problem-solving',
    d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  },
  {
    id: 'resilience',
    title: 'Resilience',
    d: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  },
  {
    id: 'communication',
    title: 'Communication',
    d: 'M4 5h16v11H10l-5 4v-4H4z',
  },
  {
    id: 'depth',
    title: 'Disciplinary depth',
    d: 'M12 3l9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5',
  },
]

function Sparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" fill="currentColor" />
    </svg>
  )
}

function useSeen() {
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
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export default function WhyResearch() {
  const [ref, seen] = useSeen()

  return (
    <section
      ref={ref}
      id="why-research"
      className={`wr-section${seen ? ' wr-in' : ''}`}
      aria-labelledby="wr-title"
    >
      <Sparkle className="wr-spark wr-sp1" />
      <Sparkle className="wr-spark wr-sp2" />

      <div className="shell">
        <div className="wr-head">
          <h2 id="wr-title" className="wr-title">
            Why research?  
          </h2>
          <p><span className="wr-six">6</span> capabilities research develops.</p>
        </div>

        <ul className="wr-grid">
          {ITEMS.map((it, i) => (
            <li key={it.id} className="wr-card" style={{ '--i': i }}>
              <span className="wr-no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="wr-ico" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={it.d} />
                </svg>
              </span>
              <h3 className="wr-name">{it.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}