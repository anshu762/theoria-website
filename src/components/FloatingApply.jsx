import { APPLY_URL, ICON_SRC } from '../config.js';

export default function FloatingApply() {
  return (
    <div className="fixed bottom-20 right-3 z-40 flex items-center gap-2 sm:right-6">
      <div className="relative hidden rounded-lg bg-navy px-3 py-2 font-serif text-sm text-white shadow-lg sm:block">
        Join Research Academy
        <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-navy" />
      </div>
      <button
        type="button"
        onClick={() => window.open(APPLY_URL, '_blank', 'noopener')}
        aria-label="Join Research Academy"
        className="animate-floaty rounded-full bg-white p-1.5 shadow-xl ring-2 ring-brand-purple transition hover:scale-105"
      >
        <img src={ICON_SRC} alt="" width="64" height="64" className="h-14 w-14 rounded-full object-contain sm:h-16 sm:w-16" />
      </button>
    </div>
  );
}