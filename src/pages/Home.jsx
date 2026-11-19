import { Link } from 'react-router-dom'
import BookIcon from '../components/BookIcon'
import MentorNetwork from '../components/MentorNetwork'
import CommonQuestions from '../components/CommonQuestions'
import StatsSection from '../components/StatsSection'
import MentorLogos from '../components/MentorLogos'
import HeroPapers from '../components/HeroPapers'
import SuccessStories from '../components/SuccessStories'
import UniqueThings from '../components/UniqueThings'
import ResearchImportance from '../components/ResearchImportance'


const d = (ms) => ({ '--d': ms + 'ms' })


export default function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <h1 className="rv" style={d(80)}>Built for curious young scholars</h1>
            <p className="rv" style={d(160)}>Research academy for young scholars who want to grow beyond what is taught in classroom.</p>
            <p className='rv bottom-text'>Backed by <a href="https://univisory.org/" target='_blank' className='hero-link'>UniVisory</a></p>
            <div className="actions rv" style={d(240)}>
              <Link className="btn hero-btn" to="/programs">Explore our research programs <span className="arr">→</span></Link>
            </div>
          </div>
           <HeroPapers/>
        </div>
      </div>

      <MentorLogos />
      <StatsSection />
      <SuccessStories/>
      <UniqueThings/>
      <ResearchImportance/>

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
        </div>
      </section>

      {/* ---------- Our philosophy (green, book icon on the right) ---------- */}
      <section className="ph-section">
        <div className="shell ph-shell">
          <div className="ph-copy">
            <div className="ph-head rv" style={d(0)}>
              <h2>Our <span className="ph-x">philosophy</span></h2>
            </div>
            <p className="rv" style={d(120)}>We believe research goes beyond strengthening a student's undergraduate application. It is an essential part of their intellectual development. Research teaches students to think critically, question assumptions, explore ideas beyond the surface and develop a deeper understanding of the world around them.</p>
            <p className="rv" style={d(200)}>At Theoria, our goal is not simply to help students produce research papers, but to nurture independent thinkers who can investigate questions, form original perspectives and contribute meaningfully to their fields.</p>
          </div>

           {/* big statement on the right */}
          <div className="ph-quote rv" style={d(200)}>
            <span className="ph-q-line">Young scholars</span>
            <span className="ph-q-line">deserve more than</span>
            <span className="ph-q-line ph-q-em">ready-made answers.</span>
          </div>
        </div>
      </section>
      
      <CommonQuestions />
    </div>
  )
}