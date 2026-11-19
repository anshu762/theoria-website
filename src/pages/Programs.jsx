import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import Note from '../components/Note'

const d = (ms) => ({ '--d': ms + 'ms' })

/* ───────── the 3 blocks inside every program card ───────── */
const SCHOLAR_FACTS = [
  ['What they experience', 'Topic exploration, research-question development, literature review, introductory methodology, guided analysis and academic writing.'],
  ['What they create', 'A structured research report or agreed first research output, with a clearer direction for further study.'],
  ['Best suited for', 'Grades 8–10 as a guide; readiness matters more than grade.'],
]
const ELITE_FACTS = [
  ['What they experience', 'Field-matched research mentorship, research design, evidence and analysis, critical review, manuscript development and publication-pathway guidance.'],
  ['What they create', 'An original research manuscript or equivalent scholarly output, with a suitable external-submission strategy where appropriate.'],
  ['Best suited for', 'Grades 10–12 as a guide; subject knowledge and research readiness are assessed.'],
]
const FELLOW_FACTS = [
  ['What they experience', 'Specialist research mentorship, original investigation, then advanced solution design, development, testing and validation.'],
  ['What they create', 'Research manuscript plus a substantial applied project, with documented results and a suitable recognition pathway.'],
  ['Best suited for', 'Students with the motivation, preparation and project ambition to undertake two connected phases.'],
]

function Facts({ items }) {
  return (
    <div className="pg-facts">
      {items.map(([label, text]) => (
        <div className="pg-fact" key={label}>
          <h4>{label}</h4>
          <p>{text}</p>
        </div>
      ))}
    </div>
  )
}

/* ───────── comparison table (text exactly as supplied) ───────── */
const PROGRAMS = ['Scholar', 'Elite', 'Fellowship']
const ROWS = [
  [
    'Core purpose',
    'Build a foundation in research and understand methodologies.',
    'Investigate a novel research question, work with advanced methodologies',
    'Undertake original research, design, and develop an advanced project.',
  ],
  [
    'Mentorship & guidance',
    'Guidance on selecting a topic, developing academic writing skills.',
    'Close mentorship from subject experts on development of research manuscript.',
    'Research mentorship + technical project guidance .',
  ],
  [
    'What students produce',
    'Structured research report',
    'Original research manuscript or substantial scholarly output.',
    'Original research manuscript and advanced projects.',
  ],
  [
    'Opportunities for recognition',
    'Exposure to academic and research opportunities.',
    'Suitable journals, publications & academic platforms.',
    'Research publications, conferences, competitions, science fairs, innovation challenges.',
  ],
  [
    'What students take away',
    'Understanding of how research is conducted.',
    'Experience of independent original research & academic insights.',
    'Turning research into tangible, real-world solutions.',
  ],
]

export default function Programs() {
  return (
    <div className="page pg-programs">
      <PageHead
        title="Three pathways."
        accent="Different ambitions."
        intro="Choose the experience that matches the student's readiness and intended output, not simply the longest list of deliverables."
      />

      {/* ───────── PROGRAM CARDS ───────── */}
      <section>
        <div className="shell">
          <div className="three">
            <article className="card rv"><div className="tag">Foundations</div><h2>Scholar</h2>
            <p>Develop research literacy, structured inquiry and a substantial first research output.</p><ul><li>Research-question development</li><li>Literature and methodology foundations</li><li>Guided analysis and writing</li><li>Report or appropriate project deliverable</li></ul>
            <Facts items={SCHOLAR_FACTS} /></article>
            <article className="card featured pg-elite rv" style={d(100)}><div className="tag">Original investigation</div><h2>Elite</h2>
            <p>One-to-one research mentorship for a novel question and a defensible original output.</p><ul><li>Field-matched mentor</li><li>Advanced methodology and analysis</li><li>Iterative manuscript or research development</li><li>Publication-readiness and submission guidance</li></ul>
            <Facts items={ELITE_FACTS} /></article>
            <article className="card rv" style={d(200)}><div className="tag">Research &amp; innovation</div><h2>Fellowship</h2>
            <p>Extended support for ambitious scholarly work, applied projects or both.</p><ul><li>Research track: manuscript and publication process</li><li>Innovation track: build and validate a project</li><li>Integrated track: research + applied output</li><li>Expanded academic review and mentor evaluation</li></ul>
            <Facts items={FELLOW_FACTS} /></article>
          </div>
        </div>
      </section>

      {/* ───────── CTA (separate, before the table) ───────── */}
      <section className="pgc-section" aria-label="Assess program fit">
        <div className="shell">
          <div className="pgc-band rv">
            <span className="pgc-line pgc-line-l" aria-hidden="true" />
            <span className="pgc-pulse">
              <Link className="pgc-btn" to="/research-fit-application">
                <span className="pgc-txt">Assess program fit</span>
                <span className="pgc-arr" aria-hidden="true">→</span>
              </Link>
            </span>
            <span className="pgc-line pgc-line-r" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ───────── COMPARISON TABLE ───────── */}
      <section className="pg-compare" aria-labelledby="pgt-title">
        <div className="shell">
          <div className="pgt-head rv">
            <h2 id="pgt-title">What each program <span className="pgt-accent">offers</span></h2>
          </div>

          <div className="pg-table-wrap rv" role="region" aria-label="Program comparison table">
            <table className="pg-table">
              <caption className="pg-sr">Comparison of the Scholar, Elite and Fellowship programs</caption>
              <thead>
                <tr>
                  <th scope="col"><span className="pg-sr">Aspect</span></th>
                  {PROGRAMS.map((p) => (
                    <th key={p} scope="col">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    {PROGRAMS.map((p, k) => (
                      <td key={p} data-label={p}>{r[k + 1]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}