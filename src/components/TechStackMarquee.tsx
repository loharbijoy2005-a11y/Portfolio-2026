import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { 
  Cpu, 
  CheckCircle2,
  Sparkles,
  Zap,
  Cloud,
  ShieldCheck,
  Code2
} from 'lucide-react';

interface TechSkill {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Databases & Cloud' | 'Tools & APIs';
  experience: string;
  useCase: string;
  brandColor: string;
  level: string;
  badgeType: 'essential' | 'production' | 'cloud' | 'enterprise' | 'speed';
  iconUrl: string;
}

const ROW_1_TECH = [
  { name: 'TypeScript', color: '#3178c6', category: 'Language', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Next.js 14', color: '#000000', category: 'Framework', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'React 18', color: '#61dafb', category: 'Library', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Node.js', color: '#339933', category: 'Backend', iconUrl: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python', color: '#3776ab', category: 'AI & Data', iconUrl: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Go (Golang)', color: '#00add8', category: 'Microservices', iconUrl: 'https://cdn.simpleicons.org/go/00ADD8' },
  { name: 'Tailwind CSS', color: '#06b6d4', category: 'Styling', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'PostgreSQL', color: '#4169e1', category: 'Database', iconUrl: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Razorpay API', color: '#0c2340', category: 'Payments', iconUrl: 'https://cdn.simpleicons.org/razorpay/0C2340' },
];

const ROW_2_TECH = [
  { name: 'JavaScript (ES6+)', color: '#f7df1e', category: 'Language', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Express.js', color: '#404040', category: 'API Framework', iconUrl: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'Supabase', color: '#3ecf8e', category: 'Relational DB', iconUrl: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'MongoDB Atlas', color: '#47a248', category: 'NoSQL', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Cloudflare Edge', color: '#f38020', category: 'CDN & Infra', iconUrl: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  { name: 'C++', color: '#00599c', category: 'Algorithms', iconUrl: 'https://cdn.simpleicons.org/cplusplus/00599C' },
  { name: 'Java', color: '#5382a1', category: 'Enterprise', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Redis', color: '#dc382d', category: 'Caching', iconUrl: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'Git & GitHub', color: '#f05032', category: 'DevOps', iconUrl: 'https://cdn.simpleicons.org/github/181717' },
];

const TECH_SKILLS: TechSkill[] = [
  { 
    name: 'TypeScript', 
    category: 'Languages', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Strict compile-time type safety for high-throughput Next.js & Node.js production platforms', 
    brandColor: '#2563eb', 
    level: '🔥 Essential Core Stack',
    badgeType: 'essential',
    iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' 
  },
  { 
    name: 'JavaScript (ES6+)', 
    category: 'Languages', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Async event loops, real-time WebSockets, DOM manipulation, and dynamic web APIs', 
    brandColor: '#d97706', 
    level: '🔥 Essential Core Stack',
    badgeType: 'essential',
    iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' 
  },
  { 
    name: 'Python', 
    category: 'Languages', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'FastAPI automation microservices, AI embeddings, data pipelines, and async backends', 
    brandColor: '#0284c7', 
    level: '⚡ Production High-Speed',
    badgeType: 'production',
    iconUrl: 'https://cdn.simpleicons.org/python/3776AB' 
  },
  { 
    name: 'Java', 
    category: 'Languages', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Object-oriented architecture, concurrent thread queues, and robust enterprise services', 
    brandColor: '#475569', 
    level: '⚡ Production High-Speed',
    badgeType: 'production',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' 
  },
  { 
    name: 'C++', 
    category: 'Languages', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Sub-millisecond data structure optimization, memory management, and algorithmic kernels', 
    brandColor: '#1d4ed8', 
    level: '🚀 High-Throughput Tech',
    badgeType: 'speed',
    iconUrl: 'https://cdn.simpleicons.org/cplusplus/00599C' 
  },
  { 
    name: 'Go (Golang)', 
    category: 'Languages', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Ultra-fast goroutine microservices, high-concurrency workers, and gRPC backend routing', 
    brandColor: '#0891b2', 
    level: '🚀 High-Throughput Tech',
    badgeType: 'speed',
    iconUrl: 'https://cdn.simpleicons.org/go/00ADD8' 
  },

  { 
    name: 'Next.js 14', 
    category: 'Frameworks', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'App Router, Server Components, sub-second TTFB, SSR static generation, and edge caching', 
    brandColor: '#1c1917', 
    level: '🔥 Essential Core Stack',
    badgeType: 'essential',
    iconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000' 
  },
  { 
    name: 'React 18', 
    category: 'Frameworks', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Custom state hooks, Framer Motion UI animations, concurrent rendering, and dynamic components', 
    brandColor: '#0284c7', 
    level: '🔥 Essential Core Stack',
    badgeType: 'essential',
    iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' 
  },
  { 
    name: 'Node.js', 
    category: 'Frameworks', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Scalable async REST APIs, Razorpay webhook orchestration, and JWT authentication', 
    brandColor: '#16a34a', 
    level: '⚡ Production High-Speed',
    badgeType: 'production',
    iconUrl: 'https://cdn.simpleicons.org/nodedotjs/339933' 
  },
  { 
    name: 'Express.js', 
    category: 'Frameworks', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Production microservice middleware, CORS protection, rate limiting, and route handles', 
    brandColor: '#334155', 
    level: '⚡ Production High-Speed',
    badgeType: 'production',
    iconUrl: 'https://cdn.simpleicons.org/express/000000' 
  },
  { 
    name: 'Tailwind CSS', 
    category: 'Frameworks', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Airy luxury design tokens, responsive fluid layouts, glassmorphic UI, and zero bundle bloat', 
    brandColor: '#0891b2', 
    level: '🎨 Sleek UI Engine',
    badgeType: 'essential',
    iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' 
  },

  { 
    name: 'MongoDB Atlas', 
    category: 'Databases & Cloud', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'NoSQL document schemas, aggregation pipelines, replica indexing, and cluster scaling', 
    brandColor: '#059669', 
    level: '☁️ Cloud-Ready & Scalable',
    badgeType: 'cloud',
    iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' 
  },
  { 
    name: 'Supabase', 
    category: 'Databases & Cloud', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'PostgreSQL relational schemas, row-level security (RLS), and real-time database sync', 
    brandColor: '#10b981', 
    level: '☁️ Cloud-Ready & Scalable',
    badgeType: 'cloud',
    iconUrl: 'https://cdn.simpleicons.org/supabase/3ECF8E' 
  },
  { 
    name: 'Cloudflare', 
    category: 'Databases & Cloud', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Global CDN edge workers, SSL/TLS encryption, and instant DDoS mitigation', 
    brandColor: '#ea580c', 
    level: '☁️ Cloud-Ready & Scalable',
    badgeType: 'cloud',
    iconUrl: 'https://cdn.simpleicons.org/cloudflare/F38020' 
  },
  { 
    name: 'Render & Vercel', 
    category: 'Databases & Cloud', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Automated CI/CD deployment pipelines for Node services, Edge Functions and Databases', 
    brandColor: '#4f46e5', 
    level: '☁️ Cloud-Ready & Scalable',
    badgeType: 'cloud',
    iconUrl: 'https://cdn.simpleicons.org/vercel/000000' 
  },

  { 
    name: 'Git & GitHub', 
    category: 'Tools & APIs', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Git flow, pull requests, CI/CD automated deployment actions, and repository security', 
    brandColor: '#1e293b', 
    level: '🛡️ Enterprise Essential',
    badgeType: 'enterprise',
    iconUrl: 'https://cdn.simpleicons.org/github/181717' 
  },
  { 
    name: 'Razorpay API', 
    category: 'Tools & APIs', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Checkout webhooks, automated GST tax invoice generation, and instant settlement sync', 
    brandColor: '#1d4ed8', 
    level: '🛡️ Enterprise Essential',
    badgeType: 'enterprise',
    iconUrl: 'https://cdn.simpleicons.org/razorpay/0C2340' 
  },
  { 
    name: 'WhatsApp Cloud API', 
    category: 'Tools & APIs', 
    experience: '1–2 Yrs Active Builds', 
    useCase: 'Automated customer order alerts, cart recovery, and interactive notification bots', 
    brandColor: '#15803d', 
    level: '🛡️ Enterprise Essential',
    badgeType: 'enterprise',
    iconUrl: 'https://cdn.simpleicons.org/whatsapp/25D366' 
  },
];

export const TechStackMarquee: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frameworks', 'Databases & Cloud', 'Tools & APIs'];

  const filteredSkills = activeCategory === 'All'
    ? TECH_SKILLS
    : TECH_SKILLS.filter((s) => s.category === activeCategory);

  const row1Items = [...ROW_1_TECH, ...ROW_1_TECH, ...ROW_1_TECH];
  const row2Items = [...ROW_2_TECH, ...ROW_2_TECH, ...ROW_2_TECH];

  return (
    <section id="tech-matrix" className="py-24 bg-[#FAF7F2] border-t border-[#E5DDD0] relative overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-800 text-xs font-bold uppercase tracking-widest shadow-2xs font-mono"
        >
          <Cpu className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Engineering Precision • Tech Architecture</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
          Languages, Frameworks & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600">Cloud Stack</span>
        </h2>

        <p className="text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Core battle-tested technologies engineered for zero technical debt, sub-second page loads, and 100% production uptime.
        </p>
      </div>

      {/* Dual Opposing Direction Marquees with Official SVG Logos */}
      <div className="mb-16 space-y-4">
        
        {/* Row 1: Leftward Infinite Marquee */}
        <div className="relative w-full overflow-hidden flex py-3.5 bg-white/80 border-y border-[#E5DDD0] backdrop-blur-md group/row1 shadow-2xs">
          <div className="absolute top-0 left-0 bottom-0 w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{
              duration: 28,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-4 whitespace-nowrap group-hover/row1:[animation-play-state:paused]"
          >
            {row1Items.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-[#E5DDD0] text-slate-900 text-xs font-bold shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded-md bg-[#FAF7F2] border border-slate-200/80 p-0.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <img src={item.iconUrl} alt={item.name} className="w-3.5 h-3.5 object-contain" />
                </div>
                <span className="font-semibold">{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.category})</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="relative w-full overflow-hidden flex py-3.5 bg-white/80 border-y border-[#E5DDD0] backdrop-blur-md group/row2 shadow-2xs">
          <div className="absolute top-0 left-0 bottom-0 w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['-33.333%', '0%'] }}
            transition={{
              duration: 32,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-4 whitespace-nowrap group-hover/row2:[animation-play-state:paused]"
          >
            {row2Items.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-[#E5DDD0] text-slate-900 text-xs font-bold shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded-md bg-[#FAF7F2] border border-slate-200/80 p-0.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <img src={item.iconUrl} alt={item.name} className="w-3.5 h-3.5 object-contain" />
                </div>
                <span className="font-semibold">{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.category})</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Main Skill Matrix Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Selector Filter Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-2xl border border-[#E5DDD0] shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTechCategory"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50/70 rounded-xl border border-blue-300/80 shadow-2xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat === 'All' && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                  {cat === 'Languages' && <Code2 className="w-3.5 h-3.5 text-blue-600" />}
                  {cat === 'Frameworks' && <Zap className="w-3.5 h-3.5 text-indigo-600" />}
                  {cat === 'Databases & Cloud' && <Cloud className="w-3.5 h-3.5 text-emerald-600" />}
                  {cat === 'Tools & APIs' && <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{cat}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Badges Grid with Motion Animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                whileHover={{ y: -8, scale: 1.025 }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SpotlightCard
                  className="p-6 flex flex-col justify-between group border border-[#E5DDD0] hover:border-blue-400 hover:shadow-xl transition-all duration-300 h-full bg-white/95 rounded-3xl"
                  spotlightColor="rgba(59, 130, 246, 0.14)"
                >
                  <div>
                    {/* Header Level Animated Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold font-mono px-3 py-1 rounded-full text-white shadow-xs"
                        style={{ backgroundColor: skill.brandColor }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{skill.level}</span>
                      </span>

                      <span className="text-[11px] font-semibold text-slate-400 font-mono">
                        {skill.experience}
                      </span>
                    </div>

                    {/* Tech Title with Official SVG Logo */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] p-2 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <img src={skill.iconUrl} alt={skill.name} className="w-6.5 h-6.5 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-[#1C1917] group-hover:text-blue-600 transition-colors leading-tight font-heading">
                          {skill.name}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {skill.useCase}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#F0E9DF] flex items-center justify-between text-[11px] text-blue-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified Deployment</span>
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">
                      100% SLA
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

