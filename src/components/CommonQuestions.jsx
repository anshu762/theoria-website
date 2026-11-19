import { useState, useId, useRef } from 'react'
import { FAQS } from '../data/faqs'

const delay = (ms) => ({ '--d': ms + 'ms' })

const INITIAL = 5 // how many questions show before "Explore more"

export default function CommonQuestions() {
  const [openIndex, setOpenIndex] = useState(null) // all closed by default
  const [showAll, setShowAll] = useState(false)
  const uid = useId()
  const headRef = useRef(null)

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i))

  const hasMore = FAQS.length > INITIAL
  const visible = showAll ? FAQS : FAQS.slice(0, INITIAL)
  const moreId = `${uid}-more`

  const toggleMore = () => {
    if (showAll) {
      // collapsing: close any open hidden question, go back to the heading
      setOpenIndex((cur) => (cur !== null && cur >= INITIAL ? null : cur))
      setShowAll(false)
      requestAnimationFrame(() => {
        headRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      setShowAll(true)
    }
  }

  return (
    <section className="bg-white">
      <div className="shell">
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-1 lg:gap-1">
          <div className="" ref={headRef}>
            <h2>Frequently asked questions</h2>
          </div>

          {/* Accordion */}
          <div id={moreId} className="flex flex-col gap-3">
            {visible.map((item, i) => {
              const isOpen = openIndex === i
              const btnId = `${uid}-btn-${i}`
              const panelId = `${uid}-panel-${i}`
              const isExtra = i >= INITIAL

              return (
                <div
                  key={item.q}
                  className={isExtra ? 'cq-more-in' : 'rv'}
                  style={delay(isExtra ? (i - INITIAL) * 70 : Math.min(i, 5) * 60)}
                >
                  <div
                    className={
                      'relative overflow-hidden rounded-[14px] border border-solid bg-white transition-[border-color,box-shadow] duration-300 ' +
                      (isOpen
                        ? 'border-[#123B37] shadow-card'
                        : 'border-line hover:border-[#123B37]')
                    }
                  >
                    {/* gradient accent bar */}
                    <span
                      className={
                        'absolute bottom-0 left-0 top-0 w-1 bg-grad transition-opacity duration-300 ' +
                        (isOpen ? 'opacity-100' : 'opacity-0')
                      }
                    />

                    <h3 className="m-0">
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(i)}
                        className="m-0 flex w-full items-center gap-4 border-0 bg-transparent px-5 py-5 text-left sm:px-7 sm:py-6 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#123B37]"
                      >
                        <span className="flex-1 text-[1.1rem] font-semibold leading-[1.3] text-[#123B37] sm:text-[1.25rem]">
                          {item.q}
                        </span>

                        <span
                          aria-hidden="true"
                          className={
                            'grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ' +
                            (isOpen
                              ? 'rotate-45 bg-grad text-[#123B37]'
                              : 'bg-tint text-[#123B37]')
                          }
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    {/* Smooth open / close (grid-rows 0fr -> 1fr) */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={
                        'grid transition-[grid-template-rows,visibility] duration-300 ease-out ' +
                        (isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]')
                      }
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="m-0 px-5 pb-6 text-[16.5px] leading-[1.75] text-[#123B37] sm:pl-7 sm:pr-8 sm:pb-7">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Explore more / Show fewer */}
          {hasMore && (
            <div className="cq-more-wrap">
              <button
                type="button"
                className="btn secondary cq-more-btn"
                aria-expanded={showAll}
                aria-controls={moreId}
                onClick={toggleMore}
                style={{ padding: '14px 28px' }}
              >
                {showAll ? 'Show fewer questions' : 'Explore more questions'}
                <svg
                  className={'cq-more-ico' + (showAll ? ' is-up' : '')}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}