import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovered(false);
        setHoverText(null);
        return;
      }

      const clickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');

      if (clickable) {
        setIsHovered(true);
        const dataCursor = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        setHoverText(dataCursor || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Glowing Halo Trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(217, 119, 6, 0.1) 50%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isClicked ? 0.8 : isHovered ? 2.2 : 1,
          opacity: isHovered ? 0.95 : 0.65,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 220,
          mass: 0.35,
        }}
      />

      {/* Main Interactive Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicked ? 0.75 : isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(37, 99, 235, 0.12)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: isHovered ? 'rgba(37, 99, 235, 0.85)' : 'rgba(163, 123, 62, 0.45)',
          boxShadow: isHovered
            ? '0 0 20px rgba(37, 99, 235, 0.35), inset 0 0 10px rgba(217, 119, 6, 0.15)'
            : '0 0 8px rgba(163, 123, 62, 0.15)',
        }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 340,
          mass: 0.2,
        }}
      >
        {hoverText && (
          <span className="text-[9px] font-mono font-bold text-blue-700 uppercase tracking-tighter whitespace-nowrap px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* High-Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none shadow-md"
        style={{
          background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #D97706 100%)',
        }}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicked ? 1.6 : isHovered ? 0.4 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 850,
        }}
      />
    </div>
  );
};
