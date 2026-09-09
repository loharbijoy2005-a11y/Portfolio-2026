import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 25
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength
    });
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
      className={`relative inline-block cursor-pointer overflow-hidden rounded-xl ${className}`}
    >
      {/* Shimmer Light Sweep Accent */}
      {isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12"
        />
      )}
      {children}
    </motion.div>
  );
};
