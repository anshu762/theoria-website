import Reveal from '../Reveal.jsx';
import CdnImage from '../CdnImage.jsx';
import { mentorLogos } from '../../data/research.js';

export default function MentorsGrid() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-x">
        <Reveal><h2 className="section-title mb-12">Our Mentors</h2></Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {mentorLogos.map((m, i) => (
            <Reveal key={m.name} delay={(i % 5) * 60} className="group flex flex-col items-center text-center">
              <CdnImage
                src={m.src}
                alt={m.name}
                loading="lazy"
                className="h-28 w-28 object-contain transition duration-300 group-hover:scale-110 sm:h-32 sm:w-32"
              />
              <div className="mt-3 font-serif text-base font-bold text-navy">{m.name}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}