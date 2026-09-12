import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicSplashProps {
  onComplete: () => void;
}

export const CinematicSplash: React.FC<CinematicSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isStrokeComplete, setIsStrokeComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Session Storage: Allow replay on demand or refresh
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct > 65) {
        setIsStrokeComplete(true);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="apple-shadowarrow-splash"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(20px)' }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-8 sm:p-16 select-none overflow-hidden font-sans"
        >
          {/* Subtle Ambient Apple Glow Radial Aura */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-amber-400/15 rounded-full blur-[150px]"
            />
          </div>

          {/* Top Apple Minimal Header */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>SHADOW ARROW ENGINE</span>
            </span>
            <span>2026 EDITION</span>
          </div>

          {/* Center Apple 'Hello' Style Laser Handwriting & Shimmer Reveal */}
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto space-y-8 w-full">
            <div className="relative flex items-center justify-center w-full min-h-[140px] px-4">
              
              {/* Apple Hello Style SVG Laser Stroke Handwriting Outline */}
              <svg
                viewBox="0 0 1000 200"
                className="w-full max-w-3xl h-auto overflow-visible select-none drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
              >
                <defs>
                  <linearGradient id="appleLaserGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#60A5FA" />
                    <stop offset="70%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#FDE047" />
                  </linearGradient>

                  <linearGradient id="appleShimmerSweep" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#93C5FD" />
                    <stop offset="100%" stopColor="#FACC15" />
                  </linearGradient>
                </defs>

                {/* Laser Stroke Outline Drawing Animation */}
                <motion.text
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fill={isStrokeComplete ? 'url(#appleShimmerSweep)' : 'transparent'}
                  stroke="url(#appleLaserGlow)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="font-mono font-black uppercase tracking-[0.16em]"
                  style={{ fontSize: '72px' }}
                  initial={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                >
                  SHADOW ARROW
                </motion.text>
              </svg>

              {/* Shimmer Light Beam Sweep Overlay after stroke completion */}
              {isStrokeComplete && (
                <motion.div
                  initial={{ opacity: 0, x: '-100%' }}
                  animate={{ opacity: 1, x: '100%' }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              )}
            </div>

            {/* Apple Minimal Sleek Loading Bar */}
            <div className="w-56 sm:w-72 space-y-2.5 pt-4">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden backdrop-blur-md p-0.5 border border-white/15">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="tracking-wider uppercase text-[10px]">Loading Architecture</span>
                <span className="text-blue-400 font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Credits */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Bijoy Lohar • Founder & Lead Engineer</span>
            <span className="hidden sm:inline">Sub-Second Platform</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
