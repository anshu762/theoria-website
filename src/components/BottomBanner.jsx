import { APPLY_URL } from '../config.js';

export default function BottomBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,.08)] backdrop-blur">
      <div className="container-x flex items-center justify-between gap-3 py-2.5">
        <p className="font-serif text-sm text-ink sm:text-lg">Book a Free Consultation with a Counsellor</p>
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-gold shrink-0">Get Started</a>
      </div>
    </div>
  );
}