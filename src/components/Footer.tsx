import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-blue-600/30">
                <div className="w-full h-full bg-slate-950 rounded-[10.5px] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19L19 5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 5H19V15" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight font-mono leading-none">
                  SHADOW<span className="text-blue-400">ARROW</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] mt-1 border border-blue-700/50 inline-block w-max">
                  WEB ENGINEERING
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              High-performance web engineering studio specializing in scalable Next.js applications, e-commerce engines, and enterprise dashboard software. Founded and led by <strong className="text-slate-200">Bijoy Lohar</strong>.
            </p>

            {/* GST Tax Verification Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GST Registered • 18% B2B Tax Credit Compliant</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#work" className="hover:text-blue-400 transition-colors">Featured Case Studies</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Core Web Engineering</a></li>
              <li><a href="#architecture" className="hover:text-blue-400 transition-colors">System Architecture</a></li>
              <li><a href="#process" className="hover:text-blue-400 transition-colors">B2B Milestone Process</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Cost Estimator Form</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Contact & Founder Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:bijoy@shadowarrow.in" className="hover:text-white transition-colors">
                  bijoy@shadowarrow.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/919242725326" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +91 92427 25326 (WhatsApp Direct)
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>India • Remote Global Engineering</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Shadow Arrow • Engineered by Bijoy Lohar. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">GST Tax Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
