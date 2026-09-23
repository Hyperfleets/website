'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Pause, Play, ArrowUpRight } from 'lucide-react';
import './adaptive-fleet.css';

const scenarios = [
  { title: 'A route closes.', detail: 'The next vehicle takes an open route. Its destination stays the same.', label: 'Route reassigned', color: '#8b7843', route: 'M100 360 L260 360 Q290 360 290 330 L290 210 Q290 180 320 180 L530 180 Q560 180 560 210 L560 330 Q560 360 590 360 L720 360' },
  { title: 'Demand moves.', detail: 'An available vehicle moves closer to the next pickup.', label: 'Vehicle repositioned', color: '#547b72', route: 'M100 360 L260 360 Q290 360 290 390 L290 490 Q290 520 320 520 L610 520 Q640 520 640 490 L640 460' },
  { title: 'A battery runs low.', detail: 'A vehicle is routed to a charger before its next assignment.', label: 'Charging scheduled', color: '#65799c', route: 'M100 360 L400 360 Q430 360 430 330 L430 110' },
];

export function AdaptiveFleet() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync(); query.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => { query.removeEventListener('change', sync); observer.disconnect(); };
  }, []);
  const running = visible && !paused && !reduced;
  useEffect(() => {
    if (running) scene.current?.unpauseAnimations(); else scene.current?.pauseAnimations();
    if (!running) return;
    const timer = setInterval(() => setActive(value => (value + 1) % scenarios.length), 7000);
    return () => clearInterval(timer);
  }, [running, active]);
  useEffect(() => { scene.current?.setCurrentTime(0); }, [active]);
  const current = scenarios[active];
  return <div ref={root} className="adaptive-fleet" data-running={running} style={{ '--fleet-accent': current.color } as CSSProperties}>
    <div className="adaptive-top"><span><i /> FLEET IN MOTION</span><span>Illustrative scenario</span></div>
    <div className="adaptive-layout">
      <div className="adaptive-map">
        <svg ref={scene} viewBox="0 0 820 640" role="img" aria-labelledby="adaptive-title adaptive-desc">
          <title id="adaptive-title">A fleet adapts to changing conditions</title>
          <desc id="adaptive-desc">{current.detail} The illuminated route shows the updated assignment.</desc>
          <defs>
            <pattern id="fleet-grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#494c44" /></pattern>
            <filter id="fleet-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5"/></filter>
            <linearGradient id="fleet-building" x2="1" y2="1"><stop stopColor="#eeeee8"/><stop offset="1" stopColor="#e4e5dd"/></linearGradient>
          </defs>
          <rect width="820" height="640" fill="url(#fleet-grid)" opacity=".12"/>
          <g fill="none" stroke="#4a5040" opacity=".22">
            {[0,1,2,3,4,5].map(i => <path key={i} d={`M${-70+i*20} 60 Q 180 ${-100+i*32} 300 40 T 790 ${45+i*24} M${50+i*22} 640 Q 240 ${520+i*12} 470 615 T 900 ${550+i*20}`} />)}
          </g>
          <g fill="url(#fleet-building)" stroke="#d2d4c9" strokeWidth="1">
            {[[140,220,95,85],[335,230,62,72],[468,230,47,70],[600,220,90,80],[150,415,82,80],[350,420,195,48],[475,75,125,60],[90,90,130,65]].map(([x,y,w,h],i) => <g key={i}><rect x={x} y={y} width={w} height={h} rx="9"/><path d={`M${x+9} ${y+h-12} V${y+12} H${x+w-10}`} fill="none" stroke="#777c65" opacity=".3"/></g>)}
          </g>
          <path d="M60 360 H760 M290 80 V550 M430 80 V560 M560 120 V520 M100 180 H725 M125 520 H720 M640 360 V555 M725 180 V360" fill="none" stroke="#e2e3db" strokeWidth="25" strokeLinecap="round"/>
          <path d="M60 360 H760 M290 80 V550 M430 80 V560 M560 120 V520 M100 180 H725 M125 520 H720 M640 360 V555 M725 180 V360" fill="none" stroke="#666c59" strokeWidth="1" strokeDasharray="3 9" opacity=".65"/>
          <g key={active} className="adaptive-route" fill="none" stroke={current.color}>
            <path d={current.route} strokeWidth="15" opacity=".25" filter="url(#fleet-glow)"/>
            <path d={current.route} strokeWidth="3" pathLength="1" className="adaptive-route-draw"/>
          </g>
          {active === 0 && <g transform="translate(430 360)"><circle r="27" fill="#eee4d9" stroke="#c1896a" strokeDasharray="3 5"/><path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="#ae7455" strokeWidth="3"/></g>}
          <g transform="translate(100 360)"><circle r="12" fill="#f4f4f2" stroke={current.color} strokeWidth="2"/><circle r="4" fill={current.color}/></g>
          <g transform={active === 0 ? 'translate(720 360)' : active === 1 ? 'translate(640 460)' : 'translate(430 110)'}>
            <circle r="32" fill={current.color} opacity=".08" className="adaptive-destination"/><circle r="13" fill="#f4f4f2" stroke={current.color} strokeWidth="2"/>
            {active === 2 ? <path d="M2 -8 L-5 1 H1 L-2 9 L6 -2 H0Z" fill={current.color}/> : <circle r="4" fill={current.color}/>}
          </g>
          <g fill="none" stroke="#88957c" strokeWidth="1" opacity=".4" strokeDasharray="2 7">
            <path d="M430 280 Q230 100 100 360 M430 280 Q610 140 720 360 M430 280 Q570 330 640 460" className="adaptive-signals"/>
          </g>
          <g transform="translate(430 280)"><circle r="24" fill="#f4f4f2" stroke="#b4b9a8"/><circle r="17" fill="#252c24"/><image href="/icon.png" x="-12" y="-12" width="24" height="24"/></g>
          {[
            'M125 520 H610 Q640 520 640 490 V390 Q640 360 610 360 H460 Q430 360 430 390 V490 Q430 520 400 520 H125',
            'M100 180 H530 Q560 180 560 210 V330 Q560 360 530 360 H320 Q290 360 290 330 V210 Q290 180 260 180 H100',
            'M725 180 H460 Q430 180 430 210 V330 Q430 360 460 360 H695 Q725 360 725 330 V180',
          ].map((route,index) => <g key={route} transform={reduced ? `translate(${290+index*140} 180)` : undefined}>
            {!reduced && <animateMotion dur={`${12+index*3}s`} repeatCount="indefinite" path={route} rotate="auto" calcMode="paced"/>}
            <ellipse rx="18" ry="11" fill="#384832" opacity=".09"/>
            <rect x="-12" y="-6" width="24" height="12" rx="4" fill="#6c7666" stroke="#f4f4f2" strokeWidth="1.5"/>
            <rect x="-4" y="-4" width="9" height="8" rx="2" fill="#cbd1c3"/>
          </g>)}
          <g key={`vehicle-${active}`} transform={reduced ? "translate(100 360)" : undefined}>
            {!reduced && <animateMotion dur="7s" repeatCount="indefinite" path={current.route} rotate="auto" calcMode="paced"/>}
            <rect x="-13" y="-7" width="26" height="14" rx="5" fill="#eeeee4" stroke="#161b15" strokeWidth="2"/>
            <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#687060"/><path d="M9 -4 V4" stroke={current.color} strokeWidth="2"/>
          </g>
          <g transform="translate(100 580)" fill="#929687" fontSize="13" letterSpacing="2"><text>OPERATING AREA / 01</text></g>
          <g transform="translate(55 52)" stroke="#828877" opacity=".6"><path d="M0 20 V0 M-4 6 L0 0 L4 6"/><text x="-4" y="-9" fill="#828877" stroke="none" fontSize="10">N</text></g>
        </svg>
        <div className="adaptive-map-note"><span className="adaptive-note-dot"/>{current.label}<ArrowUpRight size={15}/></div>
      </div>
      <div className="adaptive-story">
        <span className="adaptive-kicker">THE PLAN RESPONDS</span>
        <h3>{current.title}</h3><p>{current.detail}</p>
        <div className="adaptive-options" aria-label="Explore fleet scenarios">
          {scenarios.map((item,index) => <button key={item.title} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index+1}</span>{item.title}<i className={active === index ? 'selected' : ''}/></button>)}
        </div>
        <button className="adaptive-pause" type="button" onClick={() => setPaused(value => !value)} disabled={reduced}>{paused || reduced ? <Play size={14}/> : <Pause size={14}/>} {reduced ? 'Reduced motion enabled' : paused ? 'Play illustration' : 'Pause illustration'}</button>
      </div>
    </div>
    <div className="adaptive-footer"><span>HYPERFLEETS / ADAPTIVE ORCHESTRATION</span><span>Same fleet. Updated assignments.</span></div>
  </div>;
}
