import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
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
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 30 }}
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 p-3 bg-slate-900/90 text-white rounded-full shadow-2xl shadow-blue-500/25 border border-slate-700/80 backdrop-blur-md cursor-pointer hover:border-amber-400/80 hover:shadow-amber-500/30 transition-colors duration-200"
          title="Scroll back to top"
          aria-label="Scroll back to top"
        >
          {/* Animated Arrow Icon */}
          <div className="relative flex items-center justify-center">
            <ArrowUp className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-transform duration-300 group-hover:-translate-y-1" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
          </div>

          {/* Hover Label */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold text-slate-200 pr-1">
            Back to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
