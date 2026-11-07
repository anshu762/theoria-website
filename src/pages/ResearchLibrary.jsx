import PageHead from '../components/PageHead'
import Note from '../components/Note'

const d = (ms) => ({ '--d': ms + 'ms' })

const Icon = ({ children }) => (
  <div className="ico">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </div>
)

export default function ResearchLibrary() {
  return (
    <div className="page">
      <PageHead
        eyebrow="Theoria Research Library"
        title="Show the work."
        accent="Show the evidence."
        intro="A public record of original student research and applied projects, with methodology, student contribution and verified outcome status."
      />

      <section>
        <div className="shell">
          <div className="research-grid">
            <div className="research-card rv">
              <Icon><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></Icon>
              <span className="category">Planned collection</span><h3>Research papers</h3>
              <p>Question, abstract, methods, mentor review, manuscript status and links to independently verifiable publication records.</p>
            </div>
            <div className="research-card rv" style={d(100)}>
              <Icon><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /></Icon>
              <span className="category">Planned collection</span><h3>Projects &amp; innovation</h3>
              <p>Problem, prototype, implementation, testing evidence, limitations and demonstrations.</p>
            </div>
            <div className="research-card rv">
              <Icon><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></Icon>
              <span className="category">Planned collection</span><h3>Conference presentations</h3>
              <p>Accepted abstracts, presentation records and academic feedback, where verified.</p>
            </div>
            <div className="research-card rv" style={d(100)}>
              <Icon><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>
              <span className="category">Planned collection</span><h3>Student reflections</h3>
              <p>What the student learned, revised and can defend, with permission.</p>
            </div>
          </div>
          <Note>No sample projects are represented as completed Theoria work in this prototype. Insert verified student cases from approved records before launch.</Note>
        </div>
      </section>
    </div>
  )
}