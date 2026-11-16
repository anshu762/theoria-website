import { NavLink } from 'react-router-dom'
import PageHead from './PageHead'

const d = (ms) => ({ '--d': ms + 'ms' })

const tabClass = ({ isActive }) => 'lib-tab' + (isActive ? ' active' : '')

export default function LibraryShell({ title, accent, items = [], emptyTitle, emptyText, children }) {
  return (
    <div className="page lib-page">
      <PageHead eyebrow="Research library" title={title} accent={accent} intro="" />

      <section>
        <div className="shell">

          {children ? (
            children
          ) : items.length > 0 ? (
            <div className="three lib-grid">
              {items.map((it, i) => (
                <article className="card rv" key={i} style={d((i % 3) * 100)}>
                  <h3>{it.title}</h3>
                  {it.by && <p className="lib-by">{it.by}</p>}
                  {it.text && <p>{it.text}</p>}
                  {it.href && (
                    <a className="btn" href={it.href} target="_blank" rel="noopener noreferrer">Read more</a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="lib-empty rv" style={d(100)}>
              <h3>{emptyTitle}</h3>
              <p>{emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}