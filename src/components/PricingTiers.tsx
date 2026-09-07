import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    priceRange: '₹4,999 - ₹7,999',
    numericBasePrice: 4999,
    idealFor: 'Startups, local businesses, portfolios & personal branding.',
    features: [
      '⚡ 1 to 2 Weeks Delivery (Architecture, Responsive Build, Revisions, Deployment)',
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
    priceRange: '₹12,999 - ₹19,999',
    numericBasePrice: 14999,
    badge: 'Most Popular for Businesses',
    isPopular: true,
    idealFor: 'D2C brands, retail stores & online product catalogs.',
    features: [
      '⚡ 3 to 4 Weeks Delivery (Payment Gateway Integration, Order Pipelines, Security Audits)',
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
    priceRange: 'Starting ₹24,999+',
    numericBasePrice: 24999,
    idealFor: 'Custom web apps, SaaS platforms, client portals & complex APIs.',
    features: [
      '⚡ 4 to 6 Weeks Delivery (API Design, Database Architecture, Staging & Production Deployment)',
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
  const [billingCycle, setBillingCycle] = useState<'fixed' | 'retainer'>('fixed');

  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200/80 relative z-10">
      
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

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex justify-center">
            <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setBillingCycle('fixed')}
                className={`relative px-5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  billingCycle === 'fixed' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {billingCycle === 'fixed' && (
                  <motion.div
                    layoutId="pricingBillingToggle"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Fixed Milestone Scope</span>
              </button>

              <button
                onClick={() => setBillingCycle('retainer')}
                className={`relative px-5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  billingCycle === 'retainer' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {billingCycle === 'retainer' && (
                  <motion.div
                    layoutId="pricingBillingToggle"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Monthly SLA Retainer</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                    Continuous Sprints
                  </span>
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS_DATA.map((tier, idx) => {
            const isHighlighted = tier.isPopular;

            const displayPrice = billingCycle === 'retainer'
              ? tier.id === 'starter'
                ? '₹3,499 / mo'
                : tier.id === 'growth-ecommerce'
                ? '₹7,999 / mo'
                : 'Custom Retainer'
              : tier.priceRange;

            const xOffset = idx === 0 ? -60 : idx === 2 ? 60 : 0;
            const yOffset = idx === 1 ? 40 : 0;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: xOffset, y: yOffset }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-blue-50/90 via-white to-indigo-50/50 border-2 border-blue-500 shadow-xl shadow-blue-500/15 ring-4 ring-blue-500/10'
                    : 'bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Rotating Gradient Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-1.5 border border-blue-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
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
                  <div className="mb-8 p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="text-xs text-slate-500 font-medium">
                      {billingCycle === 'retainer' ? 'Monthly Dedicated Retainer' : 'Fixed Milestone Investment'}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayPrice}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight mt-1"
                      >
                        {displayPrice}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>+ 18% GST B2B Input Tax Credit</span>
                    </div>
                  </div>

                  {/* Features List with Spring Checkmarks */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Included Engineering Deliverables:
                    </span>
                    {tier.features.map((feat, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </motion.div>
                    ))}
                  </div>

                </div>

                {/* Tier CTA Button with Ripple hover */}
                <div>
                  <button
                    onClick={() => onSelectTier(tier.id, `${tier.name} (${billingCycle.toUpperCase()})`, tier.numericBasePrice)}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group ${
                      isHighlighted
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:scale-102 active:scale-95'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10 hover:scale-102 active:scale-95'
                    }`}
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Quality Over Shortcuts & B2B Tax Credit Notice Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium">
            ⚡ <strong className="font-extrabold text-blue-900">Quality Over Shortcuts:</strong> We maintain a disciplined 3–4 week milestone engineering cycle ensuring zero tech debt, strict type-safety, and seamless 18% GST invoicing.
          </p>
        </div>

      </div>
    </section>
  );
};
