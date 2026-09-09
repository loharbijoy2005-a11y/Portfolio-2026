import React, { useState } from 'react';
import { TrendingUp, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audioFX';

export const ROICalculator: React.FC = () => {
  const [traffic, setTraffic] = useState<number>(25000);
  const [currentSpeed, setCurrentSpeed] = useState<number>(4.2);

  // Calculations
  const shadowSpeed = 0.28; // Sub-second Shadow Arrow benchmark
  const speedGain = (currentSpeed - shadowSpeed).toFixed(1);
  const bounceReduction = Math.min(65, Math.round((currentSpeed - 1.0) * 12));
  const estimatedConversionGain = Math.min(320, Math.round((currentSpeed - 0.5) * 60));
  const additionalLeads = Math.round((traffic * (estimatedConversionGain / 100) * 0.02));

  return (
    <section className="py-20 bg-white border-t border-slate-200/80 text-slate-900 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Speed &amp; Revenue Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Speed &amp; <span className="text-gradient-accent">Revenue Impact</span>
          </h2>
          <p className="text-sm text-slate-600">
            See how upgrading to a sub-second Next.js 15 &amp; TypeScript architecture directly impacts your conversion rate and monthly leads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Box */}
          <div className="lg:col-span-7 bg-slate-50/90 rounded-2xl p-6 sm:p-8 border border-slate-200/90 space-y-6 shadow-lg shadow-slate-100">
            {/* Slider 1: Monthly Traffic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Monthly Website Traffic:</span>
                <span className="font-mono text-blue-600 font-bold text-sm">
                  {traffic.toLocaleString('en-IN')} Visitors/mo
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={traffic}
                onChange={(e) => {
                  setTraffic(Number(e.target.value));
                  soundEngine.playHover();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5k</span>
                <span>100k</span>
                <span>200k+</span>
              </div>
            </div>

            {/* Slider 2: Current Speed */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Current Load Speed (TTFB / LCP):</span>
                <span className="font-mono text-amber-600 font-bold text-sm">
                  {currentSpeed} seconds
                </span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8.0"
                step="0.1"
                value={currentSpeed}
                onChange={(e) => {
                  setCurrentSpeed(Number(e.target.value));
                  soundEngine.playHover();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1.5s (Fast)</span>
                <span>4.5s (Average)</span>
                <span>8.0s (Slow)</span>
              </div>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm space-y-1">
                <div className="text-[11px] text-slate-500 font-medium">Speed Advantage</div>
                <div className="text-xl font-extrabold text-emerald-600 font-mono flex items-center gap-1">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>+{speedGain}s Faster</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm space-y-1">
                <div className="text-[11px] text-slate-500 font-medium">Bounce Rate Drop</div>
                <div className="text-xl font-extrabold text-cyan-600 font-mono">
                  -{bounceReduction}% Drop
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 text-white">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Projected Benchmark Results</span>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium">Estimated Conversion Boost</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 font-mono">
                +{estimatedConversionGain}% Growth
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Shadow Arrow Benchmark:</span>
                <span className="text-emerald-400 font-bold">&lt; 0.28s TTFB</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Est. Additional Monthly Leads:</span>
                <span className="text-blue-400 font-bold">+{additionalLeads.toLocaleString('en-IN')} Leads</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Core Web Vitals Target:</span>
                <span className="text-amber-400 font-bold">99 / 100</span>
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => soundEngine.playClick()}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
            >
              <span>Get Your Dedicated Speed Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
