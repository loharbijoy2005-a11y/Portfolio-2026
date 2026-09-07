import React from 'react';
import type { CaseStudy } from '../types';
import { 
  X, 
  TrendingUp, 
  Layers, 
  Quote, 
  Building2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface ModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSelectForQuote: (title: string) => void;
}

export const CaseStudyModal: React.FC<ModalProps> = ({ caseStudy, onClose, onSelectForQuote }) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Header */}
        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
          <img 
            src={caseStudy.image} 
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                {caseStudy.category} Case Study
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> {caseStudy.client}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight">
              {caseStudy.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Measurable Outcome Hero Highlight */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">Verified Result</span>
                <p className="text-sm font-extrabold text-blue-950">{caseStudy.outcome}</p>
              </div>
            </div>

            <span className="px-3 py-1 bg-white text-blue-700 text-xs font-bold rounded-lg border border-blue-200 shadow-2xs">
              Direct Engineering by Bijoy Lohar
            </span>
          </div>

          {/* Metrics Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Performance Impact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-extrabold font-mono text-slate-900">{m.value}</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary & Architecture Notes */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{caseStudy.summary}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Architecture & Technical Implementation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                {caseStudy.architectureNotes}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Technologies Deployed</h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techStack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-l-blue-600 border border-slate-200 relative">
              <Quote className="w-6 h-6 text-blue-200 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm text-slate-700 italic mb-3 relative z-10">
                "{caseStudy.testimonial.quote}"
              </p>
              <div className="text-xs font-bold text-slate-900">
                {caseStudy.testimonial.author}
                <span className="text-slate-500 font-normal"> — {caseStudy.testimonial.role}</span>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full SLA & IP Handover Completed</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectForQuote(caseStudy.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Similar Solution</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
