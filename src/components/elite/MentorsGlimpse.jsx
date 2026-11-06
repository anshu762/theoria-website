import { GraduationCap } from 'lucide-react';
import Reveal from '../Reveal.jsx';
import CdnImage from '../CdnImage.jsx';
import { leftMentors, rightMentors } from '../../data/elite.js';

// University logo zoom. Logos whose PNG has extra empty space need a bigger zoom.
// Tune the numbers here if any logo looks too small or too cropped.
// (keys match the `zoom` field in data/elite.js)
const ZOOM = { sm: 'scale-[1.3]', lg: 'scale-[1.6]' };

function ProfileCard({ m, index }) {
  return (
    <Reveal delay={index * 70} className="group">
      <article
        tabIndex={0}
        className="relative rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-[3px] shadow-lg shadow-navy/10 outline-none transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-purple/30 focus-visible:-translate-y-1.5 focus-visible:ring-4 focus-visible:ring-brand-purple/50"
      >
        {/* photo */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-paper">
          <CdnImage
            src={m.img}
            alt={`Mentor from ${m.logoAlt}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-700 group-focus-within:scale-105 group-hover:scale-105"
          />

          {/* university name, revealed on hover / keyboard focus */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent px-3 pb-3 pt-12 pr-[4.5rem] opacity-0 transition duration-300 group-focus-within:opacity-100 group-hover:opacity-100 sm:pr-20 lg:pr-24">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-blue">Mentor from</p>
            <p className="font-serif text-sm font-bold leading-tight !text-white">{m.logoAlt}</p>
          </div>
        </div>

        {/* university logo badge (sits on the corner, not clipped by the photo) */}
        <span className="absolute -bottom-3 -right-3 flex h-11 w-[4.25rem] items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-lg ring-2 ring-white sm:h-12 sm:w-20 lg:h-14 lg:w-24">
          <CdnImage
            src={m.logo}
            alt={m.logoAlt}
            loading="lazy"
            className={`h-full w-full object-contain ${ZOOM[m.zoom] || ''}`}
          />
        </span>
      </article>
    </Reveal>
  );
}

function Grid({ items, start = 0 }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-7">
      {items.map((m, i) => (
        <ProfileCard key={m.alt} m={m} index={start + i} />
      ))}
    </div>
  );
}

export default function MentorsGlimpse() {
  return (
    <section id="mentors" className="relative overflow-hidden py-14 md:py-20">
      {/* soft brand glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand-blue/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-brand-purple/20 blur-3xl" />

      <div className="container-x relative">
        <Reveal className="mb-14 text-center">
          <h2 className="section-title">A Glimpse of Our Mentors</h2>
          <span className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
        </Reveal>

        <div className="grid items-center gap-x-10 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <div className="order-1"><Grid items={leftMentors} start={0} /></div>

          <div className="order-2 lg:order-3"><Grid items={rightMentors} start={4} /></div>

          <Reveal delay={250} className="order-3 lg:order-2">
            <div className="relative mt-4 rounded-3xl bg-white px-6 pb-8 pt-10 text-center shadow-xl ring-1 ring-brand-blue/40 sm:px-8 lg:mt-0">
              <span className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-navy shadow-lg ring-4 ring-white">
                <GraduationCap size={26} />
              </span>
              <p className="text-base leading-relaxed text-ink/90 md:text-lg">
                These aren’t student mentors or recent admits; they’re{' '}
                <strong className="text-navy">real professors, postdocs, and researchers</strong> actively working in
                their fields. From publishing in top journals to leading global projects, they bring deep academic
                expertise to every student they guide. This is just a glimpse of the scholars behind our most
                transformative research journeys.
              </p>
              <span className="mx-auto mt-6 block h-1 w-16 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}