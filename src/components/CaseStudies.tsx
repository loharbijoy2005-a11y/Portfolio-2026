import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES_DATA } from '../data/portfolioData';
import type { CaseStudy } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';

interface CaseStudiesProps {
  onSelectForQuote: (title: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectForQuote }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const categories = ['All', 'SaaS', 'E-Commerce', 'Dashboard'];

  const filteredStudies = filter === 'All'
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter((cs) => cs.category === filter);

  return (
    <section id="work" className="py-24 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Proven Engineering Impact</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Work & Case Studies
            </h2>

            <p className="text-base text-slate-600">
              Explore real production systems engineered by Bijoy Lohar, driving measurable business metrics and lightning performance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === cat
                    ? 'bg-white text-blue-600 shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Case Studies Grid with Side Slide Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 card-hover-glow transition-all duration-300 flex flex-col justify-between group"
              >
              {/* Image Preview Container */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 font-bold text-[11px] border border-white/50 shadow-xs">
                    {study.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-semibold text-blue-200">
                    Client: {study.client}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    {study.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {study.summary}
                  </p>

                  {/* Outcome Highlight */}
                  <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-blue-900 leading-tight">
                      {study.outcome}
                    </span>
                  </div>
                </div>

                {/* Tech tags & Modal trigger button */}
                <div className="space-y-4 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {study.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
                        +{study.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedCaseStudy(study)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 border border-slate-200 hover:border-blue-600"
                  >
                    <span>View Case Study & Metrics</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onSelectForQuote={onSelectForQuote}
      />
    </section>
  );
};
