import { Link } from 'react-router-dom'
import BookIcon from './BookIcon'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="brand">
          <BookIcon width="52" height="43" />
          <span className="wordmark">THEORIA<small>RESEARCH FOR YOUNG SCHOLARS</small></span>
        </div>
        <p className="tagline">Original research. Meaningful projects. Intellectual growth.</p>
        <div className="footerlinks">
          <Link to="/why-research">Why Research?</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/research">Research Library</Link>
          <Link to="/why-theoria">Why Theoria?</Link>
          <Link to="/podcast">Podcast</Link>
          <Link to="/apply">Apply</Link>
        </div>
        <hr />
        <p className="copy">© 2026 Theoria. Concept website for design and content approval. Research claims and program terms require verification before launch.</p>
      </div>
    </footer>
  )
}