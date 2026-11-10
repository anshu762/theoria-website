import PageHead from '../components/PageHead'
import Note from '../components/Note'
import BookIcon from '../components/BookIcon'
import MentorNetwork from '../components/MentorNetwork'
import CommonQuestions from '../components/CommonQuestions'

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
        </div>
      </section>

      <CommonQuestions />
    </div>
  )
}