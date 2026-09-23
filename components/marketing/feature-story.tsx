'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Clock3, BriefcaseBusiness, BatteryCharging, House, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
const features = [
 {id:'rules',icon:Clock3,title:'See the fleet clearly.',description:'Know which vehicles are free, where they are, and how much energy they have.',heading:'The whole fleet, in view.',image:'/owner-rules.png',caption:'Every assignment starts with a clear picture of the operation.',alt:'Graphite vehicle with a sculptural clock and operating controls on white'},
 {id:'work',icon:BriefcaseBusiness,title:'Send the right vehicle.',description:'Match each new job with the vehicle best placed to take it.',heading:'A better match for every job.',image:'/owner-work.png',caption:'Demand and available capacity meet in one live plan.',alt:'Silver vehicle at branching white routes with destination markers'},
 {id:'energy',icon:BatteryCharging,title:'Charge without slowing down.',description:'Plan charging around upcoming work instead of treating it as an interruption.',heading:'Charging, timed to the operation.',image:'/owner-energy.png',caption:'Energy becomes part of the schedule, not a surprise.',alt:'Graphite vehicle at a white charging pedestal with a pale blue energy loop'},
 {id:'home',icon:House,title:'Stay ahead of demand.',description:'Move idle vehicles before demand shifts, so capacity is already where it needs to be.',heading:'Ready before the next request.',image:'/owner-home.png',caption:'The fleet moves into position before the pressure arrives.',alt:'Silver vehicle arriving at a structured destination with a warm window'},
];
export function FeatureStory() {
 const [selected,setSelected] = useState('rules');
 const reduced = useReducedMotion();
 return <section id="owner-controls" className="section feature-section">
   <div className="section-label"><span>02 / What Hyperfleets does</span><span>From live fleet state to the next move</span></div>
   <h2>The fleet changes by the minute.<br/><span>The plan should too.</span></h2>
   <Tabs value={selected} onValueChange={(value) => setSelected(String(value))} orientation="vertical" className="feature-tabs">
     <TabsList className="feature-list" aria-label="Explore orchestration capabilities" aria-orientation="vertical" variant="line" onKeyDown={(event) => {
       if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
       event.preventDefault();
       const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
       const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
       const next = tabs[(current + (event.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length];
       next?.focus(); next?.click();
     }}>{features.map((feature) => {const Icon=feature.icon;return <TabsTrigger key={feature.id} value={feature.id} className="feature-trigger"><span className="feature-title"><Icon size={20}/>{feature.title}<ArrowUpRight size={18}/></span><span className="feature-description">{feature.description}</span></TabsTrigger>;})}</TabsList>
     <div className="feature-visual owner-art-panel">
       {features.map(feature => <TabsContent key={feature.id} value={feature.id} className="feature-panel"><AnimatePresence mode="wait"><motion.figure key={selected} initial={reduced ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.3}} className="owner-art"><img src={feature.image} alt={feature.alt} loading="lazy"/><figcaption><span>ORCHESTRATION VIEW</span><h3>{feature.heading}</h3><p>{feature.caption}</p></figcaption></motion.figure></AnimatePresence></TabsContent>)}
     </div>
   </Tabs>
 </section>;
}
