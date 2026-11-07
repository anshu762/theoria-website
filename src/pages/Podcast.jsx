import PageHead from '../components/PageHead'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function Podcast() {
  return (
    <div className="page">
      <PageHead
        eyebrow="Theoria Podcast"
        title="Research,"
        accent="in conversation."
        intro="Thoughtful conversations with researchers, innovators and young scholars about evidence, discovery, academic integrity and the ideas shaping our world."
      />
      <section>
        <div className="shell split">
          <div className="imageblock rv">
            <div className="pc-title">THEORIA<small>PODCAST</small></div>
            <div className="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div className="play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
          </div>
          <div className="rv" style={d(150)}>
            <div className="eyebrow">Episode archive</div>
            <h2>Ideas worth examining.</h2>
            <p>Use this space for verified episode thumbnails, speaker biographies, full videos, transcripts and concise research takeaways. Episode links will be added once approved.</p>
            <div className="mutedbox">
              <strong>Editorial direction</strong>
              <p style={{ margin: '8px 0 0' }}>What makes a research question original? How do scholars evaluate evidence? What separates credible publication from vanity publication? What can young researchers contribute?</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}