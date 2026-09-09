import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { MagneticButton } from './MagneticButton';
import { 
  CheckCircle2, 
  Rocket,
  ArrowRight,
  Clock,
  Sun,
  Coffee,
  Sunset,
  Moon,
  GitBranch,
  Terminal,
  Activity
} from 'lucide-react';

interface GitHubStatus {
  isActive: boolean;
  statusText: string;
  lastSeenText: string;
  formattedDate: string;
  commitMsg: string;
  repoName: string;
}

export const FounderBio: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const [experienceText, setExperienceText] = useState('1-2+ Yrs');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [activeTab, setActiveTab] = useState<'status' | 'commit' | 'specs'>('status');
  const [ghStatus, setGhStatus] = useState<GitHubStatus>({
    isActive: true,
    statusText: 'Active Coding',
    lastSeenText: 'Just now',
    formattedDate: '',
    commitMsg: 'Codebase Sync',
    repoName: 'Shadow-Arrow-Website'
  });

  useEffect(() => {
    // 1. Set experience text to 1-2+ Yrs as requested
    setExperienceText('1-2+ Yrs');

    // 2. Dynamic Time-based Greeting (Morning, Afternoon, Evening, Late Night)
    const updateTimeAndGreeting = () => {
      const current = new Date();
      setTimeStr(current.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));

      setCurrentHour(current.getHours());
    };

    updateTimeAndGreeting();
    const clockInterval = setInterval(updateTimeAndGreeting, 1000);

    // 3. Real-time GitHub Activity Tracker across ALL user repositories
    const fetchGitHubActivity = async () => {
      try {
        const eventsRes = await fetch('https://api.github.com/users/loharbijoy2005-a11y/events/public');
        if (!eventsRes.ok) return;
        const events = await eventsRes.json();

        if (Array.isArray(events) && events.length > 0) {
          const pushEvent = events.find((e: any) => e.type === 'PushEvent' || e.type === 'CreateEvent') || events[0];

          if (pushEvent && pushEvent.repo?.name) {
            const repoFullName = pushEvent.repo.name;
            const repoSimpleName = repoFullName.includes('/') ? repoFullName.split('/')[1] : repoFullName;

            // Fetch exact commit message from that repo's commits API
            const commitsRes = await fetch(`https://api.github.com/repos/${repoFullName}/commits`);
            let commitMsg = 'Codebase Sync';
            let rawDate = pushEvent.created_at;

            if (commitsRes.ok) {
              const commits = await commitsRes.json();
              if (Array.isArray(commits) && commits.length > 0) {
                const latestCommit = commits[0];
                rawDate = latestCommit.commit?.committer?.date || latestCommit.commit?.author?.date || pushEvent.created_at;
                const rawMsg = latestCommit.commit?.message || 'Codebase Sync';
                commitMsg = rawMsg.split('\n')[0];
              }
            }

            const eventTime = new Date(rawDate).getTime();
            const currentTime = Date.now();
            const diffMs = currentTime - eventTime;
            const diffHours = diffMs / (1000 * 60 * 60);
            const diffMins = Math.floor(diffMs / (1000 * 60));

            const isActive = diffHours <= 3; // Active coding if last push <= 3 hours

            let timeAgo = '';
            if (diffMins < 1) {
              timeAgo = 'Just now';
            } else if (diffMins < 60) {
              timeAgo = `${diffMins}m ago`;
            } else {
              const h = Math.floor(diffHours);
              const m = diffMins % 60;
              timeAgo = `${h}h ${m}m ago`;
            }

            const formattedDate = new Date(rawDate).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });

            setGhStatus({
              isActive,
              statusText: isActive ? `Active Coding (${timeAgo})` : `Away / Offline (Last push ${timeAgo})`,
              lastSeenText: timeAgo,
              formattedDate,
              commitMsg,
              repoName: repoSimpleName
            });
          }
        }
      } catch (err) {
        // Keep fallback state on network error
      }
    };

    fetchGitHubActivity();
    const ghInterval = setInterval(fetchGitHubActivity, 15000); // Poll GitHub API every 15s

    return () => {
      clearInterval(clockInterval);
      clearInterval(ghInterval);
    };
  }, []);

  const renderGreetingIcon = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return (
        <span className="flex items-center gap-1.5 font-semibold text-slate-100">
          <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Good Morning!</span>
        </span>
      );
    } else if (currentHour >= 12 && currentHour < 17) {
      return (
        <span className="flex items-center gap-1.5 font-semibold text-slate-100">
          <Coffee className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Good Afternoon!</span>
        </span>
      );
    } else if (currentHour >= 17 && currentHour < 22) {
      return (
        <span className="flex items-center gap-1.5 font-semibold text-slate-100">
          <Sunset className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span>Good Evening!</span>
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1.5 font-semibold text-slate-100">
          <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Late Night Coding</span>
        </span>
      );
    }
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200/80 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SpotlightCard className="p-8 sm:p-12 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border border-slate-200/90 shadow-xl" spotlightColor="rgba(59, 130, 246, 0.12)">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Bio Info (Slides in from Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5 text-blue-600" />
                <span>Founder & Lead Engineering Philosophy</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Direct Founder Engineering.<br />
                <span className="text-gradient-accent">Zero Layers, Uncompromising Speed.</span>
              </h2>

              {/* Founder Positioning Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Led by <strong className="text-slate-900 font-bold">Bijoy Lohar</strong>, every system at Shadow Arrow is architected, code-reviewed, and optimized directly by the founder. Backed by <strong className="text-gradient-accent font-extrabold">{experienceText} of intensive, project-driven engineering</strong> across TypeScript, JavaScript, Python, and Java, we eliminate agency bloat to deliver robust, enterprise-grade applications built to scale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Founder-Led Codebase Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-Second Response Times (TTFB &lt; 200ms)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct 1-on-1 Access to Bijoy Lohar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Verified GST Billing & Compliance</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Founder Profile Card (Slides in from Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-4 bg-gradient-to-b from-white via-slate-50/90 to-amber-50/40 rounded-2xl p-6 border border-amber-200/80 shadow-xl shadow-amber-900/10 text-center space-y-4 relative overflow-hidden"
            >
              {/* Performance Gradient Top Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-600 to-amber-600" />

              {/* Profile Avatar + Instagram Note Bubble */}
              <div className="relative inline-block mx-auto pt-4">
                {/* Floating Instagram Note Bubble */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                  <div className="relative bg-slate-900 text-white text-[10px] font-medium px-3 py-1 rounded-xl shadow-lg border border-slate-700 flex items-center justify-center animate-bounce-subtle">
                    {renderGreetingIcon()}
                    {/* Tail */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
                  </div>
                </div>

                {/* Avatar with Instagram Story Ring */}
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md">
                  <img
                    src="https://github.com/loharbijoy2005-a11y.png"
                    alt="Bijoy Lohar - Founder & Lead Engineer"
                    width="160"
                    height="160"
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 rounded-full object-cover border-2 border-white mx-auto shadow-inner"
                  />
                </div>

                {/* Instagram Live Online Indicator Dot */}
                {ghStatus.isActive && (
                  <span className="absolute bottom-0 right-0 flex h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white items-center justify-center shadow-[0_0_12px_#10b981]" title="Active Coding">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  <span className="text-gradient-accent">Bijoy Lohar</span>
                </h3>
                <p className="text-xs font-bold text-blue-700 tracking-wide mt-0.5">Founder & Lead Full-Stack Engineer</p>

                {/* Mini Interactive Terminal Tab Switcher */}
                <div className="mt-3 flex justify-center gap-1 bg-slate-200/80 p-1 rounded-xl text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab('status')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                      activeTab === 'status' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>Live Status</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('commit')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                      activeTab === 'commit' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GitBranch className="w-3 h-3 text-amber-400" />
                    <span>Commit</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                      activeTab === 'specs' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Terminal className="w-3 h-3 text-blue-400" />
                    <span>Specs</span>
                  </button>
                </div>

                {/* Mac IDE-Style Live Developer Box */}
                <div className="mt-3 bg-slate-950 rounded-xl p-3 border border-slate-800 text-left shadow-lg font-mono text-[11px] space-y-2">
                  {/* Top Window Dots & Repo Tag */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 text-[10px]">
                    <div className="flex items-center gap-1.5 group/dots">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 transition-all duration-200 cursor-pointer hover:bg-rose-500 hover:scale-125 hover:shadow-[0_0_10px_#f43f5e]" title="Close"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 transition-all duration-200 cursor-pointer hover:bg-amber-500 hover:scale-125 hover:shadow-[0_0_10px_#eab308]" title="Minimize"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 transition-all duration-200 cursor-pointer hover:bg-emerald-500 hover:scale-125 hover:shadow-[0_0_10px_#22c55e]" title="Expand"></span>
                    </div>
                    <span className="text-slate-400 font-bold truncate max-w-[140px]" title={ghStatus.repoName}>
                      {ghStatus.repoName}
                    </span>
                  </div>

                  {/* Dynamic Tab Content with Framer Motion */}
                  <AnimatePresence mode="wait">
                    {activeTab === 'status' && (
                      <motion.div 
                        key="status" 
                        initial={{ opacity: 0, y: 4 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }} 
                        className="space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                            <span className="relative flex h-2 w-2">
                              {ghStatus.isActive ? (
                                <>
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                                </>
                              ) : (
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                              )}
                            </span>
                            <span>{ghStatus.isActive ? 'Active Coding' : 'Away'}</span>
                          </div>
                          <span className="text-slate-400 text-[10px] font-medium">{ghStatus.lastSeenText}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400 text-[10px] pt-0.5 border-t border-slate-900">
                          <span className="text-slate-500">Live Time (IST)</span>
                          <span className="text-blue-400 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-400 animate-pulse" /> {timeStr || '12:00:00 PM'}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'commit' && (
                      <motion.div 
                        key="commit" 
                        initial={{ opacity: 0, y: 4 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }} 
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-1.5 text-amber-300 font-semibold truncate text-[10.5px]">
                          <GitBranch className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate" title={`"${ghStatus.commitMsg}"`}>"{ghStatus.commitMsg}"</span>
                        </div>
                        <div className="text-slate-500 text-[9.5px] truncate">
                          Pushed {ghStatus.lastSeenText} {ghStatus.formattedDate ? `• ${ghStatus.formattedDate}` : ''}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'specs' && (
                      <motion.div 
                        key="specs" 
                        initial={{ opacity: 0, y: 4 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }} 
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[10.5px] truncate">
                          <Terminal className="w-3 h-3 text-blue-400 shrink-0" />
                          <span>React 19 • Next.js • FastAPI • Supabase</span>
                        </div>
                        <div className="text-emerald-400 text-[9.5px] font-bold">
                          ⚡ TTFB &lt; 200ms • 100% Founder Architecture
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 leading-relaxed font-medium">
                <span>Specializing in React, Next.js, Node.js, Python FastAPI, and Razorpay GST Billing Systems.</span>
              </div>

              <MagneticButton strength={25} className="w-full">
                <a
                  href="#contact"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-blue-500/25"
                >
                  <span>Direct Founder Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </MagneticButton>
            </motion.div>

          </div>

        </SpotlightCard>

      </div>
    </section>
  );
};
