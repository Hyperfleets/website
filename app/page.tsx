import { MountainHeadline } from '@/components/marketing/mountain-headline';
import { FeatureStory } from '@/components/marketing/feature-story';
import { RevealEffects } from '@/components/marketing/reveal';
import { SmoothScroll } from '@/components/marketing/smooth-scroll';
import { HeadlightReveal } from '@/components/marketing/headlight-reveal';
import { IntelligenceNetwork } from '@/components/marketing/intelligence-network';
import { MobileNavigation } from '@/components/marketing/mobile-navigation';
import { ArrowUpRight, BatteryCharging, BriefcaseBusiness, Clock3, House, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main id="top">
      <RevealEffects />
      <SmoothScroll />
      <a className="skip-link" href="#vision">Skip to content</a>
      <div className="hero-scroll-stage">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-orbit" aria-hidden="true">
          <img className="hero-photo hero-view-front" src="/hero-desert-sky.png" alt="" fetchPriority="high" />
        </div>
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-shade" />
        <header className="navigation">
          <a href="#top" className="brand" aria-label="Hyperfleets home"><img src="/hyperfleets-nav-logo.png" alt="Hyperfleets" /></a>
          <nav aria-label="Main navigation"><a href="#vision">Our vision</a><a href="#network">Our intelligence</a><a href="#approach">Our approach <ArrowUpRight size={15}/></a></nav>
          <MobileNavigation />
        </header>
        <div className="hero-topline"><span className="eyebrow">Software that makes machines smarter.</span><span className="hero-index">Coming soon</span></div>
        <div className="hero-distant-title"><MountainHeadline /></div>
        <div className="hero-copy"><p>AI intelligence infrastructure for orchestrating autonomous and connected fleets for large enterprises.</p><a className="pill" href="#network">Explore our vision <span><ArrowUpRight size={23}/></span></a></div>
        <div className="hero-bottom">
          <div className="hero-wordmark" aria-hidden="true">hyperfleets<span>.ai</span></div>
        </div>
      </section>
      </div>
      <section id="vision" className="section vision">
        <div className="section-label"><span>01 / The orchestration layer</span><span>Fleet coordination above the autonomy stack</span></div>
        <div className="belief-intro">
          <h2><span className="belief-primary">Each vehicle knows how to drive.</span><span>The fleet still needs direction.</span></h2>
          <p className="belief-lead">Autonomy handles the road. Hyperfleets handles the operation: where each vehicle should go, when it should charge, and what it should do next.</p>
        </div>
        <div className="belief-grid">
          <article><span>01</span><h3>Know what you have.</h3><p>See which vehicles are available, where they are, how much energy they have, and what work is coming in.</p></article>
          <article><span>02</span><h3>Put the right vehicle on the job.</h3><p>Assign, stage, charge, and reposition the fleet from one shared view of the operation.</p></article>
          <article><span>03</span><h3>Keep the plan current.</h3><p>When demand moves or a vehicle’s state changes, update the plan before the operation falls behind.</p></article>
        </div>
        <p className="belief-boundary">A live view of the fleet. A plan that keeps moving.</p>
      </section>
      <FeatureStory />
      <HeadlightReveal />
      <div className="light-zone">
      <section className="section capability-bento" aria-labelledby="system-at-work-title">
        <div className="bento-heading">
          <span className="small-label">A DAY IN THE OPERATION</span>
          <h2 id="system-at-work-title">Keep every vehicle on the right job.</h2>
          <p>Hyperfleets keeps assignments, charging, staging, and capacity in sync as the day changes.</p>
        </div>
        <div className="bento-grid">
          <article className="bento-card bento-photo-card">
            <img src="/hero-road-cars-v3.png" alt="Autonomous vehicles moving through a coordinated road network" loading="lazy"/>
            <div><BriefcaseBusiness size={19}/><span>Vehicle allocation</span><h3>Send the best-positioned vehicle.</h3></div>
          </article>
          <article className="bento-card bento-rule-card">
            <span className="bento-card-title"><Clock3 size={18}/> Demand window</span>
            <h3>Keep enough capacity ready for the next demand window.</h3>
            <div className="schedule-track"><span>Now</span><i/><strong>Demand window</strong><span>Next</span></div>
            <small>The schedule moves when demand does.</small>
          </article>
          <article className="bento-card bento-map-card">
            <span className="bento-card-title"><MapPin size={18}/> Fleet staging</span>
            <h3>Put vehicles where they’ll be needed.</h3>
            <div className="mini-map" aria-hidden="true"><i/><i/><i/><i/><span><MapPin size={20}/></span></div>
          </article>
          <article className="bento-card bento-energy-card">
            <span className="bento-card-title"><BatteryCharging size={18}/> Charging plan</span>
            <div className="battery-ring"><strong>Plan</strong><span>ACTIVE</span></div>
            <h3><span className="text-highlight">Charge</span> at the right time—not just the first available time.</h3>
          </article>
          <article className="bento-card bento-home-card">
            <span className="bento-card-title"><House size={18}/> Capacity plan</span>
            <div className="arrival-card"><small>NEXT PLANNING HORIZON</small><strong>Continuous</strong><span>Re-optimized</span></div>
            <h3>Stay ready for the next shift in demand.</h3>
          </article>
        </div>
      </section>
      <section className="section machine-study" aria-labelledby="machine-study-title">
        <div className="section-label"><span>03 / In motion</span><span>The plan moves with the fleet</span></div>
        <div className="section-heading"><h2 id="machine-study-title">Adjust the plan as conditions change.</h2><p>A late arrival, a low battery, or a sudden spike in demand can change what should happen next. Hyperfleets keeps up.</p></div>
        <figure><img src="/hyperfleets-orchestration-sketch.png" alt="An original architectural sketch of autonomous vehicles moving through a connected orchestration system" loading="lazy"/><figcaption>One change can reshape the plan across the fleet.</figcaption></figure>
      </section>
      <IntelligenceNetwork />
      <div className="network-stack-runway" aria-hidden="true" />
      </div>
      <div className="dark-return">
      <section id="approach" className="section approach">
        <div className="section-label"><span>05 / Where we start</span><span>Built for operations with real constraints</span></div>
        <div className="section-heading"><h2>Start where coordination<br/>matters most.</h2><p>We’re building Hyperfleets for structured transportation networks—places with repeatable routes, predictable demand, and enough moving pieces that manual planning starts to break down.</p></div>
        <div className="approach-rows">
          <article><span>01</span><h3>Works with the autonomy already in the vehicle.</h3><p>The driving system stays focused on navigation, control, and safety. Hyperfleets works above it.</p></article>
          <article><span>02</span><h3>Built around the dispatcher’s hardest decisions.</h3><p>Which vehicle goes next? Where should capacity wait? When can charging happen without losing coverage?</p></article>
          <article><span>03</span><h3>Changes the plan when the day changes.</h3><p>A fleet rarely runs exactly as expected. Hyperfleets keeps assignments and capacity aligned as conditions move.</p></article>
        </div>
      </section>
      <footer className="footer-wrap">
        <div className="footer-card">
          <div className="footer-lead"><a href="#top" className="footer-brand" aria-label="Hyperfleets home"><img src="/hyperfleets-logo.png" alt="hyperfleets.ai"/></a><p>A better way to run autonomous fleets.</p></div>
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
