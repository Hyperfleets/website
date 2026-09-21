'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let target = window.scrollY;
    let lastTime = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      document.documentElement.classList.remove('inertial-scroll');
    };
    const tick = (time: number) => {
      const elapsed = Math.min(time - lastTime, 64);
      lastTime = time;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target, max));
      const current = window.scrollY;
      const next = current + (target - current) * (1 - Math.exp(-elapsed / 150));
      window.scrollTo({ top: Math.abs(target - current) < 1 ? target : next, behavior: 'instant' });
      if (Math.abs(target - window.scrollY) < 1) stop();
      else frame = requestAnimationFrame(tick);
    };
    const onWheel = (event: WheelEvent) => {
      if (document.documentElement.classList.contains('logo-intro-active')) { event.preventDefault(); return; }
      if (preference.matches || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.cancelable) return;
      // Preserve independent scrolling in menus, dialogs and text fields.
      let node = event.target instanceof Element ? event.target : null;
      while (node && node !== document.body) {
        if (node.matches('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return;
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) return;
        node = node.parentElement;
      }
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      if (!frame) target = window.scrollY;
      target = Math.max(0, Math.min(target + event.deltaY * unit * 0.8, document.documentElement.scrollHeight - window.innerHeight));
      if (!frame) {
        document.documentElement.classList.add('inertial-scroll');
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', stop);
    window.addEventListener('pointerdown', stop);
    window.addEventListener('touchstart', stop, { passive: true });
    preference.addEventListener('change', stop);
    return () => {
      stop();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', stop);
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('touchstart', stop);
      preference.removeEventListener('change', stop);
    };
  }, []);
  return null;
}
