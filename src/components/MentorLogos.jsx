import { useState } from 'react'
import { MENTOR_UNIVERSITIES } from '../data/mentorUniversities'

const d = (ms) => ({ '--d': ms + 'ms' })

function MentorLogo({ u }) {
  const [idx, setIdx] = useState(0)
  const src = u.sources[idx]

  // every source failed -> initials badge
  if (!src) {
    return <span className="mu-mono" aria-hidden="true">{u.mono}</span>
  }

  return (
    <img
      key={src}
      src={src}
      alt=""
      width="48"
      height="48"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIdx((i) => i + 1)}
    />
  )
}

export default function MentorLogos() {
  const half = Math.ceil(MENTOR_UNIVERSITIES.length / 2)
  const rows = [
    MENTOR_UNIVERSITIES.slice(0, half),
    MENTOR_UNIVERSITIES.slice(half),
  ]

  return (
    <section
      className="mu-section"
      id="mentor-network"
      aria-labelledby="mentor-network-title"
    >
      <div className="shell">
        {/* title on the left */}
        <div className="mu-head rv">
          <h2 id="mentor-network-title">Our Mentor Network</h2>
          <span className="mu-rule" aria-hidden="true" />
        </div>

        {/* next line: logos in two rows */}
        <div className="mu-rows" style={{ '--cols': half }}>
          {rows.map((row, r) => (
            <div
              key={r}
              className={'mu-row rv' + (r === 1 ? ' rev' : '')}
              style={d(120 + r * 140)}
            >
              <ul
                className="mu-track"
                aria-label={`Universities our mentors belong to, row ${r + 1}`}
              >
                {/* row is repeated once: the copy is only used by the mobile/tablet marquee */}
                {[...row, ...row].map((u, k) => {
                  const dup = k >= row.length
                  return (
                    <li
                      key={u.slug + '-' + k}
                      className={'mu-card' + (dup ? ' is-dup' : '')}
                      style={{ '--i': r * half + (k % row.length) }}
                      aria-hidden={dup ? 'true' : undefined}
                    >
                      <span className="mu-logo"><MentorLogo u={u} /></span>
                      <span className="mu-name">{u.name}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}