import PageHead from '../components/PageHead'

const d = (ms) => ({ '--d': ms + 'ms' })

export default function Podcast() {
  return (
    <div className="page">
      <PageHead
        eyebrow="Theoria Podcast"
        title="Coming soon,"
        accent="stay tuned"
      />
    </div>
  )
}