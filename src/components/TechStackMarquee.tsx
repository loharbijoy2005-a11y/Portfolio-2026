import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  CheckCircle2
} from 'lucide-react';

interface TechSkill {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Databases & Cloud' | 'Tools & APIs';
  experience: string;
  useCase: string;
  badgeBg: string;
  level: string;
}

const TECH_SKILLS: TechSkill[] = [
  // Languages
  { name: 'TypeScript', category: 'Languages', experience: '4+ Years', useCase: 'Strict compile-time type safety for full-stack Next.js & Node.js apps', badgeBg: 'bg-blue-600 text-white', level: 'Expert' },
  { name: 'JavaScript (ES6+)', category: 'Languages', experience: '5+ Years', useCase: 'Asynchronous event loops, WebSockets, DOM, and web worker pipelines', badgeBg: 'bg-amber-500 text-white', level: 'Expert' },
  { name: 'Python', category: 'Languages', experience: '3+ Years', useCase: 'FastAPI automation microservices, AI embeddings, and data processing', badgeBg: 'bg-sky-600 text-white', level: 'Advanced' },
  { name: 'Java', category: 'Languages', experience: '3+ Years', useCase: 'Object-oriented backend design, multithreaded queues, and enterprise logic', badgeBg: 'bg-orange-600 text-white', level: 'Advanced' },
  { name: 'C++', category: 'Languages', experience: '3+ Years', useCase: 'Low-latency algorithms, memory optimization, and data structure kernels', badgeBg: 'bg-rose-600 text-white', level: 'Advanced' },
  { name: 'Go (Golang)', category: 'Languages', experience: '2+ Years', useCase: 'Concurrent microservices, high-throughput workers, and gRPC endpoints', badgeBg: 'bg-cyan-600 text-white', level: 'Proficient' },

  // Frameworks & Libraries
  { name: 'Next.js 14', category: 'Frameworks', experience: '3+ Years', useCase: 'App Router, Server Components, SSR/ISR static generation, and edge caching', badgeBg: 'bg-slate-900 text-white', level: 'Expert' },
  { name: 'React 18', category: 'Frameworks', experience: '4+ Years', useCase: 'Custom state hooks, Framer Motion UI animations, and modular component trees', badgeBg: 'bg-sky-500 text-white', level: 'Expert' },
  { name: 'Node.js', category: 'Frameworks', experience: '4+ Years', useCase: 'Scalable REST & GraphQL APIs, JWT authorization, and cluster workers', badgeBg: 'bg-emerald-600 text-white', level: 'Expert' },
  { name: 'Express.js', category: 'Frameworks', experience: '4+ Years', useCase: 'Production microservice middleware, CORS protection, and rate limiting', badgeBg: 'bg-slate-800 text-white', level: 'Expert' },
  { name: 'Tailwind CSS', category: 'Frameworks', experience: '4+ Years', useCase: 'Airy SaaS design tokens, responsive layouts, and zero CSS bundle bloat', badgeBg: 'bg-cyan-500 text-white', level: 'Expert' },

  // Databases & Cloud
  { name: 'MongoDB Atlas', category: 'Databases & Cloud', experience: '3+ Years', useCase: 'NoSQL document schemas, aggregation pipelines, and atlas indexing', badgeBg: 'bg-emerald-700 text-white', level: 'Advanced' },
  { name: 'Supabase', category: 'Databases & Cloud', experience: '3+ Years', useCase: 'PostgreSQL relational schemas, row-level security (RLS), and realtime sync', badgeBg: 'bg-emerald-500 text-white', level: 'Expert' },
  { name: 'Cloudflare', category: 'Databases & Cloud', experience: '3+ Years', useCase: 'Global CDN edge workers, SSL/TLS, and DDoS mitigation', badgeBg: 'bg-amber-600 text-white', level: 'Advanced' },
  { name: 'Render', category: 'Databases & Cloud', experience: '2+ Years', useCase: 'Automated CI/CD deployment of Node services and PostgreSQL databases', badgeBg: 'bg-indigo-600 text-white', level: 'Advanced' },
  { name: 'Netlify / Vercel', category: 'Databases & Cloud', experience: '4+ Years', useCase: 'Continuous Git deployments, edge rewrites, and serverless functions', badgeBg: 'bg-blue-800 text-white', level: 'Expert' },

  // Tools & Integrations
  { name: 'Git & GitHub', category: 'Tools & APIs', experience: '5+ Years', useCase: 'Git flow, pull requests, CI/CD actions, and strict version control', badgeBg: 'bg-slate-900 text-white', level: 'Expert' },
  { name: 'Razorpay API', category: 'Tools & APIs', experience: '3+ Years', useCase: 'Checkout webhooks, 18% GST tax invoice generation, and settlement verification', badgeBg: 'bg-blue-600 text-white', level: 'Expert' },
  { name: 'WhatsApp Cloud API', category: 'Tools & APIs', experience: '2+ Years', useCase: 'Automated customer order alerts, cart recovery, and interactive message bots', badgeBg: 'bg-emerald-600 text-white', level: 'Advanced' },
  { name: 'REST & GraphQL APIs', category: 'Tools & APIs', experience: '4+ Years', useCase: 'Idempotent HTTP endpoints, OpenAPI specifications, and query optimization', badgeBg: 'bg-indigo-600 text-white', level: 'Expert' },
];

export const TechStackMarquee: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frameworks', 'Databases & Cloud', 'Tools & APIs'];

  const filteredSkills = activeCategory === 'All'
    ? TECH_SKILLS
    : TECH_SKILLS.filter((s) => s.category === activeCategory);

  // Double skills array for seamless infinite marquee loop
  const marqueeItems = [...TECH_SKILLS, ...TECH_SKILLS];

  return (
    <section id="tech-matrix" className="py-24 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden">
      
      {/* Infinite Logo/Pill Marquee Header Bar */}
      <div className="mb-16">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
            // Core Engineering Technologies & Tools
          </span>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden flex py-4 bg-white/80 border-y border-slate-200/80 backdrop-blur-md">
          {/* Left & Right Fade Shadows */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.category.split(' ')[0]})</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Skill Matrix Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Full-Stack Mastery Matrix</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Languages, Frameworks & Infrastructure
            </h2>

            <p className="text-base text-slate-600">
              Hover over any technology badge to inspect real production use-cases and engineering benchmarks.
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap gap-1 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/80 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === cat ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTechCategory"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-blue-500 shadow-2xs hover:shadow-lg transition-all duration-200 cursor-pointer relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${skill.badgeBg}`}>
                    {skill.level}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 font-mono">
                    {skill.experience}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
              </div>

              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                {skill.useCase}
              </p>

              {/* Tooltip on hover */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Production Ready</span>
                </span>
                <span className="font-mono text-slate-400 group-hover:text-blue-600 transition-colors">
                  {skill.category.split(' ')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
