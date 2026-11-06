import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Page not found - Theoria');
  return (
    <section className="px-4 py-28 text-center">
      <p className="font-serif text-7xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-serif text-3xl font-bold">Page not found</h1>
      <Link to="/" className="btn-navy mt-8">Back to Theoria</Link>
    </section>
  );
}