import Reveal from '../Reveal.jsx';
import { programColumns, programRows } from '../../data/research.js';

export default function ProgramsTable() {
  return (
    <section className="bg-paper py-14 md:py-16">
      <div className="container-x">
        <Reveal><h2 className="section-title mb-10">Different Programs Offered</h2></Reveal>
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  {programColumns.map((c) => (
                    <th key={c} scope="col" className="px-5 py-5 font-serif text-sm font-bold uppercase tracking-wider">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programRows.map((row) => (
                  <tr key={row[0]} className="border-b border-gray-100 odd:bg-white even:bg-gray-50/70 transition-colors hover:bg-gold/10">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-5 py-4 ${i === 0 ? 'font-medium text-navy' : 'text-gray-700'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}