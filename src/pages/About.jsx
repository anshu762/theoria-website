import PageHead from '../components/PageHead'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function About() {
  return (
    <div className="page">
      <PageHead
        eyebrow="About Theoria"
        title="Built for serious"
        accent="young inquiry."
        intro="Theoria is being developed as a distinct research and innovation identity, drawing on UniVisory's student-development experience while establishing its own academic standards and public body of research."
      />

      <section>
        <div className="shell split">
          <div className="rv">
            <div className="eyebrow">Our purpose</div>
            <h2>Make rigorous research possible earlier.</h2>
            <p>We believe high school students can engage seriously with challenging questions when given appropriate supervision, time, methodological training and honest feedback.</p>
            <p>Research excellence is measured not by prestige signals alone, but by intellectual ownership, reproducible reasoning and the quality of the final contribution.</p>
          </div>
          <div className="quote rv" style={d(150)}>"Rigorous research shouldn't wait for university. With the right guidance, young minds can ask real questions and find original answers."</div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="rv"><div className="eyebrow">Standards &amp; governance</div><h2>What we will publish before launch.</h2></div>
          <div className="three">
            <div className="card rv"><h3>Mentor standards</h3><p>Qualification checks, supervision responsibilities, conflicts of interest and response expectations.</p></div>
            <div className="card rv" style={d(100)}><h3>Research ethics</h3><p>Originality, authorship, AI use, data integrity, human-subject safeguards and publication policies.</p></div>
            <div className="card rv" style={d(200)}><h3>Student protection</h3><p>Defined deliverables, escalation, cancellation terms, confidentiality and safeguarding.</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}