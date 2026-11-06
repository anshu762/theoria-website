import Reveal from '../Reveal.jsx';
import { whoItsFor } from '../../data/elite.js';

export default function ProgramIntro() {
  return (
    <section id="elite-text" className="py-14 md:py-20">
      <Reveal className="container-x grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">The Program</h2>
          <p className="text-lg leading-relaxed">
            Our most advanced and competitive track; students are mentored{' '}
            <b>1:1 by active researchers and postdocs from institutions like MIT, Stanford, Harvard, and more.</b>{' '}
            Projects are designed for global journals, high-impact competitions, and real-world deployment, with
            outcomes that carry unmatched academic weight in top-tier admissions.
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Who It's For</h2>
          <p className="mb-5 text-lg">This is a selective program for students who are:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {whoItsFor.map((t) => (
              <div key={t} className="flex items-center justify-center rounded-2xl border border-gold/30 bg-navy p-5 text-center text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                {t}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}