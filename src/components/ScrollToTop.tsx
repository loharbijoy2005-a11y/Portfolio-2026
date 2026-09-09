import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScrollable = fullHeight - windowHeight;
      if (totalScrollable > 0) {
        const percentage = (scrollTop / totalScrollable) * 100;
        setScrollPercent(Math.round(percentage));
        // Show button ONLY after scrolling 50% or more down the page
        setIsVisible(percentage >= 50);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
        >
          {/* Floating Tooltip Above Button on Hover */}
          <div className="absolute bottom-full mb-3 right-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-250 transform translate-y-1 group-hover:translate-y-0 pointer-events-none z-50">
            <div className="bg-slate-950 text-amber-300 text-[11px] font-extrabold px-3 py-1.5 rounded-xl border border-amber-500/30 shadow-2xl shadow-slate-950/80 flex items-center gap-1.5 backdrop-blur-md">
              <span>Scroll to Top</span>
              <span className="text-slate-400 font-mono text-[10px]">({scrollPercent}%)</span>
              <span className="text-amber-400">⬆️</span>
            </div>
            {/* Tooltip Tail */}
            <div className="w-2.5 h-2.5 bg-slate-950 rotate-45 absolute -bottom-1 right-5 border-r border-b border-amber-500/30"></div>
          </div>

          {/* Premium Circular Floating Action Button */}
          <motion.button
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            className="relative w-12 h-12 rounded-full bg-slate-950 text-amber-400 border-2 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all duration-300 flex items-center justify-center cursor-pointer overflow-visible group/btn"
            title="Scroll to top (50%+ scrolled)"
            aria-label="Scroll back to top"
          >
            {/* Ambient Animated Glow Ring behind */}
            <span className="absolute inset-0 rounded-full bg-amber-400/10 animate-ping opacity-75"></span>

            {/* Glowing Arrow Icon */}
            <ArrowUp className="w-5 h-5 text-amber-400 group-hover/btn:-translate-y-1 group-hover/btn:text-amber-300 transition-all duration-300 shrink-0" />

            {/* Live Green Online Dot */}
            <span className="absolute top-0 right-0 flex h-3 w-3 -mt-0.5 -mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 ring-2 ring-slate-950 shadow-[0_0_8px_#f59e0b]"></span>
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
