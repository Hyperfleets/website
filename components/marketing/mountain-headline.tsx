'use client';

import { useEffect, useRef } from 'react';

// Sky-side silhouette of the foreground ridge in hero-desert-sky.png.
const ridge = 'M0 0H1692V475L1665 470L1640 484L1605 498L1560 522L1520 544L1480 562L1440 582L1400 594L1360 578L1320 555L1280 569L1240 557L1200 547L1160 533L1120 528L1080 545L1040 553L1000 546L970 534L946 524L925 535L900 547L877 558L850 569L825 574L800 558L775 555L752 544L730 537L710 530L685 535L665 543L640 530L620 526L600 539L578 530L554 538L530 531L510 520L490 506L470 494L448 481L425 479L412 470L398 475L380 488L362 502L343 520L324 538L303 550L280 565L253 571L230 588L200 600L170 611L145 626L118 638L85 650L50 664L0 685Z';


export function MountainHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const heading=ref.current;
    const hero=heading?.closest('.hero');
    const stage=heading?.closest('.hero-scroll-stage');
    if(!heading || !hero || !stage) return;
    const mobile=window.matchMedia('(max-width: 800px)');
    if(mobile.matches){
      const holder=heading.parentElement!;
      const letters=heading.firstElementChild as HTMLElement;
      holder.style.top='40%';
      heading.style.maskImage='none';
      letters.style.transform='none';
      letters.style.opacity='1';
      return;
    }
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let progress=reduced.matches?1:0;
    let frame=0;
    let disposed=false;
    const update=()=>{
      const area=hero.getBoundingClientRect();
      const scale=Math.max(area.width/1692,area.height/930);
      const width=1692*scale,height=930*scale;
      const cropY=(area.height-height)/2;
      const holder=heading.parentElement!;
      // Rise clear of the ridge, then hold the revealed position.
      const ease=(v:number)=>v*v*(3-2*v);
      const liftPhase=ease(Math.min(1,progress/.7));
      const lift=45*scale+heading.offsetHeight*.35;
      const base=cropY+540*scale-heading.offsetHeight*.75;
      holder.style.top=`${base-liftPhase*lift}px`;
      const text=heading.getBoundingClientRect();
      // Fixed world-space terrain mask; only the headline rises behind it.
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1692" height="930"><path fill="white" d="${ridge}"/></svg>`;
      heading.style.maskImage=progress>=.7?'none':`url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
      heading.style.maskRepeat='no-repeat';
      heading.style.maskSize=`${width}px ${height}px`;
      heading.style.maskPosition=`${area.left-text.left+(area.width-width)/2}px ${area.top-text.top+cropY}px`;
    };
    const render=()=>{
      frame=0;
      if(disposed) return;
      const area=hero.getBoundingClientRect();
      const stageArea=stage.getBoundingClientRect();
      const distance=Math.max(1,stageArea.height-area.height);
      const t=reduced.matches?1:Math.min(1,Math.max(0,-stageArea.top/distance));
      progress=t;
      const letters=heading.firstElementChild as HTMLElement;
      letters.style.transform='none';
      letters.style.opacity='1';
      update();
    };
    const schedule=()=>{if(!frame) frame=requestAnimationFrame(render);};
    const observer=new ResizeObserver(schedule);observer.observe(hero);observer.observe(heading);
    document.fonts.ready.then(()=>{if(!disposed) schedule();});
    window.addEventListener('scroll',schedule,{passive:true});
    reduced.addEventListener('change',schedule);
    render();
    return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);reduced.removeEventListener('change',schedule);};
  },[]);
  return <h1 ref={ref} id="hero-title"><span style={{display: 'block'}}>We make autonomous<br />machines work together.</span></h1>;
}
