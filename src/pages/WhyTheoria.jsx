import PageHead from '../components/PageHead'
import Note from '../components/Note'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function WhyTheoria() {
  return (
    <div className="page">
      <PageHead
        eyebrow="Why Theoria?"
        title="Credibility is"
        accent="built into the work."
        intro="A research program should be judged by what students actually do, how mentors supervise them and whether the outcomes can be independently examined."
      />

      <section>
        <div className="shell">
          <div className="rv"><div className="eyebrow">Seven standards</div><h2>Our proposed commitments.</h2></div>
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
          <Note>The heading says "Seven standards" but six are listed. Please confirm the seventh standard or change the heading to "Six".</Note>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="rv"><div className="eyebrow">Compare intelligently</div><h2>Questions to ask any research program.</h2></div>
          <div className="tablewrap rv">
            <table>
              <thead><tr><th>What to evaluate</th><th>Evidence a family should request</th><th>Theoria's intended approach</th></tr></thead>
              <tbody>
                <tr><td>Who supervises the work?</td><td>Named mentor, verifiable qualifications, relevant research</td><td className="hl">Verified field-matched mentor profiles</td></tr>
                <tr><td>Who owns the research?</td><td>Authorship and student contribution policy</td><td className="hl">Documented student ownership</td></tr>
                <tr><td>How is quality evaluated?</td><td>Rubrics, feedback and review checkpoints</td><td className="hl">Methodology and manuscript/project review</td></tr>
                <tr><td>Is publication guaranteed?</td><td>Submission, review and acceptance policies</td><td className="hl">No guaranteed independent acceptance</td></tr>
                <tr><td>What happens if work stalls?</td><td>Mentor response, escalation and service terms</td><td className="hl">Milestone tracking and escalation standards</td></tr>
                <tr><td>Can outcomes be verified?</td><td>DOIs, conference records, project demonstrations</td><td className="hl">Evidence-led research library</td></tr>
              </tbody>
            </table>
          </div>
          <Note>This framework avoids unsupported claims about competitors. Named-provider comparisons should be added only after current, sourced verification of each provider's published terms.</Note>
        </div>
      </section>

      <section>
        <div className="shell faq">
          <div className="rv"><div className="eyebrow">Frequently asked questions</div><h2>What thoughtful families ask.</h2></div>
          <details className="rv"><summary>Does Theoria guarantee a publication?</summary><p>No. Theoria can support manuscript preparation, journal selection, submission and agreed revision work. Editorial decisions belong to independent journals and conferences.</p></details>
          <details className="rv"><summary>Does Fellowship always include a paper?</summary><p>No. Fellowship may centre on a research manuscript, a validated applied project, or an integrated project and paper. The scope is agreed before enrolment.</p></details>
          <details className="rv"><summary>Will a student receive a recommendation letter?</summary><p>A mentor may provide a letter when sufficient supervision and performance justify an independent academic assessment. A favourable LOR cannot be guaranteed or purchased.</p></details>
          <details className="rv"><summary>Is Theoria affiliated with the universities where mentors work?</summary><p>Individual mentors may have university affiliations; these do not constitute institutional sponsorship or endorsement unless separately documented.</p></details>
        </div>
      </section>
    </div>
  )
}