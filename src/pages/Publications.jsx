import LibraryShell from '../components/LibraryShell'

/* Add items here:  { title: '', by: '', text: '', href: '' }  (by / text / href are optional) */
const ITEMS = []

export default function Publications() {
  return (
    <LibraryShell
      title="Research"
      accent="publications."
      items={ITEMS}
      emptyTitle="Publications"
      emptyText="Publications will be listed here."
    />
  )
}