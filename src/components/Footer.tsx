import React from 'react';
import { ShieldCheck, Mail, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight font-mono leading-none">
                SHADOW<span className="text-blue-400">ARROW</span>
              </span>
              <span className="text-[10px] font-extrabold text-slate-400 tracking-[0.2em] uppercase mt-1 font-mono">
                WEB ENGINEERING
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              High-performance web engineering studio specializing in scalable Next.js applications, e-commerce engines, and enterprise dashboard software. Founded and led by <strong className="text-slate-200">Bijoy Lohar</strong>.
            </p>

            {/* GST Tax Verification Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GST Registered • Verified GST Invoices Provided</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </h3>
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Contact & Founder Desk
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:support@shadowarrow.in" className="hover:text-white transition-colors">
                  support@shadowarrow.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Fast 24-Hour Proposal Response</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Shadow Arrow • Engineered by Bijoy Lohar. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={onOpenPrivacy} className="hover:text-slate-200 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-200 transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-200 transition-colors cursor-pointer">
              GST Tax Compliance
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
