import PageHead from '../components/PageHead'
import Note from '../components/Note'
import BookIcon from '../components/BookIcon'
import MentorNetwork from '../components/MentorNetwork'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function WhyTheoria() {
  return (
      <div className="page">
      <div className="hero">
        <div className="shell hero-inner">
          <div>
            <div className="eyebrow rv">Why Theoria?</div>
            <h1 className="rv" style={d(80)}>Credibility is <span className="grad-text">built into the work.</span></h1>
            <p className="rv" style={d(160)}>A research program should be judged by what students actually do, how mentors supervise them and whether the outcomes can be independently examined.</p>
          </div>
          <MentorNetwork />
        </div>
      </div>

      <section>
        <div className="shell">
          <div className="rv"><div className="eyebrow">Six standards</div><h2>Our proposed commitments.</h2></div>
          <div className="tiles">
            <div className="tile rv"><span className="dot">✓</span><strong>Verified mentor identity</strong><p>Credentials, relevant expertise and publication records checked.</p></div>
            <div className="tile rv" style={d(80)}><span className="dot">✓</span><strong>Research fit first</strong><p>Readiness and project feasibility assessed before placement.</p></div>
            <div className="tile rv" style={d(160)}><span className="dot">✓</span><strong>Student ownership</strong><p>Authorship and contribution documented transparently.</p></div>
            <div className="tile rv"><span className="dot">✓</span><strong>Methodological review</strong><p>Evidence, methods and limitations critically evaluated.</p></div>
            <div className="tile rv" style={d(80)}><span className="dot">✓</span><strong>Publication integrity</strong><p>No promise of independent journal or conference acceptance.</p></div>
            <div className="tile rv" style={d(160)}><span className="dot">✓</span><strong>Milestone accountability</strong><p>Progress visibility, response standards and escalation.</p></div>
          </div>
          <div className="mutedbox rv" style={{ marginTop: 18 }}>
            <strong>Scholarly outcomes, not just certificates.</strong>
            <p style={{ margin: '8px 0 0' }}>Every pathway should produce a meaningful, inspectable output appropriate to its scope. These commitments require operational sign-off and documentation before publication as verified guarantees.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="shell faq">
          <div className="rv"><h2>Frequently asked questions</h2></div>
          <details className="rv"><summary>Does Theoria guarantee a publication?</summary><p>No. Theoria can support manuscript preparation, journal selection, submission and agreed revision work. Editorial decisions belong to independent journals and conferences.</p></details>
          <details className="rv"><summary>Does Fellowship always include a paper?</summary><p>No. Fellowship may centre on a research manuscript, a validated applied project, or an integrated project and paper. The scope is agreed before enrolment.</p></details>
          <details className="rv"><summary>Will a student receive a recommendation letter?</summary><p>A mentor may provide a letter when sufficient supervision and performance justify an independent academic assessment. A favourable LOR cannot be guaranteed or purchased.</p></details>
          <details className="rv"><summary>Is Theoria affiliated with the universities where mentors work?</summary><p>Individual mentors may have university affiliations; these do not constitute institutional sponsorship or endorsement unless separately documented.</p></details>
        </div>
      </section>
    </div>
  )
}