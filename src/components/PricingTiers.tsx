import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  BadgePercent
} from 'lucide-react';
import type { PricingTier } from '../types';

interface PricingTiersProps {
  onSelectTier: (tierId: string, tierName: string, basePrice: number) => void;
}

export const PRICING_TIERS_DATA: PricingTier[] = [
  {
    id: 'starter',
    name: 'Business Starter',
    priceRange: '₹9,999 - ₹14,999',
    numericBasePrice: 12000,
    idealFor: 'Startups, local businesses, portfolios & personal branding.',
    features: [
      '1 – 5 High-Speed Custom Responsive Pages',
      'Lighthouse 95+ Core Web Vitals Optimization',
      'SEO Structured Data & Meta Tag Setup',
      'Contact Form & Direct WhatsApp Integration',
      '1-Month Free Technical Support & Maintenance',
      '100% Tax Invoicing (GST B2B Compliant)'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'growth-ecommerce',
    name: 'E-Commerce & Growth Engine',
    priceRange: '₹24,999 - ₹39,999',
    numericBasePrice: 29999,
    badge: 'Most Popular for Businesses',
    isPopular: true,
    idealFor: 'D2C brands, retail stores & online product catalogs.',
    features: [
      'Full Razorpay / Stripe Payment Gateway Integration',
      'Automated WhatsApp Order Alerts & Notifications',
      'Custom Admin Inventory & Order Management Portal',
      'High-Converting Sub-Second Checkout Engine',
      'Automated 18% GST-Compliant B2B Tax Invoice Generation',
      '3-Months Priority Engineering & Server Support',
      '100% IP Code Ownership & Repository Handover'
    ],
    ctaText: 'Launch Your Store'
  },
  {
    id: 'enterprise-saas',
    name: 'Custom Enterprise & SaaS',
    priceRange: 'Starting ₹49,999+',
    numericBasePrice: 49999,
    idealFor: 'Custom web apps, SaaS platforms, client portals & complex APIs.',
    features: [
      'Next.js 14 + TypeScript Full-Stack Application',
      'Custom Database Architecture (MongoDB / PostgreSQL / Supabase)',
      'Role-Based Authentication (RBAC) & Session Shield',
      'Automated Cloud Deployment on Render / AWS / Cloudflare',
      'Legally Binding SLA & Contract Agreement',
      'Direct Slack / WhatsApp Channel with Founder Bijoy Lohar',
      'Dedicated Maintenance & Security Patches'
    ],
    ctaText: 'Talk to Founder'
  }
];

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200/80 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <BadgePercent className="w-3.5 h-3.5 text-blue-600" />
            <span>Transparent Investment Tiers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Pricing Built for Business ROI
          </h2>

          <p className="text-base text-slate-600">
            No hidden costs. Every tier includes verified performance standards, contract transparency, and official GST tax billing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS_DATA.map((tier) => {
            const isHighlighted = tier.isPopular;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-blue-50/90 via-white to-indigo-50/50 border-2 border-blue-500 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/10'
                    : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md shadow-blue-600/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  
                  {/* Tier Title & Subtitle */}
                  <div className="mb-6 pt-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-500 min-h-[32px]">
                      {tier.idealFor}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="text-xs text-slate-500 font-medium">Investment Range</div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight mt-0.5">
                      {tier.priceRange}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>+ 18% GST B2B Input Tax Credit</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Included Engineering Deliverables:
                    </span>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Tier CTA Button */}
                <div>
                  <button
                    onClick={() => onSelectTier(tier.id, tier.name, tier.numericBasePrice)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isHighlighted
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:scale-102 active:scale-95'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10 hover:scale-102 active:scale-95'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* B2B Input Tax Credit Notice Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium">
            ⚡ <strong className="font-extrabold text-blue-900">B2B Tax Input Advantage:</strong> All plans support <strong className="font-bold text-blue-900 underline">18% GST Input Tax Credit (ITC)</strong> with valid GSTIN invoices for corporate tax deductions.
          </p>
        </div>

      </div>
    </section>
  );
};
