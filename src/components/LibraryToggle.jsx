import { Link, useLocation } from 'react-router-dom'

/* If your Projects page uses a different path, change `to` here (only place). */
const VIEWS = [
  { id: 'publications', label: 'Publications', to: '/program/Publications' },
  { id: 'projects', label: 'Projects', to: '/program/projects' },
]

const HINT = {
  publications: [ 'Use the switch to explore our projects.'],
  projects: ['Use the switch to read our publications.'],
}

const DocIcon = () => (
  <svg className="vt-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)
const CubeIcon = () => (
  <svg className="vt-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
    <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
  </svg>
)
const GoIcon = ({ left }) => (
  <svg className="vt-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={left ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

export default function LibraryToggle({ current }) {
  const { state } = useLocation()
  const idx = current === 'projects' ? 1 : 0
  const cameByToggle = !!(state && state.vt)
  const hint = HINT[current] || HINT.publications

  return (
    <div className="vt-wrap">
      <nav
        className="vt-track"
        aria-label="Switch between publications and projects"
        style={{ '--vt-i': idx }}
        data-anim={cameByToggle ? '1' : undefined}
      >
        <span className="vt-thumb" aria-hidden="true" />
        {VIEWS.map((v, i) => {
          const on = i === idx
          return (
            <Link
              key={v.id}
              to={v.to}
              state={{ vt: true }}
              className={'vt-opt' + (on ? ' is-on' : '')}
              aria-current={on ? 'page' : undefined}
              tabIndex={on ? -1 : undefined}
              onClick={(e) => {
                if (on) {
                  e.preventDefault()
                  return
                }
                window.scrollTo(0, 0)
              }}
            >
              {v.id === 'projects' ? <CubeIcon /> : <DocIcon />}
              <span>{v.label}</span>
              {!on && <GoIcon left={i < idx} />}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}