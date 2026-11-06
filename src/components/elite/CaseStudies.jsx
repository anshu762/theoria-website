import { useRef, useState } from 'react';
import {
  CheckCircle2, ChevronLeft, ChevronRight, FlaskConical, GraduationCap, Quote, TrendingUp, User,
} from 'lucide-react';
import Reveal from '../Reveal.jsx';
import { caseStudies } from '../../data/elite.js';

const ROWS = [
  { key: 'background', label: 'Background', Icon: User },
  { key: 'research', label: 'Research', Icon: FlaskConical },
  { key: 'impact', label: 'Impact', Icon: TrendingUp },
  { key: 'outcome', label: 'Outcome', Icon: GraduationCap },
  { key: 'reflection', label: 'Reflection', Icon: Quote },
];

// "CASE STUDY 1: Rohan | Singapore | Electrical Engineering | Class of 2029"
function parseTitle(title) {
  const [head = title, ...meta] = title.split('|').map((s) => s.trim()).filter(Boolean);
  const i = head.indexOf(':');
  return i === -1
    ? { eyebrow: head, name: '', meta }
    : { eyebrow: head.slice(0, i).trim(), name: head.slice(i + 1).trim(), meta };
}

// “quote text.” ~ Name
function splitReflection(text) {
  const i = text.lastIndexOf('~');
  return i === -1
    ? { quote: text, author: '' }
    : { quote: text.slice(0, i).trim(), author: text.slice(i + 1).trim() };
}

function RowLabel({ Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 font-serif font-bold text-navy">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/50 to-brand-purple/50">
        <Icon size={16} />
      </span>
      {children}
    </div>
  );
}

function RowBody({ k, c }) {
  if (k === 'research') {
    const [mentor, ...rest] = c.research.split('\n');
    return (
      <div className="space-y-2">
        <span className="inline-block rounded-lg bg-navy px-3 py-1 text-xs font-semibold tracking-wide text-white">{mentor}</span>
        {rest.map((line, i) => <p key={i} className="leading-relaxed">{line}</p>)}
      </div>
    );
  }
  if (k === 'outcome') {
    return (
      <p className="flex items-start gap-2.5 rounded-xl bg-navy px-4 py-3 font-semibold text-white shadow-md">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
        {c.outcome}
      </p>
    );
  }
  if (k === 'reflection') {
    const { quote, author } = splitReflection(c.reflection);
    return (
      <blockquote className="relative rounded-xl border-l-4 border-brand-purple bg-brand-blue/15 px-5 py-4">
        <Quote aria-hidden="true" className="absolute right-3 top-3 h-8 w-8 text-brand-purple/30" />
        <p className="pr-8 italic leading-relaxed text-ink">{quote}</p>
        {author && <footer className="mt-2 text-sm font-semibold text-brand-purple-dark">~ {author}</footer>}
      </blockquote>
    );
  }
  return <p className="leading-relaxed">{c[k]}</p>;
}

export default function CaseStudies() {
  const [active, setActive] = useState(caseStudies[0].id);
  const listRef = useRef(null);
  const tabRefs = useRef({});

  const n = caseStudies.length;
  const idx = caseStudies.findIndex((s) => s.id === active);
  const c = caseStudies[idx];
  const { eyebrow, name, meta } = parseTitle(c.title);

  const select = (i, focus = false) => {
    const s = caseStudies[(i + n) % n];
    setActive(s.id);
    const btn = tabRefs.current[s.id];
    if (focus) btn?.focus({ preventScroll: true });

    // on mobile the tabs scroll sideways: keep the chosen one centred
    const list = listRef.current;
    if (btn && list && !window.matchMedia('(min-width: 768px)').matches) {
      list.scrollTo({ left: btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
    }
  };

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (step) { e.preventDefault(); select(idx + step, true); }
    else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    else if (e.key === 'End') { e.preventDefault(); select(n - 1, true); }
  };

  return (
    <section id="case-studies" className="relative overflow-hidden bg-paper py-14 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-brand-purple/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl" />

      <div className="container-x relative">
        <Reveal className="text-center">
          <h2 className="section-title">Student Case Studies</h2>
          <span className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
          {/* ---------- tabs ---------- */}
          <div
            ref={listRef}
            role="tablist"
            aria-label="Student case studies"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="relative -mx-4 flex shrink-0 gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:w-44 md:flex-col md:overflow-visible md:p-0 lg:w-48 [&::-webkit-scrollbar]:hidden"
          >
            {caseStudies.map((s, i) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => { tabRefs.current[s.id] = el; }}
                  id={`case-tab-${s.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="case-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full px-5 py-2.5 text-left font-serif text-sm font-semibold outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-brand-purple/40 md:w-full md:rounded-xl md:px-4 md:py-3 ${
                    on
                      ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-navy shadow-lg md:translate-x-2'
                      : 'bg-navy text-white hover:bg-navy-700 md:hover:translate-x-1'
                  }`}
                >
                  <span className={`hidden h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] md:flex ${on ? 'bg-white/70' : 'bg-white/15'}`}>
                    {i + 1}
                  </span>
                  <span className="flex-1">{s.name}</span>
                  <ChevronRight className={`hidden h-4 w-4 shrink-0 transition md:block ${on ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* ---------- panel ---------- */}
          <div className="min-w-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-navy/10">
            <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-purple" />

            <div
              key={c.id}
              id="case-panel"
              role="tabpanel"
              aria-labelledby={`case-tab-${c.id}`}
              className="animate-fadeIn p-5 motion-reduce:animate-none sm:p-8 md:min-h-[520px] md:p-10"
            >
              <header className="mb-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-purple-dark">{eyebrow}</p>
                <h3 className="mt-1 font-serif text-3xl font-bold md:text-4xl">{name || c.title}</h3>
                {meta.length > 0 && (
                  <ul className="mt-4 flex flex-wrap justify-center gap-2">
                    {meta.map((t, i) => (
                      <li
                        key={t}
                        className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
                          i === meta.length - 1 ? 'bg-navy text-white' : 'bg-brand-blue/25 text-navy'
                        }`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </header>

              <div className="divide-y divide-navy/10">
                {ROWS.map(({ key, label, Icon }, i) => (
                  <div
                    key={key}
                    style={{ animationDelay: `${i * 70}ms` }}
                    className="grid animate-fadeIn gap-2 py-5 motion-reduce:animate-none md:grid-cols-[160px_1fr] md:gap-6"
                  >
                    <RowLabel Icon={Icon}>{label}</RowLabel>
                    <RowBody k={key} c={c} />
                  </div>
                ))}
              </div>
            </div>

            {/* prev / progress / next */}
            <div className="flex items-center gap-4 border-t border-navy/10 bg-paper/70 px-5 py-4 md:px-10">
              <button
                type="button"
                onClick={() => select(idx - 1)}
                aria-label="Previous case study"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-dark"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex-1">
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-navy/70">
                  <span>Case {idx + 1} of {n}</span>
                  <span>{c.name}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-navy/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all duration-500"
                    style={{ width: `${((idx + 1) / n) * 100}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => select(idx + 1)}
                aria-label="Next case study"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-dark"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}