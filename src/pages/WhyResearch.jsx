import PageHead from '../components/PageHead'
import Note from '../components/Note'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function WhyResearch() {
  return (
    <div className="page">
      <PageHead
        eyebrow="Why research?"
        title="Beyond the classroom."
        accent="Into the unknown."
        intro="Research is a practice of asking, testing, building and revising, with intellectual benefits that extend well beyond any university application."
      />

      <section>
        <div className="shell">
          <div className="rv">
            <div className="eyebrow">University perspectives · Official guidance</div>
            <h2>What leading universities actually say.</h2>
            <p className="intro">These are links to official admissions materials, not claims that research is mandatory or that participation guarantees an advantage. Theoria is not affiliated with these universities.</p>
          </div>
          <div className="three">
            <div className="card rv"><span className="tag">MIT</span><h3>Optional research portfolio</h3><p>MIT provides a route for applicants to submit significant research as optional supplementary material.</p><a className="source" target="_blank" rel="noopener noreferrer" href="https://mitadmissions.org/apply/firstyear/portfolios-additional-material/">MIT official admissions guidance ↗</a></div>
            <div className="card rv" style={d(100)}><span className="tag">Harvard</span><h3>Supplementary scholarly work</h3><p>Harvard's application guidance describes optional supplementary materials for applicants whose work warrants further consideration.</p><a className="source" target="_blank" rel="noopener noreferrer" href="https://college.harvard.edu/admissions/apply/application-requirements">Harvard official application guidance ↗</a></div>
            <div className="card rv" style={d(200)}><span className="tag">Columbia</span><h3>Academic exploration</h3><p>Consult Columbia's official admissions materials for current policies on optional materials and evaluation; no research requirement is implied.</p><a className="source" target="_blank" rel="noopener noreferrer" href="https://undergrad.admissions.columbia.edu/">Columbia Undergraduate Admissions ↗</a></div>
          </div>
          <Note>Before publication, the editorial team should confirm current policy wording and secure permission for any reproduced university screenshots or excerpts.</Note>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="rv"><div className="eyebrow">The deeper value</div><h2>Six capabilities research develops.</h2></div>
          <div className="tiles">
            <div className="tile rv"><span className="dot">✦</span><strong>Intellectual curiosity</strong><p>Turn interests into answerable questions.</p></div>
            <div className="tile rv" style={d(80)}><span className="dot">✦</span><strong>Disciplinary depth</strong><p>Engage with authentic scholarly literature.</p></div>
            <div className="tile rv" style={d(160)}><span className="dot">✦</span><strong>Evidence literacy</strong><p>Distinguish claims from sound conclusions.</p></div>
            <div className="tile rv"><span className="dot">✦</span><strong>Problem-solving</strong><p>Build and test meaningful solutions.</p></div>
            <div className="tile rv" style={d(80)}><span className="dot">✦</span><strong>Resilience</strong><p>Respond constructively to failed hypotheses and revision.</p></div>
            <div className="tile rv" style={d(160)}><span className="dot">✦</span><strong>Communication</strong><p>Present defensible ideas with clarity.</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}