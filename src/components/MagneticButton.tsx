import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  strength?: number;
  showGravityBall?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 25,
  showGravityBall = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Gravity Ball relative coordinates inside the button
  const rawBallX = useMotionValue(0);
  const rawBallY = useMotionValue(0);

  // Smooth gravitational spring momentum
  const ballX = useSpring(rawBallX, { stiffness: 350, damping: 22 });
  const ballY = useSpring(rawBallY, { stiffness: 350, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });

    // Local cursor position for gravity ball
    rawBallX.set(e.clientX - left);
    rawBallY.set(e.clientY - top);

    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.1 }}
      className={`relative inline-block cursor-pointer overflow-hidden rounded-xl group ${className}`}
    >
      {/* Interactive Gravity Ball (3D Glowing Energy Sphere following cursor) */}
      {showGravityBall && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl">
          <motion.div
            style={{
              left: ballX,
              top: ballY,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none flex items-center justify-center"
          >
            {/* Glowing Ball Outer Energy Aura */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/50 blur-sm animate-pulse" />
            
            {/* Glowing Ball Sphere Core */}
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-white via-cyan-200 to-amber-200 shadow-[0_0_16px_rgba(255,255,255,0.95)] border border-white/80" />
          </motion.div>
        </div>
      )}

      {/* Shimmer Light Sweep Accent */}
      {isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
        />
      )}

      {/* Button Content */}
      <div className="relative z-30">{children}</div>
    </motion.div>
  );
};

