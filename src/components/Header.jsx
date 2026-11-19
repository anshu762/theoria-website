import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BookIcon from './BookIcon'
import { NAV_LINKS, LOGO_PNG } from '../config'

export default function Header() {
  const [open, setOpen] = useState(false)   // mobile menu
  const [dd, setDd] = useState(null)        // which dropdown is open (by its `to`)
  const { pathname } = useLocation()
  const navRef = useRef(null)

  useEffect(() => { setOpen(false); setDd(null) }, [pathname])

  /* close the dropdown on outside click / Esc */
  useEffect(() => {
    if (!dd) return
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setDd(null) }
    const onKey = (e) => { if (e.key === 'Escape') setDd(null) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown, { passive: true })
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [dd])

  const linkClass = ({ isActive }) => 'lnk' + (isActive ? ' active' : '')

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

        <nav className={'navlinks' + (open ? ' show' : '')} aria-label="Main" ref={navRef}>
          {NAV_LINKS.map((l) => {
            if (!l.children) {
              return (
                <NavLink key={l.to} to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
              )
            }
            const isOpen = dd === l.to
            const menuId = 'dd-' + l.to.replace(/\W/g, '')
            return (
              <div key={l.to} className={'nav-dd' + (isOpen ? ' is-open' : '')}>
                <NavLink to={l.to} className={linkClass}>{l.label}</NavLink>
                <button
                  type="button"
                  className="nav-dd-btn"
                  aria-label={`${l.label} submenu`}
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  onClick={() => setDd(isOpen ? null : l.to)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <ul className="nav-dd-menu" id={menuId}>
                  {l.children.map((c) => (
                    <li key={c.to}>
                      <NavLink
                        to={c.to}
                        className={({ isActive }) => 'nav-dd-item' + (isActive ? ' active' : '')}
                        onClick={(e) => { setDd(null); e.currentTarget.blur() }}
                      >
                        {c.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          <Link className="btn nav-cta" to="/research-fit-application">Research Application Form</Link>
        </nav>
      </div>
    </header>
  )
}