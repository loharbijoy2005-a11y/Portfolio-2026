import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audioFX';

export const WhatsAppFloatDock: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    soundEngine.playClick();
    const phone = '917318884976'; // Founder contact
    const text = encodeURIComponent("Hi Bijoy! I'm interested in building a high-performance web platform / SaaS dashboard with Shadow Arrow.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 bg-slate-900/95 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 backdrop-blur-md space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://github.com/loharbijoy2005-a11y.png"
                    alt="Bijoy Lohar"
                    className="w-8 h-8 rounded-full border border-slate-600 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>Bijoy Lohar</span>
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">Active Online • Direct Founder</div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                }}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Bubble Message */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1.5 leading-relaxed font-normal">
              <p>
                Hi there! 👋 I'm Bijoy Lohar, Founder & Lead Engineer at Shadow Arrow.
              </p>
              <p className="text-[11px] text-slate-400">
                Have a web application, SaaS dashboard, or GST compliance requirement? Let's discuss directly on WhatsApp.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start 1-on-1 WhatsApp Consultation</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-white border border-slate-700/90 shadow-xl shadow-slate-950/40 hover:bg-slate-800 transition-colors cursor-pointer group backdrop-blur-md"
        title="Direct WhatsApp Consultation with Founder Bijoy Lohar"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <span className="text-xs font-bold hidden sm:inline text-slate-100">
          WhatsApp Founder
        </span>
      </motion.button>
    </div>
  );
};
