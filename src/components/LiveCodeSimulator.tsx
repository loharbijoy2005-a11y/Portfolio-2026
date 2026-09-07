import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  ShoppingBag, 
  CheckCircle2, 
  FileText, 
  Database, 
  Star,
  Activity
} from 'lucide-react';

interface Scenario {
  id: string;
  tabLabel: string;
  filename: string;
  language: string;
  code: string;
  outputTitle: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'frontend',
    tabLabel: 'Frontend Engine (Next.js / TS)',
    filename: 'ProductCard.tsx',
    language: 'TypeScript',
    code: `// Next.js 14 Server Component
export default async function ProductCard({ title, price }: Props) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md border hover:border-blue-500">
      <Badge text="99 Core Web Vitals" />
      <h3 className="font-bold">{title}</h3>
      <p className="text-blue-600 font-mono">₹{price}</p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        Add to Cart →
      </button>
    </div>
  );
}`,
    outputTitle: 'Live Rendered Next.js Component'
  },
  {
    id: 'backend',
    tabLabel: 'Backend & Payments (Node.js / Razorpay)',
    filename: 'paymentRoute.ts',
    language: 'TypeScript',
    code: `// Razorpay Webhook & Order Verification Route
app.post('/api/checkout', async (req, res) => {
  const { amount, customerGstin } = req.body;
  const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR' });
  const invoice = await generateGSTInvoice(order.id, customerGstin);
  return res.json({ status: 'SUCCESS', orderId: order.id, invoiceUrl: invoice.pdf });
});`,
    outputTitle: 'Live Payment & Webhook Sandbox'
  },
  {
    id: 'gst',
    tabLabel: 'Tax Compliance (GST Calculator)',
    filename: 'gstCalculator.ts',
    language: 'TypeScript',
    code: `// Official B2B GST Invoicing & Tax Computation
export function computeGSTInvoice(subtotal: number, isInterstate: boolean) {
  const cgst = isInterstate ? 0 : subtotal * 0.09;
  const sgst = isInterstate ? 0 : subtotal * 0.09;
  const igst = isInterstate ? subtotal * 0.18 : 0;
  const itcClaim = subtotal * 0.18;
  return { subtotal, totalTax: cgst + sgst + igst, itcClaim, grandTotal: subtotal + itcClaim };
}`,
    outputTitle: 'Live Digital B2B Tax Invoice'
  },
  {
    id: 'database',
    tabLabel: 'Database & Cloud (Supabase / Redis)',
    filename: 'edgeCache.ts',
    language: 'TypeScript',
    code: `// Sub-10ms Edge Database Session & Cache Lookup
export async function getSession(userId: string) {
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) return JSON.parse(cached);
  const session = await supabase.from('users').select('*').eq('id', userId).single();
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(session));
  return session;
}`,
    outputTitle: 'Live Edge Database & Latency Sandbox'
  }
];

export const LiveCodeSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('frontend');
  const [typedCode, setTypedCode] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Typing effect runner
  useEffect(() => {
    setTypedCode('');
    setIsTyping(true);

    let charIndex = 0;
    const fullText = scenario.code;

    const interval = setInterval(() => {
      charIndex += 2;
      if (charIndex >= fullText.length) {
        setTypedCode(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedCode(fullText.substring(0, charIndex));
      }
    }, 15);

    return () => clearInterval(interval);
  }, [activeScenarioId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(scenario.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReplay = () => {
    setTypedCode('');
    setIsTyping(true);
    let charIndex = 0;
    const fullText = scenario.code;

    const interval = setInterval(() => {
      charIndex += 2;
      if (charIndex >= fullText.length) {
        setTypedCode(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedCode(fullText.substring(0, charIndex));
      }
    }, 15);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      
      {/* Top Scenario Tabs Header */}
      <div className="bg-slate-100/90 p-2 border-b border-slate-200 flex flex-wrap gap-1.5 items-center justify-between">
        
        <div className="flex flex-wrap gap-1">
          {SCENARIOS.map((s) => {
            const isSelected = s.id === activeScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveScenarioId(s.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCodeScenarioTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {s.id === 'frontend' && <Code2 className="w-3.5 h-3.5 text-blue-600" />}
                  {s.id === 'backend' && <Zap className="w-3.5 h-3.5 text-amber-500" />}
                  {s.id === 'gst' && <FileText className="w-3.5 h-3.5 text-emerald-600" />}
                  {s.id === 'database' && <Database className="w-3.5 h-3.5 text-indigo-600" />}
                  <span>{s.tabLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Replay & Copy */}
        <div className="flex items-center gap-2 pr-2">
          <button
            onClick={handleReplay}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-200/70 text-slate-600 border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Replay Code Typing"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTyping ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-200/70 text-slate-600 border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer relative"
            title="Copy Code"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

      </div>

      {/* Main Split-View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Side: Dark Terminal Code Editor Pane */}
        <div className="lg:col-span-7 bg-slate-950 text-slate-100 p-5 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 font-mono">
          
          <div>
            {/* Editor Window Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-slate-400 font-mono ml-2 text-[11px] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>{scenario.filename}</span>
                </span>
              </div>

              {/* Status Compiler Indicator */}
              <div className="flex items-center gap-2">
                {isTyping ? (
                  <span className="px-2.5 py-0.5 rounded bg-amber-900/50 text-amber-300 border border-amber-700/50 text-[10px] animate-pulse">
                    Typing & Compiling...
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 text-[10px]">
                    ✓ Status: 200 OK
                  </span>
                )}
              </div>
            </div>

            {/* Code Body with Blinking Cursor */}
            <div className="relative min-h-[220px]">
              <pre className="text-[11px] sm:text-xs text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono selection:bg-blue-600 selection:text-white">
                <code>{typedCode}</code>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-blue-400 ml-0.5 align-middle"
                  />
                )}
              </pre>
            </div>
          </div>

          {/* Code Footer */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>Language: {scenario.language}</span>
            <span className="text-emerald-400 font-bold">100% Strict TypeScript Compliant</span>
          </div>

        </div>

        {/* Right Side: Live Production Output Sandbox */}
        <div className="lg:col-span-5 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          
          <div>
            {/* Sandbox Header */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {scenario.outputTitle}
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold bg-white text-blue-700 px-2 py-0.5 rounded border border-slate-200">
                LIVE PRODUCTION
              </span>
            </div>

            {/* Output Sandbox Animated Content */}
            <div className="min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                
                {/* OUTPUT 1: Frontend Next.js Card */}
                {scenario.id === 'frontend' && (
                  <motion.div
                    key="frontend-out"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-lg space-y-4 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold border border-emerald-200 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>99 Core Web Vitals</span>
                      </span>
                      <div className="flex items-center text-amber-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[11px] text-slate-500 ml-1 font-bold">5.0</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900">Next.js 14 Speed Architecture</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Sub-second SSR edge static rendering</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">Package Price</span>
                        <span className="text-lg font-extrabold text-blue-600 font-mono">₹24,999</span>
                      </div>

                      <button
                        onClick={() => setCartCount(cartCount + 1)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart {cartCount > 0 ? `(${cartCount})` : '→'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* OUTPUT 2: Backend & Payments Sheet */}
                {scenario.id === 'backend' && (
                  <motion.div
                    key="backend-out"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-lg space-y-3.5 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 uppercase">
                        Payment Verified via Webhook
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900 mt-1">Payment Successful</h4>
                      <p className="text-2xl font-black font-mono text-blue-600">₹24,999</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <span className="text-slate-900 font-bold">#SA-9082</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Invoice Status:</span>
                        <span className="text-blue-600 font-bold">GST Invoice Sent</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* OUTPUT 3: GST Tax Invoice */}
                {scenario.id === 'gst' && (
                  <motion.div
                    key="gst-out"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-lg space-y-3 text-xs"
                  >
                    <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
                      <span>GST TAX INVOICE SPEC</span>
                      <span className="text-blue-600 font-mono">GSTIN: 19ABCDE1234F1Z5</span>
                    </div>

                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between text-slate-600">
                        <span>Custom Web Engineering Scope</span>
                        <span className="font-semibold text-slate-900">₹1,00,000</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>CGST (9%) + SGST (9%)</span>
                        <span className="font-semibold text-blue-600">+₹18,000</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 pt-1.5 border-t border-slate-200 text-sm">
                        <span>Grand Total Payable</span>
                        <span className="text-blue-700">₹1,18,000</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-950 font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Net B2B Tax Credit Claimed: <strong>-₹18,000</strong></span>
                    </div>
                  </motion.div>
                )}

                {/* OUTPUT 4: Database & Latency Graph */}
                {scenario.id === 'database' && (
                  <motion.div
                    key="database-out"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-lg space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900">Latency Benchmark</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold border border-emerald-200">
                        8ms (Pass)
                      </span>
                    </div>

                    <div className="bg-slate-900 text-slate-200 p-3 rounded-xl text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                      <span className="text-slate-500">// Response 200 OK</span>
                      <br />
                      &#123;
                      <br />
                      &nbsp;&nbsp;<span className="text-blue-400">"status"</span>: <span className="text-emerald-300">"200_OK"</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-blue-400">"latency"</span>: <span className="text-amber-300">"8ms"</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-blue-400">"cacheHit"</span>: <span className="text-purple-300">true</span>
                      <br />
                      &#125;
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 text-blue-600 font-semibold">
                        <Activity className="w-3 h-3 text-blue-600" /> Cloudflare Edge Node
                      </span>
                      <span>Sub-10ms Standard</span>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Output Sandbox Footer */}
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Sandbox State: Active</span>
            <span className="font-mono text-blue-600 font-bold">Shadow Arrow Verified</span>
          </div>

        </div>

      </div>

    </div>
  );
};
