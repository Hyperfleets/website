'use client';

import { useEffect, useRef } from 'react';

const brands = [
  {name:'Demand',x:130,y:105}, {name:'Fleet State',x:450,y:65}, {name:'Capacity',x:770,y:105},
  {name:'Staging',x:130,y:415}, {name:'Charging',x:450,y:455}, {name:'Positioning',x:770,y:415},
];
const neurons = [[390,210],[440,185],[495,200],[530,250],[490,305],[430,325],[375,285],[350,240],[445,250],[475,260]];
export function IntelligenceNetwork() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const measure = () => element.style.setProperty('--network-pin-top', `${Math.min(0, window.innerHeight - element.offsetHeight)}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);
  return <section ref={section} id="network" className="section intelligence-section" aria-labelledby="intelligence-title">
    <div className="section-label"><span>04 / How decisions connect</span><span>One system, fed by the whole operation</span></div>
    <div className="section-heading"><h2 id="intelligence-title"><span className="intelligence-highlight">See what the whole fleet needs next.</span></h2><p>Demand rises. Batteries run low. Vehicles drift out of position. Hyperfleets reads those changes together and decides what should happen next.</p></div>
    <figure className="neural-figure">
      <svg className="neural-desktop" viewBox="0 0 900 530" role="img" aria-labelledby="neural-title neural-description">
        <title id="neural-title">Hyperfleets orchestration intelligence</title>
        <desc id="neural-description">Demand, fleet state, capacity, staging, charging, and positioning connect through Hyperfleets orchestration intelligence.</desc>
        <defs>
          <radialGradient id="neural-glow"><stop stopColor="#dce0e5" stopOpacity=".5"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
          <mask id="neural-wire-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="530">
            <g fill="none" stroke="white" strokeWidth="3" strokeDasharray="1 6" strokeLinecap="round">
              {brands.map(({name,x,y},i)=><path key={name} d={`M ${x} ${y} C ${x} 260, ${i%2 ? 570:330} ${y}, 450 260`}/>)}
              {neurons.map(([x,y],i)=><path key={i} d={`M ${x} ${y} L ${neurons[(i+1)%neurons.length].join(' ')}`}/>)}
            </g>
          </mask>
        </defs>
        <circle cx="450" cy="260" r="190" fill="url(#neural-glow)"/>
        <g className="neural-branches" fill="none" stroke="#b1bac7" strokeWidth="1.5">
          {brands.map(({name,x,y},i)=><path key={name} d={`M ${x} ${y} C ${x} 260, ${i%2 ? 570:330} ${y}, 450 260`}/>)}
          {neurons.map(([x,y],i)=><path key={i} d={`M ${x} ${y} L ${neurons[(i+1)%neurons.length].join(' ')} M ${x} ${y} L ${neurons[(i+3)%neurons.length].join(' ')}`}/>)}
        </g>
        <g aria-hidden="true" mask="url(#neural-wire-mask)">
          {brands.map(({name,x,y},i)=><path className="neural-current" key={name} pathLength="100" d={i<3 ? `M ${x} ${y} C ${x} 260, ${i%2 ? 570:330} ${y}, 450 260` : `M 450 260 C ${i%2 ? 570:330} ${y}, ${x} 260, ${x} ${y}`} style={{animationDelay:`-${i*.53}s`}}/>)}
          {neurons.map(([x,y],i)=><path className="neural-current neural-current-inner" key={i} pathLength="100" d={`M ${x} ${y} L ${neurons[(i+1)%neurons.length].join(' ')}`} style={{animationDelay:`-${i*.27}s`}}/>)}
        </g>
        {neurons.map(([x,y],i)=><circle className="neural-node" key={i} cx={x} cy={y} r={i%3===0?6:4} fill={i%3===0?'#778da9':'#252a32'} style={{animationDelay:`${i*.3}s`}}/>)}
        <rect x="354" y="235" width="192" height="50" rx="25" fill="#171413"/>
        <text x="450" y="265" textAnchor="middle" fill="white" fontSize="21" fontWeight="500">hyperfleets</text>
        {brands.map(({name,x,y})=><g key={name}><rect x={x-94} y={y-28} width="188" height="56" rx="14" fill="white" stroke="#dedfe1"/><text x={x} y={y+6} textAnchor="middle" fill="#303033" fontSize="18">{name}</text></g>)}
      </svg>
      <svg className="neural-mobile" viewBox="0 0 390 640" role="img" aria-labelledby="neural-mobile-title neural-mobile-description">
        <title id="neural-mobile-title">The signals behind each Hyperfleets decision</title>
        <desc id="neural-mobile-description">Demand, fleet state, capacity, staging, charging, and positioning feed a connected Hyperfleets decision network.</desc>
        <defs>
          <radialGradient id="mobile-neural-glow"><stop stopColor="#d6dbe0" stopOpacity=".7"/><stop offset="1" stopColor="#f4f4f2" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="195" cy="316" r="178" fill="url(#mobile-neural-glow)"/>
        <g className="neural-branches mobile-neural-branches" fill="none">
          <path d="M58 72 C90 160 128 214 195 316 M294 70 C274 166 246 228 195 316 M62 232 C115 250 145 276 195 316 M318 238 C277 254 241 279 195 316 M65 496 C106 425 142 362 195 316 M310 505 C270 424 240 362 195 316"/>
          <path d="M128 253 L164 220 L215 239 L253 284 L239 345 L198 382 L145 363 L119 315 Z M128 253 L215 239 M164 220 L198 382 M253 284 L145 363 M119 315 L239 345"/>
        </g>
        <g aria-hidden="true" fill="none">
          <path className="neural-current" pathLength="100" d="M58 72 C90 160 128 214 195 316"/>
          <path className="neural-current" pathLength="100" d="M294 70 C274 166 246 228 195 316" style={{animationDelay:'-.6s'}}/>
          <path className="neural-current" pathLength="100" d="M62 232 C115 250 145 276 195 316" style={{animationDelay:'-1.2s'}}/>
          <path className="neural-current" pathLength="100" d="M318 238 C277 254 241 279 195 316" style={{animationDelay:'-1.8s'}}/>
          <path className="neural-current" pathLength="100" d="M65 496 C106 425 142 362 195 316" style={{animationDelay:'-2.4s'}}/>
          <path className="neural-current" pathLength="100" d="M310 505 C270 424 240 362 195 316" style={{animationDelay:'-3s'}}/>
        </g>
        {[[128,253],[164,220],[215,239],[253,284],[239,345],[198,382],[145,363],[119,315]].map(([x,y],i)=><circle className="neural-node" key={i} cx={x} cy={y} r={i%3===0?6:4}/>) }
        <circle cx="195" cy="316" r="43" fill="#000"/>
        <image href="/icon.png" x="163" y="284" width="64" height="64"/>
        <g className="mobile-network-labels" textAnchor="middle" fill="#24211f" fontSize="21" fontWeight="500">
          <text x="58" y="61">Demand</text>
          <text x="300" y="59">Fleet state</text>
          <text x="62" y="221">Capacity</text>
          <text x="321" y="227">Staging</text>
          <text x="65" y="525">Charging</text>
          <text x="310" y="535">Positioning</text>
        </g>
      </svg>
      <figcaption>Live demand and fleet state in. Clear vehicle assignments out.</figcaption>
    </figure>
    <p className="intelligence-closing">The vehicle handles the road. <span>Hyperfleets keeps the operation on track.</span></p>
  </section>;
}
