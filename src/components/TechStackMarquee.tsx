import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { 
  Cpu, 
  CheckCircle2
} from 'lucide-react';

interface TechSkill {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Databases & Cloud' | 'Tools & APIs';
  experience: string;
  useCase: string;
  brandColor: string;
  level: string;
}

const ROW_1_TECH = [
  { name: 'TypeScript', color: '#3178c6', category: 'Language' },
  { name: 'Next.js 14', color: '#000000', category: 'Framework' },
  { name: 'React 18', color: '#61dafb', category: 'Library' },
  { name: 'Node.js', color: '#339933', category: 'Backend' },
  { name: 'Python', color: '#3776ab', category: 'AI & Data' },
  { name: 'Go (Golang)', color: '#00add8', category: 'Microservices' },
  { name: 'Tailwind CSS', color: '#06b6d4', category: 'Styling' },
  { name: 'PostgreSQL', color: '#4169e1', category: 'Database' },
  { name: 'Razorpay API', color: '#0c2340', category: 'Payments' },
];

const ROW_2_TECH = [
  { name: 'JavaScript (ES6+)', color: '#f7df1e', category: 'Language' },
  { name: 'Express.js', color: '#404040', category: 'API Framework' },
  { name: 'Supabase', color: '#3ecf8e', category: 'Relational DB' },
  { name: 'MongoDB Atlas', color: '#47a248', category: 'NoSQL' },
  { name: 'Cloudflare Edge', color: '#f38020', category: 'CDN & Infra' },
  { name: 'C++', color: '#00599c', category: 'Algorithms' },
  { name: 'Java', color: '#5382a1', category: 'Enterprise' },
  { name: 'Redis', color: '#dc382d', category: 'Caching' },
  { name: 'Git & GitHub', color: '#f05032', category: 'DevOps' },
];

const TECH_SKILLS: TechSkill[] = [
  { name: 'TypeScript', category: 'Languages', experience: '1–2 Yrs Active Builds', useCase: 'Strict compile-time type safety for full-stack Next.js & Node.js production apps', brandColor: '#3178c6', level: 'Core Stack' },
  { name: 'JavaScript (ES6+)', category: 'Languages', experience: '1–2 Yrs Active Builds', useCase: 'Async event loops, WebSockets, DOM manipulation, and dynamic web APIs', brandColor: '#f7df1e', level: 'Core Stack' },
  { name: 'Python', category: 'Languages', experience: '1–2 Yrs Active Builds', useCase: 'FastAPI automation microservices, AI embeddings, and script pipelines', brandColor: '#3776ab', level: 'Core Stack' },
  { name: 'Java', category: 'Languages', experience: '1–2 Yrs Active Builds', useCase: 'Object-oriented backend design, multithreaded queues, and data structures', brandColor: '#5382a1', level: 'Core Stack' },
  { name: 'C++', category: 'Languages', experience: '1–2 Yrs Active Builds', useCase: 'Low-latency algorithms, memory optimization, and data structure kernels', brandColor: '#00599c', level: 'Hands-on' },
  { name: 'Go (Golang)', category: 'Languages', experience: '1–2 Yrs Active Builds', useCase: 'Concurrent microservices, high-throughput workers, and gRPC endpoints', brandColor: '#00add8', level: 'Hands-on' },

  { name: 'Next.js 14', category: 'Frameworks', experience: '1–2 Yrs Active Builds', useCase: 'App Router, Server Components, SSR static generation, and edge caching', brandColor: '#2563eb', level: 'Production' },
  { name: 'React 18', category: 'Frameworks', experience: '1–2 Yrs Active Builds', useCase: 'Custom state hooks, Framer Motion UI animations, and component trees', brandColor: '#00d8ff', level: 'Production' },
  { name: 'Node.js', category: 'Frameworks', experience: '1–2 Yrs Active Builds', useCase: 'Scalable REST APIs, Razorpay webhooks, and JWT session authorization', brandColor: '#22c55e', level: 'Production' },
  { name: 'Express.js', category: 'Frameworks', experience: '1–2 Yrs Active Builds', useCase: 'Production microservice middleware, CORS protection, and rate limiting', brandColor: '#64748b', level: 'Production' },
  { name: 'Tailwind CSS', category: 'Frameworks', experience: '1–2 Yrs Active Builds', useCase: 'Airy SaaS design tokens, responsive layouts, and zero CSS bundle bloat', brandColor: '#06b6d4', level: 'Production' },

  { name: 'MongoDB Atlas', category: 'Databases & Cloud', experience: '1–2 Yrs Active Builds', useCase: 'NoSQL document schemas, aggregation pipelines, and atlas indexing', brandColor: '#10b981', level: 'Cloud Ready' },
  { name: 'Supabase', category: 'Databases & Cloud', experience: '1–2 Yrs Active Builds', useCase: 'PostgreSQL relational schemas, row-level security (RLS), and realtime sync', brandColor: '#059669', level: 'Cloud Ready' },
  { name: 'Cloudflare', category: 'Databases & Cloud', experience: '1–2 Yrs Active Builds', useCase: 'Global CDN edge workers, SSL/TLS, and DDoS mitigation', brandColor: '#f97316', level: 'Cloud Ready' },
  { name: 'Render', category: 'Databases & Cloud', experience: '1–2 Yrs Active Builds', useCase: 'Automated CI/CD deployment of Node services and PostgreSQL databases', brandColor: '#6366f1', level: 'Cloud Ready' },

  { name: 'Git & GitHub', category: 'Tools & APIs', experience: '1–2 Yrs Active Builds', useCase: 'Git flow, pull requests, CI/CD actions, and version control', brandColor: '#0f172a', level: 'Essential' },
  { name: 'Razorpay API', category: 'Tools & APIs', experience: '1–2 Yrs Active Builds', useCase: 'Checkout webhooks, 18% GST tax invoice generation, and settlement sync', brandColor: '#1d4ed8', level: 'Essential' },
  { name: 'WhatsApp Cloud API', category: 'Tools & APIs', experience: '1–2 Yrs Active Builds', useCase: 'Automated customer order alerts, cart recovery, and notification bots', brandColor: '#16a34a', level: 'Essential' },
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
    <section id="tech-matrix" className="py-24 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-blue-600" />
          <span>Full-Stack Mastery & Tech Stack</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Languages, Frameworks & Infrastructure
        </h2>

        <p className="text-base text-slate-600">
          Core technologies deployed across production clients, processing thousands of requests with zero technical debt.
        </p>
      </div>

      {/* Dual Opposing Direction Marquees */}
      <div className="mb-16 space-y-4">
        
        {/* Row 1: Leftward Infinite Marquee */}
        <div className="relative w-full overflow-hidden flex py-3 bg-white/70 border-y border-slate-200/70 backdrop-blur-md group/row1">
          <div className="absolute top-0 left-0 bottom-0 w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-4 whitespace-nowrap group-hover/row1:[animation-play-state:paused]"
          >
            {row1Items.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-2xs"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                />
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.category})</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="relative w-full overflow-hidden flex py-3 bg-white/70 border-y border-slate-200/70 backdrop-blur-md group/row2">
          <div className="absolute top-0 left-0 bottom-0 w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['-33.333%', '0%'] }}
            transition={{
              duration: 35,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-4 whitespace-nowrap group-hover/row2:[animation-play-state:paused]"
          >
            {row2Items.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-2xs"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                />
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.category})</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Main Skill Matrix Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Selector */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === cat ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTechCategory"
                    className="absolute inset-0 bg-blue-50/80 rounded-xl border border-blue-200"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Badges Grid wrapped in SpotlightCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <SpotlightCard
              key={skill.name}
              className="p-5 flex flex-col justify-between"
              spotlightColor="rgba(59, 130, 246, 0.12)"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: skill.brandColor }}
                  >
                    {skill.level}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 font-mono">
                    {skill.experience}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {skill.useCase}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Production Ready</span>
                </span>
                <span className="font-mono text-slate-400">
                  {skill.category.split(' ')[0]}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};
