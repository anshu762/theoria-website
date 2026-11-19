import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* Content copied from your text (tagline = the first line, body = the explanation) */
const ITEMS = [
  {
    id: 'novel-topic',
    title: 'Novel Research Topic',
    tagline: 'Not just choosing a research topic. Discovering something worth investigating.',
    body: [
      'We help students move beyond familiar, over-explored topics to identify genuinely novel questions, unexplored problems or fresh approaches to existing challenges.',
      'This involves examining existing research, identifying knowledge gaps, questioning assumptions and exploring intersections between disciplines.',
    ],
    helps:
      'Their work begins with a stronger intellectual proposition—one that can demonstrate originality, curiosity and independent thinking rather than simply repeat what is already known.',
    showcase:
      'A Research Novelty Assessment illustrating how a broad interest becomes a specific, evidence-backed research question.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    id: 'mentorship',
    title: '1:1 Mentorship with Researchers',
    tagline: 'The right research expertise, matched to the student and their individual research interests.',
    body: [
      'Our researchers bring advanced expertise across diverse fields. We match each student with 1:1 mentor based on their specific interests, research question, required techniques and potential interdisciplinary connections—not simply their intended university major.',
      'Every student then follows a project-specific research journey, with research questions, methodologies, milestones and feedback tailored to their academic readiness and the demands of the investigation.',
    ],
    example:
      'For example, a student interested in AI applications in healthcare may benefit from a researcher specializing in machine learning, computational biology or biomedical data analysis, depending on the nature of their research question.',
    helps:
      'Students receive sustained intellectual guidance from a researcher equipped to challenge and advance their ideas. Through individualized mentorship, they develop research independence, strengthen their analytical thinking and build the confidence to explain and defend their work.',
    showcase:
      "A Researcher–Student Matching Profile highlighting the mentor's field expertise, relevant publications and suitability for the project, alongside a Student Research Plan outlining project milestones, progress and examples of mentor feedback.",
    icon: (
      <>
        <path d="M22 9 12 4 2 9l10 5 10-5Z" />
        <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
        <path d="M22 9v6" />
      </>
    ),
  },
  {
    id: 'methodologies',
    title: 'Advanced Methodologies & Techniques',
    tagline: 'Beyond reading papers. Towards serious investigation.',
    body: [
      'Theoria students learn to use methods appropriate to their research questions. Depending on the field and project, these may include computational modelling, simulations, statistical analysis, experimental design, machine learning, econometric techniques, data analysis, prototyping and other advanced approaches.',
      'The emphasis is not on using sophisticated techniques for appearance. It is on choosing methods that produce credible evidence and meaningful findings.',
    ],
    helps:
      'Students gain practical exposure to advanced academic techniques, develop deeper technical capabilities and learn how researchers investigate complex questions.',
    showcase:
      'Actual simulation outputs, analytical models, experimental results, code or technical diagrams from student projects.',
    icon: (
      <>
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
  },
  {
    id: 'lor',
    title: 'Mentor-Endorsed LOR',
    tagline: 'An additional academic endorsement that strengthens undergraduate applications.',
    body: [
      'Every student receives a Letter of Recommendation from their research mentor, highlighting their intellectual curiosity, research capabilities, initiative and contributions throughout the project.',
      "A recommendation from a researcher affiliated with the student's dream university adds further credibility and relevance, offering admissions committees an independent perspective on the student's ability to engage with rigorous academic work.",
    ],
    helps:
      'Adds a research-specific recommendation to their existing LORs, demonstrating academic potential, genuine research experience and the ability to work at an advanced academic level.',
    showcase:
      "A Mentor's Letter of Recommendation highlighting the student's research contributions, capabilities and the mentor's academic credentials and institutional affiliation.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    id: 'publication',
    title: 'Publication & Scholarly Recognition',
    tagline: 'Research that is developed for serious academic consideration.',
    body: [
      'We support students in transforming original investigations into academically credible manuscripts and identifying appropriate journals, conferences or other scholarly platforms.',
      'Our approach includes manuscript development, academic review, publication strategy, submission preparation and defined revision support.',
    ],
    helps:
      'Students experience professional scholarly standards and have opportunities for independent review, publication and academic recognition.',
    showcase:
      'Verified publications, conference presentations, manuscript-review examples and publication progress trackers.',
    icon: (
      <>
        <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2Z" />
        <path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7Z" />
      </>
    ),
  },
  {
    id: 'competitions',
    title: 'International Competition Readiness',
    tagline: 'Beyond publication. Towards international distinction.',
    body: [
      'Theoria helps students identify and prepare for relevant research competitions, selective research programs, innovation challenges and international awards.',
      'Preparation is aligned with the actual requirements of opportunities such as IRIS/Regeneron ISEF, RSI and suitable international innovation competitions.',
    ],
    helps:
      'Students can pursue recognition beyond their school, test their work against demanding standards and develop the confidence to compete with exceptional peers.',
    showcase:
      'An International Recognition Plan and Competition Readiness Tracker showing opportunities, eligibility, preparation requirements and milestones.',
    icon: (
      <>
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
        <path d="M7 6H4v1a3 3 0 0 0 3 3" />
        <path d="M17 6h3v1a3 3 0 0 1-3 3" />
      </>
    ),
  },
  {
    id: 'narrative',
    title: 'Research-Led University Application Narrative',
    tagline: 'Turning genuine academic work into a compelling intellectual story.',
    body: [
      'Original research can provide evidence of what genuinely interests a student, how they think, what they have investigated and how they respond to intellectual challenges.',
      'Theoria helps students understand and articulate their research journey for university applications, including academic essays, research supplements and interviews where relevant.',
      'The UniVisory connection adds valuable experience in understanding selective university application expectations.',
    ],
    helps:
      'Their application can move beyond statements such as “I am passionate about economics” or “I love biology” to demonstrate what they have actually explored, discovered and contributed.',
    showcase:
      "An anonymised Research-to-Application Narrative illustrating how a student's research experience translates into evidence of academic interest, initiative and intellectual growth.",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </>
    ),
  },
  {
    id: 'innovation',
    title: 'From Original Research to Innovation',
    tagline: 'Research is the beginning, real-world innovation is the next step.',
    body: ['Theoria takes students through two connected phases:'],
    phases: [
      {
        tag: 'PHASE I',
        title: 'Original Research',
        text: 'Investigate a novel question, apply rigorous methodology and establish meaningful findings.',
      },
      {
        tag: 'PHASE II',
        title: 'Advanced Real-World Project',
        text: 'Translate findings into a substantial application, model, prototype or solution, followed by testing and validation.',
      },
    ],
    helps:
      'They develop two complementary capabilities—generating new knowledge and applying that knowledge to solve meaningful problems. This can create a distinctive portfolio of both research and tangible achievement.',
    showcase:
      'A Fellowship case study showing the original research, subsequent advanced project, testing results and final outputs.',
    icon: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      </>
    ),
  },
]

const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

/* reveal on scroll (self-contained) */
function useReveal() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

/* ---------------------------------------------------------------
   Detail popup
--------------------------------------------------------------- */
function Modal({ index, onNav, onClose }) {
  const [leaving, setLeaving] = useState(false)
  const dlgRef = useRef(null)
  const closeRef = useRef(null)
  const timer = useRef(0)
  const keyRef = useRef(null)

  const total = ITEMS.length
  const it = ITEMS[index]
  const prev = ITEMS[(index - 1 + total) % total]
  const next = ITEMS[(index + 1) % total]

  const requestClose = () => {
    if (timer.current) return
    setLeaving(true)
    timer.current = window.setTimeout(onClose, 220)
  }
  const go = (n) => {
    if (timer.current) return
    onNav((n + total) % total)
  }

  /* keyboard: Esc closes, arrows navigate, Tab stays inside the popup */
  keyRef.current = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      requestClose()
      return
    }
    if (e.key === 'ArrowRight') {
      go(index + 1)
      return
    }
    if (e.key === 'ArrowLeft') {
      go(index - 1)
      return
    }
    if (e.key !== 'Tab') return
    const dlg = dlgRef.current
    if (!dlg) return
    const nodes = dlg.querySelectorAll('button:not([disabled])')
    if (!nodes.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    const act = document.activeElement
    if (!dlg.contains(act) || act === dlg) {
      e.preventDefault()
      ;(e.shiftKey ? last : first).focus()
    } else if (e.shiftKey && act === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && act === last) {
      e.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    const h = (e) => keyRef.current && keyRef.current(e)
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  /* lock page scroll while open */
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const old = {
      ho: html.style.overflow,
      bo: body.style.overflow,
      bp: body.style.paddingRight,
    }
    const sw = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (sw > 0) body.style.paddingRight = sw + 'px'
    return () => {
      html.style.overflow = old.ho
      body.style.overflow = old.bo
      body.style.paddingRight = old.bp
    }
  }, [])

  /* focus the close button on open; clear the timer on unmount */
  useEffect(() => {
    if (closeRef.current) closeRef.current.focus({ preventScroll: true })
    return () => window.clearTimeout(timer.current)
  }, [])

  let n = 0
  const step = () => ({ '--i': n++ })

  return (
    <div
      className={'ud-modal' + (leaving ? ' is-leaving' : '')}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose()
      }}
    >
      <div className="ud-dialog" role="dialog" aria-modal="true" aria-labelledby="ud-m-title" tabIndex={-1} ref={dlgRef}>
        <div className="ud-mh">
          <span className="ud-mico"><Svg>{it.icon}</Svg></span>
          <div className="ud-mh-t">
            <p className="ud-kicker">Differentiator {index + 1} of {total}</p>
            <h2 className="ud-mtitle" id="ud-m-title">{it.title}</h2>
          </div>
          <button type="button" className="ud-x" ref={closeRef} onClick={requestClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="ud-scroll" key={index}>
          <p className="ud-tag" style={step()}>{it.tagline}</p>

          {it.body.map((t) => (
            <p className="ud-p" style={step()} key={t}>{t}</p>
          ))}

          {it.example && <p className="ud-eg" style={step()}>{it.example}</p>}

          {it.phases && (
            <div className="ud-phases" style={step()}>
              <div className="ud-phase">
                <span className="ud-phase-tag">{it.phases[0].tag}</span>
                <h4>{it.phases[0].title}</h4>
                <p>{it.phases[0].text}</p>
              </div>
              <span className="ud-phase-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <div className="ud-phase">
                <span className="ud-phase-tag">{it.phases[1].tag}</span>
                <h4>{it.phases[1].title}</h4>
                <p>{it.phases[1].text}</p>
              </div>
            </div>
          )}

          <div className="ud-cols" style={step()}>
            <div className="ud-box ud-box-help">
              <div className="ud-box-h">
                <span className="ud-box-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M7.8 12.4l3 3 5.4-6" />
                  </svg>
                </span>
                <h3>How it helps the student</h3>
              </div>
              <p>{it.helps}</p>
            </div>
            <div className="ud-box ud-box-show">
              <div className="ud-box-h">
                <span className="ud-box-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <h3>What we showcase</h3>
              </div>
              <p>{it.showcase}</p>
            </div>
          </div>
        </div>

        <div className="ud-mf">
          <button type="button" className="ud-nav" onClick={() => go(index - 1)} aria-label={'Previous: ' + prev.title}>
            <span className="ud-nav-arr" aria-hidden="true">←</span>
            <span className="ud-nav-t"><small>Previous</small><b>{prev.title}</b></span>
          </button>

          <div className="ud-dots" role="group" aria-label="Choose a differentiator">
            {ITEMS.map((x, i) => (
              <button
                type="button"
                key={x.id}
                className={'ud-dot' + (i === index ? ' is-on' : '')}
                aria-label={'Go to ' + x.title}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <button type="button" className="ud-nav ud-nav-next" onClick={() => go(index + 1)} aria-label={'Next: ' + next.title}>
            <span className="ud-nav-arr" aria-hidden="true">→</span>
            <span className="ud-nav-t"><small>Next</small><b>{next.title}</b></span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   Section
--------------------------------------------------------------- */
export default function UniqueThings() {
  const [ref, seen] = useReveal()
  const [openIdx, setOpenIdx] = useState(null)
  const openerRef = useRef(null)

  const closeModal = useCallback(() => {
    setOpenIdx(null)
    const el = openerRef.current
    if (el && el.focus) el.focus({ preventScroll: true })
  }, [])

  return (
    <section ref={ref} className={`uq-section${seen ? ' is-in' : ''}`} aria-labelledby="uq-title">
      <div className="shell">
        <div className="uq-head">
          <h2 id="uq-title">What makes us <span className="uq-accent">unique</span>?</h2>
        </div>

        <ul className="uq-grid ud-grid" role="list">
          {ITEMS.map((it, i) => (
            <li key={it.id} className="uq-item" style={{ '--i': i }}>
              <article className="ud-card">
                <span className="ud-bar" aria-hidden="true" />
                <span className="ud-ico"><Svg>{it.icon}</Svg></span>
                <h3 className="ud-title">{it.title}</h3>
                <p className="ud-text">{it.tagline}</p>
                <button
                  type="button"
                  className="ud-more"
                  aria-haspopup="dialog"
                  aria-label={'View details: ' + it.title}
                  onClick={(e) => {
                    openerRef.current = e.currentTarget
                    setOpenIdx(i)
                  }}
                >
                  <span>View details</span>
                  <span className="ud-more-arr" aria-hidden="true">→</span>
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {openIdx !== null &&
        createPortal(<Modal index={openIdx} onNav={setOpenIdx} onClose={closeModal} />, document.body)}
    </section>
  )
}