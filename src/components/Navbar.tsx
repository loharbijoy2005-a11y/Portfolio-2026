import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Menu, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
          
          {/* Solid High-Tech Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Solid Geometric Arrow Badge Icon */}
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-600 p-[1.5px] shadow-md shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10.5px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-5 h-5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19L19 5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 5H19V15" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* Live Status Beacon */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>

            {/* Solid Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-950 font-mono leading-none group-hover:text-blue-600 transition-colors">
                  SHADOW<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ARROW</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] shadow-2xs">
                  WEB ENGINEERING
                </span>
                <span className="text-[9px] font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded hidden sm:inline-block">
                  PRO V3
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-slate-200/80 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-full transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Trust Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>GST Registered • 18% ITC</span>
            </div>

            {/* CTA Button */}
            <MagneticButton>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Discovery Call</span>
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
            <span>GST-Compliant Invoicing (18% B2B Tax Credit)</span>
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
