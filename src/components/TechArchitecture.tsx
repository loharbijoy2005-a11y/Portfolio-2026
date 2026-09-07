import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ARCHITECTURE_LAYERS } from '../data/portfolioData';
import { FullStackEmulator } from './FullStackEmulator';
import { 
  Zap, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('frontend');

  const currentLayer = ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  return (
    <section id="architecture" className="py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>System Blueprint & Live Full-Stack Emulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built on Enterprise Standards & Bulletproof Security
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            We write strict TypeScript, modular microservices, and edge-cached server components to ensure maintainable software with sub-second response times.
          </p>
        </div>

        {/* Interactive Layer Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <motion.button
                key={layer.id}
                initial={{ opacity: 0, x: idx === 0 ? -60 : idx === 2 ? 60 : 0, y: idx === 1 ? 30 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-6 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-md ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {layer.id.toUpperCase()}
                  </span>
                  {isSelected && <Zap className="w-4 h-4 text-blue-600 animate-pulse" />}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {layer.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {layer.subtitle}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Layer Overview Specs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
                Selected Blueprint Layer
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {currentLayer.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentLayer.keyBenefits.map((b, idx) => (
                <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold border border-emerald-200/80">
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentLayer.techs.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{tech.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full-Scale Animated Live Full-Stack Project Emulator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">
              // Live Full-Stack Project Emulator & Auto-Rotating Showcase
            </span>
            <span className="text-xs font-bold text-blue-600 font-mono">
              7-Second Auto-Rotate • Hover to Pause
            </span>
          </div>

          <FullStackEmulator />
        </div>

      </div>

    </section>
  );
};
