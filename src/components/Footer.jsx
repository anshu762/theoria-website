import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo.jsx';
import { CONTACT, UNIVISORY_LINKS } from '../config.js';

const Heading = ({ children }) => (
  <h4 className="mb-4 border-b border-gold/60 pb-2 font-serif text-lg text-gold">{children}</h4>
);
const linkCls = 'text-sm text-white/80 transition hover:text-gold';

export default function Footer() {
  return (
    <footer className="bg-navy pb-24 pt-14 text-white">
      <div className="container-x">
        <div className="mb-10"><Logo variant="card" className="h-14" /></div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Heading>Theoria</Heading>
            <ul className="space-y-3">
              <li><Link className={linkCls} to="/">Research Scholars</Link></li>
              <li><Link className={linkCls} to="/elite">Elite Research Mentorship</Link></li>
              <li><Link className={linkCls} to="/podcasts">Podcasts</Link></li>
              <li><Link className={linkCls} to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <Heading>About UniVisory</Heading>
            <ul className="space-y-3">
              {UNIVISORY_LINKS.about.map((l) => (
                <li key={l.label}><a className={linkCls} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <Heading>Useful Links</Heading>
            <ul className="space-y-3">
              {UNIVISORY_LINKS.useful.map((l) => (
                <li key={l.label}><a className={linkCls} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <Heading>Contact Us</Heading>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-gold" />{CONTACT.address}</li>
              <li className="flex gap-3"><Phone size={18} className="shrink-0 text-gold" /><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-gold">{CONTACT.phone}</a></li>
              <li className="flex gap-3"><Mail size={18} className="shrink-0 text-gold" /><a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Theoria, a{' '}
          <a href={UNIVISORY_LINKS.home} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">UniVisory</a>{' '}
          initiative. All rights reserved.
        </p>
      </div>
    </footer>
  );
}