import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Calculator
} from 'lucide-react';

export const B2BTrustGST: React.FC = () => {
  const [projectVal, setProjectVal] = useState<number>(150000);

  const gstAmount = Math.round(projectVal * 0.18);
  const grandTotal = projectVal + gstAmount;

  const milestones = [
    {
      phase: '01',
      title: 'Discovery & System Blueprint',
      payment: '30% Milestone',
      desc: 'Technical specs, database architecture, UI prototype signoff, and legally binding contract.'
    },
    {
      phase: '02',
      title: 'Sprint Development & Staging Demo',
      payment: '40% Milestone',
      desc: 'Iterative full-stack engineering, API integration, payment webhooks, and live staging demo URL.'
    },
    {
      phase: '03',
      title: 'Security Audit & Core Web Vitals',
      payment: '20% Milestone',
      desc: 'Lighthouse 95+ optimization, security header hardening, and complete UAT testing.'
    },
    {
      phase: '04',
      title: 'Production Launch & Full IP Transfer',
      payment: '10% Final Launch',
      desc: 'DNS routing, GitHub repository transfer, official GST B2B tax invoice, and 30-day warranty.'
    }
  ];

  return (
    <section id="process" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* B2B Trust Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          
          {/* Subtle bg glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Verified B2B Enterprise Partner</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Official GST Invoicing & Milestone Protection
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Shadow Arrow is a registered corporate business. Every contract comes with verified GST tax invoices for your finance team, contract SLA guarantees, and milestone payment schedules.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GST Compliant Invoicing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Milestone Escrow Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% IP & Source Code Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Founder-Led Communication</span>
                </div>
              </div>
            </div>

            {/* Interactive GST Tax Calculator Box */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200/80 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-sm">B2B GST Invoice Simulator</h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  GST Verified
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <label htmlFor="projectSubtotalSlider" className="cursor-pointer">Project Subtotal:</label>
                  <span className="font-mono text-slate-900 text-sm">₹{projectVal.toLocaleString('en-IN')}</span>
                </div>

                <input
                  id="projectSubtotalSlider"
                  aria-label="Project Subtotal Range"
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={projectVal}
                  onChange={(e) => setProjectVal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹50,000</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>GST Component (18%):</span>
                  <span className="text-blue-600 font-bold">+₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-slate-200">
                  <span>Total B2B Invoice:</span>
                  <span className="text-slate-900 text-sm">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold pt-1 text-[11px]">
                  <span>GST Tax Breakdown:</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 text-center leading-tight">
                *Official tax invoices issued with full GST compliance.
              </div>

            </div>

          </div>
        </div>

        {/* Milestone Delivery Process */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Transparent, Milestone-Based Execution
            </h3>
            <p className="text-sm text-slate-600">
              Zero upfront risk. Payments are strictly linked to verified stage completions and live staging URL signoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-blue-600/30 group-hover:text-blue-600 transition-colors">
                      {m.phase}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100 font-mono">
                      {m.payment}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {m.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
