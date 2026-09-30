'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import './adaptive-fleet.css';

// Vehicle paths are also the road centre lines: drawing and movement share geometry.
const pickupRoute = 'M 150 410 L 370 410 Q 400 410 400 380 L 400 230 Q 400 200 430 200 L 810 200';
const chargeRoute = 'M 990 410 L 700 410 Q 670 410 670 440 L 670 520 Q 670 550 640 550 L 470 550';
const throughRoute = 'M 85 90 L 990 90 Q 1030 90 1030 130 L 1030 560';
const roads = [pickupRoute, chargeRoute, throughRoute, 'M 85 410 H 1100', 'M 400 65 V 590', 'M 85 200 H 1100', 'M 670 65 V 590', 'M 85 550 H 1100'];
const dispatchLeg = 'M 150 410 L 370 410 Q 400 410 400 380';
const redirectLeg = 'M 400 380 L 400 230 Q 400 200 430 200 L 640 200 Q 670 200 670 230';
const finalLeg = 'M 670 230 L 670 380 Q 670 410 700 410 L 850 410';
const blocks = [[130,120,210,45],[445,120,175,45],[720,120,225,45],[130,250,210,110],[450,250,165,110],[720,250,225,110],[140,455,195,50],[450,455,155,50],[725,455,220,50]];
const stages = [
  { at: 0, title: 'A new pickup is requested.', detail: 'Flight HF204 is due at Terminal A. Two passengers need a car.', label: 'New pickup · Terminal A', sub: 'Flight HF204 · 2 passengers', dark: false },
  { at: 1.5, title: 'Car 48 is dispatched.', detail: 'Hyperfleets assigns the closest available car and sends the pickup route.', label: 'Hyperfleets → Car 48', sub: 'Proceed to Terminal A · pickup assigned', dark: true },
  { at: 4, title: 'The flight is delayed.', detail: 'HF204 is now 25 minutes late. Car 48 pauses at the junction while Hyperfleets updates its assignment.', label: 'HF204 delayed +25 min', sub: 'Terminal A pickup moved to a later slot', dark: false },
  { at: 5.5, title: 'A waiting passenger gets priority.', detail: 'Hyperfleets redirects Car 48 to passenger Maya at Terminal B, instead of leaving it waiting for the delayed flight.', label: 'Car 48 → Terminal B', sub: 'Pick up Maya · revised route sent', dark: true },
  { at: 8.5, title: 'The passenger cancels en route.', detail: 'Maya cancels before Car 48 arrives. The vehicle holds at the next junction; the cancelled route is released.', label: 'Maya cancelled the pickup', sub: 'Car 48 · stop assignment at next junction', dark: false },
  { at: 10, title: 'Car 48 takes the next nearby pickup.', detail: 'Hyperfleets assigns Alex at the hotel. Watch Car 48 turn south, then east along Service Avenue.', label: 'Car 48 → Hotel pickup', sub: 'Pick up Alex · new route confirmed', dark: true },
  { at: 13, title: 'Charging is coordinated alongside the pickup.', detail: 'Car 12 has 18% battery. Hyperfleets reserves Charger 02 while Car 48 continues toward Alex.', label: 'Car 12 · battery 18%', sub: 'Hyperfleets reserved Charger 02 · en route', dark: true },
  { at: 17, title: 'Both vehicles reach their assignments.', detail: 'Car 48 arrives for Alex. Car 12 reaches its charger. The delayed flight remains scheduled for later.', label: 'Car 48 arrived · Alex boarding', sub: 'Hotel pickup complete · Car 12 charging', dark: false },
];

function Car({ dark = false }: { dark?: boolean }) {
  return <g className="sim-car-shape" transform="rotate(90)">
    <ellipse cx="2" cy="3" rx="15" ry="30" fill="#000" opacity=".15" filter="url(#carSoft)"/>
    <g fill="#222"><rect x="-14" y="-19" width="4" height="10" rx="1.5"/><rect x="10" y="-19" width="4" height="10" rx="1.5"/><rect x="-14" y="12" width="4" height="10" rx="1.5"/><rect x="10" y="12" width="4" height="10" rx="1.5"/></g>
    <path d="M-9-29Q0-32 9-29Q13-25 13-17V20Q12 29 8 30H-8Q-13 28-13 20V-17Q-13-25-9-29Z" fill={dark ? 'url(#carGraphite)' : 'url(#carSilver)'} stroke="#424242" strokeWidth=".8"/>
    <path d="M-9-11Q0-15 9-11L8 0H-8Z" fill="url(#carGlass)" stroke="#444" strokeWidth=".6"/>
    <path d="M-8 17H8L9 24Q0 27-9 24Z" fill="#424a4c"/>
    <path d="M-8 1H8V16H-8Z" fill={dark ? '#777' : '#e8e8e6'} stroke="#888" strokeWidth=".5"/>
    <path d="M-11-8V17M11-8V17M-8-23Q0-25 8-23" fill="none" stroke={dark ? '#aaa' : '#fff'} strokeWidth="1"/>
    <path d="M-10-26H-5M5-26H10" stroke="#fff" strokeWidth="2.6"/><path d="M-10 27H-6M6 27H10" stroke="#777" strokeWidth="2"/>
    <rect x="-17" y="-5" width="5" height="3" rx="1" fill="#888"/><rect x="12" y="-5" width="5" height="3" rx="1" fill="#888"/>
    <circle cy="6" r="3" fill="#303536" stroke="#dededb" strokeWidth="1"/><circle cy="6" r="1" fill="#adb4b5"/>
  </g>;
}

export function AdaptiveFleet() {
  const root = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const cars = useRef<(SVGGElement | null)[]>([]);
  const elapsed = useRef(0);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches); sync(); media.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold:.15});
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener('change', sync); };
  }, []);
  useEffect(() => {
    let frame = 0, previous = 0;
    const render = (now: number) => {
      if (previous && visible && !paused && !reduced) elapsed.current = Math.min(19, elapsed.current + Math.min((now - previous) / 1000, .06));
      previous = now;
      const time = reduced ? 19 : elapsed.current;
      setStage(stages.reduce((current, item, index) => time >= item.at ? index : current, 0));
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const leg = time < 5.5 ? 0 : time < 10 ? 1 : 2;
      const progress = [leg === 0 ? clamp((time - 1.5) / 2.5) : leg === 1 ? clamp((time - 5.5) / 3) : clamp((time - 10) / 7), clamp((time - 13) / 4), clamp(time / 20)];
      [leg, 3, 4].forEach((pathIndex, i) => {
        const path = paths.current[pathIndex], car = cars.current[i]; if (!path || !car) return;
        const length = path.getTotalLength(); const distance = progress[i] * length;
        const p = path.getPointAtLength(distance), a = path.getPointAtLength(Math.max(0, distance - 1)), b = path.getPointAtLength(Math.min(length, distance + 1));
        car.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI})`);
      });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render); return () => cancelAnimationFrame(frame);
  }, [visible, paused, reduced]);
  const current = stages[stage];
  return <div ref={root} className="adaptive-fleet">
    <div className="sim-heading"><span>AN ILLUSTRATED FLEET OPERATION</span><span>TERMINAL DISTRICT / 01</span></div>
    <div className="sim-world">
      <svg className="sim-map" viewBox="0 0 1200 650" role="img" aria-label="A street map showing Car 48 being redirected from a delayed flight to Terminal B, then to a hotel after a cancellation, Car 12 driving to Charger 02, and Car 31 continuing its existing route.">
        <defs>
          <pattern id="pencilHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0V6" stroke="#999" strokeWidth=".65" opacity=".4"/></pattern>
          <linearGradient id="carSilver"><stop stopColor="#969997"/><stop offset=".22" stopColor="#fdfdfb"/><stop offset=".65" stopColor="#dedfdb"/><stop offset="1" stopColor="#7e8583"/></linearGradient>
          <linearGradient id="carGraphite"><stop stopColor="#303536"/><stop offset=".4" stopColor="#828887"/><stop offset="1" stopColor="#292d2e"/></linearGradient>
          <linearGradient id="carGlass" x2="0" y2="1"><stop stopColor="#192426"/><stop offset="1" stopColor="#79868a"/></linearGradient>
          <filter id="carSoft"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <g className="sim-buildings">{blocks.map(([x,y,w,h],i) => <g key={i}><rect x={x+5} y={y+5} width={w} height={h} fill="url(#pencilHatch)"/><rect x={x} y={y} width={w} height={h}/><rect x={x+7} y={y+7} width={w-14} height={h-14} className="sim-roof"/>{Array.from({length:Math.floor(w/35)},(_,j)=><path key={j} d={`M${x+18+j*35} ${y+12}v${h-24}`} className="sim-roof-detail"/>)}</g>)}</g>
        <g className="sim-roads">{roads.map((d,i)=><path d={d} key={i}/>)}</g>
        <g className="sim-road-surface">{roads.map((d,i)=><path d={d} key={i}/>)}</g>
        <g className="sim-road-markings">{roads.map((d,i)=><path d={d} key={i}/>)}</g>
        <g className="sim-crosswalks">{[400,670,1030].map(x=><g key={x}><path d={`M${x-43} 180v40M${x+43} 180v40M${x-43} 390v40M${x+43} 390v40`}/></g>)}</g>
        <g className="sim-map-labels"><text x="170" y="185">TERMINAL DRIVE</text><text x="735" y="395">SERVICE AVENUE</text><text x="730" y="535">ENERGY LANE</text><text x="165" y="310">FLEET DEPOT</text><text x="735" y="310">TERMINAL A</text></g>
        <g className="sim-trees">{[120,180,240,300,740,800,860,920,980].map((x,i)=><g key={x} transform={`translate(${x} ${i<4?590:595})`}><circle r="10"/><path d="M-5 2 4-5M-3 6 6-3"/></g>)}</g>
        <g fill="none" stroke="none">{[dispatchLeg,redirectLeg,finalLeg,chargeRoute,throughRoute].map((d,i)=><path key={i} ref={el=>{paths.current[i]=el;}} d={d}/>)}</g>
        <path className="sim-assigned-route" d={stage < 3 ? pickupRoute : stage < 5 ? redirectLeg : finalLeg} opacity={stage>=1?1:0}/>
        <path className="sim-assigned-route sim-charge-route" d={chargeRoute} opacity={stage>=6?1:0}/>
        <g transform={`translate(${stage < 3 ? '810 200' : stage < 5 ? '670 230' : '850 410'})`} className="sim-location"><circle r="19"/><circle r="5"/><path d="M0 21V42"/><text y="59" textAnchor="middle">{stage < 3 ? 'TERMINAL A' : stage < 5 ? 'TERMINAL B' : 'HOTEL PICKUP'}</text></g>
        <g transform="translate(470 550)" className="sim-location"><rect x="-16" y="-18" width="32" height="36" rx="5"/><path d="M3-11-5 2h9L-2 12"/><text y="37" textAnchor="middle">CHARGER 02</text></g>
        <g transform="translate(525 302)" className="sim-logo"><circle r="25"/><image href="/icon.png" x="-17" y="-17" width="34" height="34"/><text x="0" y="45" textAnchor="middle">HYPERFLEETS</text></g>
        {[0,1,2].map((i)=><g key={i} ref={el=>{cars.current[i]=el;}} transform={`translate(${[150,990,85][i]} ${[410,410,90][i]})`}><Car dark={i===2}/></g>)}
      </svg>
      <div key={stage} className={`sim-callout sim-callout-${stage} ${current.dark ? 'sim-callout-dark' : ''}`} role="status"><span className="sim-callout-icon">{stage===7?'✓':current.dark?'↗':'!'}</span><div><strong>{current.label}</strong><span>{current.sub}</span></div></div>
      <div className="sim-car-key"><span><i/>48 · {stage===7?'Alex boarding':stage===0?'Available':stage===2||stage===4?'Awaiting reassignment':stage<3?'To Terminal A':stage<5?'To Terminal B':'To hotel pickup'}</span><span><i/>12 · {stage===7?'Charging':stage>=6?'To Charger 02':'Finishing its job'}</span><span><i/>31 · On its existing route</span></div>
    </div>
    <div className="sim-caption"><div><span>0{stage+1} / 08 · ILLUSTRATIVE SCENARIO</span><h3>{current.title}</h3><p>{current.detail}</p></div><div className="sim-controls"><button onClick={()=>{elapsed.current=0;setPaused(false);}} aria-label="Replay simulation"><RotateCcw size={17}/></button><button disabled={reduced} onClick={()=>setPaused(v=>!v)} aria-label={paused?'Play simulation':'Pause simulation'}>{paused?<Play size={17}/>:<Pause size={17}/>}</button></div></div>
  </div>;
}
