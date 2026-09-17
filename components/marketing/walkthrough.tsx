'use client';
import { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, ArrowUpRight } from 'lucide-react';
import { FloatingGradient } from '@/components/ui/floating-gradient-shadcnui';
const chapters = ['Set your rules', 'Find the right work', 'Charge & reposition', 'Return home'];
export function Walkthrough() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [error, setError] = useState('');
  const [pausedMotion, setPausedMotion] = useState(false);
  async function play() {
    if (!video.current) return;
    try {
      setError('');
      if (video.current.ended) video.current.currentTime = 0;
      await video.current.play();
    } catch { setError('Playback could not start. Try the video’s play control.'); }
  }
  function selectChapter(index: number) {
    if (!video.current) return;
    video.current.currentTime = index * 6;
    setTime(index * 6);
    void play();
  }
  return <section id="walkthrough" className="section walkthrough">
    <div className="section-label"><span>02 / A day with Hyperfleets</span><span>Product concept · 24 seconds</span></div>
    <div className="section-heading"><h2>While you get on<br/>with your day.</h2><p>A look at how your car could find work, manage its energy, and be ready when you need it.</p></div>
    <FloatingGradient className="walkthrough-frame" paused={pausedMotion}>
      <div className="player-shell">
        <div className="player-top"><span><i/> hyperfleets / owner workspace</span><span>Illustrative product concept</span></div>
        <div className="video-wrap">
          <video ref={video} controls={started} preload="metadata" playsInline poster="/walkthrough-poster.jpg" aria-label="Hyperfleets product concept walkthrough" onPlay={() => {setPlaying(true);setStarted(true);}} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={() => setTime(video.current?.currentTime ?? 0)} onError={() => setError('The video could not load. Please reload the page to try again.')}>
            <source src="/hyperfleets-walkthrough.mp4" type="video/mp4"/>
            <track kind="captions" src="/walkthrough.vtt" srcLang="en" label="English"/>
            Your browser does not support video playback.
          </video>
          {!started && <button className="video-start" onClick={play}><span><Play size={26} fill="currentColor"/></span>Watch the walkthrough <small>0:24</small></button>}
        </div>
        <div className="player-bottom"><button className="player-action" onClick={() => playing ? video.current?.pause() : void play()} aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}>{playing ? <Pause size={18}/> : time >= 23.9 ? <RotateCcw size={18}/> : <Play size={18}/>}<span>{playing ? 'Pause' : time >= 23.9 ? 'Replay' : 'Play'}</span></button><span>{`0:${Math.floor(time).toString().padStart(2,'0')} / 0:24`}</span><button className="motion-toggle" aria-pressed={pausedMotion} onClick={() => setPausedMotion(!pausedMotion)}>{pausedMotion ? 'Resume' : 'Pause'} background motion</button></div>
        {error && <p role="alert" className="video-error">{error}</p>}
      </div>
    </FloatingGradient>
    <div className="chapter-list" aria-label="Walkthrough chapters">{chapters.map((chapter,index) => <button key={chapter} onClick={() => selectChapter(index)} aria-label={`Watch chapter ${index+1}: ${chapter}`} aria-current={Math.min(3,Math.floor(time/6)) === index ? 'step' : undefined}><span>0{index+1}</span>{chapter}<ArrowUpRight size={16}/></button>)}</div>
    <p className="concept-note">Illustrative workflow and example values. Hyperfleets is in development; this is not footage of a live service.</p>
  </section>;
}
