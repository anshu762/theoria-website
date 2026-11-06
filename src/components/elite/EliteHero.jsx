export default function EliteHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 px-4 py-16 md:py-24">
      <div className="absolute inset-0 -z-10 grid grid-cols-2" aria-hidden="true">
        <div className="bg-gradient-to-br from-brand-blue/50 via-navy-800 to-navy-900" />
        <div className="bg-gradient-to-bl from-brand-purple/50 via-navy-800 to-navy-900" />
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(#9FBDFF_1px,transparent_1px)] [background-size:22px_22px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl -skew-x-6 border border-brand-blue/60 bg-navy/90 px-6 py-10 shadow-2xl backdrop-blur sm:px-12">
        <div className="skew-x-6 text-center">
          <h1 className="font-serif text-3xl font-bold !text-white md:text-5xl">Theoria’s Elite Research Mentorship</h1>
          <p className="mt-5 text-lg text-white/90 md:text-xl">
            Where <span className="gold-underline">high school students co-create</span> with PhDs from the{' '}
            <span className="gold-underline">World’s Most Elite Universities.</span>
          </p>
        </div>
      </div>
    </section>
  );
}