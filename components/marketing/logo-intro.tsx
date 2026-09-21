'use client';

import { useEffect, useRef, useState } from 'react';

export function LogoIntro() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const element = image.current;
    if (!element) return;
    let playback: ReturnType<typeof setTimeout> | undefined;
    let dismissal: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (dismissal !== undefined) return;
      document.documentElement.classList.remove('logo-intro-active');
      setExiting(true);
      dismissal = setTimeout(() => setVisible(false), 700);
    };
    const start = () => {
      if (playback === undefined) playback = setTimeout(finish, 4200);
    };
    document.documentElement.classList.add('logo-intro-active');
    element.addEventListener('load', start);
    element.addEventListener('error', finish);
    // Cached images may finish loading before React attaches event handlers.
    if (element.complete) {
      if (element.naturalWidth) start();
      else finish();
    }
    const fallback = setTimeout(finish, 10000);
    return () => {
      clearTimeout(playback);
      clearTimeout(dismissal);
      clearTimeout(fallback);
      element.removeEventListener('load', start);
      element.removeEventListener('error', finish);
      document.documentElement.classList.remove('logo-intro-active');
    };
  }, []);
  if (!visible) return null;
  return (
    <div className={`gif-intro${exiting ? ' is-exiting' : ''}`} aria-label="Hyperfleets introduction" role="status">
      <img ref={image} src="/hyperfleets-logo-reveal.gif" alt="Hyperfleets" fetchPriority="high" />
    </div>
  );
}
