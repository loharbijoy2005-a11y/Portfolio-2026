import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Gauge, ShieldCheck, Zap } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      icon: CheckCircle2,
      value: '100%',
      label: 'On-Time Milestone Delivery',
      subtext: 'Agile sprints with live staging URLs'
    },
    {
      icon: Gauge,
      value: '< 1.0s',
      label: 'Average Page Load Time',
      subtext: 'Sub-second Lighthouse 95+ performance'
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Legal GST Tax Compliant',
      subtext: '18% B2B Input Tax Credit invoicing'
    },
    {
      icon: Zap,
      value: 'Production Ready',
      label: 'Modern TypeScript Stack',
      subtext: '1–2 Yrs intensive full-stack builds'
    }
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200/80 shadow-2xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-200/80 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0 mt-0.5 shadow-2xs">
                  <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono group-hover:text-blue-600 transition-colors leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-normal">
                    {stat.subtext}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
