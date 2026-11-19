import { useEffect, useRef, useState } from 'react'

/* LEFT: What Top Universities Say (text exactly as supplied).
   href: paste the official admissions page URL for each one. */
const SAYS = [
  {
    uni: 'MIT',
    title: 'Research Supplement',
    text: 'MIT permits an optional supplement for significant research outside regular classes, including an abstract or poster, publication citation and research-mentor recommendation.',
    source: 'MIT Admissions',
    linkLabel: 'Official MIT admissions page',
    href: 'https://mitadmissions.org/apply/firstyear/portfolios-additional-material/?utm_source=chatgpt.com',
  },
  {
    uni: 'Yale',
    title: 'STEM Research Supplement',
    text: 'Yale accepts optional science and engineering research materials, including research papers, abstracts or posters, and permits a mentor recommendation.',
    source: 'Undergraduate Admissions',
    linkLabel: 'Official Yale admissions page',
    href: 'https://admissions.yale.edu/supplementary?utm_source=chatgpt.com',
  },
  {
    uni: 'Harvard',
    title: 'Scholarly Articles & Academic Work',
    text: 'Harvard allows optional submission of primary-authored scholarly articles and research, with clear disclosure of collaborators and individual contribution.',
    source: 'Harvard Admissions',
    linkLabel: 'Official Harvard admissions page',
    href: 'https://college.harvard.edu/admissions/apply/application-requirements?utm_source=chatgpt.com',
  },
  {
    uni: 'Columbia',
    title: 'Academic Research Abstract',
    text: "Columbia's published admissions guidance has allowed optional research abstracts, including work in humanities and social sciences.",
    source: 'Columbia Undergraduate Admissions',
    linkLabel: 'Columbia admissions page',
    href: 'https://undergrad.admissions.columbia.edu/?utm_source=chatgpt.com',
  },
]

/* RIGHT: What Students Can Achieve (text exactly as supplied) */
const DOES = [
  {
    icon: 'award',
    title: 'Earn Recognition for Academic Excellence',
    text: 'Build a record of achievements that extends beyond grades and school activities. Journal publications, conference acceptances, competition awards, research presentations and independently evaluated projects can demonstrate intellectual curiosity, originality and academic initiative.',
  },
  {
    icon: 'globe',
    title: 'Compete at International Competitions',
    text: 'Present original research at prestigious international research competitions and conferences. Earn opportunities to have work evaluated by experts and compete alongside talented young researchers from around the world.',
  },
  {
    icon: 'leaf',
    title: 'Create a Real-World Impact',
    text: 'Apply research findings to challenges in healthcare, climate, technology, accessibility, education and society. Design and build evidence-based solutions, functional models or prototypes, then test and refine them to address genuine needs and create measurable social or environmental impact.',
  },
  {
    icon: 'book',
    title: 'Publish & Present Academic Research',
    text: 'Pursue publication in relevant peer-reviewed journals, present findings at academic conferences and participate in research symposia and poster presentations. Gain experience sharing original work with academic and research communities.',
  },
  {
    icon: 'compass',
    title: 'Explore Unanswered Questions',
    text: 'Investigate topics that go beyond established knowledge, challenge existing assumptions and explore questions that have not yet been adequately answered. Develop original insights and contribute new perspectives to a field.',
  },
]

function Ico({ n }) {
  const shapes = {
    award: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="M8.6 13.8 7 22l5-3 5 3-1.6-8.2" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3.2 3 14.8 0 18" />
        <path d="M12 3c-3 3.2-3 14.8 0 18" />
      </>
    ),
    leaf: (
      <>
        <path d="M12 21v-8" />
        <path d="M12 13c0-4-3-6-7-6 0 4 3 6 7 6Z" />
        <path d="M12 15c0-3.5 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.5Z" />
      </>
    ),
    book: (
      <>
        <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2Z" />
        <path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7Z" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1Z" />
      </>
    ),
    campus: (
      <>
        <path d="M3 9.5 12 4l9 5.5" />
        <path d="M5.5 11v7M9.8 11v7M14.2 11v7M18.5 11v7" />
        <path d="M3 20.5h18" />
      </>
    ),
    rocket: (
      <>
        <path d="M12 3c3.5 2 5.5 5.5 5.5 9.5L12 18l-5.5-5.5C6.5 8.5 8.5 5 12 3Z" />
        <circle cx="12" cy="10" r="1.8" />
        <path d="M8 17l-2.5 3.5M16 17l2.5 3.5" />
      </>
    ),
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[n]}
    </svg>
  )
}

export default function ResearchImportance() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  /* reveal once, when the section scrolls into view */
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={'wy-section' + (seen ? ' is-in' : '')}
      id="why-research-matters"
      aria-labelledby="wy-title"
    >
      <div className="shell">
        <header className="wy-head">
          <h2 id="wy-title">
            Why <span className="wy-accent">Research Matters</span> in High School
          </h2>
          {/* <span className="wy-rule" aria-hidden="true" /> */}
        </header>

        <div className="wy-grid">
          {/* LEFT */}
          <div className="wy-panel wy-panel-say" role="group" aria-labelledby="wy-say">
            <div className="wy-ph">
              <span className="wy-ph-ico"><Ico n="campus" /></span>
              <h3 id="wy-say">What Top Universities Say</h3>
            </div>

            <ul className="wy-list" role="list">
              {SAYS.map((s, i) => (
                <li key={s.uni} className="wy-li" style={{ '--i': i }}>
                  <div className="wy-card wy-card-say">
                    <span className="wy-uni">{s.uni}</span>
                    <h4 className="wy-ct">{s.title}</h4>
                    <p className="wy-cp">{s.text}</p>
                    <div className="wy-foot">
                      {s.source !== s.uni && <span className="wy-src">{s.source}</span>}
                      {s.linkLabel &&
                        (s.href ? (
                          <a className="wy-link" href={s.href} target="_blank" rel="noopener noreferrer">
                            {s.linkLabel} <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <span className="wy-link wy-link-off">{s.linkLabel}</span>
                        ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="wy-panel wy-panel-do" role="group" aria-labelledby="wy-do">
            <div className="wy-ph">
              <span className="wy-ph-ico"><Ico n="rocket" /></span>
              <h3 id="wy-do">What Students Can Achieve</h3>
            </div>

            <ul className="wy-list" role="list">
              {DOES.map((d, i) => (
                <li key={d.title} className="wy-li" style={{ '--i': i }}>
                  <div className="wy-card wy-card-do">
                    <div className="wy-row">
                      <span className="wy-ico"><Ico n={d.icon} /></span>
                      <h4 className="wy-ct">{d.title}</h4>
                    </div>
                    <p className="wy-cp">{d.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}




















// import { useEffect, useRef, useState } from 'react'

// // text is exactly as supplied (label + description)
// const ITEMS = [
//   {
//     icon: 'globe',
//     label: 'International validation',
//     text: "Independent recognition can establish that a student's work stands out beyond school-level achievements.",
//   },
//   {
//     icon: 'cap',
//     label: 'Stronger university candidature',
//     text: 'Competitive distinctions can provide compelling evidence of intellectual ability, originality, initiative and achievement.',
//   },
//   {
//     icon: 'flask',
//     label: 'Higher-quality research',
//     text: 'Preparing for rigorous judging encourages stronger methods, evidence, innovation and presentation.',
//   },
//   {
//     icon: 'mic',
//     label: 'Exposure and confidence',
//     text: 'Students learn to communicate their work to experts and compete alongside talented peers internationally.',
//   },
// ]

// // where each icon sits on the orbit ring (x, y in %)
// const POS = [
//   ['50%', '0%'],
//   ['100%', '50%'],
//   ['50%', '100%'],
//   ['0%', '50%'],
// ]

// function Ico({ n }) {
//   const shapes = {
//     globe: (
//       <>
//         <circle cx="12" cy="12" r="9" />
//         <path d="M3 12h18" />
//         <path d="M12 3c3 3.2 3 14.8 0 18" />
//         <path d="M12 3c-3 3.2-3 14.8 0 18" />
//       </>
//     ),
//     cap: (
//       <>
//         <path d="M2 9l10-5 10 5-10 5-10-5z" />
//         <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
//         <path d="M22 9v6" />
//       </>
//     ),
//     flask: (
//       <>
//         <path d="M9 3h6" />
//         <path d="M10 3v6.2L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.2V3" />
//         <path d="M7.5 15h9" />
//       </>
//     ),
//     mic: (
//       <>
//         <rect x="9" y="2.5" width="6" height="11" rx="3" />
//         <path d="M5 11a7 7 0 0 0 14 0" />
//         <path d="M12 18v3.5" />
//         <path d="M8.5 21.5h7" />
//       </>
//     ),
//     bulb: (
//       <>
//         <path d="M9 18h6" />
//         <path d="M10 21h4" />
//         <path d="M12 3a6 6 0 0 0-3.6 10.8c.9.7 1.6 1.7 1.6 2.7V17h4v-.5c0-1 .7-2 1.6-2.7A6 6 0 0 0 12 3z" />
//       </>
//     ),
//   }
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//       focusable="false"
//     >
//       {shapes[n]}
//     </svg>
//   )
// }

// export default function ResearchImportance() {
//   const ref = useRef(null)
//   const [seen, setSeen] = useState(false)

//   // reveal once, when the section scrolls into view
//   useEffect(() => {
//     const el = ref.current
//     if (!el) return undefined
//     if (typeof IntersectionObserver === 'undefined') {
//       setSeen(true)
//       return undefined
//     }
//     const io = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) {
//           setSeen(true)
//           io.disconnect()
//         }
//       },
//       { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
//     )
//     io.observe(el)
//     return () => io.disconnect()
//   }, [])

//   return (
//     <section
//       ref={ref}
//       className={'ri-section' + (seen ? ' is-in' : '')}
//       id="why-research-matters"
//       aria-labelledby="ri-title"
//     >
//       <div className="shell">
//         <div className="ri-wrap">
//           {/* left: title + animated orbit */}
//           <div className="ri-left">
//             <div className="ri-head">
//               <h2 id="ri-title">
//                 Why is research important for a high school student?
//               </h2>
//               <span className="ri-rule" aria-hidden="true" />
//             </div>

//             <div className="ri-orbit" aria-hidden="true">
//               <span className="ri-glow" />
//               <span className="ri-ring ri-ring-a">
//                 {ITEMS.map((it, i) => (
//                   <span key={it.icon} className="ri-node" style={{ '--x': POS[i][0], '--y': POS[i][1] }}>
//                     <span className="ri-node-in"><Ico n={it.icon} /></span>
//                   </span>
//                 ))}
//               </span>
//               <span className="ri-ring ri-ring-b" />
//               <span className="ri-core"><Ico n="bulb" /></span>
//             </div>
//           </div>

//           {/* right: the four points */}
//           <ul className="ri-list">
//             {ITEMS.map((it, i) => (
//               <li key={it.label} className="ri-item" style={{ '--i': i }}>
//                 <span className="ri-ico"><Ico n={it.icon} /></span>
//                 <div className="ri-body">
//                   <h3 className="ri-label">{it.label}</h3>
//                   <p className="ri-text">{it.text}</p>
//                 </div>
//                 <span className="ri-bar" aria-hidden="true" />
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   )
// }