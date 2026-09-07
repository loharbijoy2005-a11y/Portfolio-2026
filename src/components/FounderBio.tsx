import React from 'react';
import { SpotlightCard } from './SpotlightCard';
import { 
  CheckCircle2, 
  Rocket,
  ArrowRight
} from 'lucide-react';

export const FounderBio: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-200/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SpotlightCard className="p-8 sm:p-12 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border border-slate-200/90 shadow-xl" spotlightColor="rgba(59, 130, 246, 0.12)">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Bio Info */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5 text-blue-600" />
                <span>Founder & Lead Engineering Philosophy</span>
              </div>

              {/* Exact Requested Headline */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Modern Tech. Rapid Execution. Zero Legacy Bloat.
              </h2>

              {/* Exact Requested Sub-copy */}
              <p className="text-base text-slate-600 leading-relaxed">
                Led by <strong className="text-slate-900 font-bold">Bijoy Lohar</strong>, ShadowArrow delivers production-ready web platforms using modern architectures. Backed by <strong className="text-blue-700 font-bold">1–2 years of intensive, project-driven engineering</strong> across TypeScript, JavaScript, Python, and Java, we build lightning-fast web solutions with verified GST billing and direct founder-level accountability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Next.js 14 App Router & Strict TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-Second Server Response Times (TTFB &lt; 200ms)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Communication with Bijoy Lohar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official GST 18% Input Tax Credit Invoicing</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Profile Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                BL
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Bijoy Lohar</h3>
                <p className="text-xs font-semibold text-blue-600">Founder & Lead Full-Stack Engineer</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono font-bold mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active 1–2 Yrs Full-Stack Builds</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span>Specializing in React, Next.js, Node.js, Python FastAPI, and Razorpay GST Billing Systems.</span>
              </div>

              <a
                href="#contact"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Direct Founder Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </SpotlightCard>

      </div>
    </section>
  );
};
