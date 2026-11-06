import PaperStack from './PaperStack.jsx';
import Reveal from '../Reveal.jsx';

export default function PapersBand() {
  return (
    <section className="overflow-hidden bg-paper py-14 md:py-16">
      <Reveal className="container-x flex flex-col items-center justify-between gap-10 lg:flex-row">
        <PaperStack />
        <h3 className="max-w-2xl text-center font-serif text-3xl font-bold leading-snug text-navy md:text-5xl">
          Helping Students Publish <br className="hidden md:block" />
          Research in IF 3+ Journals <br className="hidden md:block" />
          with <span className="gold-underline">High Quality Mentorship.</span>
        </h3>
        <div className="hidden sm:block lg:block"><PaperStack lazy /></div>
      </Reveal>
    </section>
  );
}