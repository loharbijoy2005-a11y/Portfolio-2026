import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Zap, 
  MessageSquare, 
  Layout, 
  Star, 
  GitBranch, 
  ExternalLink, 
  ShieldCheck, 
  Activity, 
  Smartphone
} from 'lucide-react';

interface ProjectArchitecture {
  id: string;
  tabLabel: string;
  url: string;
  repoName: string;
  commitHash: string;
  language: string;
  badgeClass: string;
  iconColor: string;
  codeSnippet: string;
  buildStatus: string;
}

const PROJECTS: ProjectArchitecture[] = [
  {
    id: 'ecommerce',
    tabLabel: 'E-Commerce Engine',
    url: 'https://shadowarrow.in/demos/store',
    repoName: 'shadow-arrow/ecommerce-core',
    commitHash: '#ea89f21',
    language: 'TypeScript • 96%',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    iconColor: 'text-blue-600',
    codeSnippet: `// Next.js 14 Server Action & Razorpay Order Checkout
export async function createCheckoutSession(cart: CartItem[], gstin: string) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gstAmount = subtotal * 0.18; // B2B GST Tax Invoice computation
  
  const razorpayOrder = await razorpay.orders.create({
    amount: (subtotal + gstAmount) * 100,
    currency: "INR",
    receipt: \`invoice_\${Date.now()}\`
  });
  
  await db.invoices.create({ orderId: razorpayOrder.id, gstin, subtotal, gstAmount });
  return { orderId: razorpayOrder.id, amount: razorpayOrder.amount };
}`,
    buildStatus: 'Vite Compiled in 184ms | Tests: 14/14 Passed | 0 Errors'
  },
  {
    id: 'cloud-apis',
    tabLabel: 'Cloud APIs',
    url: 'https://shadowarrow.in/demos/cloud-dashboard',
    repoName: 'shadow-arrow/microservice-api',
    commitHash: '#b77c32e',
    language: 'Go / Python • 92%',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-200',
    iconColor: 'text-amber-500',
    codeSnippet: `// Asynchronous Redis Rate-Limiter & Supabase Query
func HandleSessionQuery(w http.ResponseWriter, r *http.Request) {
    token := r.Header.Get("Authorization")
    if !redis.CheckRateLimit(token, 100) {
        http.Error(w, "429 Rate Limit Exceeded", 429)
        return
    }
    
    session, err := supabase.FetchUserSession(token)
    if err != nil {
        http.Error(w, "401 Unauthorized", 401)
        return
    }
    json.NewEncoder(w).Encode(map[string]interface{}{
        "status": "200 OK", "latency": "8ms", "session": session,
    })
}`,
    buildStatus: 'Go Microservice Live | Latency: 8ms | Uptime: 99.99%'
  },
  {
    id: 'whatsapp-automation',
    tabLabel: 'WhatsApp Automation',
    url: 'https://shadowarrow.in/demos/whatsapp-gateway',
    repoName: 'shadow-arrow/whatsapp-cloud-api',
    commitHash: '#c990a12',
    language: 'Node.js • 98%',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    iconColor: 'text-emerald-600',
    codeSnippet: `// WhatsApp Cloud API Order Dispatch Webhook Event
app.post('/webhooks/order-dispatched', async (req, res) => {
  const { customerPhone, orderId, trackingUrl } = req.body;
  
  await fetch('https://graph.facebook.com/v18.0/whatsapp/messages', {
    method: 'POST',
    headers: { Authorization: \`Bearer \${process.env.WA_TOKEN}\`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: customerPhone,
      type: 'template',
      template: { name: 'order_shipped_v2', parameters: [{ text: orderId }, { text: trackingUrl }] }
    })
  });
  return res.json({ status: 'NOTIFICATION_SENT' });
});`,
    buildStatus: 'Webhook Verified | Meta API Status: Active | 100% Sent'
  },
  {
    id: 'web-landing',
    tabLabel: 'Web Architecture',
    url: 'https://shadowarrow.in/demos/saas-landing',
    repoName: 'shadow-arrow/high-converting-saas',
    commitHash: '#d44e55f',
    language: 'TypeScript & Tailwind • 99%',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-200',
    iconColor: 'text-purple-600',
    codeSnippet: `// High-Speed Next.js 14 Server Component Layout
export default async function SaaSPage() {
  const metrics = await fetchLighthouseMetrics();
  
  return (
    <main className="bg-slate-50 text-slate-900 selection:bg-blue-100">
      <HeroBanner metrics={metrics} />
      <FeatureGrid layout="bento" />
      <PricingCalculator defaultTier="growth" />
      <Footer />
    </main>
  );
}`,
    buildStatus: 'Next.js ISR Rendered | Lighthouse: 99/100 | CLS: 0.00'
  }
];

export const FullStackEmulator: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [typedCode, setTypedCode] = useState<string>('');
  const [mobileTab, setMobileTab] = useState<'code' | 'browser'>('browser');
  const [cartCount, setCartCount] = useState<number>(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const activeProject = PROJECTS[activeProjectIndex];
  const fullText = activeProject.codeSnippet;
  const progressRatio = fullText.length > 0 ? Math.min(1, typedCode.length / fullText.length) : 1;

  // Auto-rotating countdown timer (7 seconds per project)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveProjectIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 7000);

    return () => clearTimeout(timer);
  }, [activeProjectIndex]);

  // Code typing effect on project switch
  useEffect(() => {
    setTypedCode('');
    let charIdx = 0;

    const typingInterval = setInterval(() => {
      charIdx += 4;
      if (charIdx >= fullText.length) {
        setTypedCode(fullText);
        clearInterval(typingInterval);
      } else {
        setTypedCode(fullText.substring(0, charIdx));
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, [activeProjectIndex, fullText]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden relative"
    >
      
      {/* Top Timeline Navigation Bar */}
      <div className="bg-slate-100/90 px-4 pt-4 pb-2 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          
          {/* Project Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {PROJECTS.map((proj, idx) => {
              const isSelected = idx === activeProjectIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveProjectIndex(idx);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeEmulatorTab"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/90"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {idx === 0 && <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />}
                    {idx === 1 && <Zap className="w-3.5 h-3.5 text-amber-500" />}
                    {idx === 2 && <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />}
                    {idx === 3 && <Layout className="w-3.5 h-3.5 text-indigo-600" />}
                    <span>{proj.tabLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 7-Second Progress Bar */}
        <div className="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden">
          <motion.div
            key={activeProjectIndex}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 7, ease: 'linear' }}
            className="h-full bg-blue-600"
          />
        </div>
      </div>

      {/* GitHub Sync Header Info Bar */}
      <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-900 font-bold">
            <GitBranch className="w-3.5 h-3.5 text-blue-600" />
            <span>{activeProject.repoName}</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-bold">{activeProject.commitHash}</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className={`px-2.5 py-0.5 rounded-full font-bold border hidden sm:inline ${activeProject.badgeClass}`}>
            {activeProject.language}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>Star Repository</span>
          </div>
          <a
            href="https://github.com/loharbijoy2005-a11y/Portfolio-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold underline"
          >
            <span>Open Live Production Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Mobile Switcher Toggle */}
      <div className="flex lg:hidden border-b border-slate-200 bg-slate-100 p-1">
        <button
          onClick={() => setMobileTab('code')}
          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
            mobileTab === 'code' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          [Code View]
        </button>
        <button
          onClick={() => setMobileTab('browser')}
          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
            mobileTab === 'browser' ? 'bg-blue-600 text-white' : 'text-slate-600'
          }`}
        >
          [Live Web Preview]
        </button>
      </div>

      {/* Main Dual-Pane Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        
        {/* Left Pane: Code Engine Console */}
        <div className={`lg:col-span-6 bg-slate-950 text-slate-100 p-6 flex flex-col justify-between border-r border-slate-800 font-mono ${
          mobileTab === 'browser' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div>
            {/* macOS Window Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block transition-all duration-200 cursor-pointer hover:bg-rose-500 hover:scale-125 hover:shadow-[0_0_10px_#f43f5e]" title="Close" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block transition-all duration-200 cursor-pointer hover:bg-amber-500 hover:scale-125 hover:shadow-[0_0_10px_#eab308]" title="Minimize" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block transition-all duration-200 cursor-pointer hover:bg-emerald-500 hover:scale-125 hover:shadow-[0_0_10px_#22c55e]" title="Expand" />
                <span className="text-slate-400 font-mono text-[11px] ml-2">git checkout -b production</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] border border-blue-700/50">
                Strict TypeScript
              </span>
            </div>

            {/* Code Body */}
            <div className="relative min-h-[280px]">
              <pre className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap selection:bg-blue-600 selection:text-white">
                <code>{typedCode}</code>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 bg-blue-400 ml-0.5 align-middle"
                />
              </pre>
            </div>
          </div>

          {/* Real-Time Build Status Bar */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold">{activeProject.buildStatus}</span>
            <span className="text-slate-500">100% Verified</span>
          </div>
        </div>

        {/* Right Pane: Interactive Live Web Browser Mockup */}
        <div className={`lg:col-span-6 bg-slate-50/80 p-6 flex flex-col justify-between relative ${
          mobileTab === 'code' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div>
            
            {/* Browser Mockup Window Header */}
            <div className="bg-white rounded-xl p-2.5 border border-slate-200 mb-6 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg text-xs font-mono text-slate-600 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{activeProject.url}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-blue-600 font-bold hidden sm:inline">
                  {progressRatio < 0.3 ? 'Parsing Syntax...' : progressRatio < 0.8 ? 'Executing Code Logic...' : 'LIVE COMPLETED'}
                </span>
              </div>
            </div>

            {/* Dynamic Interactive Rendered Application UI */}
            <AnimatePresence mode="wait">
              
              {/* 1. E-Commerce Storefront Render */}
              {activeProject.id === 'ecommerce' && (
                <motion.div
                  key="ecommerce-render"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                      <span className="font-extrabold text-slate-900 text-sm">AuraCrafts Luxury D2C Store</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                      Cart ({cartCount})
                    </span>
                  </div>

                  {/* Step 1: Products (Visible at 20% progress) */}
                  {progressRatio >= 0.2 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="w-full h-20 rounded-lg bg-blue-100/60 mb-2 flex items-center justify-center text-blue-600 font-bold text-xs">
                          Product #01
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Custom Next.js App</h4>
                        <p className="text-[11px] font-mono text-blue-600 font-bold mt-0.5">₹4,999</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="w-full h-24 rounded-lg bg-indigo-100/60 mb-2 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          Product #02
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">E-Commerce Engine</h4>
                        <p className="text-[11px] font-mono text-blue-600 font-bold mt-0.5">₹12,999</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: GST Computation & Razorpay Session (Visible at 40% progress) */}
                  {progressRatio >= 0.4 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-blue-700 font-semibold block">GST B2B Tax Computation</span>
                        <span className="font-bold text-slate-900">Subtotal ₹4,999 + 18% GST (₹899.82)</span>
                      </div>
                      <span className="font-mono text-blue-700 font-extrabold text-xs">₹5,898.82</span>
                    </motion.div>
                  )}

                  {/* Step 3: Checkout Action (Visible at 70% progress) */}
                  {progressRatio >= 0.7 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="pt-2 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-slate-500 block text-[10px]">Razorpay Checkout</span>
                        <span className="font-bold text-slate-900">100% Verified GST Invoice</span>
                      </div>

                      <button
                        onClick={() => {
                          setCartCount((c) => c + 1);
                          setIsPaymentModalOpen(true);
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Simulate Razorpay Buy Now</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Payment Modal Simulation */}
                  {isPaymentModalOpen && (
                    <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-2 animate-in fade-in">
                      <div className="flex justify-between items-center text-emerald-950 font-bold">
                        <span>Razorpay Payment Verified</span>
                        <button onClick={() => setIsPaymentModalOpen(false)} className="text-emerald-700 font-bold text-xs">✕</button>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        Order #SA-9082 confirmed. GST Tax Invoice ₹4,999 (+ ₹900 GST) dispatched to WhatsApp.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 2. Cloud Microservices Dashboard Render */}
              {activeProject.id === 'cloud-apis' && (
                <motion.div
                  key="cloud-render"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <span className="font-extrabold text-slate-900 text-sm">Cloud Infrastructure Telemetry</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono border border-emerald-200">
                      99.99% Uptime
                    </span>
                  </div>

                  {/* Step 1: Rate Limiter Status (Visible at 25% progress) */}
                  {progressRatio >= 0.25 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="text-xl font-extrabold font-mono text-slate-900">8ms</div>
                        <div className="text-[10px] text-slate-500 font-medium">DB Latency</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="text-xl font-extrabold font-mono text-blue-600">50K/m</div>
                        <div className="text-[10px] text-slate-500 font-medium">API Requests</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="text-xl font-extrabold font-mono text-emerald-600">0%</div>
                        <div className="text-[10px] text-slate-500 font-medium">Error Rate</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Supabase & Redis Response (Visible at 65% progress) */}
                  {progressRatio >= 0.65 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-xs space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Live Traffic Stream</span>
                        <span className="text-emerald-400">Redis Edge Hit</span>
                      </div>
                      <div className="text-emerald-300 text-[11px]">GET /api/v1/session - 200 OK (7ms)</div>
                      <div className="text-blue-300 text-[11px]">POST /api/v1/auth/verify - 200 OK (9ms)</div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* 3. WhatsApp Cloud API Phone Simulator */}
              {activeProject.id === 'whatsapp-automation' && (
                <motion.div
                  key="whatsapp-render"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-emerald-950/5 p-4 rounded-2xl border border-emerald-200/80 shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-600" />
                      <span className="font-extrabold text-slate-900 text-sm">WhatsApp Cloud API Simulator</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                      Meta Verified
                    </span>
                  </div>

                  {/* Step 1: Endpoint & Payload Extraction (Visible at 20% progress) */}
                  {progressRatio >= 0.2 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-3 rounded-xl border border-emerald-200 text-xs font-mono space-y-1">
                      <div className="text-emerald-800 font-bold text-[11px]">POST /webhooks/order-dispatched</div>
                      <div className="text-slate-500 text-[10px]">
                        Extracted Payload: <span className="text-slate-800 font-bold">customerPhone, orderId, trackingUrl</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: WhatsApp Phone Message Bubble (Visible at 60% progress) */}
                  {progressRatio >= 0.6 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50/90 p-4 rounded-xl border border-emerald-200 space-y-3 max-w-sm mx-auto shadow-sm">
                      <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1 text-xs">
                        <div className="flex items-center justify-between text-emerald-900 font-bold text-[11px]">
                          <span>Shadow Arrow Automated Bot</span>
                          <span className="text-[10px] text-slate-400">Just Now</span>
                        </div>
                        <p className="text-slate-700 text-xs leading-relaxed">
                          Hi Rajiv! Your order <strong>#SA-9082</strong> has been dispatched. Track your delivery live or download your official GST B2B invoice.
                        </p>
                        <div className="pt-2 flex gap-2">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                            Track Package
                          </span>
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md font-bold text-[10px]">
                            GST Invoice PDF
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* 4. High-Converting Web Architecture */}
              {activeProject.id === 'web-landing' && (
                <motion.div
                  key="web-render"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-extrabold text-slate-900">Shadow Arrow Performance UI</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-mono font-bold border border-blue-200">
                      Lighthouse 99/100
                    </span>
                  </div>

                  {/* Step 1: Hero Banner Component (Visible at 30% progress) */}
                  {progressRatio >= 0.3 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                        Sub-Second Speeds
                      </span>
                      <h4 className="text-sm font-extrabold">Engineered for Maximum Conversions</h4>
                      <p className="text-[11px] text-blue-100">Clean architecture built with Next.js 14 and Tailwind CSS.</p>
                    </motion.div>
                  )}

                  {/* Step 2: Feature Grid & Pricing (Visible at 70% progress) */}
                  {progressRatio >= 0.7 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-bold">
                        &lt;FeatureGrid layout="bento" /&gt;
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-bold">
                        &lt;PricingCalculator /&gt;
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span className="font-semibold text-slate-600">Automated Live Showcase</span>
            <span className="text-blue-600 font-bold">100% Production Verified</span>
          </div>

        </div>

      </div>

    </motion.div>
  );
};

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
