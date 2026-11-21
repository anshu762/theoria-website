import { useState, useCallback, useEffect, useRef } from 'react'
import { MENTOR_UNIVERSITIES } from '../data/mentorUniversities'



const d = (ms) => ({ '--d': ms + 'ms' })



// scroll speed of the strip, in pixels per second
const SPEED = 70



// smallest acceptable size for the tiny website-icon fallback (avoids blur)
const MIN_PX = 64
const isFavicon = (src) => src.includes('google.com/s2/favicons')



// `idx` = which entry of u.sources is being shown (kept in the parent so the
// card and its marquee copy always use the same one)
function MentorLogo({ u, idx, onFail }) {
  const src = u.sources[idx]



  // every source failed -> initials badge
  if (!src) {
    return <span className="mu-mono" aria-hidden="true">{u.mono}</span>
  }



  return (
    <img
      key={src}
      src={src}
      alt=""
      width="48"
      height="48"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={(e) => {
        // a tiny website icon would look blurry -> treat it as failed
        if (isFavicon(src) && e.currentTarget.naturalWidth < MIN_PX) onFail(u, idx)
      }}
      onError={() => onFail(u, idx)}
    />
  )
}



export default function MentorLogos() {
  // slug -> index of the source currently used
  const [tried, setTried] = useState({})
  const laneRef = useRef(null)



  const onFail = useCallback((u, i) => {
    if (import.meta.env.DEV) {
      console.info(`[mentor logo] failed: ${u.name} -> ${u.sources[i]}`)
    }
    // only advance if this failure is for the source currently shown
    // (the card and its copy both report the same failure)
    setTried((t) => ((t[u.slug] ?? 0) === i ? { ...t, [u.slug]: i + 1 } : t))
  }, [])



  const total = MENTOR_UNIVERSITIES.length



  // cards are now as wide as their content, so the loop distance is MEASURED:
  // distance between the first card and its copy = one full set of logos
  useEffect(() => {
    const lane = laneRef.current
    if (!lane) return undefined



    const measure = () => {
      const a = lane.children[0]
      const b = lane.children[total]
      if (!a || !b) return
      const dist = b.offsetLeft - a.offsetLeft
      if (dist <= 0) return
      if (lane.dataset.dist !== String(dist)) {
        lane.dataset.dist = String(dist)
        lane.style.setProperty('--mu-dist', dist + 'px')
        lane.style.setProperty('--mu-dur', (dist / SPEED).toFixed(1) + 's')
      }
      lane.dataset.ready = '1'
    }



    measure()
    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(measure)
      ro.observe(lane)
    }
    window.addEventListener('resize', measure)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)



    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [total])



  return (
    <section
      className="mu-section"
      id="mentor-network"
      aria-labelledby="mentor-network-title"
    >
      <div className="shell">
        {/* title on the left */}
        <div className="mu-head rv">
          <h2 id="mentor-network-title">Our Mentor <span className="mn-accent">Network</span></h2>
          <span className="mu-rule" aria-hidden="true" />
        </div>



        {/* one auto-scrolling strip: every university once, then once more
            (the copy makes the loop seamless) */}
        <div className="mu-marquee rv" style={d(120)}>
          <ul
            className="mu-lane"
            ref={laneRef}
            aria-label="Universities our mentors belong to"
          >
            {[...MENTOR_UNIVERSITIES, ...MENTOR_UNIVERSITIES].map((u, k) => {
              const dup = k >= total
              return (
                <li
                  key={u.slug + '-' + k}
                  className={'mu-card' + (dup ? ' is-dup' : '')}
                  style={{ '--i': k % total }}
                  aria-hidden={dup ? 'true' : undefined}
                >
                  <span className="mu-logo">
                    <MentorLogo u={u} idx={tried[u.slug] ?? 0} onFail={onFail} />
                  </span>
                  <span className="mu-name">{u.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}