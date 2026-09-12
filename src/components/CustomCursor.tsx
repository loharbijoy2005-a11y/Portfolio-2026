import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lastTime = 0;
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const now = Date.now();
      if (now - lastTime > 40) {
        lastTime = now;
        setTrail((prev) => [
          { id: Math.random(), x: e.clientX, y: e.clientY },
          ...prev.slice(0, 4)
        ]);
      }

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

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newRipple = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

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

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Click Shockwave Ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.6)] pointer-events-none"
          style={{
            x: r.x - 24,
            y: r.y - 24,
          }}
        />
      ))}

      {/* Trailing Energy Sparks */}
      {trail.map((point, index) => {
        const size = Math.max(1.5, 4.5 - index * 0.8);
        const opacity = (1 - index / trail.length) * 0.45;
        return (
          <motion.div
            key={point.id}
            initial={{ scale: 1, opacity }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 rounded-full pointer-events-none bg-blue-500 shadow-[0_0_8px_#3b82f6]"
            style={{
              width: size,
              height: size,
              x: point.x - size / 2,
              y: point.y - size / 2,
            }}
          />
        );
      })}

      {/* Outer Glowing Halo Trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isClicked ? 0.85 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.2,
        }}
      />

      {/* Main Interactive Ring */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 14,
          y: mousePosition.y - 14,
          scale: isClicked ? 0.85 : 1,
          backgroundColor: isHovered ? 'rgba(37, 99, 235, 0.08)' : 'rgba(255, 255, 255, 0.04)',
          borderColor: isHovered ? 'rgba(37, 99, 235, 0.75)' : 'rgba(163, 123, 62, 0.35)',
          boxShadow: isHovered
            ? '0 0 12px rgba(37, 99, 235, 0.25)'
            : '0 0 6px rgba(163, 123, 62, 0.1)',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.15,
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
          scale: isClicked ? 1.2 : 1,
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
