'use client';

import { useEffect, useRef } from 'react';

// Sky-side silhouette of the foreground ridge in hero-desert-sky.png.
const ridge = 'M0 0H1692V475L1665 470L1640 484L1605 498L1560 522L1520 544L1480 562L1440 582L1400 594L1360 578L1320 555L1280 569L1240 557L1200 547L1160 533L1120 528L1080 545L1040 553L1000 546L970 534L946 524L925 535L900 547L877 558L850 569L825 574L800 558L775 555L752 544L730 537L710 530L685 535L665 543L640 530L620 526L600 539L578 530L554 538L530 531L510 520L490 506L470 494L448 481L425 479L412 470L398 475L380 488L362 502L343 520L324 538L303 550L280 565L253 571L230 588L200 600L170 611L145 626L118 638L85 650L50 664L0 685Z';
const mask = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1692" height="930"><path fill="white" d="${ridge}"/></svg>`)}")`;

export function MountainHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const heading=ref.current;
    const hero=heading?.closest('.hero');
    if(!heading || !hero) return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let progress=reduced.matches?1:0;
    let frame=0;
    let disposed=false;
    const update=()=>{
      const area=hero.getBoundingClientRect(), text=heading.getBoundingClientRect();
      const scale=Math.max(area.width/1692,area.height/930);
      const width=1692*scale,height=930*scale;
      heading.style.maskImage=progress>=1?'none':mask;
      heading.style.maskRepeat='no-repeat';
      heading.style.maskSize=`${width}px ${height}px`;
      heading.style.maskPosition=`${area.left-text.left+(area.width-width)/2}px ${area.top-text.top+(area.height-height)/2+Math.max(0,(progress-.45)/.55)*area.height}px`;
    };
    const observer=new ResizeObserver(update);observer.observe(hero);observer.observe(heading);
    document.fonts.ready.then(()=>{if(!disposed) update();});update();
    const start=performance.now()+2700;
    const animate=(now:number)=>{
      if(disposed) return;
      const t=Math.min(1,Math.max(0,(now-start)/4200));
      progress=t*t*(3-2*t);
      const letters=heading.firstElementChild as HTMLElement;
      letters.style.transform=`translateY(${(1-progress)*85}px) scale(${.88+.12*progress})`;
      letters.style.opacity=String(.25+.75*progress);
      update();
      if(t<1) frame=requestAnimationFrame(animate);
    };
    if(!reduced.matches) frame=requestAnimationFrame(animate);
    return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);};
  },[]);
  return <h1 ref={ref} id="hero-title"><span style={{display: 'block'}}>We make autonomous machines work together.</span></h1>;
}
