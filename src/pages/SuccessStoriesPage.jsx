import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const d = (ms) => ({ '--d': ms + 'ms' })

const IMG = 'https://univisory.org/cdn/images/testimonials/'
const VID = 'https://univisory.org/cdn/videos/'
const LOCAL_IMG = `${import.meta.env.BASE_URL}testimonials/`
const LOCAL_VID = `${import.meta.env.BASE_URL}videos/`

const STORIES = [
  { id: 'prisha',  name: 'Prisha Arora',            uni: 'Wharton Business School',            student: 'Prisha Arora',              cls: "Class of '28", img: 'prisha-arora-img.webp',  video: 'Prisha_Testimonial.mp4' },
  { id: 'yash',    name: 'Yash Moitra',             uni: 'Cornell University',                 student: 'Yash Moitra',               cls: "Class of '27", img: 'yash-img.webp',          video: 'Yash_testimonial.mp4' },
  { id: 'sid',     name: 'Siddharth',               uni: 'New York University',                student: 'Siddharth',                 cls: "Class of '26", img: 'sid-img.webp',           video: 'Siddharth_Testimonial.mp4' },
  { id: 'ananya',  name: 'Ananya Prabhuram',        uni: 'University of California',           student: 'Ananya Prabhuram',          cls: "Class of '27", img: 'ananya-img.webp',        video: 'Ananya_Testimonial.mp4' },
  { id: 'pranet',  name: 'Pranet',                  uni: 'Scholastic Assessment Test',         student: 'Pranet',                    cls: '',             img: 'pranet-img.webp',        video: 'Pranet_Testimonial.mp4' },
  { id: 'vi-par',  name: 'Parents of Vibhrav Jha',  uni: 'University of Wisconsin',            student: 'Parents of Vibhrav Jha',    cls: "Class of '28", img: 'vi-parents-img.webp',    video: 'Vibhrav_s_Parents.m4v' },
  { id: 'naman',   name: 'Naman',                   uni: 'London School of Economics',         student: 'Naman',                     cls: "Class of '25", img: 'nama-img.webp',          video: 'Naman_Testimonial.mp4' },
  { id: 'rishab',  name: 'Rishab',                  uni: 'Questrom School of Business',        student: 'Rishab',                    cls: "Class of '25", img: 'rishab-img.webp',        video: 'Rishabh_Testimonial.mp4' },
  { id: 'vibhrav', name: 'Vibhrav Jha',             uni: 'University of Wisconsin',            student: 'Vibhrav Jha',               cls: "Class of '28", img: 'vibhrav-img.webp',       video: 'Vibhrav_Jha_UW_Madison.mp4' },
  { id: 'kartik',  name: "Kartik's Mother",         uni: 'Pennsylvania State University',      student: "Kartik's Mother",           cls: "Class of '26", img: 'kartik-parent-img.webp', video: 'Kartik_s_Parent.mp4' },
  { id: 'krishiv', name: 'Krishiv',                 uni: 'University of Southern California',  student: 'Krishiv',                   cls: "Class of '28", img: 'krishiv-img.webp',       video: "Krishiv's_Testimonial.mp4" },
  { id: 'ira',     name: 'Ira',                     uni: 'Georgia Institute of Technology',    student: 'Ira',                       cls: "Class of '28", img: 'Ira-img.webp',           video: "Ira's_Testimonial.mp4" },
  { id: 'jasnoor', name: "Jasnoor's Mother",        uni: 'University of California, Berkeley', student: "Jasnoor's Mother",          cls: "Class of '28", img: 'jasnoor-img.webp',       video: "jasnoor_mom's_Testimonial.mp4" },
].map((s) => ({ ...s, localImg: LOCAL_IMG + s.img, localVideo: LOCAL_VID + s.video, img: IMG + s.img, video: VID + s.video }))

const IMPACT = [
  {
    name: 'Rhea',
    meta: 'Grade 11 · Bangalore, India',
    title: '“Policy Barriers to Adolescent Menstrual Health Access in Tier 2 Indian Cities”',
    mentor: 'Northwestern PhD Candidate, Public Health',
    points: ['Paper submitted to indexed youth public policy journal. Presented at regional youth symposium.'],
    result: 'Selected for scholarship interview · Applying to Liberal Arts',
  },
  {
    name: 'Zara',
    meta: 'Grade 11 · Dubai, UAE',
    title: '“Parametric Design for Passive Cooling in High-Density Urban Housing — UAE Climate”',
    mentor: 'Cornell AAP Research Associate',
    points: ['Published in youth architecture index. Framework referenced in faculty portfolio review.'],
    result: 'Architecture offer, Top-15 Global University',
  },
  {
    name: 'Sofia',
    meta: 'Grade 12 · Toronto, Canada',
    title: '“Algorithmic Bias in Predictive Policing — Statistical Audit of Three North American Deployments”',
    mentor: 'Yale Law and Policy Postdoc',
    points: ['Policy analysis indexed in law and society journal. Full application positioning completed.'],
    result: 'Admitted to Political Science, Ivy League University',
  },
  {
    name: 'Marcus',
    meta: 'Grade 11 · New York, USA',
    title: '“Reinforcement Learning for Dynamic Traffic Signal Optimisation in High-Density Urban Corridors”',
    mentor: 'MIT CSAIL Postdoctoral Researcher',
    points: ['Paper accepted to peer-reviewed CS journal. Regeneron STS entry submitted.'],
    result: 'Admitted to Computer Science, Top-5 US University',
  },
]

const CASES = [
  {
    name: 'Jordan K.',
    meta: 'Economic justice and policy reform',
    title: '“Impact of Informal Labor Markets on Urban Female Employment in Tier-1 Cities”',
    detail: '; Regression-based study using NSSO & CMIE data.',
    mentor: 'Columbia Economics Postdoc',
    background: 'IBDP student with SAT 1570. Strong interest in economic justice and policy reform. Ran a local women’s cooperative initiative.',
    impact: 'Published in a recognized development economics journal. Cited in UPenn supplemental; informed her Common App personal statement.',
    outcome: 'Admitted to University of Pennsylvania (College of Arts & Sciences)',
    reflection: '“I’ve never felt so intellectually stretched. Working really changed the way I think and write, and I know this is something I will carry forward to college as well. Thank you so much UniVisory.”',
  },
  {
    name: 'Marcus',
    meta: 'AI and public impact',
    title: '“FairJustice: GPT-based Legal Assistant for Acid-Attack Survivors”',
    detail: ' ; NLP tool mapping Indian legal rights for easier access.',
    mentor: 'Stanford AI Researcher',
    background: 'High-achieving student with interests in AI and public impact. Built basic NLP tools and volunteered with legal NGOs.',
    impact: 'Published in a social impact AI journal. Used by US-based NGO as pilot. Research cited in Stanford essays and counselor LOR.',
    outcome: 'Admitted to Stanford University (Symbolic Systems)',
    reflection: '“I never imagined coding could help me create something so unique and powerful at such a young age. I learnt so much from sir throughout the entire process, and this definitely played a big role in my admit. So excited to meet him on campus.”',
  },
  {
    name: 'Nisha',
    meta: 'Electrical Engineering and sustainability',
    title: '“AI-Optimized Battery Management for Rural Microgrids”',
    detail: '; ML models to improve charge-discharge efficiency in lithium-ion batteries.',
    mentor: 'MIT Postdoc in EECS',
    background: 'Student from Singapore with a 1550 SAT and 8 A*s. Passionate about Electrical Engineering and sustainability. Strong in Olympiads and coding.',
    impact: 'Built a TensorFlow-based simulation; presented at MIT outreach symposium. Paper published in a peer-reviewed engineering journal.',
    outcome: 'Admitted to Princeton University (B.S.E. Electrical Engineering) ; REA',
    reflection: '“This was the first time I felt my work could actually matter. I feel Princeton knew that I wasn’t just researching to apply, but to actually solve a real problem, and that made all the difference.”',
  },
  {
    name: 'Anika',
    meta: 'Architecture and climate-conscious design',
    title: '“Biomimicry in Low-Cost Climate Adaptive Architecture”',
    detail: ' ; Parametric simulations using Rhino, Grasshopper, Ladybug tools.',
    mentor: 'Cornell AAP Postdoc',
    background: 'Passionate about architecture and climate-conscious design. Math + arts blend, interned with a local architect.',
    impact: 'Research published in a recognized youth architecture journal. Portfolio cited by Cornell faculty during review.',
    outcome: 'Admitted to Cornell University (B.Arch ; 5-Year Program)',
    reflection: '“I was stuck on making portfolios with structures and buildings, but this project changed everything about my application and made it stand out because I never thought I could integrate climate models, theory, and tech with architecture.”',
  },
]

const QUOTES = [
  {
    size: 'lg',
    text: '“I came into Theoria thinking I was a strong student. I left knowing I was a scholar. The difference is something I can’t explain in a sentence — but every Harvard interviewer could see it the moment we sat down.”',
    name: 'Nathaniel W.',
    meta: 'Grade 12 · Boston, USA · Elite Research Mentorship',
    sub: 'Computational Neuroscience · Admitted to Harvard (Neuroscience)',
  },
  {
    size: 'lg',
    text: '“My Stanford interviewer told me, on record, that my research was the most compelling piece of intellectual evidence she had seen from a high school applicant that year. That’s not the program speaking — that’s 16 weeks of genuinely hard, genuinely original work.”',
    name: 'Priya M.',
    meta: 'Grade 12 · New Jersey, USA · ResearchPlus Track',
    sub: 'Computational Biology · Admitted to Stanford (Bio-Engineering)',
  },
  {
    size: 'sm',
    text: '“Theoria is genuinely different. I had done summer programs at two universities before this. Neither came close to the depth of engagement I had with my Theoria mentor.”',
    name: 'Layla A.',
    meta: 'Grade 12 · Dubai, UAE · Elite Research Mentorship',
    sub: 'Sustainable Architecture · Published in youth architecture index',
  },
]

function PlayIcon({ size = 34 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
    </svg>
  )
}

function Ico({ n }) {
  const p = {
    viewBox: '0 0 24 24', width: 18, height: 18, fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, focusable: 'false',
  }
  if (n === 'check') return <svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
  if (n === 'mentor') {
    return (
      <svg {...p}>
        <path d="m2 9 10-5 10 5-10 5z" />
        <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
      </svg>
    )
  }
  return (
    <svg {...p}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4" />
      <path d="M12 13v4M10 17h4M8.5 20h7" />
    </svg>
  )
}

/* ───────────── one story card (a carousel slide) ───────────── */
function StoryCard({ s, i, onOpen }) {
  // 0 = our own copy, 1 = UniVisory URL
  const srcs = [s.localImg, s.img]
  const [step, setStep] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [broken, setBroken] = useState(false)
  const imgRef = useRef(null)

  // cached images can finish loading before React attaches onLoad
  useEffect(() => {
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true)
  }, [step])

  const fail = () => {
    if (step < srcs.length - 1) setStep(step + 1)
    else setBroken(true)
  }

  return (
    <li className="sp-slide">
      <article className="sp-card">
        <button
          type="button"
          className={'sp-photo' + (loaded || broken ? ' is-loaded' : '')}
          onClick={() => onOpen(i)}
          aria-label={`Play video: ${s.name}, ${s.uni}`}
        >
          {broken ? (
            <span className="sp-ph" aria-hidden="true">
              <svg viewBox="0 0 120 100" focusable="false">
                <use href="#ic" width="120" height="100" filter="url(#ic-green)" />
              </svg>
            </span>
          ) : (
            <img
              key={srcs[step]}
              ref={imgRef}
              src={srcs[step]}
              alt={s.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              onError={fail}
            />
          )}
          <span className="sp-play" aria-hidden="true">
            <span className="sp-play-btn"><PlayIcon /></span>
          </span>
        </button>

        <div className="sp-info">
          <h3 className="sp-uni">{s.uni}</h3>
          <p className="sp-who">
            <b>{s.student}</b>
            {s.cls && <span className="sp-class">{s.cls}</span>}
          </p>
        </div>
      </article>
    </li>
  )
}

/* ───────────── carousel ───────────── */
function StoryCarousel({ onOpen, modalOpen }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [bar, setBar] = useState({ w: 100, x: 0 })
  // flags read by the auto-advance timer
  const hold = useRef({ hover: false, focus: false, seen: false, modal: false, last: 0 })

  useEffect(() => { hold.current.modal = modalOpen }, [modalOpen])

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const w = el.scrollWidth ? Math.min(100, (el.clientWidth / el.scrollWidth) * 100) : 100
    const x = max > 0 ? (el.scrollLeft / max) * (100 - w) : 0
    const rw = Math.round(w * 10) / 10
    const rx = Math.round(x * 10) / 10
    setBar((p) => (p.w === rw && p.x === rx ? p : { w: rw, x: rx }))
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [update])

  const slide = useCallback((dir, byUser) => {
    const el = trackRef.current
    if (!el) return
    if (byUser) hold.current.last = Date.now()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduce ? 'auto' : 'smooth'
    const max = el.scrollWidth - el.clientWidth
    if (max <= 2) return
    if (dir > 0 && el.scrollLeft >= max - 2) { el.scrollTo({ left: 0, behavior }); return }
    if (dir < 0 && el.scrollLeft <= 2) { el.scrollTo({ left: max, behavior }); return }
    const kids = el.children
    const step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : el.clientWidth
    el.scrollBy({ left: dir * step, behavior })
  }, [])

  // gentle auto-advance (paused on hover / focus / popup / off-screen / after user input)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const h = hold.current
    const wrap = wrapRef.current
    let io
    if ('IntersectionObserver' in window && wrap) {
      io = new IntersectionObserver(([e]) => { h.seen = e.isIntersecting }, { threshold: 0.35 })
      io.observe(wrap)
    }
    const id = setInterval(() => {
      if (h.hover || h.focus || h.modal || !h.seen || document.hidden) return
      if (Date.now() - h.last < 6000) return
      slide(1, false)
    }, 4200)
    return () => { clearInterval(id); io && io.disconnect() }
  }, [slide])

  const touch = () => { hold.current.last = Date.now() }

  return (
    <div
      className="shell sp-car"
      ref={wrapRef}
      onMouseEnter={() => { hold.current.hover = true }}
      onMouseLeave={() => { hold.current.hover = false }}
      onFocus={() => { hold.current.focus = true }}
      onBlur={() => { hold.current.focus = false }}
      onPointerDown={touch}
      onWheel={touch}
    >
       <header className="sp-head">
        <h1 className="rv">Success <span className="sp-accent">stories</span></h1>
      </header>

      <div
        className="sp-rail rv"
        style={d(150)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Success story videos"
      >
        <button
          type="button"
          className="sp-arrow sp-arrow-prev"
          onClick={() => slide(-1, true)}
          aria-label="Previous stories"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
        </button>

        <button
          type="button"
          className="sp-arrow sp-arrow-next"
          onClick={() => slide(1, true)}
          aria-label="Next stories"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </button>

        <ul className="sp-track" ref={trackRef}>
          {STORIES.map((s, i) => (
            <StoryCard key={s.id} s={s} i={i} onOpen={onOpen} />
          ))}
        </ul>
        <div className="sp-bar" aria-hidden="true">
          <i style={{ width: bar.w + '%', left: bar.x + '%' }} />
        </div>
      </div>
    </div>
  )
}

/* ───────────── video stage (resets for every story) ───────────── */
function VideoStage({ item }) {
  // 0 = our own copy, 1 = UniVisory URL
  const srcs = [item.localVideo, item.video]
  const [step, setStep] = useState(0)
  const [err, setErr] = useState(false)
  const fail = () => {
    if (step < srcs.length - 1) setStep(step + 1)
    else setErr(true)
  }
  return (
    <div className="sp-stage">
      {err ? (
        <div className="sp-fail">
          <p>This video couldn't be loaded here.</p>
          <a href={item.video} target="_blank" rel="noreferrer">Open the video in a new tab</a>
        </div>
      ) : (
        <video
          key={srcs[step]}
          className="sp-video"
          src={srcs[step]}
          poster={item.localImg}
          controls
          autoPlay
          playsInline
          preload="metadata"
          onError={fail}
        />
      )}
    </div>
  )
}

/* ───────────── popup player ───────────── */
function StoryModal({ items, index, onClose, onChange }) {
  const item = items[index]
  const total = items.length
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  // scroll lock + focus handling (runs once)
  useEffect(() => {
    const last = document.activeElement
    const html = document.documentElement
    const body = document.body
    const sbw = window.innerWidth - html.clientWidth
    const prev = { h: html.style.overflow, b: body.style.overflow, p: body.style.paddingRight }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (sbw > 0) body.style.paddingRight = sbw + 'px'
    closeRef.current && closeRef.current.focus()
    return () => {
      html.style.overflow = prev.h
      body.style.overflow = prev.b
      body.style.paddingRight = prev.p
      last && last.focus && last.focus()
    }
  }, [])

  // keyboard: Esc, ← →, Tab trap
  useEffect(() => {
    const go = (dir) => onChange((index + dir + total) % total)
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      const onVideo = e.target && e.target.tagName === 'VIDEO'
      if (e.key === 'ArrowRight' && !onVideo) { e.preventDefault(); go(1); return }
      if (e.key === 'ArrowLeft' && !onVideo) { e.preventDefault(); go(-1); return }
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll('button, a[href], video[controls]')
        if (!nodes.length) return
        const first = nodes[0]
        const lastN = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastN.focus() }
        else if (!e.shiftKey && document.activeElement === lastN) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, total, onClose, onChange])

  return createPortal(
    <div className="sp-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="sp-dialog" role="dialog" aria-modal="true" aria-labelledby="sp-modal-title" ref={dialogRef}>
        <button type="button" className="sp-close" ref={closeRef} onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <VideoStage key={item.id} item={item} />

        <div className="sp-dlg-info">
          <div className="sp-dlg-text">
            <p className="sp-kicker">Success story {index + 1} of {total}</p>
            <h3 id="sp-modal-title">{item.uni}</h3>
            <p className="sp-dlg-who">{item.student}{item.cls ? ', ' + item.cls : ''}</p>
          </div>
          <div className="sp-nav">
            <button type="button" onClick={() => onChange((index - 1 + total) % total)} aria-label="Previous story">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
            </button>
            <button type="button" onClick={() => onChange((index + 1) % total)} aria-label="Next story">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ───────────── case study popup ───────────── */
function CsIco({ n }) {
  const p = {
    viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, focusable: 'false',
  }
  if (n === 'person') return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
  if (n === 'flask') {
    return (
      <svg {...p}>
        <path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3" />
        <path d="M7.5 15h9" />
      </svg>
    )
  }
  if (n === 'chart') return <svg {...p}><path d="M5 20V11M12 20V4M19 20v-6" /></svg>
  return <Ico n="trophy" />
}

function CaseModal({ items, index, onClose, onChange }) {
  const c = items[index]
  const total = items.length
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const bodyRef = useRef(null)

  // scroll lock + focus handling (runs once)
  useEffect(() => {
    const last = document.activeElement
    const html = document.documentElement
    const body = document.body
    const sbw = window.innerWidth - html.clientWidth
    const prev = { h: html.style.overflow, b: body.style.overflow, p: body.style.paddingRight }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (sbw > 0) body.style.paddingRight = sbw + 'px'
    closeRef.current && closeRef.current.focus()
    return () => {
      html.style.overflow = prev.h
      body.style.overflow = prev.b
      body.style.paddingRight = prev.p
      last && last.focus && last.focus()
    }
  }, [])

  // back to the top whenever another case study is shown
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0 }, [index])

  // keyboard: Esc, ← →, Tab trap
  useEffect(() => {
    const go = (dir) => onChange((index + dir + total) % total)
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); return }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); return }
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll('button')
        if (!nodes.length) return
        const first = nodes[0]
        const lastN = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastN.focus() }
        else if (!e.shiftKey && document.activeElement === lastN) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, total, onClose, onChange])

  const rows = [
    { key: 'background', label: 'Background', icon: 'person', body: <p>{c.background}</p> },
    {
      key: 'research', label: 'Elite Research', icon: 'flask',
      body: (
        <>
          <p><b>Mentored by</b> {c.mentor}</p>
          <p><b>Project:</b> {c.title}{c.detail}</p>
        </>
      ),
    },
    { key: 'impact', label: 'Impact', icon: 'chart', body: <p>{c.impact}</p> },
    { key: 'outcome', label: 'Outcome', icon: 'trophy', body: <p>{c.outcome}</p>, cls: ' is-outcome' },
  ]

  return createPortal(
    <div className="sp-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="sp-cs-dialog" role="dialog" aria-modal="true" aria-labelledby="sp-cs-title" ref={dialogRef}>
        <button type="button" className="sp-close" ref={closeRef} onClick={onClose} aria-label="Close case study">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <header className="sp-cs-head">
          <p className="sp-kicker">Case study {index + 1} of {total}</p>
          <h3 id="sp-cs-title" className="sp-cs-title">{c.name} — Case study overview</h3>
          {/* <h3 id="sp-cs-title" className="sp-cs-title">Case study overview</h3> */}
        </header>

        <div className="sp-cs-body" ref={bodyRef}>
          <div key={index}>
            <ol className="sp-cs-flow">
              {rows.map((r, k) => (
                <li className={'sp-cs-row' + (r.cls || '')} key={r.key} style={{ '--i': k }}>
                  <span className="sp-cs-dot"><CsIco n={r.icon} /></span>
                  <div className="sp-cs-card">
                    <h4 className="sp-cs-label">{r.label}</h4>
                    {r.body}
                  </div>
                </li>
              ))}
            </ol>

            <figure className="sp-cs-quote" style={{ '--i': 4 }}>
              <figcaption className="sp-cs-label">Student Reflection</figcaption>
              <blockquote>{c.reflection}</blockquote>
              <div className="sp-cs-by">
                <span className="sp-ava sp-ava-lt" aria-hidden="true">{c.name.charAt(0)}</span>
                <b>{c.name}</b>
              </div>
            </figure>
          </div>
        </div>

        <footer className="sp-cs-foot">
          <span className="sp-cs-dots" aria-hidden="true">
            {items.map((_, k) => <i key={k} className={k === index ? 'on' : ''} />)}
          </span>
          <div className="sp-cs-nav">
            <button type="button" onClick={() => onChange((index - 1 + total) % total)} aria-label="Previous case study">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
            </button>
            <button type="button" onClick={() => onChange((index + 1) % total)} aria-label="Next case study">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  )
}

/* ───────────── page ───────────── */
export default function SuccessStoriesPage() {
  const [open, setOpen] = useState(null)
  const [cs, setCs] = useState(null)

  return (
    <div className="page sp-page">
      {/* ───────── VIDEO CAROUSEL ───────── */}
      <section className="sp-main">
        {/* <svg className="sp-mark" viewBox="0 0 120 100" aria-hidden="true" focusable="false">
          <use href="#ic" width="120" height="100" filter="url(#ic-green)" />
        </svg> */}
        <StoryCarousel onOpen={setOpen} modalOpen={open !== null || cs !== null} />
      </section>

      {/* ───────── RESEARCH OUTCOMES + CASE STUDIES ───────── */}
      <section className="sp-impact">
        <div className="shell">
          <div className="sp-sec-head rv">
            <h2>Case <span className="sp-accent">Studies</span></h2>
          </div>

          <ul className="sp-impact-grid">
            {CASES.map((c, i) => (
              <li className="rv" key={c.name} style={d((i % 2) * 110)}>
                <article className="sp-ic">
                  <header className="sp-ic-top">
                    <span className="sp-ava" aria-hidden="true">{c.name.charAt(0)}</span>
                    <div>
                      <h3>{c.name}</h3>
                      <p className="sp-ic-meta">{c.meta}</p>
                    </div>
                  </header>

                  <em className="sp-ic-title">{c.title}</em>

                  <hr className="sp-ic-rule" />

                  <p className="sp-ic-mentor">
                    <Ico n="mentor" />
                    <span><b>Mentor:</b> {c.mentor}</span>
                  </p>

                  <ul className="sp-ic-list">
                    <li><Ico n="check" /><span>{c.impact}</span></li>
                    <li><Ico n="trophy" /><span>{c.outcome}</span></li>
                  </ul>

                  <button
                    type="button"
                    className="sp-ic-btn"
                    onClick={() => setCs(i)}
                    aria-haspopup="dialog"
                  >
                    <span>Case study overview</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── QUOTES ───────── */}
      <section className="sp-voices">
        <div className="shell">
            <h2 className='text-amber-50'>In their <span className="sp-accent">own words</span></h2>
          <ul className="sp-q-grid">
            {QUOTES.map((q, i) => (
              <li className={'rv sp-q ' + (q.size === 'sm' ? 'sp-q-sm' : 'sp-q-lg')} key={q.name} style={d(i * 110)}>
                <figure className="sp-q-card">
                  <blockquote className="sp-q-text">{q.text}</blockquote>
                  <figcaption className="sp-q-by">
                    <span className="sp-ava sp-ava-lt" aria-hidden="true">{q.name.charAt(0)}</span>
                    <span className="sp-q-who">
                      <b>{q.name}</b>
                      <span className="sp-q-meta">{q.meta}</span>
                      <span className="sp-q-sub">{q.sub}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {open !== null && (
        <StoryModal
          items={STORIES}
          index={open}
          onClose={() => setOpen(null)}
          onChange={setOpen}
        />
      )}

      {cs !== null && (
        <CaseModal
          items={CASES}
          index={cs}
          onClose={() => setCs(null)}
          onChange={setCs}
        />
      )}
    </div>
  )
}