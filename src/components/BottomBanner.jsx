import { Link } from 'react-router-dom'
import { APPLY_URL } from '../config'

const isExternal = /^https?:\/\//i.test(APPLY_URL)

// .btn / .pastel come from theoria.css; the "!" overrides trim the padding for a slim banner
const btnClass = 'btn pastel shrink-0 whitespace-nowrap !px-4 !py-[11px] sm:!px-5'

export default function BottomBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-1 border-t border-solid border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,.08)] backdrop-blur">
      <div className="shell flex items-center justify-between gap-3 py-2.5">
        <p className="m-0 font-display text-sm leading-snug text-ink sm:text-lg">
          Book a Free Consultation with a Counsellor
        </p>

        {isExternal ? (
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={btnClass}>
            Get Started
          </a>
        ) : (
          <Link to={APPLY_URL} className={btnClass}>
            Get Started
          </Link>
        )}
      </div>
    </div>
  )
}