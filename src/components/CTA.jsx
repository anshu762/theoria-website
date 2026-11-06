import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CTA({ title = 'Get Started Today!', label = 'Speak With an Advisor', to = '/contact' }) {
  return (
    <section className="bg-paper py-16">
      <Reveal className="container-x text-center">
        <h2 className="font-serif text-3xl font-bold md:text-[40px]">{title}</h2>
        <Link to={to} className="btn-gold mt-6">{label}</Link>
      </Reveal>
    </section>
  );
}