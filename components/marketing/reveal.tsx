'use client';
import { useEffect } from 'react';
export function RevealEffects() {
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const nodes = Array.from(document.querySelectorAll('.section-heading, .vision h2, .vision-text, .steps article, .approach-rows article, .usecase'));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}), {threshold:.08});
  nodes.forEach(node => {node.classList.add('reveal-ready');observer.observe(node);});
  return () => {observer.disconnect();nodes.forEach(node => node.classList.remove('reveal-ready'));};
 },[]);
 return null;
}
