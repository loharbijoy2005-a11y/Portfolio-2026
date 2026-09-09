import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Menu, X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Animated High-Tech Brand Logo */}
          <motion.a 
            href="#" 
            className="flex flex-col group relative select-none"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            {/* SHADOWARROW Title with Animated Shimmer Gradient & Pulsing Dot */}
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-mono leading-none group-hover:text-blue-600 transition-colors">
                SHADOW<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500">ARROW</span>
              </span>
              {/* Glowing Animated Spark Dot */}
              <motion.span 
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full bg-blue-600 shadow-sm shadow-blue-500/80 inline-block mb-1"
              />
            </div>

            {/* WEB ENGINEERING Subtitle with Animated Beam */}
            <div className="relative overflow-hidden pt-0.5">
              <span className="text-[10px] font-extrabold text-slate-600 tracking-[0.2em] uppercase font-mono block group-hover:text-slate-900 group-hover:tracking-[0.26em] transition-all duration-300">
                WEB ENGINEERING
              </span>
              {/* Animated Sliding Glow Beam */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          </motion.a>

          {/* Desktop Nav Links with Sliding Framer Motion Hover Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-slate-200/80 rounded-full px-3 py-1.5 shadow-xs backdrop-blur-md relative">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredNav(link.label)}
                onMouseLeave={() => setHoveredNav(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-full transition-colors duration-150"
              >
                {hoveredNav === link.label && (
                  <motion.div
                    layoutId="hoverNavPill"
                    className="absolute inset-0 bg-blue-50/90 rounded-full border border-blue-200/80 -z-10 shadow-2xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Animated Trust Pill */}
            <motion.div 
              whileHover={{ scale: 1.04, borderColor: 'rgba(59, 130, 246, 0.4)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold text-slate-800">GST Registered</span>
            </motion.div>

            {/* CTA Button with Shimmer Sweep */}
            <MagneticButton>
              <button
                onClick={onOpenBooking}
                className="relative overflow-hidden group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/35 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <Calendar className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Book Call</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold sm:hidden"
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Verified GST-Compliant Invoicing</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-600/20"
          >
            <span>Book a Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
