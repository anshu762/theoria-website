import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

/* Where the "More success stories" button goes. Change to your real route. */
const MORE_LINK = '/success-stories'
const LOCAL_IMG = `${import.meta.env.BASE_URL}testimonials/`
const LOCAL_VID = `${import.meta.env.BASE_URL}videos/`
const fileOf = (u) => u.slice(u.lastIndexOf('/') + 1)

/* Content copied from your two markup blocks */
const STORIES = [
  {
    id: 'jasnoor',
    photo: 'https://univisory.org/cdn/images/testimonials/jasnoor-img.webp',
    alt: "Jasnoor's Mother",
    video: "https://univisory.org/cdn/videos/jasnoor_mom's_Testimonial.mp4",
    uni: 'University of California, Berkeley',
    who: "Jasnoor's Mother, Class of '28",
  },
  {
    id: 'prisha',
    photo: 'https://univisory.org/cdn/images/testimonials/prisha-arora-img.webp',
    alt: 'Prisha Arora',
    video: 'https://univisory.org/cdn/videos/Prisha_Testimonial.mp4',
    uni: 'Wharton Business School',
    who: "Prisha Arora, Class of '28",
  },
   {
    id: 'yash',
    photo: 'https://univisory.org/cdn/images/testimonials/yash-img.webp',
    alt: 'Yash Moitra',
    video: 'https://univisory.org/cdn/videos/Yash_testimonial.mp4',
    uni: 'Cornell University',
    who: "Yash Moitra, Class of '27",
  },
]

/* ---------- icons ---------- */
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
  </svg>
)
const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M22 9 12 4 2 9l10 5 10-5Z" />
    <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
    <path d="M22 9v6" />
  </svg>
)
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
const Sparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" />
  </svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ---------- reveal on scroll (self-contained, no dependency on .rv) ---------- */
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

/* ---------- one story card ---------- */
function StoryCard({ s, side, delay, onOpen }) {
  // 0 = our own copy, 1 = UniVisory URL
  const srcs = [LOCAL_IMG + fileOf(s.photo), s.photo]
  const [step, setStep] = useState(0)
  const [broken, setBroken] = useState(false)
  const fail = () => {
    if (step < srcs.length - 1) setStep(step + 1)
    else setBroken(true)
  }
  return (
    <div className={`sx-item sx-reveal is-${side}`} style={{ '--d': delay + 'ms' }}>
      <article className="sx-card">
        <div className="sx-photo">
          {broken ? (
            <span className="sx-fallback" aria-hidden="true">{s.alt.trim().charAt(0)}</span>
          ) : (
            <>
              {/* blurred copy: only visible if a photo is not exactly 16:9 */}
              <img key={'b' + step} className="sx-bg" src={srcs[step]} alt="" aria-hidden="true" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              {/* the real photo, always shown in full */}
              <img key={'m' + step} className="sx-main" src={srcs[step]} alt={s.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={fail} />
            </>
          )}
          <span className="sx-shade" aria-hidden="true" />
          {/* <span className="sx-badge" aria-hidden="true"><i />Video story</span> */}

          <button
            type="button"
            className="sx-play"
            aria-haspopup="dialog"
            aria-label={`Play video: ${s.who}, ${s.uni}`}
            onClick={(e) => onOpen(s, e.currentTarget)}
          >
            <span className="sx-play-ico"><PlayIcon /></span>
          </button>
        </div>

        <div className="sx-info">
          <span className="sx-cap" aria-hidden="true"><CapIcon /></span>
          <div className="sx-text">
            <h3 className="sx-uni">{s.uni}</h3>
            <p className="sx-who">{s.who}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

/* ---------- video viewer ---------- */
function VideoModal({ story, closing, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const videoRef = useRef(null)
  const srcs = [LOCAL_VID + fileOf(story.video), story.video]
  const [step, setStep] = useState(0)
  const [failed, setFailed] = useState(false)
  const fail = () => {
    if (step < srcs.length - 1) setStep(step + 1)
    else setFailed(true)
  }

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    const v = videoRef.current
    if (v) {
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (closing) videoRef.current?.pause()
  }, [closing])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const nodes = Array.from(dialogRef.current.querySelectorAll('button,a[href],video[controls]'))
      if (!nodes.length) {
        e.preventDefault()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`sx-modal${closing ? ' is-closing' : ''}`}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="sx-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${story.who} – ${story.uni}`}
        ref={dialogRef}
      >
        <div className="sx-dialog-bar">
          <span className="sx-dialog-ico" aria-hidden="true"><CapIcon /></span>
          <div className="sx-dialog-text">
            <strong>{story.uni}</strong>
            <span>{story.who}</span>
          </div>
          <button type="button" className="sx-x" onClick={onClose} aria-label="Close video" ref={closeRef}>
            <CloseIcon />
          </button>
        </div>

        <div className="sx-stage">
          {failed ? (
            <div className="sx-err">
              <p>Sorry, this video could not be loaded.</p>
              <a href={story.video} target="_blank" rel="noopener noreferrer">Open the video in a new tab</a>
            </div>
          ) : (
            <video
              key={srcs[step]}
              ref={videoRef}
              src={srcs[step]}
              poster={LOCAL_IMG + fileOf(story.photo)}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onError={fail}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- section ---------- */
export default function SuccessStories() {
  const [ref, seen] = useReveal()
  const [active, setActive] = useState(null)
  const [closing, setClosing] = useState(false)
  const lastFocus = useRef(null)
  const timer = useRef(0)

  const open = useCallback((story, trigger) => {
    window.clearTimeout(timer.current)
    lastFocus.current = trigger
    setClosing(false)
    setActive(story)
  }, [])

  const close = useCallback(() => {
    setClosing(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setActive(null)
      setClosing(false)
      lastFocus.current?.focus?.({ preventScroll: true })
    }, 220)
  }, [])

  /* lock page scroll while the viewer is open (no layout jump) */
  useEffect(() => {
    if (!active) return undefined
    const b = document.body
    const prevOverflow = b.style.overflow
    const prevPad = b.style.paddingRight
    const bar = window.innerWidth - document.documentElement.clientWidth
    b.style.overflow = 'hidden'
    if (bar > 0) b.style.paddingRight = bar + 'px'
    return () => {
      b.style.overflow = prevOverflow
      b.style.paddingRight = prevPad
    }
  }, [active])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <section ref={ref} className={`sx-section${seen ? ' is-in' : ''}`} aria-labelledby="sx-title">
      <span className="sx-sp sx-s1" aria-hidden="true"><Sparkle /></span>
      <span className="sx-sp sx-s2" aria-hidden="true"><Sparkle /></span>
      <span className="sx-sp sx-s3" aria-hidden="true"><Sparkle /></span>

      <div className="shell">
        <div className="sx-head sx-reveal">
          <div className="sx-title">
            <h2 id="sx-title">Success stories - <span className="st-accent">a glimpse</span></h2>
          </div>
        </div>

        <div className="sx-grid">
          <StoryCard s={STORIES[0]} side="l" delay={150} onOpen={open} />
          <StoryCard s={STORIES[1]} side="r" delay={300} onOpen={open} />
          <StoryCard s={STORIES[2]} side="r" delay={450} onOpen={open} />

          {/* "View more" button, right side of the row */}
          <div className="sx-item sx-go-item sx-reveal is-r" style={{ '--d': '600ms' }}>
            <Link className="sx-vm" to={MORE_LINK} aria-label="View more success stories">
              <span className="sx-vm-lbl">View more</span>
              <span className="sx-vm-ico" aria-hidden="true"><ArrowIcon /></span>
            </Link>
          </div>
        </div>
      </div>

      {active && createPortal(
        <VideoModal key={active.id} story={active} closing={closing} onClose={close} />,
        document.body
      )}
    </section>
  )
}