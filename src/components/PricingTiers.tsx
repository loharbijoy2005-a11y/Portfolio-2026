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
    id: 'perf-seo',
    name: 'Web Performance & Core Web Vitals',
    category: 'Optimization & Security',
    deliveryTime: '1 Week Sprint',
    priceRange: '₹7,999 - ₹11,999',
    numericBasePrice: 7999,
    idealFor: 'Existing websites needing 95+ Lighthouse scores & speed tuning.',
    features: [
      'Lighthouse 95+ Core Web Vitals Guarantee',
      'Cloudflare CDN & Edge Worker Acceleration',
      'Next.js Image & WebP Asset Compression',
      'Rich Snippets & JSON-LD Schema Markup',
      'OWASP Security & CSRF Hardening',
      '1-Month Priority Technical Support',
      '100% Tax Invoicing (GST B2B Compliant)'
    ],
    ctaText: 'Optimize Speed'
  },
  {
    id: 'fullstack-web',
    name: 'Custom Full-Stack Web App',
    category: 'Engineering & Cloud',
    deliveryTime: '2 to 3 Weeks',
    priceRange: '₹14,999 - ₹21,999',
    numericBasePrice: 14999,
    badge: 'Popular for Web Brands',
    idealFor: 'Modern web applications, SaaS MVPs, and custom portals.',
    features: [
      'Next.js 14 App Router & Strict TypeScript',
      'High-Throughput REST & GraphQL Microservices',
      'Secure User Auth & Session Management',
      'Responsive Tailwind CSS Design System',
      'Automated Cloud CI/CD Deployment (Vercel / AWS)',
      '100% IP Transfer & GitHub Repo Handover',
      'Official Verified GST Invoicing'
    ],
    ctaText: 'Build Web App'
  },
  {
    id: 'growth-ecommerce',
    name: 'E-Commerce & Checkout Engine',
    category: 'Monetization & Sales',
    deliveryTime: '3 to 4 Weeks',
    priceRange: '₹19,999 - ₹29,999',
    numericBasePrice: 19999,
    badge: 'Most Popular for D2C Brands',
    isPopular: true,
    idealFor: 'D2C brands, retail stores & custom product checkout flows.',
    features: [
      'Sub-Second Checkout Engine & Cart Architecture',
      'Full Razorpay & Stripe Payment Integration',
      'Automated GST B2B Invoice Generation with HSN',
      'Real-Time Inventory Sync & Stock Alerts',
      'Cart Abandonment & Automated Recovery',
      '1-Click WhatsApp Order Receipts & Tracking Links',
      '3-Months Priority Engineering & Server Support'
    ],
    ctaText: 'Launch Store Engine'
  },
  {
    id: 'enterprise-saas',
    name: 'Business SaaS & Dashboards',
    category: 'Enterprise Systems',
    deliveryTime: '4 to 6 Weeks',
    priceRange: 'Starting ₹24,999+',
    numericBasePrice: 24999,
    badge: 'Enterprise Grade',
    idealFor: 'Complex B2B SaaS platforms, admin portals & workflow automation.',
    features: [
      'Enterprise Admin Control Panel & User Matrix',
      'Role-Based Access Control (RBAC) & Audit Logs',
      'Real-Time Analytics & Interactive Visual Charting',
      'Automated PDF Report & B2B Tax Statement Generator',
      'Webhook Hub & Third-Party ERP Integrations',
      'Legally Binding SLA & NDA Contract Agreement',
      'Direct Slack / WhatsApp Channel with Bijoy Lohar'
    ],
    ctaText: 'Talk to Founder'
  }
];

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'fixed' | 'retainer'>('fixed');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTierId, setSelectedTierId] = useState<string>('growth-ecommerce');

  const categories = [
    'All',
    'Engineering & Cloud',
    'Monetization & Sales',
    'Enterprise Systems',
    'Optimization & Security'
  ];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSelectedTierId('growth-ecommerce');
    } else {
      const firstInCat = PRICING_TIERS_DATA.find((t) => t.category === cat);
      if (firstInCat) {
        setSelectedTierId(firstInCat.id);
      }
    }
  };

  const filteredTiers = activeCategory === 'All'
    ? PRICING_TIERS_DATA
    : PRICING_TIERS_DATA.filter((tier) => tier.category === activeCategory);

  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200/80 relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <BadgePercent className="w-3.5 h-3.5 text-blue-600" />
            <span>Category-Based Investment Packages</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Pricing Categorized for Every Business Scope
          </h2>

          <p className="text-base text-slate-600">
            Select a service category below to view dedicated deliverables, execution timelines, and official GST tax billing.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-2 flex justify-center">
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
                <span className="relative z-10">Fixed Milestone Investment</span>
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

          {/* Category Filter Tabs */}
          <div className="pt-3 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid grid-cols-1 gap-6 items-stretch ${
          filteredTiers.length === 1
            ? 'max-w-md mx-auto'
            : filteredTiers.length === 2
            ? 'md:grid-cols-2 max-w-4xl mx-auto'
            : 'md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {filteredTiers.map((tier, idx) => {
            const isSelected = selectedTierId === tier.id;

            const displayPrice = billingCycle === 'retainer'
              ? tier.id === 'perf-seo'
                ? '₹3,999 / mo'
                : tier.id === 'fullstack-web'
                ? '₹6,999 / mo'
                : tier.id === 'growth-ecommerce'
                ? '₹9,999 / mo'
                : '₹14,999 / mo'
              : tier.priceRange;

            return (
              <motion.div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-blue-50/90 via-white to-indigo-50/50 border-2 border-blue-500 shadow-xl shadow-blue-500/15 ring-4 ring-blue-500/10'
                    : 'bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Popular / Active Badge */}
                {tier.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1 border whitespace-nowrap ${
                    isSelected ? 'bg-blue-600 border-blue-400 shadow-blue-600/30' : 'bg-slate-800 border-slate-600 shadow-slate-900/20'
                  }`}>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  {/* Category Pill & Delivery Time */}
                  <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border truncate ${
                      isSelected
                        ? 'text-blue-700 bg-blue-100/80 border-blue-300'
                        : 'text-slate-600 bg-slate-100 border-slate-200'
                    }`}>
                      {tier.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {tier.deliveryTime}
                    </span>
                  </div>

                  {/* Tier Title & Subtitle */}
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-500 min-h-[32px] leading-normal">
                      {tier.idealFor}
                    </p>
                  </div>

                  {/* Price */}
                  <div className={`mb-6 p-4 rounded-2xl border transition-colors ${
                    isSelected ? 'bg-blue-50/60 border-blue-200' : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {billingCycle === 'retainer' ? 'Monthly Retainer Sprint' : 'Fixed Milestone Investment'}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayPrice}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 tracking-tight mt-1"
                      >
                        {displayPrice}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>+ Official GST B2B Invoicing</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Included Deliverables:
                    </span>
                    {tier.features.map((feat, fIdx) => (
                      <div 
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-slate-700 font-medium leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Tier CTA Button */}
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTierId(tier.id);
                      onSelectTier(tier.id, `${tier.name} (${billingCycle.toUpperCase()})`, tier.numericBasePrice);
                    }}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 active:scale-95'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10 active:scale-95'
                    }`}
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Quality Notice Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium">
            <strong className="font-extrabold text-blue-900">Quality Over Shortcuts:</strong> Every package includes dedicated milestone engineering by founder Bijoy Lohar, zero tech debt, and verified GST tax invoicing.
          </p>
        </div>

      </div>
    </section>
  );
};
