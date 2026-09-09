import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundBlobs: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Mouse Tracking Soft Ambient Radial Light */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)',
        }}
        animate={{
          x: mousePos.x - 225,
          y: mousePos.y - 225,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 150,
          mass: 0.8,
        }}
      />

      {/* Top-left warm amber drifting blob */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-amber-300/20 via-orange-200/12 to-amber-100/5 rounded-full blur-3xl"
      />

      {/* Top-right warm gold drifting blob */}
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-amber-400/15 via-blue-300/10 to-amber-200/5 rounded-full blur-3xl"
      />

      {/* Center-bottom soft warm blob */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/15 via-orange-100/10 to-indigo-200/5 rounded-full blur-3xl"
      />

    </div>
  );
};
