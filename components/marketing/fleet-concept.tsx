'use client';

import { useState } from 'react';
import { ArrowUpRight, BatteryCharging, Layers, MapPin, MoveUpRight, Route } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const views = [
 {id:'allocation',label:'Allocation',icon:Layers,headline:'A fleet-wide view of the next move.',description:'Relate available vehicles to changing demand and operating constraints.',mission:'Allocate capacity',from:'Available vehicles',to:'Demand zone',active:0},
 {id:'staging',label:'Staging',icon:MapPin,headline:'Readiness starts before the request.',description:'Consider where vehicles should wait as expected demand takes shape.',mission:'Stage for demand',from:'Fleet state',to:'Staging area',active:1},
 {id:'charging',label:'Charging',icon:BatteryCharging,headline:'Energy is part of the operation.',description:'Account for charging needs alongside vehicle availability and demand.',mission:'Plan charging',from:'Energy state',to:'Charging area',active:2},
 {id:'repositioning',label:'Repositioning',icon:Route,headline:'Conditions change. Position matters.',description:'Reconsider where capacity belongs as the operating picture changes.',mission:'Reposition vehicle',from:'Current position',to:'Next demand zone',active:3},
 {id:'capacity',label:'Capacity planning',icon:MoveUpRight,headline:'Look beyond the next mission.',description:'Bring expected demand and fleet readiness into the same planning view.',mission:'Review capacity',from:'Expected demand',to:'Fleet readiness',active:4},
];
export function FleetConcept() {
 const [selected,setSelected]=useState('allocation');
 return <section id="product" className="section fleet-product" aria-labelledby="product-title">
   <div className="section-label"><span>04 / A view of the system</span><span>Product concept · Illustrative only</span></div>
   <div className="section-heading"><h2 id="product-title">Every vehicle.<br/>One operating picture.</h2><p>A conceptual view of fleet state, demand, and mission decisions. A glimpse of the direction, not a live product demonstration.</p></div>
   <Tabs value={selected} onValueChange={value=>setSelected(String(value))} className="fleet-tabs">
    <TabsList className="fleet-view-tabs" aria-label="Explore orchestration concepts">{views.map(view=><TabsTrigger value={view.id} key={view.id}>{view.label}</TabsTrigger>)}</TabsList>
    {views.map(view=><TabsContent key={view.id} value={view.id} className="fleet-concept-panel">
      <div className="fleet-console-header"><span>HYPERFLEETS <span>/ ORCHESTRATION</span></span><span>CONCEPT VIEW</span></div>
      <div className="fleet-console-body">
       <div className="fleet-map"><div className="fleet-map-label">Structured operating environment</div>
        <svg viewBox="0 0 640 390" role="img" aria-label={`${view.label} concept: ${view.from} informs ${view.to}`}>
         <defs><pattern id={`grid-${view.id}`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2c3033" strokeWidth=".6"/></pattern></defs>
         <rect width="640" height="390" fill={`url(#grid-${view.id})`}/>
         <g stroke="#42474b" strokeWidth="18" fill="none" strokeLinejoin="round"><path d="M 40 280 H 165 V 100 H 470 V 285 H 595"/><path d="M 315 40 V 340"/></g>
         <g stroke="#6c7479" strokeWidth="1" strokeDasharray="4 8" fill="none"><path d="M 40 280 H 165 V 100 H 470 V 285 H 595"/><path d="M 315 40 V 340"/></g>
         <path d={view.active===2?'M 205 100 H 315 V 285 H 470':view.active===3?'M 470 180 V 285 H 315 V 100 H 165': 'M 165 230 V 100 H 470 V 180'} fill="none" stroke="#f3e7a3" strokeWidth="2"/>
         <g fill="#a9b8c6">{[[165,230],[205,100],[315,180],[470,180],[390,285],[315,325]].map(([x,y],i)=><g key={i} transform={`translate(${x},${y})`}><rect x="-8" y="-14" width="16" height="28" rx="5" fill={i===view.active?'#f3e7a3':'#b4bdc4'}/><rect x="-5" y="-7" width="10" height="6" rx="2" fill="#33383c"/></g>)}</g>
         <g fontFamily="Arial,sans-serif" fontSize="14" fill="#d2d6d8"><rect x="42" y="35" width="155" height="38" rx="8" fill="#242a2d"/><text x="60" y="59">Demand zone</text><rect x="430" y="325" width="155" height="38" rx="8" fill="#242a2d"/><text x="448" y="349">Charging area</text><text x="372" y="68">Staging area</text></g>
        </svg>
        <div className="fleet-map-legend"><span><i/>Vehicle state</span><span><i/>Illustrative mission</span></div>
       </div>
       <div className="fleet-decision"><view.icon size={24}/><span className="fleet-kicker">ORCHESTRATION FOCUS</span><h3>{view.headline}</h3><p>{view.description}</p><div className="fleet-decision-flow"><span>{view.from}</span><ArrowUpRight size={18}/><strong>{view.mission}</strong><span>{view.to}</span></div><small>Mission intent passes to the autonomous-driving system for execution.</small></div>
      </div>
    </TabsContent>)}
   </Tabs>
 </section>;
}
