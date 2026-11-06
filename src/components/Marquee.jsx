export const topics = [
  'Physics', 'Chemistry', 'Biology', 'Aerospace', 'Computer Science', 'Mathematics',
  'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Engineering',
  'Psychology', 'Economics', 'Business',
];

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-navy-900 py-3 text-white" role="marquee" aria-label="Research areas">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {topics.map((t) => (
              <span key={t} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-serif text-lg">{t}</span>
                <span className="text-gold">|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}