'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export function HeadlightReveal() {
  const root = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = root.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const next = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height * 0.38)));
      setProgress(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const reveal = Math.max(0, Math.min(1, (progress - 0.12) / 0.48));
  const lights = Math.max(0, Math.min(1, (progress - 0.32) / 0.68));

  return (
    <section
      ref={root}
      className="headlight-reveal"
      aria-labelledby="headlight-title"
      style={{ '--reveal': reveal, '--lights': lights } as React.CSSProperties}
    >
      <div className="headlight-sticky">
        <div className="headlight-scene">
          <img src="/car-reveal.png" alt="A dark vehicle emerging from shadow" />
          <div className="headlight headlight-left" aria-hidden="true" />
          <div className="headlight headlight-right" aria-hidden="true" />
        </div>
        <div className="car-vignette" />
        <div className="headlight-copy">
          <span>AUTONOMY GETS THE VEHICLE DOWN THE ROAD</span>
          <h2 id="headlight-title">Driving is one problem.<br />Running the fleet is another.</h2>
          <p>Hyperfleets works above the autonomy stack to coordinate the operation.</p>
        </div>
        <ArrowDown className="reveal-arrow" aria-hidden="true" />
      </div>
    </section>
  );
}
