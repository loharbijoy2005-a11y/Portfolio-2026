import React from 'react';
import { Activity, Gauge, ShieldCheck, UserCheck } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      icon: Activity,
      value: '99.9%',
      label: 'Uptime Deployments',
      subtext: 'Hosted on enterprise CDN edge networks'
    },
    {
      icon: Gauge,
      value: '< 1.0s',
      label: 'Average Page Speeds',
      subtext: 'Optimized Core Web Vitals performance'
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Tax Compliant (GST)',
      subtext: 'Official B2B Input Tax Credit invoices'
    },
    {
      icon: UserCheck,
      value: 'Founder',
      label: 'Led Engineering',
      subtext: 'Direct communication with Bijoy Lohar'
    }
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-200/60"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-normal">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
