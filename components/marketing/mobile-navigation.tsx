'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const links = [
  ['01', 'Our vision', '#vision'],
  ['02', 'Our intelligence', '#network'],
  ['03', 'Our approach', '#approach'],
] as const;

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className={`mobile-nav${open ? ' is-open' : ''}`}>
      <button className="mobile-menu-trigger" type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}>
        <img src="/hyperfleets-nav-logo.png" alt="Hyperfleets" />
      </button>
      <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation" onClick={() => setOpen(false)} />
      <aside className="mobile-menu-sheet" aria-hidden={!open} aria-label="Mobile navigation">
        <div className="mobile-menu-handle" aria-hidden="true" />
        <div className="mobile-menu-topline">
          <span>Navigate</span>
          <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <nav>
          {links.map(([number, label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <small>{number}</small><span>{label}</span><ArrowUpRight size={21} />
            </a>
          ))}
        </nav>
        <p>Software that makes machines smarter.</p>
      </aside>
    </div>
  );
}
