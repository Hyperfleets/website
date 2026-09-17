const brands = [
  {name:'Demand',x:130,y:105}, {name:'Fleet State',x:450,y:65}, {name:'Capacity',x:770,y:105},
  {name:'Staging',x:130,y:415}, {name:'Charging',x:450,y:455}, {name:'Positioning',x:770,y:415},
];
const neurons = [[390,210],[440,185],[495,200],[530,250],[490,305],[430,325],[375,285],[350,240],[445,250],[475,260]];
export function IntelligenceNetwork() {
  return <section id="network" className="section intelligence-section" aria-labelledby="intelligence-title">
    <div className="section-label"><span>04 / Orchestration intelligence</span><span>A distinct layer above vehicle autonomy</span></div>
    <div className="section-heading"><h2 id="intelligence-title">Demand meets fleet state.<br/>Mission decisions follow.</h2><p>Hyperfleets turns a changing operating picture into coordinated mission decisions for autonomous vehicles.</p></div>
    <figure className="neural-figure">
      <svg viewBox="0 0 900 530" role="img" aria-labelledby="neural-title neural-description">
        <title id="neural-title">Hyperfleets orchestration intelligence</title>
        <desc id="neural-description">Demand, fleet state, capacity, staging, charging, and positioning connect through Hyperfleets orchestration intelligence.</desc>
        <defs><radialGradient id="neural-glow"><stop stopColor="#dee5f1"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient></defs>
        <circle cx="450" cy="260" r="190" fill="url(#neural-glow)"/>
        <g className="neural-branches" fill="none" stroke="#b1bac7" strokeWidth="1.5">
          {brands.map(({name,x,y},i)=><path key={name} d={`M ${x} ${y} C ${x} 260, ${i%2 ? 570:330} ${y}, 450 260`}/>)}
          {neurons.map(([x,y],i)=><path key={i} d={`M ${x} ${y} L ${neurons[(i+1)%neurons.length].join(' ')} M ${x} ${y} L ${neurons[(i+3)%neurons.length].join(' ')}`}/>)}
        </g>
        {neurons.map(([x,y],i)=><circle className="neural-node" key={i} cx={x} cy={y} r={i%3===0?6:4} fill={i%3===0?'#778da9':'#252a32'} style={{animationDelay:`${i*.3}s`}}/>)}
        <rect x="354" y="235" width="192" height="50" rx="25" fill="#171413"/>
        <text x="450" y="265" textAnchor="middle" fill="white" fontSize="21" fontWeight="500">hyperfleets</text>
        {brands.map(({name,x,y})=><g key={name}><rect x={x-94} y={y-28} width="188" height="56" rx="14" fill="white" stroke="#dedfe1"/><text x={x} y={y+6} textAnchor="middle" fill="#303033" fontSize="18">{name}</text></g>)}
      </svg>
      <figcaption>Demand + Fleet State → Hyperfleets → Mission Decisions → Autonomous Vehicles</figcaption>
    </figure>
    <p className="intelligence-closing">The autonomy stack handles how a vehicle drives. <span>Hyperfleets determines what the fleet should do next.</span></p>
  </section>;
}
