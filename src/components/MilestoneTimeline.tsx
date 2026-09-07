import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode2, 
  Layers, 
  CreditCard, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const MilestoneTimeline: React.FC = () => {
  const weeks = [
    {
      weekNumber: 'WEEK 01',
      title: 'Wireframing, Schema Design & Scope Lock',
      duration: '7 Days',
      icon: FileCode2,
      deliverables: [
        'Detailed System Specification & Tech Stack Architecture',
        'Database Schema & API Contract Definitions',
        'Figma UI/UX Prototypes & Component Breakdown',
        'Milestone Escrow Signoff & SLA Agreement'
      ]
    },
    {
      weekNumber: 'WEEK 02',
      title: 'High-Speed Frontend & Component Architecture',
      duration: '7 Days',
      icon: Layers,
      deliverables: [
        'Next.js 14 / Vite React Component Assembly',
        'Strict TypeScript Types & Zero-Bloat Tailwind Styling',
        'Fluid Spring Animations & Micro-Interactions',
        'Responsive Mobile-First Viewport Verification'
      ]
    },
    {
      weekNumber: 'WEEK 03',
      title: 'Backend APIs, Payment Gateways & GST Invoicing',
      duration: '7 Days',
      icon: CreditCard,
      deliverables: [
        'FastAPI / Node.js High-Concurrency Endpoint Build',
        'Razorpay Payment Gateway & Webhook Signature Validation',
        'Automated GST B2B Invoice Generation',
        'Live Staging URL Deployment for Interactive Client Testing'
      ]
    },
    {
      weekNumber: 'WEEK 04',
      title: 'End-to-End Testing, SEO Audit & Live Deployment',
      duration: '7 Days',
      icon: Rocket,
      deliverables: [
        'Lighthouse 95+ Core Web Vitals Optimization (TTFB < 200ms)',
        'Security Header Hardening & Vulnerability Scans',
        'DNS Domain Routing, SSL Certificates & CDN Setup',
        '100% Repository Transfer & Final IP Ownership Handover'
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-slate-200/90 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>The 3–4 Week Production Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Disciplined Milestone Architecture Cycle
          </h2>

          <p className="text-base text-slate-600">
            We don't take shortcuts or ship bloated code. Every project follows an intensive 3–4 week milestone roadmap with live staging demos at every phase.
          </p>
        </div>

        {/* Trust Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/60 shadow-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white mb-1">
              Quality Over Shortcuts
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              We maintain a disciplined 3–4 week milestone engineering cycle ensuring zero tech debt, strict type-safety, and seamless GST invoicing.
            </p>
          </div>
        </motion.div>

        {/* Timeline Grid with SVG Connecting Beam */}
        <div className="relative">
          
          {/* SVG Animated Connector Beam (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 z-0 pointer-events-none px-12">
            <div className="w-full h-full bg-slate-200/80 rounded-full relative overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {weeks.map((w, idx) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Header: Week Pill & Icon */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-100">
                        {w.weekNumber}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {w.title}
                      </h3>
                      <span className="text-[11px] font-mono font-semibold text-slate-400 mt-1 block">
                        Estimated Target: {w.duration}
                      </span>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Key Sprint Milestone:
                      </span>
                      {w.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500 font-bold flex items-center justify-between">
                    <span>Stage {idx + 1} of 4</span>
                    <span className="text-emerald-600">✓ Verified Milestone</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
