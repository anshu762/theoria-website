import { FAQS } from '../data/faqs'

const delay = (ms) => ({ '--d': ms + 'ms' })

export default function CommonQuestions() {
  return (
    <section className="bg-white">
      <div className="shell">
        <div className="rv">
          <div className="eyebrow">Common questions</div>
          <h2>What Parents Ask Before Enrolling</h2>
        </div>

        <div className="mt-2.5 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {FAQS.map((item, i) => (
            // outer element handles the scroll-reveal, inner handles hover (no transform conflict)
            <article key={item.q} className="rv flex" style={delay((i % 3) * 100)}>
              <div className="group relative flex w-full flex-col overflow-hidden rounded-[14px] border border-solid border-line bg-white p-[26px] transition duration-300 hover:-translate-y-1.5 hover:border-[#cdd6f5] hover:shadow-card sm:p-8">
                <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-grad transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-4 flex items-center gap-4">
                  <span className="font-display text-[44px] leading-none text-[#B7C3F2] transition-colors duration-300 group-hover:text-brand-purple">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <h3 className="mb-3 mt-0 font-display text-[1.3rem] font-medium leading-[1.3] text-navy">
                  {item.q}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.75] text-muted">{item.a}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}