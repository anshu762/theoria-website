import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Reveal from '../Reveal.jsx';
import { whyResearch } from '../../data/research.js';

const VIDEO_SRC =
  'https://www.youtube.com/embed/IoZmY3GYx-8?si=WXlPUGx1RsH7E0qS&autoplay=1&mute=1&enablejsapi=1&playsinline=1';

export default function WhyResearch() {
  const frame = useRef(null);
  const [muted, setMuted] = useState(true);

  // Talks to the YouTube iframe via postMessage (enablejsapi=1), so no external script is needed.
  const toggleMute = () => {
    const func = muted ? 'unMute' : 'mute';
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
    if (muted) frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
    setMuted(!muted);
  };

  return (
    <section className="py-12 md:py-16">
      <Reveal className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 font-serif text-2xl font-bold md:text-3xl">Why Do Research in High School</h3>
          <ul className="space-y-4">
            {whyResearch.map(([label, text]) => (
              <li key={label} className="text-lg leading-relaxed">
                <strong className="font-bold text-navy">{label}</strong> {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-gold/40">
          <iframe
            ref={frame}
            id="youtube-video"
            title="UniVisory Research Academy video"
            src={VIDEO_SRC}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            className="absolute right-3 top-3 rounded-full bg-navy/80 p-2 text-white shadow transition hover:bg-navy"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
