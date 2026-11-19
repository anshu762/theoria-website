import { useState, useCallback } from 'react'
import { MENTOR_UNIVERSITIES } from '../data/mentorUniversities'

const d = (ms) => ({ '--d': ms + 'ms' })

// how many rows the logos are split into (26 logos -> 9 / 9 / 8)
const ROWS = 3

// `idx` = which entry of u.sources is being shown (kept in the parent so the
// card and its marquee copy always use the same one)
function MentorLogo({ u, idx, onFail }) {
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
      onError={() => onFail(u, idx)}
    />
  )
}

export default function MentorLogos() {
  // slug -> index of the source currently used
  const [tried, setTried] = useState({})

  const onFail = useCallback((u, i) => {
    if (import.meta.env.DEV) {
      console.info(`[mentor logo] failed: ${u.name} -> ${u.sources[i]}`)
    }
    // only advance if this failure is for the source currently shown
    // (the card and its copy both report the same failure)
    setTried((t) => ((t[u.slug] ?? 0) === i ? { ...t, [u.slug]: i + 1 } : t))
  }, [])

  const total = MENTOR_UNIVERSITIES.length
  const per = Math.ceil(total / ROWS)
  const rows = Array.from({ length: ROWS }, (_, r) =>
    MENTOR_UNIVERSITIES.slice(r * per, (r + 1) * per)
  ).filter((row) => row.length)

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

        {/* one auto-scrolling strip.
            --mu-n     = number of UNIQUE universities (the loop distance)
            --mu-speed = scaled so the scroll speed stays the same (4.8s per card) */}
        <div
          className="mu-rows"
          style={{
            '--cols': per,
            '--mu-n': total,
            '--mu-speed': `${(total * 4.8).toFixed(1)}s`,
          }}
        >
          {rows.map((row, r) => (
            <div
              key={r}
              /* first row = order 1, every other row = order 2 (keeps the strip in the right order) */
              className={'mu-row rv' + (r > 0 ? ' rev' : '')}
              style={d(120 + r * 140)}
            >
              <ul
                className="mu-track"
                aria-label={`Universities our mentors belong to, row ${r + 1}`}
              >
                {/* row is repeated once: the copy makes the loop seamless */}
                {[...row, ...row].map((u, k) => {
                  const dup = k >= row.length
                  return (
                    <li
                      key={u.slug + '-' + k}
                      className={'mu-card' + (dup ? ' is-dup' : '')}
                      style={{ '--i': r * per + (k % row.length) }}
                      aria-hidden={dup ? 'true' : undefined}
                    >
                      <span className="mu-logo">
                        <MentorLogo u={u} idx={tried[u.slug] ?? 0} onFail={onFail} />
                      </span>
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