export default function PageHead({ eyebrow, title, accent, intro }) {
  return (
    <div className="pagehead">
      <div className="shell">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title} <span className="grad-text">{accent}</span></h1>
        <p className="intro">{intro}</p>

        {/* same book icon (#ic) + same green colour filter as the header */}
        <svg
          className="watermark"
          viewBox="5 -8 110 110"
          aria-hidden="true"
          focusable="false"
        >
          <use
            href="#ic"
            xlinkHref="#ic"
            width="120"
            height="100"
            filter="url(#ic-green)"
          />
        </svg>
      </div>
    </div>
  )
}










// import BookIcon from './BookIcon'

// export default function PageHead({ eyebrow, title, accent, intro }) {
//   return (
//     <div className="pagehead">
//       <div className="shell">
//         <div className="eyebrow">{eyebrow}</div>
//         <h1>{title} <span className="grad-text">{accent}</span></h1>
//         <p className="intro">{intro}</p>
//         <BookIcon className="watermark" />
//       </div>
//     </div>
//   )
// }