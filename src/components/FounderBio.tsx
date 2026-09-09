import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { 
  CheckCircle2, 
  Rocket,
  ArrowRight,
  Clock,
  GitBranch
} from 'lucide-react';

export const FounderBio: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const [experienceText, setExperienceText] = useState('2.0+ Yrs');

  // Git Push sync timestamp baseline (auto-formatted to active git push)
  const [lastPushDate] = useState(() => {
    const d = new Date('2026-09-09T12:01:31+05:30');
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  });

  useEffect(() => {
    // 1. Calculate dynamic experience automatically incrementing daily
    const startDate = new Date('2024-01-15');
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const yearsFloat = (diffDays / 365.25).toFixed(1);
    setExperienceText(`${yearsFloat}+ Yrs`);

    // 2. Real-time Live Ticking Clock (IST)
    const updateClock = () => {
      const current = new Date();
      setTimeStr(current.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white border-t border-slate-200/80 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SpotlightCard className="p-8 sm:p-12 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border border-slate-200/90 shadow-xl" spotlightColor="rgba(59, 130, 246, 0.12)">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Bio Info (Slides in from Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
                  <Rocket className="w-3.5 h-3.5 text-blue-600" />
                  <span>Founder & Lead Engineering Philosophy</span>
                </div>

                {/* Real-time System Clock Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white border border-slate-800 text-xs font-mono font-bold shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>{timeStr || '12:00:00 PM'}</span>
                  <span className="text-[10px] text-amber-400 font-normal">IST</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Direct Founder Engineering.<br />
                <span className="text-gradient-accent">Zero Layers, Uncompromising Speed.</span>
              </h2>

              {/* Founder Positioning Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Led by <strong className="text-slate-900 font-bold">Bijoy Lohar</strong>, every system at Shadow Arrow is architected, code-reviewed, and optimized directly by the founder. Backed by <strong className="text-gradient-accent font-extrabold">{experienceText} of intensive, project-driven engineering</strong> across TypeScript, JavaScript, Python, and Java, we eliminate agency bloat to deliver robust, enterprise-grade applications built to scale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Founder-Led Codebase Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-Second Response Times (TTFB &lt; 200ms)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct 1-on-1 Access to Bijoy Lohar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Verified GST Billing & Compliance</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Founder Profile Card (Slides in from Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-4 bg-gradient-to-b from-white via-slate-50/90 to-amber-50/40 rounded-2xl p-6 border border-amber-200/80 shadow-xl shadow-amber-900/10 text-center space-y-4 relative overflow-hidden"
            >
              {/* Performance Gradient Top Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-600 to-amber-600" />

              <img
                src="https://github.com/loharbijoy2005-a11y.png"
                alt="Bijoy Lohar - Founder & Lead Engineer"
                width="160"
                height="160"
                loading="lazy"
                decoding="async"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-600 mx-auto shadow-lg shadow-blue-600/25 ring-4 ring-amber-500/20"
              />

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  <span className="text-gradient-accent">Bijoy Lohar</span>
                </h3>
                <p className="text-xs font-bold text-blue-700 tracking-wide mt-0.5">Founder & Lead Full-Stack Engineer</p>

                {/* Auto-calculating Daily Experience Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-mono font-bold mt-2.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active {experienceText} Full-Stack Builds</span>
                </div>
              </div>

              {/* Git Push & Live Clock Sync Metadata Box */}
              <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 text-[11px] font-mono space-y-1 text-left shadow-2xs">
                <div className="flex items-center justify-between text-slate-700 font-bold">
                  <span className="flex items-center gap-1 text-blue-700">
                    <Clock className="w-3 h-3 text-blue-600" /> Live System Time:
                  </span>
                  <span className="text-slate-900 font-black">{timeStr}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                  <span className="flex items-center gap-1 text-amber-800 font-bold">
                    <GitBranch className="w-3 h-3 text-amber-600" /> Git Push Sync:
                  </span>
                  <span className="text-amber-900 font-semibold">{lastPushDate}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 leading-relaxed font-medium">
                <span>Specializing in React, Next.js, Node.js, Python FastAPI, and Razorpay GST Billing Systems.</span>
              </div>

              <a
                href="#contact"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Direct Founder Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </div>

        </SpotlightCard>

      </div>
    </section>
  );
};
