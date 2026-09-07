import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicSplashProps {
  onComplete: () => void;
}

export const CinematicSplash: React.FC<CinematicSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Session Storage check: Play splash only once per browser session
    const hasShown = sessionStorage.getItem('shadowarrow_splash_shown');
    if (hasShown) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Animate counter 0 -> 100 over ~1.1s
    const startTime = Date.now();
    const duration = 1100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        
        // Pause briefly at 100%, then trigger curtain slide upward (Phase 2)
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('shadowarrow_splash_shown', 'true');
          
          // Complete animation after curtain slide finishes (~600ms)
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 150);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-splash"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-[#FAF7F2] text-slate-900 flex flex-col justify-between p-8 sm:p-16 select-none font-sans overflow-hidden border-b border-[#E5DDD0]"
        >
          {/* Top Brand Header */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span>ShadowArrow Eng.</span>
            <span>V3.0 • 2026</span>
          </div>

          {/* Center Brand Typography & Animated Progress */}
          <div className="max-w-xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <h1 className="text-3xl sm:text-5xl font-black tracking-[0.25em] text-slate-900 font-mono">
                SHADOW ARROW
              </h1>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-700 font-mono">
                WEB ENGINEERING ENGINE
              </p>
            </motion.div>

            {/* Thin Progress Bar & Percentage */}
            <div className="space-y-3 pt-4">
              <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden p-0.5 border border-slate-300/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-semibold">
                <span className="text-[11px] uppercase tracking-wider text-slate-600">
                  Initializing Web Engineering Engine • Bijoy Lohar
                </span>
                <span className="text-blue-700 font-bold text-sm">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Callout */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Next.js 14 • TypeScript • GST Invoicing</span>
            <span className="hidden sm:inline">Crafted in India</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
