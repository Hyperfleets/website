import { FeatureStory } from '@/components/marketing/feature-story';
import { RevealEffects } from '@/components/marketing/reveal';
import { HeadlightReveal } from '@/components/marketing/headlight-reveal';
import { IntelligenceNetwork } from '@/components/marketing/intelligence-network';
import { ArrowDown, ArrowUpRight, BatteryCharging, BriefcaseBusiness, Clock3, House, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main id="top">
      <RevealEffects />
      <a className="skip-link" href="#vision">Skip to content</a>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src="/hero-road-cars-v3.png" alt="Cars traveling on a winding mountain road seen from above" fetchPriority="high" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-shade" />
        <header className="navigation">
          <a href="#top" className="brand" aria-label="Hyperfleets home"><img src="/hyperfleets-nav-logo.png" alt="Hyperfleets" /></a>
          <nav aria-label="Main navigation"><a href="#vision">Our vision</a><a href="#network">Our intelligence</a><a href="#approach">Our approach <ArrowUpRight size={15}/></a></nav>
        </header>
        <div className="hero-topline"><span className="eyebrow">Software that makes machines smarter.</span><span className="hero-index">Coming soon</span></div>
        <div className="hero-bottom">
          <div className="hero-copy"><h1 id="hero-title">We make autonomous machines work together.</h1><p>We’re exploring new possibilities for autonomous machines and the world around them. More to share soon.</p><a className="pill" href="#network">Explore our vision <span><ArrowUpRight size={23}/></span></a></div>
          <div className="hero-wordmark" aria-hidden="true">hyperfleets<span>.ai</span></div>
        </div>
        <a href="#vision" className="scroll-cue" aria-label="Scroll to our vision"><ArrowDown size={20}/></a>
      </section>
      <section id="vision" className="section vision">
        <div className="section-label"><span>01 / The orchestration layer</span><span>Fleet intelligence above the autonomy stack</span></div>
        <div className="belief-intro">
          <h2><span className="belief-primary">Autonomy drives the vehicle.</span><span>Hyperfleets directs the fleet.</span></h2>
          <p className="belief-lead">The autonomy stack handles how each vehicle drives. Hyperfleets determines what the fleet should do next.</p>
        </div>
        <div className="belief-grid">
          <article><span>01</span><h3>Read the operating picture.</h3><p>Demand and fleet state create a changing view of vehicles, energy, position, and capacity.</p></article>
          <article><span>02</span><h3>Decide the next mission.</h3><p>Hyperfleets coordinates allocation, staging, charging, and repositioning at fleet level.</p></article>
          <article><span>03</span><h3>Re-optimize continuously.</h3><p>As fleet state and demand change, mission decisions adapt across the operation.</p></article>
        </div>
        <p className="belief-boundary">Demand + Fleet State → Hyperfleets → Mission Decisions → Autonomous Vehicles</p>
      </section>
      <FeatureStory />
      <HeadlightReveal />
      <div className="light-zone">
      <section className="section capability-bento" aria-labelledby="system-at-work-title">
        <div className="bento-heading">
          <span className="small-label">THE SYSTEM AT WORK</span>
          <h2 id="system-at-work-title">One plan.<br/>Every moving part.</h2>
          <p>A changing operating picture becomes coordinated mission decisions across the fleet.</p>
        </div>
        <div className="bento-grid">
          <article className="bento-card bento-photo-card">
            <img src="/hero-road-cars-v3.png" alt="Autonomous vehicles moving through a coordinated road network" loading="lazy"/>
            <div><BriefcaseBusiness size={19}/><span>Vehicle allocation</span><h3>Match the right vehicle to the next mission.</h3></div>
          </article>
          <article className="bento-card bento-rule-card">
            <span className="bento-card-title"><Clock3 size={18}/> Demand window</span>
            <h3>Plan available capacity across the operating horizon.</h3>
            <div className="schedule-track"><span>Now</span><i/><strong>Demand window</strong><span>Next</span></div>
            <small>The mission plan updates as demand changes.</small>
          </article>
          <article className="bento-card bento-map-card">
            <span className="bento-card-title"><MapPin size={18}/> Fleet staging</span>
            <h3>Stage capacity closer to expected demand.</h3>
            <div className="mini-map" aria-hidden="true"><i/><i/><i/><i/><span><MapPin size={20}/></span></div>
          </article>
          <article className="bento-card bento-energy-card">
            <span className="bento-card-title"><BatteryCharging size={18}/> Charging plan</span>
            <div className="battery-ring"><strong>Plan</strong><span>ACTIVE</span></div>
            <h3>Coordinate charging with upcoming missions.</h3>
          </article>
          <article className="bento-card bento-home-card">
            <span className="bento-card-title"><House size={18}/> Capacity plan</span>
            <div className="arrival-card"><small>NEXT PLANNING HORIZON</small><strong>Continuous</strong><span>Re-optimized</span></div>
            <h3>Keep the fleet ready for what comes next.</h3>
          </article>
        </div>
      </section>
      <section className="section machine-study" aria-labelledby="machine-study-title">
        <div className="section-label"><span>03 / Continuous orchestration</span><span>Fleet state meets changing demand</span></div>
        <div className="section-heading"><h2 id="machine-study-title">Many moving parts.<br/>One operating picture.</h2><p>Hyperfleets coordinates allocation, staging, charging, repositioning, and capacity planning as conditions change.</p></div>
        <figure><img src="/hyperfleets-orchestration-sketch.png" alt="An original architectural sketch of autonomous vehicles moving through a connected orchestration system" loading="lazy"/><figcaption>Mission decisions continuously adapt across the fleet.</figcaption></figure>
      </section>
      <IntelligenceNetwork />
      </div>
      <div className="dark-return">
      <section id="approach" className="section approach">
        <div className="section-label"><span>05 / Initial focus</span><span>Complex operations. Predictable demand.</span></div>
        <div className="section-heading"><h2>Structured environments.<br/>Fleet-level complexity.</h2><p>Hyperfleets is initially focused on structured transportation environments where demand is predictable but operations are complex.</p></div>
        <div className="approach-rows">
          <article><span>01</span><h3>Above the autonomy stack.</h3><p>Autonomous driving systems handle navigation, vehicle control, and driving safety.</p></article>
          <article><span>02</span><h3>Focused on fleet decisions.</h3><p>Hyperfleets coordinates what vehicles should do, where capacity should be, and how the plan should adapt.</p></article>
          <article><span>03</span><h3>Built for continuous change.</h3><p>Fleet state and demand evolve. Orchestration continuously re-optimizes the mission plan.</p></article>
        </div>
      </section>
      <footer className="footer-wrap">
        <div className="footer-card">
          <div className="footer-lead"><a href="#top" className="footer-brand" aria-label="Hyperfleets home"><img src="/hyperfleets-logo.png" alt="hyperfleets.ai"/></a><p>Autonomy for the fleet, not just the vehicle.</p></div>
          <div className="footer-links">
            <div><strong>Explore</strong><a href="#network">In development</a><a href="#vision">The orchestration layer</a><a href="#network">System architecture</a><a href="#owner-controls">Capabilities</a></div>
            <div><strong>System</strong><a href="#network">Orchestration intelligence</a><a href="#owner-controls">Mission decisions</a><a href="#approach">Initial focus</a></div>
            <div><strong>Principles</strong><span>Autonomy-stack independent</span><span>Fleet-level coordination</span><span>Continuous re-optimization</span></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Hyperfleets. All rights reserved.</span><a className="footer-contact" href="mailto:founders@hyperfleets.ai">founders@hyperfleets.ai</a><a className="back-top" href="#top">Back to top <ArrowUpRight size={18}/></a></div>
        </div>
      </footer>
      </div>
    </main>
  );
}
