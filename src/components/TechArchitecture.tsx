import React, { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../data/portfolioData';
import { 
  Zap, 
  CheckCircle2, 
  Terminal,
  Layers
} from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('frontend');

  const currentLayer = ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  return (
    <section id="architecture" className="py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Clean Architecture Spec</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built on Enterprise Standards & Bulletproof Security
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            We write strict TypeScript, modular microservices, and edge-cached server components to ensure maintainable software with 0.4s response times.
          </p>
        </div>

        {/* Interactive Layer Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-6 rounded-2xl text-left border transition-all duration-200 ${
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
              </button>
            );
          })}
        </div>

        {/* Selected Layer Detailed Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Specs & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
                System Blueprint
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                {currentLayer.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Designed to eliminate technical debt, enhance search engine positioning, and scale seamlessly as user concurrency increases.
              </p>
            </div>

            {/* Tech cards */}
            <div className="space-y-3">
              {currentLayer.techs.map((tech, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{tech.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Benefits */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-2">
                Architectural Guarantees:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentLayer.keyBenefits.map((b, idx) => (
                  <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold border border-emerald-200/80">
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Code Viewer Window */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Code Top Header */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentLayer.id}-spec.ts</span>
                </div>
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">
                  Strict TS
                </span>
              </div>

              {/* Code Snippet Box */}
              <pre className="p-5 font-mono text-[11px] text-slate-200 leading-relaxed overflow-x-auto selection:bg-blue-600 selection:text-white">
                <code>{currentLayer.codeSnippet}</code>
              </pre>

              {/* Code Footer */}
              <div className="bg-slate-900/90 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Shadow Arrow • Verified Clean Code</span>
                <span className="text-emerald-400">100% Type Checked</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
