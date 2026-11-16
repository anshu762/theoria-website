const d = (ms) => ({ '--d': `${ms}ms` })

/* ───────── FILL THESE IN ───────── */
const FOUNDER = {
  name: 'Rohit Shorey',
  role: 'Founder & CEO',
  photo: 'https://univisory.org/cdn/images/aboutUs/dir.webp',
}
/* ───────────────────────────────── */

const NOTE = [
  'We started Theoria with a simple belief: young students are capable of much more than we give them the opportunity to explore.',
  'Over the years at UniVisory, I have sat across the table from hundreds of students. Many were brilliant: top grades, long lists of achievements, big ambitions. But one question kept coming back to me after those conversations.',
  'How many of them had the chance to find something out for themselves?',
  'That question became the inspiration for Theoria.',
  'I believe young minds can do far more than we usually let them. Theoria gives high school students a place to go beyond the textbook and feel what real research is like: the uncertainty, the dead ends, the breakthroughs. Accomplished researchers and mentors walk alongside them the whole way.',
  'We believe credible research demands curiosity, originality, academic rigor and independent validation. A publication in a respected journal or conference is a meaningful achievement, but its real value comes from the quality of thinking and work behind it.',
  'As part of UniVisory, Theoria brings a broader perspective helping students connect their research with their evolving academic interests, future opportunities and university aspirations.',
  'Our ambition is not simply to help students build impressive profiles. It is to help them become independent thinkers, confident investigators and young scholars capable of making meaningful contributions.',
  'Because the greatest outcome of research is not always what a student discovers. Sometimes, it is discovering what they are capable of.',
]

export default function About() {
  return (
    <div className="page fn-page">
      <section className="fn-founder" aria-labelledby="fn-title">
        <div className="shell">
          <div className="fn-grid">
            {/* LEFT — Founder image */}
            <div className="fn-side rv" style={d(0)}>
              <figure className="fn-photo">
                <div className="fn-photo-frame">
                  <img
                    src={FOUNDER.photo}
                    alt={
                      FOUNDER.name
                        ? `${FOUNDER.name}, ${FOUNDER.role || 'Founder'}`
                        : 'Founder of Theoria'
                    }
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {(FOUNDER.name || FOUNDER.role) && (
                  <figcaption className="fn-caption">
                    {FOUNDER.name && <strong>{FOUNDER.name}</strong>}
                    {FOUNDER.role && <span>{FOUNDER.role}</span>}
                  </figcaption>
                )}
              </figure>

              <div className="fn-side-glow" aria-hidden="true" />
            </div>

            {/* RIGHT — Simple founder note */}
            <article className="fn-note" aria-labelledby="fn-title">
              <header className="fn-head rv" style={d(120)}>
                <h2 id="fn-title">
                  Founder&rsquo;s <span className="fn-accent">note</span>
                </h2>
              </header>

              <div className="fn-note-body">
                {NOTE.map((text, i) => (
                  <p
                    key={i}
                    className="fn-note-line rv"
                    style={d(240 + i * 70)}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}











// const d = (ms) => ({ '--d': `${ms}ms` })

// /* ───────── FILL THESE IN ───────── */
// const FOUNDER = {
//   name: '',
//   role: '',
//   photo: 'https://univisory.org/cdn/images/aboutUs/dir.webp',
// }
// /* ───────────────────────────────── */

// const NOTE = [
//   'We started Theoria with a simple belief: young students are capable of much more than we give them the opportunity to explore.',
//   'Over the years at UniVisory, I have sat across the table from hundreds of students. Many were brilliant: top grades, long lists of achievements, big ambitions. But one question kept coming back to me after those conversations.',
//   'How many of them had the chance to find something out for themselves?',
//   'That question became the inspiration for Theoria.',
//   'I believe young minds can do far more than we usually let them. Theoria gives high school students a place to go beyond the textbook and feel what real research is like: the uncertainty, the dead ends, the breakthroughs. Accomplished researchers and mentors walk alongside them the whole way.',
//   'We believe credible research demands curiosity, originality, academic rigor and independent validation. A publication in a respected journal or conference is a meaningful achievement, but its real value comes from the quality of thinking and work behind it.',
//   'As part of UniVisory, Theoria brings a broader perspective helping students connect their research with their evolving academic interests, future opportunities and university aspirations.',
//   'Our ambition is not simply to help students build impressive profiles. It is to help them become independent thinkers, confident investigators and young scholars capable of making meaningful contributions.',
//   'Because the greatest outcome of research is not always what a student discovers. Sometimes, it is discovering what they are capable of.',
// ]

// const kind = (i) =>
//   i === 0 ? 'fn-first'
//   : i === 2 ? 'fn-ask'
//   : i === 3 ? 'fn-turn'
//   : i === NOTE.length - 1 ? 'fn-last'
//   : ''

// export default function About() {
//   return (
//     <div className="page fn-page">
//       <section className="fn-founder" aria-labelledby="fn-title">
//         <div className="shell">
//           <div className="fn-grid">
//             {/* LEFT — Founder image */}
//             <div className="fn-side rv" style={d(0)}>
//               <figure className="fn-photo">
//                 <div className="fn-photo-frame">
//                   <img
//                     src={FOUNDER.photo}
//                     alt={
//                       FOUNDER.name
//                         ? `${FOUNDER.name}, ${FOUNDER.role || 'Founder'}`
//                         : 'Founder of Theoria'
//                     }
//                     loading="lazy"
//                     decoding="async"
//                   />
//                 </div>

//                 {(FOUNDER.name || FOUNDER.role) && (
//                   <figcaption className="fn-caption">
//                     {FOUNDER.name && <strong>{FOUNDER.name}</strong>}
//                     {FOUNDER.role && <span>{FOUNDER.role}</span>}
//                   </figcaption>
//                 )}
//               </figure>

//               <div className="fn-side-glow" aria-hidden="true" />
//             </div>

//             {/* RIGHT — Full founder note */}
//             <article className="fn-note" aria-labelledby="fn-title">
//               <header className="fn-head rv" style={d(120)}>
//                 <h2 id="fn-title">
//                   Founder&rsquo;s <span className="fn-accent">note</span>
//                 </h2>
//               </header>

//               <div className="fn-note-body">
//                 {NOTE.map((text, i) => (
//                   <p
//                     key={i}
//                     className={`fn-note-line rv ${kind(i)}`.trim()}
//                     style={d(240 + i * 70)}
//                   >
//                     {text}
//                   </p>
//                 ))}
//               </div>
//             </article>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }