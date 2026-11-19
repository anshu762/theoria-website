import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BookIcon from './BookIcon'
import { NAV_LINKS, LOGO_PNG } from '../config'

/* ---------- read how dark the surface behind the header is ---------- */
const COLOR_RE = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+)(%?))?\s*\)/g

const lum = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255

function readColors(str) {
  const out = []
  if (!str) return out
  let m
  COLOR_RE.lastIndex = 0
  while ((m = COLOR_RE.exec(str))) {
    let a = m[4] === undefined ? 1 : parseFloat(m[4])
    if (m[5] === '%') a /= 100
    out.push({ l: lum(+m[1], +m[2], +m[3]), a })
  }
  return out
}

/* brightness (0 = black, 1 = white) of one element's own background, or null if it has none */
function surfaceLum(el) {
  const cs = getComputedStyle(el)
  if (parseFloat(cs.opacity) < 0.1) return null

  const bi = cs.backgroundImage
  if (bi && bi !== 'none' && bi.indexOf('gradient') !== -1) {
    const g = readColors(bi).filter((c) => c.a >= 0.6)   // ignores faint glows and dots
    if (g.length) return g.reduce((s, c) => s + c.l, 0) / g.length
  }
  const bg = readColors(cs.backgroundColor).filter((c) => c.a >= 0.6)
  if (bg.length) return bg[0].l
  return null
}

export default function Header() {
  const [open, setOpen] = useState(false)   // mobile menu
  const [dd, setDd] = useState(null)        // which dropdown is open (by its `to`)
  const [tone, setTone] = useState('light') // 'light' | 'dark' = what is behind the header
  const { pathname } = useLocation()
  const navRef = useRef(null)
  const hdrRef = useRef(null)

  useEffect(() => { setOpen(false); setDd(null) }, [pathname])

  /* pick the header colours from the section currently under it */
  useEffect(() => {
    const hdr = hdrRef.current
    if (!hdr) return undefined
    let raf = 0

    const measure = () => {
      raf = 0
      const r = hdr.getBoundingClientRect()
      const y = Math.min(window.innerHeight - 1, Math.max(1, r.top + r.height / 2))
      const w = window.innerWidth
      let sum = 0
      let n = 0
      ;[w * 0.15, w * 0.5, w * 0.85].forEach((x) => {
        const stack = document.elementsFromPoint(x, y)
        for (let i = 0; i < stack.length; i++) {
          const el = stack[i]
          if (hdr.contains(el)) continue
          const l = surfaceLum(el)
          if (l !== null) {
            sum += l
            n++
            break
          }
        }
      })
      const next = n && sum / n < 0.45 ? 'dark' : 'light'
      setTone((t) => (t === next ? t : next))
    }

    const queue = () => { if (!raf) raf = window.requestAnimationFrame(measure) }

    queue()
    const timers = [120, 400, 1000].map((ms) => window.setTimeout(queue, ms)) // after the page renders
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    window.addEventListener('load', queue)
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      timers.forEach(window.clearTimeout)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      window.removeEventListener('load', queue)
    }
  }, [pathname])

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
    <header ref={hdrRef} data-tone={tone}>
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