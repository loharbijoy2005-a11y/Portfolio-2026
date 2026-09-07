import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hasBorderBeam?: boolean;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.12)',
  hasBorderBeam = false,
  onClick,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={onClick}
      className={`relative rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] transition-all duration-300 overflow-hidden group ${className}`}
    >
      {/* Mouse Spotlight Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              550px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Animated Border Beam Trace (optional for highlighted cards) */}
      {hasBorderBeam && (
        <div className="absolute inset-0 pointer-events-none rounded-3xl p-[1.5px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
        </div>
      )}

      {/* Glossy reflection sweep effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
