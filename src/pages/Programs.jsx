import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import Note from '../components/Note'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function Programs() {
  return (
    <div className="page">
      <PageHead
        eyebrow="Our programs"
        title="Three pathways."
        accent="Different ambitions."
        intro="Choose the experience that matches the student's readiness and intended output, not simply the longest list of deliverables."
      />

      <section>
        <div className="shell">
          <div className="three">
            <article className="card rv"><div className="tag">Foundations</div><h2>Scholar</h2><p>Develop research literacy, structured inquiry and a substantial first research output.</p><ul><li>Research-question development</li><li>Literature and methodology foundations</li><li>Guided analysis and writing</li><li>Report or appropriate project deliverable</li></ul></article>
            <article className="card featured rv" style={d(100)}><div className="tag">Original investigation</div><h2>Elite</h2><p>One-to-one research mentorship for a novel question and a defensible original output.</p><ul><li>Field-matched mentor</li><li>Advanced methodology and analysis</li><li>Iterative manuscript or research development</li><li>Publication-readiness and submission guidance</li></ul></article>
            <article className="card fellow rv" style={d(200)}><div className="tag">Research &amp; innovation</div><h2>Fellowship</h2><p>Extended support for ambitious scholarly work, applied projects or both.</p><ul><li>Research track: manuscript and publication process</li><li>Innovation track: build and validate a project</li><li>Integrated track: research + applied output</li><li>Expanded academic review and mentor evaluation</li></ul></article>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="rv"><div className="eyebrow">Compare pathways</div><h2>What changes as the work deepens?</h2></div>
          <div className="tablewrap rv">
            <table>
              <thead><tr><th>Dimension</th><th>Scholar</th><th>Elite</th><th>Fellowship</th></tr></thead>
              <tbody>
                <tr><td>Primary focus</td><td>Research foundations</td><td>Original research</td><td>Research, project or integrated engagement</td></tr>
                <tr><td>Research question</td><td>Guided</td><td>Original and method-led</td><td>Advanced, independently assessed scope</td></tr>
                <tr><td>Typical output</td><td>Research report / project</td><td>Original manuscript / research artefact</td><td>Manuscript, prototype, model, intervention or both</td></tr>
                <tr><td>Publication support</td><td>Readiness guidance</td><td>Journal strategy and submission guidance</td><td>Defined end-to-end support when applicable</td></tr>
                <tr><td>Academic evaluation</td><td>Feedback on progress</td><td>Structured mentor assessment</td><td>Expanded review and documented evaluation</td></tr>
                <tr><td>LOR</td><td>Not standard</td><td>At mentor discretion</td><td>Considered where academically justified; never guaranteed</td></tr>
              </tbody>
            </table>
          </div>
          <Note>Proposed program architecture for internal approval. Final duration, mentor categories, inclusions, fees and service boundaries must be confirmed before commercial launch.</Note>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="rv"><div className="eyebrow">Inside Fellowship</div><h2>Three ways to make an original contribution.</h2></div>
          <div className="three">
            <div className="card rv"><div className="num-big">01</div><span className="tag">Track 01</span><h3>Research Fellowship</h3><p>Develop an original manuscript, undergo academic review and receive defined journal submission and revision support.</p></div>
            <div className="card rv" style={d(100)}><div className="num-big">02</div><span className="tag">Track 02</span><h3>Innovation Fellowship</h3><p>Design, build, test and document an AI/ML application, engineering prototype, economic model, public-policy intervention or other substantial project.</p></div>
            <div className="card rv" style={d(200)}><div className="num-big">03</div><span className="tag">Track 03</span><h3>Integrated Fellowship</h3><p>Investigate a problem, develop a solution, validate its performance and prepare the findings for academic or public presentation.</p></div>
          </div>
          <div className="actions"><Link className="btn" to="/apply">Discuss program fit <span className="arr">→</span></Link></div>
        </div>
      </section>
    </div>
  )
}