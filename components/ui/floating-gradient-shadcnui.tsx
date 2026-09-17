"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function FloatingGradient({ children, className = "", paused = false }: { children?: ReactNode; className?: string; paused?: boolean }) {
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion && !paused;
  return (
    <div className={`relative h-96 w-full overflow-hidden rounded-2xl border bg-[var(--card-bg)] ${className}`}>
      <motion.div aria-hidden="true" className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-blue-500 to-slate-500 opacity-20 blur-3xl"
        animate={animate ? { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] } : {x:0,y:0,scale:1}}
        transition={animate ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : {duration:0}} style={{ top: "10%", left: "10%" }} />
      <motion.div aria-hidden="true" className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 opacity-20 blur-3xl"
        animate={animate ? { x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] } : {x:0,y:0,scale:1}}
        transition={animate ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : {duration:0}} style={{ bottom: "10%", right: "10%" }} />
      <motion.div aria-hidden="true" className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 opacity-20 blur-3xl"
        animate={animate ? { x: [0, 50, 0], y: [0, -100, 0], scale: [1, 1.1, 1] } : {x:0,y:0,scale:1}}
        transition={animate ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : {duration:0}} style={{ top: "50%", left: "50%" }} />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children ?? <div className="text-center"><h2 className="text-4xl font-bold">Floating Gradient</h2><p className="mt-2 text-[var(--foreground)]/70">Animated background effect</p></div>}
      </div>
    </div>
  );
}
export default FloatingGradient;
