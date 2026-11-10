import { useState, useId } from 'react'
import { FAQS } from '../data/faqs'

const delay = (ms) => ({ '--d': ms + 'ms' })

export default function CommonQuestions() {
  const [openIndex, setOpenIndex] = useState(0) // first question open by default
  const uid = useId()

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i))

  return (
    <section className="bg-white">
      <div className="shell">
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-1 lg:gap-1">
          <div className="">
            <h2>Frequently asked questions</h2>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i
              const btnId = `${uid}-btn-${i}`
              const panelId = `${uid}-panel-${i}`

              return (
                <div
                  key={item.q}
                  className="rv"
                  style={delay(Math.min(i, 5) * 60)}
                >
                  <div
                    className={
                      'relative overflow-hidden rounded-[14px] border border-solid bg-white transition-[border-color,box-shadow] duration-300 ' +
                      (isOpen
                        ? 'border-[#cdd6f5] shadow-card'
                        : 'border-line hover:border-[#cdd6f5]')
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
                        className="m-0 flex w-full items-center gap-4 border-0 bg-transparent px-5 py-5 text-left sm:px-7 sm:py-6 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#B68AF6]"
                      >
                        <span
                          className={
                            'w-11 shrink-0 font-display text-[28px] leading-none transition-colors duration-300 ' +
                            (isOpen ? 'text-brand-purple' : 'text-[#B7C3F2]')
                          }
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <span className="flex-1 font-display text-[1.1rem] font-medium leading-[1.3] text-navy sm:text-[1.25rem]">
                          {item.q}
                        </span>

                        <span
                          aria-hidden="true"
                          className={
                            'grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ' +
                            (isOpen
                              ? 'rotate-45 bg-grad text-navy'
                              : 'bg-tint text-brand-purple-d')
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
                        <p className="m-0 px-5 pb-6 text-[14.5px] leading-[1.75] text-muted sm:pl-[88px] sm:pr-8 sm:pb-7">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}