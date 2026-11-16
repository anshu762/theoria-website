import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import LibraryShell from '../components/LibraryShell'

const d = (ms) => ({ '--d': ms + 'ms' })
const IMG = (file) => `${import.meta.env.BASE_URL}projects/${file}`

/* ───────── PROJECT DATA (edit text / image names here) ───────── */
const PROJECTS = [
  {
    id: 'shape-morphing-wing',
    no: '01',
    title: 'Shape morphing wing',
    image: IMG('shape-morphing-wing.png'),
    alt: 'Fusion 360 model of the sectioned shape morphing wing',
    pos: '50% 50%',
    brief:
      'A 3D sectioned wing model that morphs its shape, leaner for take-off and cruising and thicker for landing, to reduce overall fuel consumption.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Commercial aircrafts burns a lot of fuel in a single flight, significant amount of fuel gets consumed while take off (20%). Due to rigid wing design a lot of fuel gets wasted in order to overcome air-drag.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'We build a 3D sectioned model of a wing that can morph its shape (gets leaner while taking off and cruising) and thicker while landing in order to reduce the overall consumption of the fuel.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          "The Flaps and the structural shape of the wing was designed in way that there's no open gaps between the wings and the flap, resulting in a significant amount of turbulence reduction hence the increased overall efficiency. Simulations were also done to justify the claim.",
        ],
      },
      { label: 'Competition', chips: ['IRIS'] },
    ],
  },
  {
    id: 'tactic',
    no: '02',
    title: 'TACTIC: Electronics kit for visually impaired',
    image: IMG('tactic-kit.png'),
    alt: 'TACTIC tactile circuit teaching kit: power supply, component blocks, analyzer module and circuit examples',
    pos: '50% 50%',
    brief:
      'A modular kit of tactile, puzzle-like blocks with an ESP32-based analyzer that gives real-time audio feedback, so blind students can learn electronics independently.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Blind students face significant difficulty learning practical electronics because conventional kits rely heavily on visual identification, wiring diagrams, and colour-coded components. There is a need for a hands-on, tactile and audio-guided electronics learning system that allows them to learn independently.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'We are developing a modular electronics kit using tactile, puzzle-like blocks that can be physically connected to build circuits.',
          'An ESP32-based analyzer detects the selected components/voltage and provides real-time audio feedback, making the learning process accessible to blind students.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'The system combines tactile circuit construction, electronic identification, automated analysis and embedded voice feedback in a single educational platform.',
          'Students can learn electronics through touch, physical interaction and audio instead of depending on visual instructions.',
        ],
      },
      {
        label: 'Competitions to apply for',
        paras: [
          'IRIS National Fair — primary target for the student innovation/research project.',
          'If the project qualifies through the appropriate pathway, Regeneron ISEF can be a longer-term international target; other suitable student innovation competitions can also be considered.',
        ],
      },
    ],
  },
  {
    id: 'leprosy-glove',
    no: '03',
    title: 'Glove for leprosy patients',
    image: IMG('leprosy-glove.png'),
    alt: 'Wearable glove with ESP32, vibration motor, buzzer and FSR pressure sensors',
    pos: '50% 50%',
    brief:
      'A low-cost wearable with pressure sensors and an ESP32 that alerts leprosy patients with vibration or sound when potentially harmful pressure is detected.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Leprosy can cause loss of protective sensation in the hands, making patients unaware of excessive pressure, squeezing, or minor injuries. Repeated unnoticed pressure can lead to wounds and serious complications.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'A low-cost wearable device using pressure sensors and ESP32 continuously monitors pressure on vulnerable areas of the hand. When potentially harmful pressure is detected, it provides an immediate vibration and/or audible alert.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'Instead of measuring pressure merely as a value, the system considers pressure intensity and duration to identify potentially harmful exposure. Its modular, low-cost design can be adapted into a glove or finger-worn device.',
        ],
      },
      {
        label: 'Competitions to apply for',
        paras: [
          'INSPIRE-MANAK • CBSE National Science Exhibition • IRIS National Fair • Anveshana • Conrad Challenge — with potential for higher-level health-tech and assistive-technology competitions as the prototype and validation mature.',
        ],
      },
    ],
  },
]
/* ──────────────────────────────────────────────────────────────── */

/* image with a tidy placeholder if the file is missing */
function Pic({ src, alt, pos }) {
  const [bad, setBad] = useState(false)
  if (bad) {
    return (
      <div className="pj-ph" role="img" aria-label={alt}>
        <span>Image coming soon</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      style={pos ? { objectPosition: pos } : undefined}
      loading="lazy"
      decoding="async"
      onError={() => setBad(true)}
    />
  )
}

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

/* ───────────────────────── popup ───────────────────────── */
function ProjectModal({ index, onChange, onClose }) {
  const [closing, setClosing] = useState(false)
  const dlgRef = useRef(null)
  const bodyRef = useRef(null)
  const progRef = useRef(null)
  const closeRef = useRef(null)
  const timer = useRef(null)
  const p = PROJECTS[index]
  const total = PROJECTS.length

  const requestClose = useCallback(() => {
    if (timer.current) return
    setClosing(true)
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = setTimeout(onClose, reduce ? 0 : 220)
  }, [onClose])

  const go = useCallback((n) => onChange((index + n + total) % total), [index, onChange, total])

  /* lock page scroll (no layout jump) + focus the close button */
  useEffect(() => {
    const html = document.documentElement
    const prev = { o: html.style.overflow, g: html.style.scrollbarGutter }
    html.style.overflow = 'hidden'
    html.style.scrollbarGutter = 'stable'
    closeRef.current && closeRef.current.focus({ preventScroll: true })
    return () => {
      html.style.overflow = prev.o
      html.style.scrollbarGutter = prev.g
      clearTimeout(timer.current)
    }
  }, [])

  /* Esc closes, arrows switch project, Tab stays inside the popup */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); requestClose(); return }
      if (e.key === 'ArrowLeft' && !e.altKey && !e.ctrlKey && !e.metaKey) { go(-1); return }
      if (e.key === 'ArrowRight' && !e.altKey && !e.ctrlKey && !e.metaKey) { go(1); return }
      if (e.key !== 'Tab' || !dlgRef.current) return
      const f = dlgRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [requestClose, go])

  /* new project -> scroll back to the top */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    if (progRef.current) progRef.current.style.transform = 'scaleX(0)'
  }, [index])

  const onScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    if (progRef.current) progRef.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`
  }

  return createPortal(
    <div className={'pj-modal' + (closing ? ' is-closing' : '')}>
      <div className="pj-modal-bg" onClick={requestClose} />

      <div className="pj-dlg" role="dialog" aria-modal="true" aria-labelledby="pj-dlg-title" ref={dlgRef}>
        <div className="pj-dlg-head">
          <span className="pj-dlg-no" aria-hidden="true">{p.no}</span>
          <div className="pj-dlg-ttl">
            <span className="pj-dlg-kicker">Research project {index + 1} of {total}</span>
            <h3 id="pj-dlg-title">{p.title}</h3>
          </div>
          <button type="button" className="pj-x" ref={closeRef} onClick={requestClose} aria-label="Close project details">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <span className="pj-prog" ref={progRef} aria-hidden="true" />
        </div>

        <div className="pj-dlg-body" ref={bodyRef} onScroll={onScroll}>
          <div className="pj-content" key={p.id}>
            <div className="pj-hero" style={{ '--i': 0 }}>
              <Pic src={p.image} alt={p.alt} />
            </div>

            <div className="pj-secs">
              {p.sections.map((s, i) => (
                <section className="pj-sec" key={s.label} style={{ '--i': i + 1 }}>
                  {/* <span className="pj-sec-no" aria-hidden="true">{i + 1}</span> */}
                  <div className="pj-sec-main">
                    <h4>{s.label}</h4>
                    {s.chips && (
                      <div className="pj-chips">
                        {s.chips.map((c) => <span className="pj-chip" key={c}>{c}</span>)}
                      </div>
                    )}
                    {s.paras && s.paras.map((t, k) => <p key={k}>{t}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="pj-dlg-foot">
          <button type="button" className="pj-nav" onClick={() => go(-1)} aria-label="Previous project">
            <Arrow dir="left" /><span className="pj-lbl">Previous</span>
          </button>
          <span className="pj-count" aria-hidden="true">{index + 1} / {total}</span>
          <button type="button" className="pj-nav" onClick={() => go(1)} aria-label="Next project">
            <span className="pj-lbl">Next</span><Arrow dir="right" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ───────────────────────── page ───────────────────────── */
export default function Projects() {
  const [active, setActive] = useState(null)
  const trigger = useRef(null)

  const openModal = (i, e) => { trigger.current = e.currentTarget; setActive(i) }
  const closeModal = useCallback(() => {
    setActive(null)
    requestAnimationFrame(() => trigger.current && trigger.current.focus({ preventScroll: true }))
  }, [])

  return (
    <LibraryShell title="Research" accent="projects.">
      <ul className="pj-grid">
        {PROJECTS.map((p, i) => (
          <li className="rv" key={p.id} style={d(i * 110)}>
            <article className="pj-card">
              <div className="pj-thumb">
                <Pic src={p.image} alt={p.alt} pos={p.pos} />
                <span className="pj-badge">Project {p.no}</span>
              </div>
              <div className="pj-card-body">
                <h3>{p.title}</h3>
                <p>{p.brief}</p>
                <button
                  type="button"
                  className="pj-more"
                  onClick={(e) => openModal(i, e)}
                  aria-haspopup="dialog"
                  aria-label={`View more about ${p.title}`}
                >
                  <span>View more</span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </i>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {active !== null && (
        <ProjectModal index={active} onChange={setActive} onClose={closeModal} />
      )}
    </LibraryShell>
  )
}