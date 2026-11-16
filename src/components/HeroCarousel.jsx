import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_SLIDES, HERO_AUTOPLAY_MS } from '../data/heroCarouselSlides'

const LABEL = { student: 'Researching with us', mentor: 'Researching with you' }
const LEAVE_MS = 700 // how long an outgoing slide stays mounted (matches CSS)

/* ---------- helpers ---------- */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isFocusVisible = (el) => {
  try { return el.matches(':focus-visible') } catch { return true }
}

const fallbackPhoto = (type) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${
      type === 'student' ? '#8fa6ff' : '#b28cff'
    }"/><stop offset="1" stop-color="#2a2f8f"/></linearGradient></defs><rect width="400" height="520" fill="url(#g)"/><circle cx="200" cy="205" r="72" fill="rgba(255,255,255,.85)"/><path d="M60 520c8-110 70-170 140-170s132 60 140 170z" fill="rgba(255,255,255,.85)"/></svg>`
  )

/* ---------- icons ---------- */
const Svg = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
)

const Icon = {
  uni: (
    <Svg>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 21h18" />
    </Svg>
  ),
  cal: (
    <Svg>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
  ),
  cap: (
    <Svg>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5" />
    </Svg>
  ),
  award: (
    <Svg>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14L7 22l5-3 5 3-1.5-8" />
    </Svg>
  ),
  prev: (
    <Svg>
      <path d="M15 5l-7 7 7 7" />
    </Svg>
  ),
  next: (
    <Svg>
      <path d="M9 5l7 7-7 7" />
    </Svg>
  ),
  pause: (
    <Svg>
      <path d="M8 5v14M16 5v14" />
    </Svg>
  ),
  play: (
    <Svg>
      <path d="M7 4.5l12 7.5-12 7.5z" fill="currentColor" />
    </Svg>
  ),
}

/* ---------- one slide ---------- */
function Slide({ slide, index, total, dir, leaving }) {
  const isStudent = slide.type === 'student'
  const summary = isStudent
    ? `Student, ${slide.university}, ${slide.cls}`
    : `Mentor, PhD in ${slide.phd}`

  return (
    <article
      className={`hc-slide is-${slide.type} ${leaving ? 'is-leaving' : 'is-active'}`}
      style={{ '--hc-dir': String(dir) }}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${summary}`}
      aria-hidden={leaving ? 'true' : undefined}
    >
      <div className="hc-pw">
        <span className="hc-ring" />
        <div className="hc-photo">
          <img
            src={slide.photo}
            alt={isStudent ? `Theoria student, ${slide.university}` : `Theoria mentor, PhD in ${slide.phd}`}
            draggable="false"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget
              if (img.dataset.fallback) return
              img.dataset.fallback = '1'
              img.src = fallbackPhoto(slide.type)
            }}
          />
        </div>
        <div className="hc-role">
          <span className="hc-role-ico">{isStudent ? Icon.cap : Icon.award}</span>
          <span>
            <span className="hc-role-title">{isStudent ? 'Student' : 'Mentor'}</span>
            <span className="hc-role-sub">{LABEL[slide.type]}</span>
          </span>
        </div>
      </div>

      <div className="hc-iw">
        <div className="hc-info">
          {isStudent ? (
            <>
              <div className="hc-row" style={{ '--i': '0' }}>
                <span className="hc-ico">{Icon.uni}</span>
                <div className="hc-text">
                  <span className="hc-label">University</span>
                  <span className="hc-value">{slide.university}</span>
                </div>
              </div>
              <div className="hc-sep" style={{ '--i': '1' }} />
              <div className="hc-row" style={{ '--i': '2' }}>
                <span className="hc-ico">{Icon.cal}</span>
                <div className="hc-text">
                  <span className="hc-label">Class</span>
                  <span className="hc-value">{slide.cls}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="hc-row" style={{ '--i': '0' }}>
              <span className="hc-degree">PhD</span>
              <div className="hc-text">
                <span className="hc-label">Doctorate in</span>
                <span className="hc-value">{slide.phd}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

/* ---------- carousel ---------- */
export default function HeroCarousel() {
  const total = HERO_SLIDES.length

  const [current, setCurrent] = useState(0)
  const [userPaused, setUserPaused] = useState(prefersReducedMotion)
  // mounted slides: the active one + any that are still animating out
  const [instances, setInstances] = useState(() => [{ id: 0, index: 0, dir: 1, leaving: false }])

  const rootRef = useRef(null)
  const fillRefs = useRef([])
  const currentRef = useRef(0)
  const idRef = useRef(0)
  const elapsedRef = useRef(0)
  const timersRef = useRef(new Set())
  const hoverRef = useRef(false)
  const focusRef = useRef(false)
  const inViewRef = useRef(true)
  const swipeRef = useRef(null)

  /* ----- go to a slide ----- */
  const go = useCallback(
    (target, dir) => {
      const n = (target + total) % total
      if (n === currentRef.current) return
      const d = dir ?? (n > currentRef.current ? 1 : -1)

      currentRef.current = n
      elapsedRef.current = 0
      const id = ++idRef.current

      setCurrent(n)
      setInstances((prev) => [
        ...prev.map((i) => (i.leaving ? i : { ...i, leaving: true, dir: d })),
        { id, index: n, dir: d, leaving: false },
      ])

      const t = setTimeout(() => {
        timersRef.current.delete(t)
        setInstances((prev) => prev.filter((i) => !(i.leaving && i.id < id)))
      }, LEAVE_MS)
      timersRef.current.add(t)
    },
    [total]
  )

  const next = useCallback(() => go(currentRef.current + 1, 1), [go])
  const prev = useCallback(() => go(currentRef.current - 1, -1), [go])

  /* ----- progress bar reset / "held" state when paused ----- */
  useEffect(() => {
    elapsedRef.current = 0
    fillRefs.current.forEach((el, i) => {
      if (el) el.style.transform = i === current && userPaused ? 'scaleX(1)' : 'scaleX(0)'
    })
  }, [current, userPaused])

  /* ----- autoplay: one rAF loop drives both the timer and the progress bar ----- */
  useEffect(() => {
    if (userPaused) return undefined
    let raf = 0
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(now - last, 100) // clamp so a background tab can't jump ahead
      last = now

      const holding =
        hoverRef.current || focusRef.current || !inViewRef.current || document.hidden
      if (!holding) elapsedRef.current += dt

      const p = Math.min(elapsedRef.current / HERO_AUTOPLAY_MS, 1)
      const fill = fillRefs.current[currentRef.current]
      if (fill) fill.style.transform = `scaleX(${p})`

      if (p >= 1) {
        elapsedRef.current = 0
        go(currentRef.current + 1, 1)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [userPaused, go])

  /* ----- pause while off-screen ----- */
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* ----- swipe / drag ----- */
  useEffect(() => {
    const onUp = (e) => {
      const s = swipeRef.current
      if (!s) return
      swipeRef.current = null
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next()
        else prev()
      }
    }
    const onCancel = () => {
      swipeRef.current = null
    }
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onCancel)
    return () => {
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
    }
  }, [next, prev])

  /* ----- preload every photo so slides never pop in ----- */
  useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new Image()
      img.src = s.photo
    })
  }, [])

  /* ----- cleanup timers on unmount ----- */
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  const active = HERO_SLIDES[current]

  return (
    <div
      ref={rootRef}
      className="hc"
      data-type={active.type}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Students and mentors who research with Theoria"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { next(); e.preventDefault() }
        if (e.key === 'ArrowLeft') { prev(); e.preventDefault() }
      }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') hoverRef.current = true }}
      onPointerLeave={() => { hoverRef.current = false }}
      onFocus={(e) => { if (isFocusVisible(e.target)) focusRef.current = true }}
      onBlur={() => { focusRef.current = false }}
    >
      {/* decorative ambient layer */}
      <div className="hc-bg" aria-hidden="true">
        <div className="hc-blob hc-b1" />
        <div className="hc-blob hc-b2" />
        <div className="hc-orbit hc-o1">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="49" strokeWidth=".25" strokeDasharray="1 2.2" />
            <circle cx="50" cy="1.5" r="1.7" fill="currentColor" stroke="none" />
            <circle cx="12" cy="76" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <div className="hc-orbit hc-o2">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="49" strokeWidth=".22" />
            <circle cx="97" cy="62" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <div className="hc-dotgrid" />
        <span className="hc-sp hc-s1">✦</span>
        <span className="hc-sp hc-s2">✦</span>
        <span className="hc-sp hc-s3">✦</span>
      </div>

      <div
        className="hc-stage"
        aria-live={userPaused ? 'polite' : 'off'}
        onPointerDown={(e) => { swipeRef.current = { x: e.clientX, y: e.clientY } }}
      >
        {instances.map((inst) => (
          <Slide
            key={inst.id}
            slide={HERO_SLIDES[inst.index]}
            index={inst.index}
            total={total}
            dir={inst.dir}
            leaving={inst.leaving}
          />
        ))}
      </div>

      <div className="hc-controls">
        <div className="hc-dots" role="group" aria-label="Choose slide">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={`${s.type}-${i}`}
              type="button"
              className={`hc-dot${i === current ? ' is-on' : ''}`}
              aria-label={`Show slide ${i + 1} of ${total}: ${s.type}`}
              aria-current={i === current ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span className="hc-dot-track">
                <span className="hc-fill" ref={(el) => { fillRefs.current[i] = el }} />
              </span>
            </button>
          ))}
        </div>

        <div className="hc-btns">
          <button type="button" className="hc-btn" aria-label="Previous slide" onClick={prev}>
            {Icon.prev}
          </button>
          <button
            type="button"
            className="hc-btn"
            aria-label={userPaused ? 'Play autoplay' : 'Pause autoplay'}
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? Icon.play : Icon.pause}
          </button>
          <button type="button" className="hc-btn" aria-label="Next slide" onClick={next}>
            {Icon.next}
          </button>
        </div>
      </div>
    </div>
  )
}