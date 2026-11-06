import { useRef, useState } from 'react';
import CdnImage from '../CdnImage.jsx';
import { img } from '../../config.js';

const pages = [1, 2, 3].map((n) => img(`research/rp-${n}.webp`));

export default function PaperStack({ lazy = false }) {
  const [z, setZ] = useState([0, 1, 2]);
  const [pop, setPop] = useState(null);
  const timer = useRef();

  const bringToFront = (i) => {
    setZ((prev) => {
      const max = Math.max(...prev);
      return prev.map((v, idx) => (idx === i ? max + 1 : v));
    });
    setPop(i);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPop(null), 300);
  };

  const reset = () => { setZ([0, 1, 2]); setPop(null); };

  return (
    <div className="relative h-[270px] w-[200px] shrink-0 sm:h-[310px] sm:w-[230px]" onMouseLeave={reset}>
      {pages.map((src, i) => (
        <button
          key={src}
          type="button"
          aria-label={`Research paper page ${i + 1}`}
          onMouseEnter={() => bringToFront(i)}
          onFocus={() => bringToFront(i)}
          onClick={() => bringToFront(i)}
          className="absolute inset-0 cursor-pointer overflow-hidden rounded-sm bg-white shadow-xl ring-1 ring-navy/10 transition-transform duration-300"
          style={{
            zIndex: z[i],
            transform: `rotate(${(i - 1) * 8}deg) translateX(${(i - 1) * 18}px)${pop === i ? ' scale(1.1)' : ''}`,
          }}
        >
          <CdnImage src={src} alt={`Page ${i + 1}`} loading={lazy ? 'lazy' : 'eager'} className="h-full w-full object-cover" draggable="false" />
        </button>
      ))}
    </div>
  );
}