import { Link } from 'react-router-dom'
import BookIcon from '../components/BookIcon'
import MentorNetwork from '../components/MentorNetwork'
import CommonQuestions from '../components/CommonQuestions'
import StatsSection from '../components/StatsSection'
import MentorLogos from '../components/MentorLogos'
import HeroPapers from '../components/HeroPapers'
import SuccessStories from '../components/SuccessStories'
import UniqueThings from '../components/UniqueThings'
import WhyResearch from '../components/WhyResearch'


const d = (ms) => ({ '--d': ms + 'ms' })


export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <h1 className="rv" style={d(80)}>Built for curious young scholars</h1>
            <p className="rv" style={d(160)}>Research mentorship program for young scholars who want to grow beyond what is taught in classroom.</p>
            <div className="actions rv" style={d(240)}>
              <Link className="btn" to="/programs">Explore our 3 research programs <span className="arr">→</span></Link>
            </div>
          </div>
           <HeroPapers/>
        </div>
      </div>

      <MentorLogos />
      <StatsSection />
      <SuccessStories/>
      <UniqueThings/>
      <WhyResearch/>

      <section>
        <div className="shell">
          <div className="rv">
            <h2>Our philosophy</h2>
            <p>We believe research goes beyond strengthening a student's undergraduate application. It is an essential part of their intellectual development. Research teaches students to think critically, question assumptions, explore ideas beyond the surface and develop a deeper understanding of the world around them.</p>
            <p>At Theoria, our goal is not simply to help students produce research papers, but to nurture independent thinkers who can investigate questions, form original perspectives and contribute meaningfully to their fields.</p>
            <Link className="source" to="/about">Explore our approach →</Link>
          </div>
        </div>
      </section>
      
      <CommonQuestions />
    </div>
  )
}