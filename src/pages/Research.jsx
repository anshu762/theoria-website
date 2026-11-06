import usePageTitle from '../hooks/usePageTitle.js';
import Marquee from '../components/Marquee.jsx';
import FloatingApply from '../components/FloatingApply.jsx';
import WhyResearch from '../components/research/WhyResearch.jsx';
import PapersBand from '../components/research/PapersBand.jsx';
import MentorsGrid from '../components/research/MentorsGrid.jsx';
import ProgramsTable from '../components/research/ProgramsTable.jsx';
import CTA from '../components/CTA.jsx';

export default function Research() {
  usePageTitle("Theoria: UniVisory's Research Academy");
  return (
    <>
      <Marquee />

      <section className="relative overflow-hidden bg-paper px-4 pb-24 pt-16 text-center md:pt-24">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="mb-6 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">Theoria: UniVisory's Research Academy</h1>
          <p className="text-lg md:text-xl">
            Publish <span className="gold-underline">High-Quality Research Papers</span> and Elevate Your Candidacy for{' '}
            <span className="gold-underline">Ivy League Admissions.</span>
          </p>
          <p className="mt-2 text-base text-ink/80 md:text-lg">
            Well-suited for ambitious Indian students aiming for top global universities.
          </p>
        </div>
      </section>

      <FloatingApply />
      <WhyResearch />
      <PapersBand />
      <MentorsGrid />
      <ProgramsTable />
      <CTA />
    </>
  );
}