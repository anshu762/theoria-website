import { Link } from 'react-router-dom'
import BookIcon from '../components/BookIcon'
import CommonQuestions from '../components/CommonQuestions'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <div className="shell hero-inner">
          <div>
            <div className="eyebrow rv">An invitation to investigate</div>
            <h1 className="rv" style={d(80)}>Where curiosity becomes <span className="grad-text">original work.</span></h1>
            <p className="rv" style={d(160)}>Research mentorship program for young scholars who want to grow beyond what is taught in classroom.</p>
            <div className="actions rv" style={d(240)}>
              <Link className="btn" to="/programs">Explore the three pathways <span className="arr">→</span></Link>
              <Link className="btn secondary" to="/why-research">Why research matters</Link>
            </div>
            <div className="trust rv" style={d(320)}>
              <span>One-to-one mentorship</span><span>Research integrity</span><span>Evidence-led outcomes</span>
            </div>
          </div>
          <div className="hero-art rv" style={d(200)}>
            <div className="ring r2"></div><div className="ring r1"></div>
            <span className="spark s1">✦</span><span className="spark s2">✦</span>
            <span className="chip c1">Question</span><span className="chip c2">Method</span><span className="chip c3">Contribution</span>
            <BookIcon className="bigicon" />
            <span className="caption">Research · Build · Contribute</span>
          </div>
        </div>
      </div>

      <section className="band">
        <div className="shell">
          <div className="rv">
            <div className="eyebrow">Three pathways · One standard of integrity</div>
            <h2>Find your way into research.</h2>
          </div>
          <p>Every student is individually matched, every research question is original, and every engagement is one-to-one with a top-15 university researcher.</p>
          <div className="three">
            <article className="card program-card rv">
              <span className="tag">01 · Foundations</span><h3>Scholar</h3>
              <p>For students learning to formulate questions, evaluate evidence and develop their first substantial research project.</p>
              <ul><li>Guided topic and methodology development</li><li>Research skills and structured supervision</li><li>Research report or project output</li></ul>
              <Link className="btn secondary" to="/programs">Explore Scholar</Link>
            </article>
            <article className="card featured program-card rv" style={d(100)}>
              <span className="tag">02 · Original research</span><h3>Elite</h3>
              <p>For students ready for intensive one-to-one investigation and a rigorous original manuscript or equivalent research output.</p>
              <ul><li>Field-matched academic mentorship</li><li>Original methods, analysis and revision</li><li>Journal-readiness and submission guidance</li></ul>
              <Link className="btn secondary" to="/programs">Explore Elite</Link>
            </article>
            <article className="card fellow program-card rv" style={d(200)}>
              <span className="tag">03 · Research &amp; innovation</span><h3>Fellowship</h3>
              <p>Our most comprehensive pathway: research, applied innovation or an integrated paper-plus-project engagement.</p>
              <ul><li>Research / innovation / integrated track</li><li>Prototype, model, intervention or manuscript</li><li>Expanded review and publication support where relevant</li></ul>
              <Link className="btn pastel" to="/programs">Explore Fellowship</Link>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="shell split">
          <div className="rv">
            <div className="eyebrow">Our philosophy</div>
            <h2>Not another activity. A different way of thinking.</h2>
            <p>We believe research goes beyond strengthening a student's undergraduate application. It is an essential part of their intellectual development. Research teaches students to think critically, question assumptions, explore ideas beyond the surface and develop a deeper understanding of the world around them.</p>
            <p>At Theoria, our goal is not simply to help students produce research papers, but to nurture independent thinkers who can investigate questions, form original perspectives and contribute meaningfully to their fields.</p>
            <Link className="source" to="/about">Explore our approach →</Link>
          </div>
          <div className="quote rv" style={d(150)}>“The purpose of research is not merely to produce a paper, but to develop the ability to question, investigate and create knowledge.”</div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="rv"><div className="eyebrow">Why it matters</div><h2>Research changes how students learn.</h2></div>
          <div className="tiles">
            <div className="tile rv"><span className="dot">✦</span><strong>Intellectual growth</strong><p>Learn to question assumptions and follow evidence.</p></div>
            <div className="tile rv" style={d(80)}><span className="dot">✦</span><strong>Academic depth</strong><p>Move beyond curricula into real disciplinary questions.</p></div>
            <div className="tile rv" style={d(160)}><span className="dot">✦</span><strong>Original contribution</strong><p>Create knowledge, tools or interventions that others can examine.</p></div>
            <div className="tile rv"><span className="dot">✦</span><strong>Methodological rigour</strong><p>Understand uncertainty, limitations and reproducibility.</p></div>
            <div className="tile rv" style={d(80)}><span className="dot">✦</span><strong>Scholarly communication</strong><p>Write, present, defend and revise ideas clearly.</p></div>
            <div className="tile rv" style={d(160)}><span className="dot">✦</span><strong>Independent ownership</strong><p>Develop the confidence to pursue a difficult question.</p></div>
          </div>
          <div className="actions"><Link className="btn secondary" to="/why-research">Read Why Research?</Link></div>
        </div>
      </section>

      <section className="dark">
        <div className="shell split">
          <div className="rv">
            <div className="eyebrow">The Theoria method</div>
            <h2>Depth is designed into the process.</h2>
            <p>From research-fit assessment to mentor selection, methodology, revision and documented outcomes, students should understand both the intellectual work and the standards by which it is evaluated.</p>
            <Link className="btn pastel" to="/why-theoria" style={{ marginTop: 12 }}>Discover the difference</Link>
          </div>
          <div className="rv" style={d(150)}>
            <div className="step"><b>01</b><div><strong>Research fit</strong><p>Readiness, interests and a feasible direction.</p></div></div>
            <div className="step"><b>02</b><div><strong>Mentor match</strong><p>Relevant expertise, credentials and project scope.</p></div></div>
            <div className="step"><b>03</b><div><strong>Investigate and build</strong><p>Literature, methods, data, design and iteration.</p></div></div>
            <div className="step"><b>04</b><div><strong>Review and communicate</strong><p>Critical feedback, revision and scholarly output.</p></div></div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="rv">
            <div className="eyebrow">Evidence, not slogans</div>
            <h2>Student work deserves to be seen.</h2>
            <p className="intro">The Research Library is designed to document actual questions, methods, contributions and independently verifiable outcomes. Approved student records will be added after verification and consent.</p>
          </div>
          <div className="research-grid">
            <div className="research-card rv"><span className="category">Research Library <i>COMING SOON</i></span><h3 style={{ marginTop: 12 }}>Original research manuscripts</h3><p>Abstracts, methodologies, mentor review and journal or conference status, clearly distinguished.</p></div>
            <div className="research-card rv" style={d(100)}><span className="category">Project Portfolio <i>COMING SOON</i></span><h3 style={{ marginTop: 12 }}>Applied projects &amp; prototypes</h3><p>Problem definitions, design choices, validation evidence, limitations and demonstrable artefacts.</p></div>
          </div>
          <div className="actions"><Link className="btn secondary" to="/research">View research library</Link></div>
        </div>
      </section>

      <section className="band">
        <div className="shell split">
          <div className="rv">
            <div className="eyebrow">Theoria Podcast</div>
            <h2>Conversations that make research accessible.</h2>
            <p>Researchers, innovators and young scholars discuss what makes a question worth pursuing, how knowledge is tested and what rigorous research really looks like.</p>
            <Link className="btn" to="/podcast">Explore the podcast <span className="arr">→</span></Link>
          </div>
          <div className="imageblock rv" style={d(150)}>
            <div className="pc-title">THEORIA<small>PODCAST</small></div>
            <div className="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div className="play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
          </div>
        </div>
      </section>

      <CommonQuestions />
    </div>
  )
}