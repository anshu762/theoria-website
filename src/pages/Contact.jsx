import { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle.js';
import Reveal from '../components/Reveal.jsx';
import { CONTACT, CONTACT_ENDPOINT, APPLY_URL } from '../config.js';

const field =
  'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40';

export default function Contact() {
  usePageTitle('Contact Us - Theoria');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | mailto

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!CONTACT_ENDPOINT) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInterested in: ${data.interest}\n\n${data.message}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Theoria enquiry: ' + data.interest)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="bg-paper px-4 py-14 text-center md:py-20">
        <h1 className="font-serif text-3xl font-bold md:text-5xl">Speak With an Advisor</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg">
          Tell us about your goals and we’ll help you choose the right Theoria research programme.
        </p>
      </section>

      <section className="py-14 md:py-20">
        <Reveal className="container-x grid gap-10 lg:grid-cols-5">
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 lg:col-span-3 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">Full name
                <input name="name" required className={`${field} mt-1`} autoComplete="name" />
              </label>
              <label className="block text-sm font-medium">Email
                <input name="email" type="email" required className={`${field} mt-1`} autoComplete="email" />
              </label>
              <label className="block text-sm font-medium">Phone
                <input name="phone" type="tel" required className={`${field} mt-1`} autoComplete="tel" />
              </label>
              <label className="block text-sm font-medium">I’m interested in
                <select name="interest" className={`${field} mt-1`} defaultValue="Research Scholars">
                  <option>Research Scholars</option>
                  <option>Elite Research Mentorship</option>
                  <option>Podcasts</option>
                  <option>Something else</option>
                </select>
              </label>
            </div>
            <label className="block text-sm font-medium">Message
              <textarea name="message" rows="5" className={`${field} mt-1`} placeholder="Grade, target universities, area of interest…" />
            </label>

            <button type="submit" disabled={status === 'sending'} className="btn-gold w-full disabled:opacity-60 sm:w-auto">
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm font-medium text-green-700"><CheckCircle2 size={18} /> Thank you! We’ll get back to you shortly.</p>
            )}
            {status === 'mailto' && <p className="text-sm text-ink/80">Your email app should open with the message ready to send.</p>}
            {status === 'error' && <p className="text-sm font-medium text-red-600">Something went wrong. Please try again or email {CONTACT.email}.</p>}
          </form>

          <aside className="space-y-6 rounded-2xl bg-navy p-6 text-white shadow-xl md:p-8 lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-gold">Contact Us</h2>
            <ul className="space-y-5 text-sm text-white/90">
              <li className="flex gap-3"><MapPin className="mt-0.5 shrink-0 text-gold" size={20} />{CONTACT.address}</li>
              <li className="flex gap-3"><Phone className="shrink-0 text-gold" size={20} /><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-gold">{CONTACT.phone}</a></li>
              <li className="flex gap-3"><Mail className="shrink-0 text-gold" size={20} /><a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a></li>
            </ul>
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">Apply to Research Academy</a>
          </aside>
        </Reveal>
      </section>
    </>
  );
}