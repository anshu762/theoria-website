import { SHOW_REVIEW_NOTES } from '../config'

export default function Note({ children }) {
  if (!SHOW_REVIEW_NOTES) return null
  return <p className="note">{children}</p>
}