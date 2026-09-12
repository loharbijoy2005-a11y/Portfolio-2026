import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicSplashProps {
  onComplete: () => void;
}

// Apple iPhone 'Hello' multi-lingual greeting cycle
const HELLO_WORDS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Namaste', lang: 'Hindi' },
  { text: 'SHADOW ARROW', lang: 'Web Engineering' },
];

export const CinematicSplash: React.FC<CinematicSplashProps> = ({ onComplete }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress bar speed controller (1.8s duration)
    const startTime = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      // Cycle word index based on progress percent
      const step = Math.min(
        HELLO_WORDS.length - 1,
        Math.floor((pct / 100) * HELLO_WORDS.length)
      );
      setWordIndex(step);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 250);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  const currentWord = HELLO_WORDS[wordIndex];
  const isFinalWord = wordIndex === HELLO_WORDS.length - 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="apple-hello-splash"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-8 sm:p-16 select-none overflow-hidden font-sans"
        >
          {/* Subtle Ambient Apple Glow Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-amber-500/10 rounded-full blur-[140px] opacity-70" />
          </div>

          {/* Top Apple Minimal Badge */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Shadow Arrow Engine</span>
            </span>
            <span>2026 Edition</span>
          </div>

          {/* Center Apple 'Hello' Style Animated Typography */}
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 flex flex-col items-center justify-center my-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord.text}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <h1
                  className={`tracking-tight font-extrabold ${
                    isFinalWord
                      ? 'text-4xl sm:text-7xl tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-amber-300 drop-shadow-[0_0_35px_rgba(59,130,246,0.5)] font-mono'
                      : 'text-5xl sm:text-8xl text-white font-serif italic drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  }`}
                >
                  {currentWord.text}
                </h1>
                
                <p className="text-xs font-mono font-medium text-slate-400 tracking-widest uppercase">
                  {currentWord.lang}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Apple Minimal Sleek Loading Bar */}
            <div className="w-48 sm:w-64 space-y-2.5 pt-8">
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden backdrop-blur-md p-0.5 border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="tracking-wider">System Loading</span>
                <span className="text-blue-400 font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Credit */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Bijoy Lohar • Founder & Lead Engineer</span>
            <span className="hidden sm:inline">Sub-Second Platform</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
