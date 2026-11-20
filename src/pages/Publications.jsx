import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PAPERS } from '../components/HeroPapers'
import LibraryToggle from '../components/LibraryToggle'

/* Publications are built from the hero's PAPERS list (title + abstract only).
   Add a paper there and it appears here automatically. */
const PUBS = PAPERS.filter((p) => p.glimpse?.paragraphs?.length).map((p) => ({
  id: p.id,
  title: p.glimpse.title || p.title,
  label: p.glimpse.heading || 'Excerpt',
  paragraphs: p.glimpse.paragraphs,
}))

/* ---------- small inline icons ---------- */
const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'l' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)
const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

/* ---------------------------------------------------------------
   Popup: full title + complete abstract, prev / next, keyboard
--------------------------------------------------------------- */
function PubModal({ index, onClose, onGo, restore }) {
  const n = PUBS.length
  const dlg = useRef(null)
  const body = useRef(null)
  const p = PUBS[index]

  /* scroll lock, initial focus, focus return */
  useEffect(() => {
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    body.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = old
      restore.current?.focus?.()
    }
  }, [restore])

  /* every paper opens scrolled to the top */
  useEffect(() => {
    if (body.current) body.current.scrollTop = 0
  }, [index])

  /* keyboard: Esc, arrows, focus trap */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        onGo((index + 1) % n)
      } else if (e.key === 'ArrowLeft') {
        onGo((index - 1 + n) % n)
      } else if (e.key === 'Tab' && dlg.current) {
        const list = [...dlg.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')].filter(
          (el) => !el.disabled
        )
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        const act = document.activeElement
        if (e.shiftKey && (act === first || act === dlg.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && act === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, n, onClose, onGo])

  return createPortal(
    <div className="pb-modal" onClick={onClose}>
      <div
        className="pb-dialog"
        ref={dlg}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pb-dlg-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-dh">
          <div className="pb-dh-text" key={index}>
            <span className="pb-kick">Publication {index + 1} of {n}</span>
            <h2 id="pb-dlg-title">{p.title}</h2>
          </div>
          <button type="button" className="pb-x" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>

        <div className="pb-body" ref={body} tabIndex={0}>
          <div className="pb-bin" key={index}>
            <span className="pb-label"><DocIcon />{p.label}</span>
            <div className="pb-abs">
              {p.paragraphs.map((para, k) => (
                <p key={k} style={{ '--k': k }}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-df">
          <button type="button" className="pb-nav" onClick={() => onGo((index - 1 + n) % n)} aria-label="Previous publication">
            <Chevron dir="l" /><span>Previous</span>
          </button>
          <span className="pb-prog" aria-hidden="true">
            <span style={{ transform: `scaleX(${(index + 1) / n})` }} />
          </span>
          <button type="button" className="pb-nav" onClick={() => onGo((index + 1) % n)} aria-label="Next publication">
            <span>Next</span><Chevron dir="r" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ---------------------------------------------------------------
   Page
--------------------------------------------------------------- */
export default function Publications() {
  const [open, setOpen] = useState(null)
  const grid = useRef(null)
  const restore = useRef(null)

  const go = useCallback((i) => setOpen(i), [])
  const close = useCallback(() => setOpen(null), [])

  /* cards rise in one by one as they scroll into view
     (own observer; shows everything straight away for reduced motion) */
  useLayoutEffect(() => {
    const el = grid.current
    if (!el) return undefined
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return undefined
    el.dataset.armed = '1'
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    )
    el.querySelectorAll('.pb-card').forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section className="pb-page" aria-labelledby="pb-h">
      <div className="shell">
        <div className="vt-bar">
          <div className="pb-head">
            <h1 id="pb-h">Research <span className="rp-accent">Papers</span></h1>
          </div>
          <LibraryToggle current="publications" />
        </div>

        <ul className="pb-grid" ref={grid}>
          {PUBS.map((p, i) => (
            <li className="pb-item" key={p.id}>
              <article className="pb-card" style={{ '--c': i % 3 }}>
                <div className="pb-top">
                  <span className="pb-ico"><DocIcon /></span>
                  {/* <span className="pb-chip">{p.label}</span> */}
                </div>
                <h3 className="pb-ct">{p.title}</h3>
                <p className="pb-brief">{p.paragraphs[0]}</p>
                <button
                  type="button"
                  className="pb-btn"
                  aria-haspopup="dialog"
                  aria-label={'Read full abstract: ' + p.title}
                  onClick={(e) => {
                    restore.current = e.currentTarget
                    setOpen(i)
                  }}
                >
                  Read full abstract <Arrow />
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && <PubModal index={open} onClose={close} onGo={go} restore={restore} />}
    </section>
  )
}