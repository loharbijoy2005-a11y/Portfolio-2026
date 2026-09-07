import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { 
  Code2, 
  ShoppingBag, 
  LayoutDashboard, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  ShoppingBag,
  LayoutDashboard,
  Zap
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-[#F8FAFC] relative z-10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Engineering Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High-Performance Digital Solutions for Growing Businesses
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every project is built with clean architecture, strict TypeScript types, sub-second response times, and 100% contract-backed IP handoff.
          </p>
        </motion.div>

        {/* Services Grid wrapped in SpotlightCard with Side Slide Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = iconMap[service.iconName] || Code2;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="h-full"
              >
                <SpotlightCard
                  className="flex flex-col justify-between h-full"
                  spotlightColor="rgba(59, 130, 246, 0.12)"
                >
                <div>
                  
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Key Deliverables:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Footer Tech Badges & CTA */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mb-6">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                      {service.highlightText}
                    </span>

                    <button
                      onClick={() => onSelectService(service.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline group/btn cursor-pointer"
                    >
                      <span>Configure Estimate</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </SpotlightCard>
            </motion.div>
          );
        })}
        </div>

      </div>
    </section>
  );
};
