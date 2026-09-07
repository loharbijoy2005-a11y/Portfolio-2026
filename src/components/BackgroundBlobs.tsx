import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Top-left blue drifting blob */}
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
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 via-indigo-300/10 to-sky-200/5 rounded-full blur-3xl"
      />

      {/* Top-right indigo drifting blob */}
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
        className="absolute top-1/4 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-indigo-400/15 via-sky-300/10 to-blue-200/5 rounded-full blur-3xl"
      />

      {/* Center-bottom sky blob */}
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
        className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/10 via-blue-300/10 to-indigo-200/5 rounded-full blur-3xl"
      />

    </div>
  );
};
