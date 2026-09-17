'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Clock3, BriefcaseBusiness, BatteryCharging, House, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
const features = [
 {id:'rules',icon:Clock3,title:'Plans from fleet state.',description:'Availability, position, energy, and operating constraints shape each mission decision.',heading:'See the whole fleet.',image:'/owner-rules.png',caption:'State becomes context for the next decision.',alt:'Graphite vehicle with a sculptural clock and operating controls on white'},
 {id:'work',icon:BriefcaseBusiness,title:'Allocates the next mission.',description:'Changing demand is matched with available capacity across the operation.',heading:'Capacity meets demand.',image:'/owner-work.png',caption:'Mission decisions remain coordinated at fleet scale.',alt:'Silver vehicle at branching white routes with destination markers'},
 {id:'energy',icon:BatteryCharging,title:'Coordinates charging.',description:'Energy readiness is planned alongside staging, allocation, and upcoming demand.',heading:'Energy stays in the plan.',image:'/owner-energy.png',caption:'Charging is part of the operating picture.',alt:'Graphite vehicle at a white charging pedestal with a pale blue energy loop'},
 {id:'home',icon:House,title:'Repositions continuously.',description:'Vehicles are staged and repositioned as fleet state and demand evolve.',heading:'Position for what comes next.',image:'/owner-home.png',caption:'The plan updates as conditions change.',alt:'Silver vehicle arriving at a structured destination with a warm window'},
];
export function FeatureStory() {
 const [selected,setSelected] = useState('rules');
 const reduced = useReducedMotion();
 return <section id="owner-controls" className="section feature-section">
   <div className="section-label"><span>02 / Orchestration capabilities</span><span>One operating picture. Continuous decisions.</span></div>
   <h2>Every vehicle has a state.<br/><span>The fleet needs a plan.</span></h2>
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
