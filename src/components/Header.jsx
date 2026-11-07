import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BookIcon from './BookIcon'
import { NAV_LINKS, LOGO_PNG } from '../config'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header>
      <div className="shell nav">
        <Link className="brand" to="/" aria-label="Theoria home">
          {LOGO_PNG ? (
            <img src={LOGO_PNG} alt="Theoria: Research for Young Scholars" />
          ) : (
            <>
              <BookIcon width="48" height="40" />
              <span className="wordmark">
                THEORIA<small>RESEARCH FOR YOUNG SCHOLARS</small>
              </span>
            </>
          )}
        </Link>

        <button
          className="mobiletoggle"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav className={'navlinks' + (open ? ' show' : '')} aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => 'lnk' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
          <Link className="btn nav-cta" to="/apply">Research Application Form</Link>
        </nav>
      </div>
    </header>
  )
}