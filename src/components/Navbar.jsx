import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { APPLY_URL } from '../config.js';

const links = [
  { to: '/', label: 'Theoria Research Scholars', end: true },
  { to: '/elite', label: 'Theoria Elite' },
  { to: '/podcasts', label: 'Theoria Podcasts' },
  { to: '/contact', label: 'Contact Us' },
];

const desktopCls = ({ isActive }) =>
  `relative py-2 font-serif text-[15px] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-blue after:to-brand-purple after:transition-all ${
    isActive ? 'text-brand-purple-dark after:w-full' : 'text-navy after:w-0 hover:text-brand-purple-dark hover:after:w-full'
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-blue/30 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between md:h-24">
        <Link to="/" aria-label="Theoria home" className="flex items-center">
          <Logo className="h-14 md:h-[76px]" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={desktopCls}>{l.label}</NavLink>
          ))}
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">Get Started</a>
        </nav>

        <button
          className="rounded-md p-2 text-navy hover:bg-paper lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="animate-fadeIn border-t border-gray-100 bg-white px-4 pb-5 pt-3 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `block border-b border-gray-100 py-3 font-serif text-base ${isActive ? 'text-brand-purple-dark' : 'text-navy'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4 w-full">Get Started</a>
        </nav>
      )}
    </header>
  );
}