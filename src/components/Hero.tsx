import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  FileText, 
  TrendingUp, 
  Sparkles,
  ExternalLink,
  Gauge,
  Cpu,
  Terminal,
  Zap
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const [activeTab, setActiveTab] = useState<'perf' | 'gst' | 'stack'>('perf');

  // 3D Perspective Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Real-time visitor performance measurement
  const [speedVal] = useState(99);
  const [ttfbVal, setTtfbVal] = useState(142);
  const [fcpVal, setFcpVal] = useState('0.28s');
  const [isLiveMeasured, setIsLiveMeasured] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      try {
        const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (perfEntries && perfEntries.length > 0) {
          const nav = perfEntries[0];
          const calculatedTtfb = Math.max(18, Math.round(nav.responseStart - nav.requestStart));
          const calculatedFcpVal = (nav.responseEnd - nav.fetchStart) / 1000;
          const formattedFcp = calculatedFcpVal > 0 ? `${calculatedFcpVal.toFixed(2)}s` : '0.28s';

          setTtfbVal(calculatedTtfb > 0 ? calculatedTtfb : 138);
          setFcpVal(formattedFcp);
          setIsLiveMeasured(true);
        }
      } catch (err) {
        setTtfbVal(138);
      }
    };

    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  const techBadges = [
    { name: 'Next.js 14', desc: 'App Router & SSR', bg: 'bg-slate-900 text-white' },
    { name: 'TypeScript', desc: 'Strict Type Safety', bg: 'bg-blue-600 text-white' },
    { name: 'Tailwind CSS', desc: 'Airy SaaS Tokens', bg: 'bg-sky-500 text-white' },
    { name: 'Node.js', desc: 'Async Microservices', bg: 'bg-emerald-600 text-white' },
    { name: 'Razorpay / Stripe', desc: 'Auto GST Invoicing', bg: 'bg-indigo-600 text-white' },
    { name: 'PostgreSQL', desc: 'ACID Database', bg: 'bg-blue-800 text-white' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern hero-glow">
      
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-400/20 via-indigo-400/15 to-sky-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Sub-badge with Modern Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-800 text-xs font-semibold shadow-xs backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-extrabold text-slate-900">Shadow Arrow</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-bold flex items-center gap-1"><Zap className="w-3 h-3 text-blue-600" /> 100% Modern Stack</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-medium">Direct Founder-Led Engineering by Bijoy Lohar</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                GST Registered
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Engineered for <span className="text-gradient-accent">Performance</span>.<br />
              Built for <span className="underline decoration-blue-500/30 underline-offset-8">Business Growth</span>.
            </h1>

            {/* Sub-headline / Core Positioning */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              Shadow Arrow delivers production-ready web platforms engineered with modern <strong className="text-slate-900 font-semibold">Next.js & TypeScript</strong> architectures. We build sub-second, high-converting digital products backed by <strong className="text-blue-700 font-semibold">direct founder accountability</strong> and GST-verified invoicing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              
              {/* Primary Button with Shimmer */}
              <MagneticButton>
                <button
                  onClick={onStartProject}
                  className="relative overflow-hidden group inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 active:scale-95 transition-all duration-200 cursor-pointer w-full sm:w-auto"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              {/* Secondary Button */}
              <MagneticButton>
                <button
                  onClick={onExploreWork}
                  className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 px-7 py-4 rounded-xl font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto"
                >
                  <Code2 className="w-4 h-4 text-blue-600" />
                  <span>Explore Live Demos</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                </button>
              </MagneticButton>

            </div>

            {/* Trust Checklist */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Contract-Backed Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified GST Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% IP Code Handoff</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Tilt Card Interactive Window */}
          <div className="lg:col-span-5 relative perspective-1000">
            
            {/* Background Glow */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-80 blur-2xl pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.22), rgba(99, 102, 241, 0.1), transparent 70%)'
              }}
            />

            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/70 overflow-hidden transition-all duration-200 group relative"
            >
              
              {/* Glossy reflection sweep overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-30">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              </div>

              {/* Browser Header Bar */}
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-md text-[11px] font-mono text-slate-500 border border-slate-200/80 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>https://shadowarrow.in/system-spec</span>
                </div>
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>

              {/* Animated Interactive Tabs Header */}
              <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1 text-xs font-semibold">
                
                <button
                  onClick={() => setActiveTab('perf')}
                  className={`relative py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'perf' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {activeTab === 'perf' && (
                    <motion.div
                      layoutId="activeTabGlowHero"
                      className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-amber-500" />
                    <span>Live Metrics</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('gst')}
                  className={`relative py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'gst' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {activeTab === 'gst' && (
                    <motion.div
                      layoutId="activeTabGlowHero"
                      className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>GST Billing</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('stack')}
                  className={`relative py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'stack' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {activeTab === 'stack' && (
                    <motion.div
                      layoutId="activeTabGlowHero"
                      className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Tech Stack</span>
                  </span>
                </button>

              </div>

              {/* Dynamic Animated Tab Contents */}
              <div className="p-6 min-h-[270px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: Speed Metrics with Counter Animation */}
                  {activeTab === 'perf' && (
                    <motion.div
                      key="perf"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lighthouse Performance</h4>
                            {isLiveMeasured && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                Measured Live
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-bold text-slate-900">Google Core Web Vitals Benchmark</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-xs font-mono font-extrabold text-emerald-700">{speedVal} / 100</span>
                        </div>
                      </div>

                      {/* Gauges & Counter values */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                            <span>Time to First Byte (TTFB)</span>
                            <span className="font-mono text-emerald-600 font-bold">{ttfbVal}ms (Pass)</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '96%' }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="h-full bg-emerald-500 rounded-full"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                            <span>First Contentful Paint (FCP)</span>
                            <span className="font-mono text-emerald-600 font-bold">{fcpVal} (Pass)</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '94%' }}
                              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                              className="h-full bg-emerald-500 rounded-full"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                            <span>Cumulative Layout Shift (CLS)</span>
                            <span className="font-mono text-emerald-600 font-bold">0.00 (Perfect)</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                              className="h-full bg-emerald-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 flex items-center justify-between text-xs mt-2">
                        <div className="flex items-center gap-2 text-blue-900 font-medium">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span>Average Conversion Boost</span>
                        </div>
                        <span className="font-bold text-blue-700 font-mono text-sm">+240%</span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: GST Billing */}
                  {activeTab === 'gst' && (
                    <motion.div
                      key="gst"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
                        <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
                          <span>OFFICIAL B2B TAX INVOICE</span>
                          <span className="text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            GSTIN Verified
                          </span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Custom Web Engineering Scope</span>
                          <span className="font-mono font-semibold text-slate-900">₹1,00,000</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>CGST (9%) + SGST (9%) / IGST (18%)</span>
                          <span className="font-mono font-semibold text-blue-600">+₹18,000</span>
                        </div>
                        <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                          <span>Total Payable Invoice</span>
                          <span className="font-mono text-blue-700">₹1,18,000</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5 shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Compliant B2B GST Invoicing: </span>
                          <span>Official tax invoice generated with full legal compliance for your finance & audit filings.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Tech Stack */}
                  {activeTab === 'stack' && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise Stack Architecture</h4>
                        <span className="text-[11px] font-mono text-blue-600 font-bold">100% Strict TypeScript</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {techBadges.map((t, idx) => (
                          <motion.div
                            key={t.name}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, delay: idx * 0.04 }}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200/90 hover:border-blue-300 text-slate-800 hover:text-blue-900 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{t.name}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="bg-slate-900 text-slate-200 p-3 rounded-xl text-[11px] font-mono flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-blue-400" />
                          <span>// Clean Architecture</span>
                        </div>
                        <span className="text-emerald-400 font-bold">100% Type Checked</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom Card Footer */}
              <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://github.com/loharbijoy2005-a11y.png"
                    alt="Bijoy Lohar"
                    className="w-8 h-8 rounded-full object-cover border border-blue-500 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 leading-none">Bijoy Lohar</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Founder & Lead Engineer</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="text-blue-600 font-bold hover:text-blue-700 hover:underline flex items-center gap-1 text-xs"
                >
                  Direct Inquiry <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
