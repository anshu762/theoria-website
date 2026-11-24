import { Link } from 'react-router-dom'

const d = (ms) => ({ '--d': ms + 'ms' })

const REASONS = [
  { title: 'International Validation', icon: 'award' },
  { title: 'Stronger University Application', icon: 'cap' },
  { title: 'Rigorous Research Preparation', icon: 'flask' },
  { title: 'Global Exposure', icon: 'globe' },
]

/* From Original Research to Global Recognition */
const OPPS = [
  {
    tag: 'INTERNATIONAL SCIENCE COMPETITION',
    title: 'Regeneron ISEF',
    text: 'An international platform for young scientists and engineers to present original investigations.',
    who: 'Grades 9–12 · Affiliated fair qualification',
    crit: 'Originality, scientific methodology, evidence and independent contribution.',
    url: 'https://www.societyforscience.org/isef/',
  },
  {
    tag: 'NATIONAL SCIENTIFIC RECOGNITION',
    title: 'IRIS National Fair',
    text: 'A platform for young researchers in India to showcase original scientific investigations and innovative projects.',
    who: 'India · Cycle-specific eligibility',
    crit: 'Scientific investigation, innovation and project presentation.',
    url: 'https://irisnationalfair.org/',
  },
  {
    tag: 'SELECTIVE RESEARCH PROGRAM',
    title: 'Research Science Institute (RSI)',
    text: 'A selective six-week summer academic and research experience for high-school STEM students.',
    who: 'Typically Grade 11 · Country-specific eligibility',
    crit: 'Academic distinction, intellectual curiosity and research potential.',
    url: 'https://www.cee.org/programs/apply-rsi',
  },
  {
    tag: 'RESEARCH-LED INNOVATION',
    title: 'MIT Solve Challenges',
    text: 'Global innovation opportunities focused on technology-enabled solutions to significant societal and environmental challenges.',
    who: 'Challenge-specific eligibility; not exclusively for students',
    crit: 'Solution effectiveness, feasibility, impact and scalability.',
    url: 'https://solve.mit.edu/',
  },
]

/* What Makes Research Worthy of Recognition? */
const WORTHY = [
  { title: 'Original research question', text: 'Identify a meaningful gap in existing knowledge.' },
  { title: 'Rigorous methodology', text: 'Use appropriate analytical, experimental or computational methods.' },
  { title: 'Evidence & validation', text: 'Support findings with appropriate tests, benchmarks and checks.' },
  { title: 'Intellectual independence', text: 'Demonstrate the student’s own understanding and contribution.' },
  { title: 'Meaningful impact', text: 'Explore how findings advance knowledge or inform solutions.' },
  { title: 'Scholarly communication', text: 'Explain methods, findings and limitations with clarity.' },
]

const STEPS = [
  {
    no: '1',
    title: 'DISCOVER',
    text: "We identify international competitions, research programs and awards that align with the student's research area, academic interests, grade level and eligibility.",
  },
  {
    no: '2',
    title: 'PLAN',
    text: 'We create an International Recognition Plan outlining suitable opportunities, selection criteria, application timelines and the preparation required for each.',
  },
  {
    no: '3',
    title: 'PREPARE',
    text: 'With our guidance, students refine their research, strengthen their evidence, develop application materials, and prepare to present their work.',
  },
  {
    no: '4',
    title: 'TRACK & SUBMIT',
    text: 'We track key milestones, review application readiness and guide students through eligible submissions, interviews and judging or presentation preparation.',
  },
]

function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24', width: 28, height: 28, fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, focusable: 'false',
  }
  switch (name) {
    case 'award':
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="6" />
          <path d="M8.5 14.5 7 21l5-2.5 5 2.5-1.5-6.5" />
          <path d="m9.3 9 2 2 3.4-3.6" />
        </svg>
      )
    case 'cap':
      return (
        <svg {...common}>
          <path d="m2 9 10-5 10 5-10 5z" />
          <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
          <path d="M22 9v6" />
        </svg>
      )
    case 'flask':
      return (
        <svg {...common}>
          <path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4A1.5 1.5 0 0 0 19 19l-5-10V3" />
          <path d="M7.5 15h9" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      )
  }
}

export default function BeyondResearch() {
  return (
    <div className="page bd-page">
      {/* ───────── HERO ───────── */}
      <section className="bd-hero">
        <div className="shell bd-hero-in">
          <div className="bd-copy">
            <h1 className="rv" style={d(0)}>
              Going Beyond Research: <span className="bd-h1-b">International Competition Preparation</span>
            </h1>

            <p className="bd-lead rv" style={d(100)}>
              Taking exceptional student research to global stage.
            </p>

            <p className="rv" style={d(180)}>
              We believe a research paper or project is not an end of a student's journey. It is the beginning of what they can achieve with it. We help students identify and pursue opportunities to showcase their work on international platforms, from prestigious science fairs and research programs to global innovation challenges and academic awards.
            </p>
            <p className="rv" style={d(300)}>
              These may include opportunities such as{' '}
              <span className="uq-accent">IRIS, Regeneron ISEF, the Research Science Institute (RSI), MIT</span>{' '}
              Solve challenges, and other competitions aligned with the student's research, interests and eligibility.
            </p>

            <div className="actions rv" style={d(360)}>
              <Link className="btn beyondBtn" to="/programs">
                Explore our research programs <span className="arr">→</span>
              </Link>
            </div>
          </div>

          {/* decorative globe + competition chips */}
          <div className="bd-art rv" style={d(200)} aria-hidden="true">
            <span className="bd-glow" />
            <span className="bd-ring bd-r1" />
            <span className="bd-ring bd-r2" />
            <svg className="bd-globe" viewBox="0 0 200 200" focusable="false">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="100" cy="100" r="80" />
                <ellipse cx="100" cy="100" rx="55" ry="80" />
                <ellipse cx="100" cy="100" rx="25" ry="80" />
                <path d="M20 100h160" />
                <ellipse cx="100" cy="100" rx="80" ry="28" />
                <ellipse cx="100" cy="100" rx="80" ry="58" />
              </g>
            </svg>
            <svg className="bd-book" viewBox="0 0 120 100" focusable="false">
              <use href="#ic" width="120" height="100" filter="url(#ic-cream)" />
            </svg>

            {/* <span className="bd-chip bd-c1"><i />IRIS</span>
            <span className="bd-chip bd-c2"><i />Regeneron ISEF</span>
            <span className="bd-chip bd-c3"><i />RSI</span>
            <span className="bd-chip bd-c4"><i />MIT Solve</span> */}

            {/* names along the bottom of the panel */}
            <span className="bd-cap">IRIS · Regeneron ISEF · RSI · MIT Solve</span>
          </div>
        </div>
      </section>

      {/* ───────── FROM ORIGINAL RESEARCH TO GLOBAL RECOGNITION ───────── */}
      <section className="bd-opp" id="opportunities">
        <div className="shell">
          <div className="bd-opp-head rv">
            <span className="bd-opp-eye">EXPANDING THE POSSIBILITIES</span>
            <h2>From Original Research to <span className="bd-why-x">Global Recognition</span></h2>
            <p>
              Discover scientific competitions, selective academic programs and innovation platforms aligned with the nature and maturity of a student’s work.
            </p>
          </div>

          <ul className="bd-opp-grid">
            {OPPS.map((o, i) => (
              <li className="bd-opp-li rv" key={o.title} style={d(i * 100)}>
                <article className="bd-opp-card">
                  <p className="bd-opp-tag">{o.tag}</p>
                  <h3>{o.title}</h3>
                  <p className="bd-opp-intro">{o.text}</p>
                  <hr className="bd-opp-rule" />
                  <p className="bd-opp-who">{o.who}</p>
                  <p className="bd-opp-crit">{o.crit}</p>
                  <a
                    className="bd-opp-link"
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${o.title} official website (opens in a new tab)`}
                  >
                    Official website <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </li>
            ))}
          </ul>

          <p className="bd-opp-note rv">
            Opportunities are independently administered. Eligibility and selection requirements vary by cycle. Participation, selection, publication and awards are not guaranteed.
          </p>
        </div>
      </section>

      {/* ───────── WHAT MAKES RESEARCH WORTHY OF RECOGNITION ───────── */}
      <section className="bd-wk" aria-labelledby="bd-wk-title">
        <div className="shell">
          <div className="bd-wk-head rv">
            <h2 id="bd-wk-title">What Makes Research Worthy of Recognition?</h2>
            <p>Recognition begins with the quality of the research itself.</p>
          </div>

          <ul className="bd-wk-grid">
            {WORTHY.map((w, i) => (
              <li className="bd-wk-li rv" key={w.title} style={d((i % 3) * 100)}>
                <article className="bd-wk-card">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── OUR APPROACH ───────── */}
      <section className="bd-way">
        <div className="shell">
          <div className="bd-way-head rv">
            <h2>From Research to Recognition: <span className="bd-why-x">Our Approach</span></h2>
            <p>
              We develop a structured pathway to help students identify the right opportunities and prepare themselves.
            </p>
          </div>

          <ol className="bd-steps">
            {STEPS.map((s, i) => (
              <li className="bd-step rv" key={s.title} style={d(i * 120)}>
                <span className="bd-step-no">{s.no}</span>
                <div className="bd-step-card">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <hr className="bd-way-rule" />

          <div className="bd-close rv">
            <div className="bd-close-copy">
              <p>
                We want students to see how far their ideas can go. Through personalised opportunity mapping, structured preparation and continuous progress tracking, we help students take their research beyond completion and towards meaningful international recognition. The goal is not simply to participate in competitions. It is to develop work that is worthy of being recognised.
              </p>
            </div>

            <div className="bd-close-cta">
              <h3>Explore what your research could achieve.</h3>
              <Link className="btn" to="/programs">
                Discover Theoria's Research Programs <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



















// import { Link } from 'react-router-dom'

// const d = (ms) => ({ '--d': ms + 'ms' })

// const REASONS = [
//   { title: 'International Validation', icon: 'award' },
//   { title: 'Stronger University Application', icon: 'cap' },
//   { title: 'Rigorous Research Preparation', icon: 'flask' },
//   { title: 'Global Exposure', icon: 'globe' },
// ]

// const STEPS = [
//   {
//     no: '1',
//     title: 'DISCOVER',
//     text: "We identify international competitions, research programs and awards that align with the student's research area, academic interests, grade level and eligibility.",
//   },
//   {
//     no: '2',
//     title: 'PLAN',
//     text: 'We create an International Recognition Plan outlining suitable opportunities, selection criteria, application timelines and the preparation required for each.',
//   },
//   {
//     no: '3',
//     title: 'PREPARE',
//     text: 'With our guidance, students refine their research, strengthen their evidence, develop application materials, and prepare to present their work.',
//   },
//   {
//     no: '4',
//     title: 'TRACK & SUBMIT',
//     text: 'We track key milestones, review application readiness and guide students through eligible submissions, interviews and judging or presentation preparation.',
//   },
// ]

// function Icon({ name }) {
//   const common = {
//     viewBox: '0 0 24 24', width: 28, height: 28, fill: 'none', stroke: 'currentColor',
//     strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
//     'aria-hidden': true, focusable: 'false',
//   }
//   switch (name) {
//     case 'award':
//       return (
//         <svg {...common}>
//           <circle cx="12" cy="9" r="6" />
//           <path d="M8.5 14.5 7 21l5-2.5 5 2.5-1.5-6.5" />
//           <path d="m9.3 9 2 2 3.4-3.6" />
//         </svg>
//       )
//     case 'cap':
//       return (
//         <svg {...common}>
//           <path d="m2 9 10-5 10 5-10 5z" />
//           <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
//           <path d="M22 9v6" />
//         </svg>
//       )
//     case 'flask':
//       return (
//         <svg {...common}>
//           <path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4A1.5 1.5 0 0 0 19 19l-5-10V3" />
//           <path d="M7.5 15h9" />
//         </svg>
//       )
//     default:
//       return (
//         <svg {...common}>
//           <circle cx="12" cy="12" r="9" />
//           <path d="M3 12h18" />
//           <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
//         </svg>
//       )
//   }
// }

// export default function BeyondResearch() {
//   return (
//     <div className="page bd-page">
//       {/* ───────── HERO ───────── */}
//       <section className="bd-hero">
//         <div className="shell bd-hero-in">
//           <div className="bd-copy">
//             <h1 className="rv" style={d(0)}>
//               Going Beyond Research: <span className="bd-h1-b">International Competition Preparation</span>
//             </h1>

//             <p className="bd-lead rv" style={d(100)}>
//               Taking exceptional student research to global stage.
//             </p>

//             <p className="rv" style={d(180)}>
//               We believe a research paper or project is not an end of a student's journey. It is the beginning of what they can achieve with it. We help students identify and pursue opportunities to showcase their work on international platforms, from prestigious science fairs and research programs to global innovation challenges and academic awards.
//             </p>
//             <p className="rv" style={d(300)}>
//               These may include opportunities such as
//               <span className="uq-accent">IRIS, Regeneron ISEF, the Research Science Institute (RSI), MIT</span>{' '}
//               Solve challenges, and other competitions aligned with the student's research, interests and eligibility.
//             </p>

//             <div className="actions rv" style={d(360)}>
//               <Link className="btn beyondBtn" to="/programs">
//                 Explore our research programs <span className="arr">→</span>
//               </Link>
//             </div>
//           </div>

//           {/* decorative globe + competition chips */}
//           <div className="bd-art rv" style={d(200)} aria-hidden="true">
//             <span className="bd-glow" />
//             <span className="bd-ring bd-r1" />
//             <span className="bd-ring bd-r2" />
//             <svg className="bd-globe" viewBox="0 0 200 200" focusable="false">
//               <g fill="none" stroke="currentColor" strokeWidth="1">
//                 <circle cx="100" cy="100" r="80" />
//                 <ellipse cx="100" cy="100" rx="55" ry="80" />
//                 <ellipse cx="100" cy="100" rx="25" ry="80" />
//                 <path d="M20 100h160" />
//                 <ellipse cx="100" cy="100" rx="80" ry="28" />
//                 <ellipse cx="100" cy="100" rx="80" ry="58" />
//               </g>
//             </svg>
//             <svg className="bd-book" viewBox="0 0 120 100" focusable="false">
//               <use href="#ic" width="120" height="100" filter="url(#ic-cream)" />
//             </svg>

//             <span className="bd-chip bd-c1"><i />IRIS</span>
//             <span className="bd-chip bd-c2"><i />Regeneron ISEF</span>
//             <span className="bd-chip bd-c3"><i />RSI</span>
//             <span className="bd-chip bd-c4"><i />MIT Solve</span>
//           </div>
//         </div>
//       </section>

//             {/* ───────── OUR APPROACH ───────── */}
//       <section className="bd-way">
//         <div className="shell">
//           <div className="bd-way-head rv">
//             <h2>From Research to Recognition: <span className="bd-why-x">Our Approach</span></h2>
//             <p>
//               We develop a structured pathway to help students identify the right opportunities and prepare themselves.
//             </p>
//           </div>

//           <ol className="bd-steps">
//             {STEPS.map((s, i) => (
//               <li className="bd-step rv" key={s.title} style={d(i * 120)}>
//                 <span className="bd-step-no">{s.no}</span>
//                 <div className="bd-step-card">
//                   <h3>{s.title}</h3>
//                   <p>{s.text}</p>
//                 </div>
//               </li>
//             ))}
//           </ol>

//           <hr className="bd-way-rule" />

//           <div className="bd-close rv">
//             <div className="bd-close-copy">
//               <p>
//                 We want students to see how far their ideas can go. Through personalised opportunity mapping, structured preparation and continuous progress tracking, we help students take their research beyond completion and towards meaningful international recognition. The goal is not simply to participate in competitions. It is to develop work that is worthy of being recognised.
//               </p>
//             </div>

//             <div className="bd-close-cta">
//               <h3>Explore what your research could achieve.</h3>
//               <Link className="btn" to="/programs">
//                 Discover Theoria's Research Programs <span className="arr">→</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }