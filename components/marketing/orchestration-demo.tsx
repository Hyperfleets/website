'use client';

import { useEffect, useState } from 'react';
import { BatteryCharging, BriefcaseBusiness, House, MapPin } from 'lucide-react';

const decisions = [
  { time: '9:12', icon: BriefcaseBusiness, title: 'Accept delivery', detail: '$34 · 7.2 mi · fits owner rules' },
  { time: '11:40', icon: BatteryCharging, title: 'Charge before demand', detail: '18 min · low-cost window' },
  { time: '1:05', icon: MapPin, title: 'Reposition downtown', detail: 'Projected demand +28%' },
  { time: '4:18', icon: House, title: 'Return home', detail: 'Arrival 4:44 · 16 min early' },
];

export function OrchestrationDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % decisions.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section decision-demo" aria-labelledby="decision-heading">
      <div className="decision-copy">
        <span className="small-label">A DAY OF DECISIONS</span>
        <h2 id="decision-heading">Every move serves<br />the whole day.</h2>
        <p>Hyperfleets considers work, energy, location, and your return time together—rather than optimizing one trip at a time.</p>
      </div>
      <div className="decision-console">
        <div className="console-top"><span>Tuesday · Phoenix</span><span className="live-dot">Planning</span></div>
        <div className="decision-route" aria-label="Illustrative orchestration timeline">
          {decisions.map((decision, index) => {
            const Icon = decision.icon;
            return (
              <button key={decision.title} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)}>
                <span className="decision-time">{decision.time}</span>
                <span className="decision-icon"><Icon size={18} /></span>
                <span><strong>{decision.title}</strong><small>{decision.detail}</small></span>
              </button>
            );
          })}
        </div>
        <div className="console-summary"><span>Owner rules protected</span><strong>4:44 PM</strong><small>planned return</small></div>
      </div>
    </section>
  );
}
