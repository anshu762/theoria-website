import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import Note from '../components/Note'

const d = (ms) => ({ '--d': ms + 'ms' })

/* ───────── the 3 blocks inside every program card ───────── */
const SCHOLAR_FACTS = [
  ['What they experience', 'Topic exploration, research-question development, literature review, introductory methodology, guided analysis and academic writing.'],
  ['What they create', 'A structured research report or agreed first research output, with a clearer direction for further study.'],
  ['Typically suited to', 'Grades 8–10 as a guide; readiness matters more than grade.'],
]
const ELITE_FACTS = [
  ['What they experience', 'Field-matched research mentorship, research design, evidence and analysis, critical review, manuscript development and publication-pathway guidance.'],
  ['What they create', 'An original research manuscript or equivalent scholarly output, with a suitable external-submission strategy where appropriate.'],
  ['Typically suited to', 'Grades 10–12 as a guide; subject knowledge and research readiness are assessed.'],
]
const FELLOW_FACTS = [
  ['What they experience', 'Specialist research mentorship, original investigation, then advanced solution design, development, testing and validation.'],
  ['What they create', 'Research manuscript plus a substantial applied project, with documented results and a suitable recognition pathway.'],
  ['Best suited to', 'Students with the motivation, preparation and project ambition to undertake two connected phases.'],
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

/* ───────── comparison table ───────── */
const COLS = ['The experience', 'Scholar', 'Elite', 'Fellowship']
const ROWS = [
  ['Best for', 'Curious student exploring research', 'Student ready for original investigation', 'Student ready to research, build and validate'],
  ['Core purpose', 'Research foundations', 'Original scholarly contribution', 'Original research applied to a real-world project'],
  ['Mentorship focus', 'Question, methods, writing', 'Field-specific investigation and manuscript', 'Research supervision followed by advanced project guidance'],
  ['Primary output', 'Structured report / agreed output', 'Original manuscript / scholarly output', 'Original manuscript + advanced applied project'],
  ['External recognition', 'Opportunity awareness, where relevant', 'Suitable publication guidance, if included', 'Research and project recognition strategy, if included'],
  ['Student’s key achievement', 'Learn how to research', 'Demonstrate original research', 'Demonstrate research and its real-world application'],
]

export default function Programs() {
  return (
    <div className="page pg-programs">
      <PageHead
        title="Three pathways."
        accent="Different ambitions."
        intro="Choose the experience that matches the student's readiness and intended output, not simply the longest list of deliverables."
      />

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
        <div className="pg-cta-inner rv">
            <Link className="pg-cta-btn" to="/research-fit-application">
              <span>Assess program fit</span>
              <span className="pg-cta-arr" aria-hidden="true">→</span>
            </Link>
        </div>
      </section>


      {/* ───────── COMPARISON TABLE ───────── */}
      <section className="pg-compare">
        <div className="shell">
          <div
            className="pg-table-wrap rv"
            role="region"
            aria-label="Program comparison table"
            tabIndex={0}
          >
            <table className="pg-table">
              <caption className="pg-sr">Comparison of the Scholar, Elite and Fellowship programs</caption>
              <thead>
                <tr>
                  {COLS.map((c, k) => (
                    <th key={c} scope="col">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
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
