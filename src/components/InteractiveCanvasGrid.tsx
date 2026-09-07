import React, { useEffect, useRef } from 'react';

export const InteractiveCanvasGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const gap = 36;
    interface Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
    }

    let dots: Dot[] = [];

    const initGrid = () => {
      dots = [];
      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * gap + 18,
            y: j * gap + 18,
            baseX: i * gap + 18,
            baseY: j * gap + 18,
            radius: 1.5,
            color: (i + j) % 2 === 0 ? 'rgba(59, 130, 246, 0.25)' : 'rgba(99, 102, 241, 0.2)',
          });
        }
      }
    };

    initGrid();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 15;
          const pushY = Math.sin(angle) * force * 15;

          dot.x = dot.baseX - pushX;
          dot.y = dot.baseY - pushY;
          dot.radius = 1.5 + force * 2.5;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.1;
          dot.y += (dot.baseY - dot.y) * 0.1;
          dot.radius += (1.5 - dot.radius) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < mouse.radius ? 'rgba(37, 99, 235, 0.65)' : dot.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
