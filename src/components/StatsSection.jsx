import { useEffect, useRef, useState } from 'react'

const d = (ms) => ({ '--d': ms + 'ms' })

/* ---------------- data: edit the numbers / labels here ---------------- */
const STATS = [
  { key: 'ivy', label: 'Ivy League',     value: 134, unit: 'admits', icon: 'cap' },
  { key: 'usa', label: 'Top 15 USA',     value: 276, unit: 'admits', icon: 'award' },
  { key: 'ox',  label: 'Oxbridge & LSE', value: 56,  unit: 'admits', icon: 'landmark' },
]

/* ---------------- small modules ---------------- */
function Icon({ name }) {
  const p = {
    width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  if (name === 'cap')
    return (
      <svg {...p}>
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </svg>
    )
  if (name === 'award')
    return (
      <svg {...p}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
      </svg>
    )
  return (
    <svg {...p}>
      <path d="M12 3 3 8h18L12 3Z" />
      <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
      <path d="M3 21h18" />
    </svg>
  )
}

/* counts up once, when the number scrolls into view */
function CountUp({ end, duration = 1800 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || reduce || !('IntersectionObserver' in window)) {
      setVal(end)
      return
    }
    let raf = 0
    let started = false
    const run = () => {
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1)
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])

  return <span ref={ref}>{val.toLocaleString()}</span>
}

/* one compact stat card: icon | label + number + unit */
function StatCard({ stat, index }) {
  return (
    <div className="rv" style={d(120 + index * 140)}>
      <article className="st-card" style={{ '--i': index }}>
        <span className="st-ico"><Icon name={stat.icon} /></span>

        <div className="st-body">
          <h3 className="st-label">{stat.label}</h3>
          <p className="st-num">
            <span className="st-value"><CountUp end={stat.value} /></span>
            <span className="st-unit">{stat.unit}</span>
          </p>
        </div>

        <span className="st-line" aria-hidden="true" />
      </article>
    </div>
  )
}

/* ---------------- section ---------------- */
export default function StatsSection() {
  return (
    <section className="st-section" id="numbers" aria-labelledby="st-title">
      <div className="shell">
        {/* title on the left, thin line fills the row */}
        <div className="st-head rv">
          <h2 id="st-title">
            <span className="st-x">8x</span>Your Admission Prospects to Ivy League &amp; Oxbridge
          </h2>
          <span className="st-rule" aria-hidden="true" />
        </div>

          {/* next line: the three stat cards */}
        <div className="st-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.key} stat={s} index={i} />
          ))}
        </div>

        {/* bottom right */}
        <div className="st-powered rv" style={d(500)}>
          <p className="st-label st-powered-text">
            Powered by <a href="https://univisory.org/">UniVisory</a>
          </p>
        </div>
      </div>
    </section>
  )
}