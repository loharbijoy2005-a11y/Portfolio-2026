import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hasBorderBeam?: boolean;
  overflowVisible?: boolean;
  enable3DTilt?: boolean;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.12)',
  hasBorderBeam = false,
  overflowVisible = false,
  enable3DTilt = true,
  onClick,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    if (enable3DTilt) {
      const centerX = width / 2;
      const centerY = height / 2;
      const rotateXVal = ((y - centerY) / centerY) * -7; // max -7 to 7 deg
      const rotateYVal = ((x - centerX) / centerX) * 7;
      rotateXRaw.set(rotateXVal);
      rotateYRaw.set(rotateYVal);
    }
  }

  function handleMouseLeave() {
    if (enable3DTilt) {
      rotateXRaw.set(0);
      rotateYRaw.set(0);
    }
  }

  const overflowClass = overflowVisible ? 'overflow-visible' : 'overflow-hidden';

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: enable3DTilt ? rotateX : 0,
        rotateY: enable3DTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={onClick}
      className={`relative rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] transition-all duration-300 ${overflowClass} group ${className}`}
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
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
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

