import BookIcon from './BookIcon'

export default function PageHead({ eyebrow, title, accent, intro }) {
  return (
    <div className="pagehead">
      <div className="shell">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title} <span className="grad-text">{accent}</span></h1>
        <p className="intro">{intro}</p>
        <BookIcon className="watermark" />
      </div>
    </div>
  )
}