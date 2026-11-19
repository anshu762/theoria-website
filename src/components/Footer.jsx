import { Link } from 'react-router-dom'
import BookIcon from './BookIcon'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="brand">
          <div className="flex flex-row items-start justify-start gap-2">
            <BookIcon width="52" height="43" />
            <span className="wordmark">THEORIA<small>RESEARCH FOR YOUNG SCHOLARS</small></span>
          </div>
        </div>
        <div className="footerlinks">
          <Link to="/programs">Research programs</Link>
          <Link to="/program/publications">Research library</Link>
          <Link to="/success-stories">Success stories</Link>
          <Link to="/beyond-research">Beyond Research</Link>
          <Link to="/podcast">Podcast</Link>
          <Link to="/about">About</Link>
        </div>
        <hr />
        <p className="copy">© 2026 Theoria. Concept website for design and content approval. Research claims and program terms require verification before launch.</p>
      </div>
    </footer>
  )
}