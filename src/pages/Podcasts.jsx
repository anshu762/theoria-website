import usePageTitle from '../hooks/usePageTitle.js';
import YouTubeFacade from '../components/YouTubeFacade.jsx';
import Reveal from '../components/Reveal.jsx';
import CTA from '../components/CTA.jsx';
import { episodes } from '../data/podcasts.js';
import { Mic } from 'lucide-react';

export default function Podcasts() {
  usePageTitle('Theoria Podcasts');
  const [featured, ...rest] = episodes;

  return (
    <>
      <section className="radial-gradient(#C9A24A_1px,transparent_1px) with radial-gradient(#9FBDFF_1px,transparent_1px)">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#C9A24A_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative mx-auto max-w-3xl">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy"><Mic /></span>
          <h1 className="font-serif text-3xl font-bold !text-white  md:text-5xl">Theoria Podcasts</h1>
          <p className="mt-4 text-lg !text-white/85">
            Conversations on research, admissions and what it takes to stand out at the world’s top universities.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-x">
          {featured && (
            <Reveal className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
              <YouTubeFacade id={featured.id} title={featured.title} />
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Featured Episode</span>
                <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-lg">{featured.description}</p>
              </div>
            </Reveal>
          )}

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((ep) => (
              <Reveal key={ep.id}>
                <YouTubeFacade id={ep.id} title={ep.title} />
                <h3 className="mt-3 font-serif text-lg font-bold">{ep.title}</h3>
                <p className="text-sm text-ink/80">{ep.description}</p>
              </Reveal>
            ))}
            <Reveal className="flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-gold/60 bg-paper p-6 text-center font-serif text-navy">
              More episodes coming soon
            </Reveal>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}