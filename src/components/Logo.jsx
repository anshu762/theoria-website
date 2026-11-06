import { useState } from 'react';
import { LOGO_SRC } from '../config.js';

function TextLogo() {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 120 120" className="h-11 w-11" aria-hidden="true">
        <circle cx="60" cy="30" r="13" fill="#9FBDFF" />
        <path d="M14 46h42v58C44 84 28 78 14 82z" fill="#9FBDFF" />
        <path d="M106 46H64v58c12-20 28-26 42-22z" fill="#B88BF7" />
      </svg>
      <span className="font-serif text-2xl font-bold tracking-wide text-navy">THEORIA</span>
    </span>
  );
}

/**
 * variant="default" → plain logo (navbar)
 * variant="card"    → logo on a white rounded card (use on dark backgrounds)
 * Size it with className, e.g. "h-14 md:h-[72px]"
 */
export default function Logo({ variant = 'default', className = 'h-14' }) {
  const [failed, setFailed] = useState(false);

  const logo = failed ? (
    <TextLogo />
  ) : (
    <img
      src={LOGO_SRC}
      alt="Theoria – Research for Young Scholars"
      onError={() => setFailed(true)}
      className={`w-auto object-contain ${className}`}
    />
  );

  if (variant === 'card') {
    return <span className="inline-flex items-center rounded-xl bg-white px-4 py-2 shadow-lg ring-1 ring-white/20">{logo}</span>;
  }
  return logo;
}