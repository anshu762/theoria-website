import { useLayoutEffect } from 'react'

/* Scales the hero down (never up) so the text + paper card fit in ONE screen
   at 100% zoom: above the header, above the bottom banner, inside the width.
   Works at any window size / browser zoom. Desktop+laptop only (>=1021px). */
const MIN = 0.6

export default function HeroFit() {
  useLayoutEffect(() => {
    const hero  = document.querySelector('.hero')
    const inner = hero && hero.querySelector('.hero-inner')
    if (!hero || !inner) return

    const copy = inner.querySelector('.hero-copy')
    const rp   = inner.querySelector('.rp')
    const mq   = window.matchMedia('(max-width:1020px)')
    let raf = 0
    let last = 1
    const timers = []

    const fit = () => {
      if (mq.matches) {
        hero.style.removeProperty('--hz')
        last = 1
        return
      }

      /* measure at natural size */
      hero.style.setProperty('--hz', '1')
      inner.classList.add('hz-measure')

      let natH = 0
      if (copy && copy.children.length) {
        const f = copy.firstElementChild
        const l = copy.lastElementChild
        natH = l.offsetTop + l.offsetHeight - f.offsetTop
      }
      if (rp) natH = Math.max(natH, rp.offsetHeight, rp.scrollHeight)

      const natW    = inner.scrollWidth
      const clientW = inner.clientWidth

      inner.classList.remove('hz-measure')

      /* visible room: below header, above the sticky banner, minus hero padding */
      const cs   = getComputedStyle(hero)
      const padV = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0)
      const top  = hero.getBoundingClientRect().top + window.scrollY
      const banEl = document.querySelector('.bottomBanner')
      const ban  = banEl ? banEl.offsetHeight : 0
      const availH = window.innerHeight - top - ban - padV - 8

      const kH = natH > 0 ? availH / natH : 1
      const kW = natW > 0 ? clientW / natW : 1
      let k = Math.min(1, kH, kW)
      if (!isFinite(k) || k > 0.985) k = 1
      k = Math.max(MIN, Math.round(k * 1000) / 1000)

      if (Math.abs(k - last) > 0.004 || k === 1) {
        last = k
        if (k === 1) hero.style.removeProperty('--hz')
        else hero.style.setProperty('--hz', String(k))
      } else {
        hero.style.setProperty('--hz', String(last))
      }
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    }

    fit()
    window.addEventListener('resize', schedule)
    window.addEventListener('orientationchange', schedule)
    window.addEventListener('load', schedule)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule)
    ;[250, 900, 2000].forEach((t) => timers.push(setTimeout(schedule, t)))

    let ro
    if (typeof ResizeObserver !== 'undefined' && copy) {
      ro = new ResizeObserver(schedule)
      ro.observe(copy)
    }

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('orientationchange', schedule)
      window.removeEventListener('load', schedule)
      if (ro) ro.disconnect()
      hero.style.removeProperty('--hz')
    }
  }, [])

  return null
}