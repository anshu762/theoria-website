import Reveal from '../Reveal.jsx';
import { eliteFeatures } from '../../data/elite.js';

export default function WhatMakesElite() {
  return (
    <section id="whtmakeitelite" className="bg-paper py-14 md:py-20">
      <div className="container-x">
        <Reveal>
          <h2 className="section-title">
            What Makes This Program <span className="text-gold-dark">&nbsp;&#8220;Elite&#8221;</span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-14">
          {eliteFeatures.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 80}
              className="relative w-full rounded-[2rem] border-2 border-navy/10 bg-white px-6 pb-7 pt-12 shadow-lg md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <h3 className="absolute left-1/2 top-0 w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy px-4 py-3 text-center font-serif text-[15px] font-bold leading-snug text-white shadow-md">
                {f.title}
              </h3>
              {f.text && <p className="text-center leading-relaxed">{f.text}</p>}
              {f.bullets && (
                <ul className="ml-5 list-disc space-y-2 text-left marker:text-gold-dark">
                  {f.bullets.map(([b, rest]) => (
                    <li key={b}><b>{b}</b>{rest}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}