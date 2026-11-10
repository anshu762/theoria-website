import { useState } from 'react'
import BookIcon from './BookIcon'
import { MENTOR_UNIVERSITIES } from '../data/mentorUniversities'

function MentorLogo({ u }) {
  const [idx, setIdx] = useState(0)
  const src = u.sources[idx]

  // every source failed -> gradient initials badge
  if (!src) {
    return <span className="mn-mono" aria-hidden="true">{u.mono}</span>
  }

  return (
    <img
      key={src}
      src={src}
      alt=""
      width="36"
      height="36"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIdx((i) => i + 1)}
    />
  )
}

export default function MentorNetwork() {
  return (
    <aside
      className="mentor-net rv"
      style={{ '--d': '200ms' }}
      aria-labelledby="mentor-network-title"
    >
      <div className="mn-ring mn-r1" />
      <div className="mn-ring mn-r2" />
      <span className="mn-spark">✦</span>

      <div className="mn-body">
        <div className="mn-head">
          <BookIcon className="mn-icon" width="44" height="37" />
          <h2 id="mentor-network-title">Our Mentor Network</h2>
        </div>

        <p>
          Active PhD researchers and Postdocs, selected for their academic depth,
          research experience, and ability to guide students through serious
          one-to-one mentorship.
        </p>

        <ul className="mn-grid" aria-label="Universities our mentors belong to">
          {MENTOR_UNIVERSITIES.map((u, i) => (
            <li key={u.name} className="mn-tile" style={{ '--i': i }}>
              <span className="mn-logo"><MentorLogo u={u} /></span>
              <span className="mn-name">{u.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}