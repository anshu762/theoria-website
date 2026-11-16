import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ---------------------------------------------------------------
   PAPER GLIMPSE (text shown on the tilted paper in the hero)
   title      = paper title
   author     = author line
   heading    = small bold heading
   paragraphs = array of paragraphs (the page fades out at the bottom)
   The full image (paper:) still opens in the viewer when clicked.
--------------------------------------------------------------- */
const GLIMPSE_1 = {
  title:
    'Combinatorial Coverage Guarantees for Resilient Emergency Shelter Placement: Turán-Inspired Extremal Bounds on Maximum Independent Dominating Sets in Unit-Disk Graphs',
  author: 'Vedansh Saha',
  heading: 'Executive Summary',
  paragraphs: [
    <>
      This manuscript addresses the critical challenge of optimizing emergency shelter placement in the
      context of India’s diverse and hazard-prone landscape. By modeling shelter locations and population
      centers as nodes in a Unit-Disk Graph (UDG), we investigate the theoretical and practical
      implications of utilizing Independent Dominating Sets (IDS) to ensure maximum coverage with minimum
      resource redundancy. We derive and analyze extremal bounds inspired by Turán-style theory,
      specifically examining the proven relation{' '}
      <span className="rp-hl">
        <i>α</i>(<i>G</i>) ≤ 3.399 · <i>γ</i><sub>c</sub>(<i>G</i>) + 4.874
      </span>{' '}
      for unit-disk graphs, where <i>α</i>(<i>G</i>) represents the independence number and{' '}
      <i>γ</i><sub>c</sub>(<i>G</i>) the connected domination number.
    </>,
    <>
      A Greedy Independent Dominating Set (GIDS) algorithm is proposed and implemented in Python,
      leveraging spatial indexing via KD-Trees for scalability. Experimental results demonstrate that the
      algorithm achieves <span className="rp-hl">100% coverage</span> in both clustered (urban) and sparse
      (rural) density scenarios, while maintaining strict independence constraints to prevent facility
      clustering. Finally, we contextualize these findings within the Indian administrative and disaster
      management framework, utilizing datasets from WorldPop, the Census of India, and the IMD Hazard Atlas
      to propose a resilient, data-driven approach to facility location.
    </>,
  ],
}

/* ---------------------------------------------------------------
   EDIT HERE: one object per slide.
   paper    = research paper image   (file inside /public, opens in the viewer)
   glimpse  = text preview drawn on the paper (see GLIMPSE_1 above).
              Remove this line to show the plain image instead.
   photo    = student photo          (file inside /public)
   student  = student name (used for alt text / tooltip / fallback initials)
   school   = university name        (shown in the profile box, bold)
   grade    = class                  (shown under the university name)
   tag      = (optional) two lines for the green tag on the paper
--------------------------------------------------------------- */
const PAPERS = [
  {
    id: 'p1',
    paper: '/research/paper-1.jpeg',
    glimpse: GLIMPSE_1,
    title: 'Combinatorial Coverage Guarantees for Resilient Emergency Shelter Placement',
    field: 'Graph Theory · Disaster Planning',
    student: 'Aditi Sharma',
    school: 'Duke University',
    grade: 'Class 12',
    photo: '/students/pranet-k.png',
  },
  {
    id: 'p2',
    paper: '/research/paper-1.jpeg',
    glimpse: GLIMPSE_1, // placeholder: replace with your second paper's glimpse
    title: 'Replace with your second paper title',
    field: 'Your Field · Your Topic',
    student: 'Student Name',
    school: 'Duke University',
    grade: 'Class 11',
    photo: '/students/pranet-k.png',
  },
  {
    id: 'p3',
    paper: '/research/paper-1.jpeg',
    glimpse: GLIMPSE_1, // placeholder: replace with your third paper's glimpse
    title: 'Replace with your third paper title',
    field: 'Your Field · Your Topic',
    student: 'Student Name',
    school: 'Duke University',
    grade: 'Class 12',
    photo: '/students/pranet-k.png',
  },
]

const TAGLINE = ['Guided by expertise.', 'Built through inquiry.'] // default green tag text
const INTERVAL = 6500 // ms per slide

const pad = (x) => String(x).padStart(2, '0')
const initials = (name) =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/* ---------- small inline icons ---------- */
const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'l' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)
const Expand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)
const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
const Spark = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0C12.8 7.5 16.5 11.2 24 12C16.5 12.8 12.8 16.5 12 24C11.2 16.5 7.5 12.8 0 12C7.5 11.2 11.2 7.5 12 0Z" />
  </svg>
)

/* student photo with initials fallback */
function Photo({ src, name }) {
  const [bad, setBad] = useState(false)
  if (bad || !src) return <span className="rp-mono">{initials(name)}</span>
  return <img src={src} alt={name} draggable="false" onError={() => setBad(true)} />
}

/* the paper's first page, drawn as real text (spans only: it lives inside a button) */
function Doc({ g }) {
  return (
    <span className="rp-doc" aria-hidden="true">
      <span className="rp-doc-title">{g.title}</span>
      <span className="rp-doc-author"><sup>[1]</sup> {g.author}</span>
      <span className="rp-doc-head">{g.heading}</span>
      {g.paragraphs.map((para, k) => (
        <span className="rp-doc-p" key={k}>{para}</span>
      ))}
    </span>
  )
}

export default function HeroPapers() {
  const n = PAPERS.length
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState(null)
  const [dir, setDir] = useState(1)
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  const curRef = useRef(0)
  const timer = useRef(0)
  const drag = useRef({ x: 0, y: 0, on: false, moved: false })
  const closeBtn = useRef(null)
  const lastFocus = useRef(null)

  const go = useCallback(
    (to, d) => {
      const target = ((to % n) + n) % n
      if (target === curRef.current) return
      const direction = d ?? (target > curRef.current ? 1 : -1)
      setDir(direction)
      setPrev(curRef.current)
      setCur(target)
      curRef.current = target
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setPrev(null), 950)
    },
    [n]
  )
  const next = useCallback(() => go(curRef.current + 1, 1), [go])
  const back = useCallback(() => go(curRef.current - 1, -1), [go])

  useEffect(() => () => clearTimeout(timer.current), [])

  /* pause autoplay while the tab is hidden */
  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /* viewer: scroll lock, focus, keyboard */
  useEffect(() => {
    if (!open) return
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') back()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = old
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [open, next, back])

  const openViewer = (e) => {
    lastFocus.current = e.currentTarget
    setOpen(true)
  }

  /* swipe */
  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, on: true, moved: false }
  }
  const onUp = (e) => {
    const d = drag.current
    if (!d.on) return
    d.on = false
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      d.moved = true
      dx < 0 ? next() : back()
    }
  }
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      drag.current.moved = false
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const onKeyDown = (e) => {
    if (open || n < 2) return
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') back()
  }

  const paused = hover || focus || hidden || open
  const now = PAPERS[cur]
  const slides = [prev, cur].filter((i) => i !== null)

  return (
    <div
      className="rp"
      data-paused={paused}
      style={{ '--rp-dir': dir, '--rp-time': INTERVAL + 'ms' }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student research papers"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
      onFocus={(e) => {
        try { if (e.target.matches(':focus-visible')) setFocus(true) } catch { /* ignore */ }
      }}
      onBlur={() => setFocus(false)}
    >
      {/* ---------- stage ---------- */}
      <div
        className="rp-stage"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current.on = false)}
        onClickCapture={onClickCapture}
      >
        {/* ambient background: blob, orbit ring, sparkles */}
        <div className="rp-bg" aria-hidden="true">
          <span className="rp-blob" />
          <svg className="rp-orbit" viewBox="0 0 400 200" fill="none">
            <ellipse cx="200" cy="100" rx="190" ry="92" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
            <ellipse cx="200" cy="100" rx="150" ry="62" stroke="currentColor" strokeWidth="1" opacity=".4" transform="rotate(34 200 100)" vectorEffect="non-scaling-stroke" />
            <circle className="rp-orbit-dot" r="4" fill="currentColor">
              <animateMotion dur="16s" repeatCount="indefinite" path="M10,100 A190,92 0 1,1 390,100 A190,92 0 1,1 10,100" />
            </circle>
          </svg>
          <Spark className="rp-sp rp-s1" />
          <Spark className="rp-sp rp-s2" />
          <Spark className="rp-sp rp-s3" />
        </div>

        {slides.map((i) => {
          const p = PAPERS[i]
          const active = i === cur
          const lines = p.tag ?? TAGLINE
          return (
            <div
              key={p.id}
              className={'rp-slide ' + (active ? 'is-active' : 'is-leaving')}
              aria-hidden={!active}
            >
              <div className="rp-pw">
                <div className="rp-tilt">
                  <button
                    type="button"
                    className="rp-paper"
                    onClick={openViewer}
                    tabIndex={active ? 0 : -1}
                    aria-label={'View research paper: ' + p.title}
                  >
                    <span className="rp-sheet">
                      {p.glimpse ? (
                        <Doc g={p.glimpse} />
                      ) : (
                        <img src={p.paper} alt={'Research paper: ' + p.title} draggable="false" />
                      )}
                      <span className="rp-shine" />
                    </span>
                    <span className="rp-zoom" aria-hidden="true"><Expand /></span>
                  </button>

                  {/* <div className="rp-tag">
                    {lines.map((l) => <span key={l}>{l}</span>)}
                  </div> */}
                </div>
              </div>

              {/* student profile box: photo left, university + class right */}
              <div className="rp-pill" title={p.student}>
                <span className="rp-av"><Photo src={p.photo} name={p.student} /></span>
                <span className="rp-who">
                  <strong className="rp-school">{p.school}</strong>
                  <span className="rp-class">{p.grade}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------- controls ---------- */}
      {n > 1 && (
        <div className="rp-controls">
          <div className="rp-dots">
            {PAPERS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={'rp-dot' + (i === cur ? ' is-on' : '')}
                onClick={() => go(i)}
                aria-label={`Show paper ${i + 1} of ${n}`}
                aria-current={i === cur ? 'true' : undefined}
              >
                <span className="rp-dot-track">
                  <span
                    className="rp-fill"
                    onAnimationEnd={i === cur ? (e) => e.animationName === 'rp-progress' && next() : undefined}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="rp-right">
            <div className="rp-btns">
              <button type="button" className="rp-btn" onClick={back} aria-label="Previous paper"><Chevron dir="l" /></button>
              <button type="button" className="rp-btn" onClick={next} aria-label="Next paper"><Chevron dir="r" /></button>
            </div>
          </div>
        </div>
      )}

      <span className="rp-sr" aria-live="polite">
        {`Paper ${cur + 1} of ${n}: ${now.title}, by ${now.student}, ${now.grade}, ${now.school}`}
      </span>

      {/* ---------- full-size viewer ---------- */}
      {open && typeof document !== 'undefined' &&
        createPortal(
          <div className="rp-lb" role="dialog" aria-modal="true" aria-label="Research paper viewer" onClick={() => setOpen(false)}>
            <div className="rp-lb-card" onClick={(e) => e.stopPropagation()}>
              <div className="rp-lb-scroll">
                <img src={now.paper} alt={'Research paper: ' + now.title} />
              </div>
              <div className="rp-lb-cap">
                <strong>{now.title}</strong>
                <span>{now.student} · {now.grade} · {now.school}</span>
              </div>
            </div>

            <button ref={closeBtn} type="button" className="rp-lb-x" onClick={() => setOpen(false)} aria-label="Close viewer">
              <Close />
            </button>
            {n > 1 && (
              <>
                <button type="button" className="rp-lb-nav rp-lb-prev" onClick={(e) => { e.stopPropagation(); back() }} aria-label="Previous paper"><Chevron dir="l" /></button>
                <button type="button" className="rp-lb-nav rp-lb-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next paper"><Chevron dir="r" /></button>
              </>
            )}
          </div>,
          document.body
        )}
    </div>
  )
}

















// import { useCallback, useEffect, useRef, useState } from 'react'
// import { createPortal } from 'react-dom'

// /* ---------------------------------------------------------------
//    EDIT HERE: one object per slide.
//    paper   = research paper image   (file inside /public)
//    photo   = student photo          (file inside /public)
//    student = student name (used for alt text / tooltip / fallback initials)
//    school  = university name        (shown in the profile box, bold)
//    grade   = class                  (shown under the university name)
//    tag     = (optional) two lines for the green tag on the paper
// --------------------------------------------------------------- */
// const PAPERS = [
//   {
//     id: 'p1',
//     paper: '/research/paper-1.jpeg',
//     title: 'Combinatorial Coverage Guarantees for Resilient Emergency Shelter Placement',
//     field: 'Graph Theory · Disaster Planning',
//     student: 'Aditi Sharma',
//     school: 'Your University Name',
//     grade: 'Class 12',
//     photo: '/students/pranet-k.png',
//   },
//   {
//     id: 'p2',
//     paper: '/research/paper-1.jpeg',
//     title: 'Replace with your second paper title',
//     field: 'Your Field · Your Topic',
//     student: 'Student Name',
//     school: 'Your University Name',
//     grade: 'Class 11',
//     photo: '/students/pranet-k.png',
//   },
//   {
//     id: 'p3',
//     paper: '/research/paper-1.jpeg',
//     title: 'Replace with your third paper title',
//     field: 'Your Field · Your Topic',
//     student: 'Student Name',
//     school: 'Your University Name',
//     grade: 'Class 12',
//     photo: '/students/pranet-k.png',
//   },
// ]

// const TAGLINE = ['Guided by expertise.', 'Built through inquiry.'] // default green tag text
// const INTERVAL = 6500 // ms per slide

// const pad = (x) => String(x).padStart(2, '0')
// const initials = (name) =>
//   name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

// /* ---------- small inline icons ---------- */
// const Chevron = ({ dir }) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//     <path d={dir === 'l' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
//   </svg>
// )
// const Expand = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//     <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//   </svg>
// )
// const Close = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
//     <path d="M6 6l12 12M18 6L6 18" />
//   </svg>
// )
// const Spark = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
//     <path fill="currentColor" d="M12 0C12.8 7.5 16.5 11.2 24 12C16.5 12.8 12.8 16.5 12 24C11.2 16.5 7.5 12.8 0 12C7.5 11.2 11.2 7.5 12 0Z" />
//   </svg>
// )

// /* student photo with initials fallback */
// function Photo({ src, name }) {
//   const [bad, setBad] = useState(false)
//   if (bad || !src) return <span className="rp-mono">{initials(name)}</span>
//   return <img src={src} alt={name} draggable="false" onError={() => setBad(true)} />
// }

// export default function HeroPapers() {
//   const n = PAPERS.length
//   const [cur, setCur] = useState(0)
//   const [prev, setPrev] = useState(null)
//   const [dir, setDir] = useState(1)
//   const [hover, setHover] = useState(false)
//   const [focus, setFocus] = useState(false)
//   const [hidden, setHidden] = useState(false)
//   const [open, setOpen] = useState(false)

//   const curRef = useRef(0)
//   const timer = useRef(0)
//   const drag = useRef({ x: 0, y: 0, on: false, moved: false })
//   const closeBtn = useRef(null)
//   const lastFocus = useRef(null)

//   const go = useCallback(
//     (to, d) => {
//       const target = ((to % n) + n) % n
//       if (target === curRef.current) return
//       const direction = d ?? (target > curRef.current ? 1 : -1)
//       setDir(direction)
//       setPrev(curRef.current)
//       setCur(target)
//       curRef.current = target
//       clearTimeout(timer.current)
//       timer.current = setTimeout(() => setPrev(null), 950)
//     },
//     [n]
//   )
//   const next = useCallback(() => go(curRef.current + 1, 1), [go])
//   const back = useCallback(() => go(curRef.current - 1, -1), [go])

//   useEffect(() => () => clearTimeout(timer.current), [])

//   /* pause autoplay while the tab is hidden */
//   useEffect(() => {
//     const onVis = () => setHidden(document.hidden)
//     document.addEventListener('visibilitychange', onVis)
//     return () => document.removeEventListener('visibilitychange', onVis)
//   }, [])

//   /* viewer: scroll lock, focus, keyboard */
//   useEffect(() => {
//     if (!open) return
//     const old = document.body.style.overflow
//     document.body.style.overflow = 'hidden'
//     closeBtn.current?.focus()
//     const onKey = (e) => {
//       if (e.key === 'Escape') setOpen(false)
//       else if (e.key === 'ArrowRight') next()
//       else if (e.key === 'ArrowLeft') back()
//     }
//     document.addEventListener('keydown', onKey)
//     return () => {
//       document.body.style.overflow = old
//       document.removeEventListener('keydown', onKey)
//       lastFocus.current?.focus?.()
//     }
//   }, [open, next, back])

//   const openViewer = (e) => {
//     lastFocus.current = e.currentTarget
//     setOpen(true)
//   }

//   /* swipe */
//   const onDown = (e) => {
//     if (e.pointerType === 'mouse' && e.button !== 0) return
//     drag.current = { x: e.clientX, y: e.clientY, on: true, moved: false }
//   }
//   const onUp = (e) => {
//     const d = drag.current
//     if (!d.on) return
//     d.on = false
//     const dx = e.clientX - d.x
//     const dy = e.clientY - d.y
//     if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
//       d.moved = true
//       dx < 0 ? next() : back()
//     }
//   }
//   const onClickCapture = (e) => {
//     if (drag.current.moved) {
//       drag.current.moved = false
//       e.preventDefault()
//       e.stopPropagation()
//     }
//   }

//   const onKeyDown = (e) => {
//     if (open || n < 2) return
//     if (e.key === 'ArrowRight') next()
//     else if (e.key === 'ArrowLeft') back()
//   }

//   const paused = hover || focus || hidden || open
//   const now = PAPERS[cur]
//   const slides = [prev, cur].filter((i) => i !== null)

//   return (
//     <div
//       className="rp"
//       data-paused={paused}
//       style={{ '--rp-dir': dir, '--rp-time': INTERVAL + 'ms' }}
//       role="region"
//       aria-roledescription="carousel"
//       aria-label="Student research papers"
//       onKeyDown={onKeyDown}
//       onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
//       onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
//       onFocus={(e) => {
//         try { if (e.target.matches(':focus-visible')) setFocus(true) } catch { /* ignore */ }
//       }}
//       onBlur={() => setFocus(false)}
//     >
//       {/* ---------- stage ---------- */}
//       <div
//         className="rp-stage"
//         onPointerDown={onDown}
//         onPointerUp={onUp}
//         onPointerCancel={() => (drag.current.on = false)}
//         onClickCapture={onClickCapture}
//       >
//         {/* ambient background: blob, orbit ring, sparkles */}
//         <div className="rp-bg" aria-hidden="true">
//           <span className="rp-blob" />
//           <svg className="rp-orbit" viewBox="0 0 400 200" fill="none">
//             <ellipse cx="200" cy="100" rx="190" ry="92" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
//             <ellipse cx="200" cy="100" rx="150" ry="62" stroke="currentColor" strokeWidth="1" opacity=".4" transform="rotate(34 200 100)" vectorEffect="non-scaling-stroke" />
//             <circle className="rp-orbit-dot" r="4" fill="currentColor">
//               <animateMotion dur="16s" repeatCount="indefinite" path="M10,100 A190,92 0 1,1 390,100 A190,92 0 1,1 10,100" />
//             </circle>
//           </svg>
//           <Spark className="rp-sp rp-s1" />
//           <Spark className="rp-sp rp-s2" />
//           <Spark className="rp-sp rp-s3" />
//         </div>

//         {slides.map((i) => {
//           const p = PAPERS[i]
//           const active = i === cur
//           const lines = p.tag ?? TAGLINE
//           return (
//             <div
//               key={p.id}
//               className={'rp-slide ' + (active ? 'is-active' : 'is-leaving')}
//               aria-hidden={!active}
//             >
//               <div className="rp-pw">
//                 <div className="rp-tilt">
//                   <button
//                     type="button"
//                     className="rp-paper"
//                     onClick={openViewer}
//                     tabIndex={active ? 0 : -1}
//                     aria-label={'View research paper: ' + p.title}
//                   >
//                     <span className="rp-sheet">
//                       <img src={p.paper} alt={'Research paper: ' + p.title} draggable="false" />
//                       <span className="rp-shine" />
//                     </span>
//                     <span className="rp-zoom" aria-hidden="true"><Expand /></span>
//                   </button>

//                   {/* <div className="rp-tag">
//                     {lines.map((l) => <span key={l}>{l}</span>)}
//                   </div> */}
//                 </div>
//               </div>

//               {/* student profile box: photo left, university + class right */}
//               <div className="rp-pill" title={p.student}>
//                 <span className="rp-av"><Photo src={p.photo} name={p.student} /></span>
//                 <span className="rp-who">
//                   <strong className="rp-school">{p.school}</strong>
//                   <span className="rp-class">{p.grade}</span>
//                 </span>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* ---------- controls ---------- */}
//       {n > 1 && (
//         <div className="rp-controls">
//           <div className="rp-dots">
//             {PAPERS.map((p, i) => (
//               <button
//                 key={p.id}
//                 type="button"
//                 className={'rp-dot' + (i === cur ? ' is-on' : '')}
//                 onClick={() => go(i)}
//                 aria-label={`Show paper ${i + 1} of ${n}`}
//                 aria-current={i === cur ? 'true' : undefined}
//               >
//                 <span className="rp-dot-track">
//                   <span
//                     className="rp-fill"
//                     onAnimationEnd={i === cur ? (e) => e.animationName === 'rp-progress' && next() : undefined}
//                   />
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="rp-right">
//             <span className="rp-count" aria-hidden="true">
//               <b>{pad(cur + 1)}</b><i>/</i>{pad(n)}
//             </span>
//             <div className="rp-btns">
//               <button type="button" className="rp-btn" onClick={back} aria-label="Previous paper"><Chevron dir="l" /></button>
//               <button type="button" className="rp-btn" onClick={next} aria-label="Next paper"><Chevron dir="r" /></button>
//             </div>
//           </div>
//         </div>
//       )}

//       <span className="rp-sr" aria-live="polite">
//         {`Paper ${cur + 1} of ${n}: ${now.title}, by ${now.student}, ${now.grade}, ${now.school}`}
//       </span>

//       {/* ---------- full-size viewer ---------- */}
//       {open && typeof document !== 'undefined' &&
//         createPortal(
//           <div className="rp-lb" role="dialog" aria-modal="true" aria-label="Research paper viewer" onClick={() => setOpen(false)}>
//             <div className="rp-lb-card" onClick={(e) => e.stopPropagation()}>
//               <div className="rp-lb-scroll">
//                 <img src={now.paper} alt={'Research paper: ' + now.title} />
//               </div>
//               <div className="rp-lb-cap">
//                 <strong>{now.title}</strong>
//                 <span>{now.student} · {now.grade} · {now.school}</span>
//               </div>
//             </div>

//             <button ref={closeBtn} type="button" className="rp-lb-x" onClick={() => setOpen(false)} aria-label="Close viewer">
//               <Close />
//             </button>
//             {n > 1 && (
//               <>
//                 <button type="button" className="rp-lb-nav rp-lb-prev" onClick={(e) => { e.stopPropagation(); back() }} aria-label="Previous paper"><Chevron dir="l" /></button>
//                 <button type="button" className="rp-lb-nav rp-lb-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next paper"><Chevron dir="r" /></button>
//               </>
//             )}
//           </div>,
//           document.body
//         )}
//     </div>
//   )
// }