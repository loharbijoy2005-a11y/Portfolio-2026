import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ESTIMATOR_MODULES, SERVICES_DATA } from '../data/portfolioData';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Mail, 
  PhoneCall
} from 'lucide-react';

interface CostEstimatorProps {
  preselectedServiceId?: string;
  preselectedTitle?: string;
}

export const CostEstimatorForm: React.FC<CostEstimatorProps> = ({ 
  preselectedServiceId,
  preselectedTitle 
}) => {
  const [selectedService, setSelectedService] = useState<string>(preselectedServiceId || 'fullstack-web');
  const [selectedModules, setSelectedModules] = useState<string[]>(['payment', 'gst-invoicing']);
  const [timeline, setTimeline] = useState<'standard' | 'fast'>('standard');
  const [businessType, setBusinessType] = useState<string>('B2B Enterprise');
  const [budgetRange, setBudgetRange] = useState<string>('₹1,00,000 - ₹2,50,000');
  
  // Form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedTitle) {
      setMessage(`Hi Bijoy, I am interested in building a solution similar to: ${preselectedTitle}.`);
    }
  }, [preselectedTitle]);

  // Calculate Base Cost
  const baseObj = SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];
  const baseCost = baseObj.baseEstimate;

  const availableModules = ESTIMATOR_MODULES.filter(
    (m) => m.serviceIds.includes(selectedService) || m.serviceIds.includes('all')
  );

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    const newAvailable = ESTIMATOR_MODULES.filter(
      (m) => m.serviceIds.includes(serviceId) || m.serviceIds.includes('all')
    );
    if (newAvailable.length >= 2) {
      setSelectedModules([newAvailable[0].id, newAvailable[1].id]);
    } else {
      setSelectedModules(newAvailable.map((m) => m.id));
    }
  };

  const modulesCost = selectedModules.reduce((acc, modId) => {
    const mod = ESTIMATOR_MODULES.find((m) => m.id === modId);
    return acc + (mod ? mod.cost : 0);
  }, 0);

  const subtotal = (baseCost + modulesCost) * (timeline === 'fast' ? 1.25 : 1);
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Bijoy Lohar! I'd like to discuss a project for ${company || 'my business'}.\n` +
    `Scope: ${baseObj.title}\n` +
    `Estimated Subtotal: ₹${Math.round(subtotal).toLocaleString('en-IN')}\n` +
    `Email: ${email}`
  );

  return (
    <section id="contact" className="py-24 bg-[#F8FAFC] border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Project Estimator & Inquiry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Start Your Project with Clear Pricing & Scope
          </h2>

          <p className="text-base text-slate-600">
            Use our live scope estimator to configure your requirements or send a direct inquiry to founder Bijoy Lohar.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Estimator Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8"
          >
            
            {/* Step 1: Select Service */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                1. Select Primary Service Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_DATA.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleServiceSelect(s.id)}
                    className={`p-4 rounded-xl text-left border transition-all text-xs ${
                      selectedService === s.id
                        ? 'bg-blue-50/80 border-blue-600 text-blue-900 font-bold shadow-xs ring-1 ring-blue-500'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 mb-1">{s.title}</div>
                    <div className="text-[11px] text-slate-500 font-normal line-clamp-1">{s.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Add-on Modules */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  2. Optional Architectural Modules
                </label>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70 self-start sm:self-auto">
                  Tailored for {baseObj.title}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableModules.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isChecked
                          ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 pr-2 min-w-0">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="leading-tight font-medium truncate text-slate-900">{mod.name}</span>
                          {mod.description && (
                            <span className="text-[10px] text-slate-500 font-normal truncate mt-0.5">{mod.description}</span>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0 pl-1">+{mod.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline Track */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                3. Delivery Timeline Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimeline('standard')}
                  className={`p-4 rounded-xl border text-left text-xs ${
                    timeline === 'standard'
                      ? 'bg-blue-50 border-blue-600 font-bold text-blue-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900">Standard Pace (3-4 Weeks)</div>
                  <div className="text-[11px] text-slate-500 mt-1">Disciplined milestone engineering cycle</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTimeline('fast')}
                  className={`p-4 rounded-xl border text-left text-xs ${
                    timeline === 'fast'
                      ? 'bg-blue-50 border-blue-600 font-bold text-blue-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    Fast Track (1-2 Weeks) <span className="text-[10px] text-blue-600 font-normal">(+25%)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Priority dedicated engineering sprint</div>
                </button>
              </div>
            </div>

            {/* Live Calculation Display Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                <span className="text-slate-400">Estimated Scope Investment</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> GST Invoicing Included
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-xs text-slate-400">Subtotal (Excl. GST)</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    ₹{Math.round(subtotal).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">GST Component (18%)</div>
                  <div className="text-lg font-bold font-mono text-blue-400">
                    +₹{gstAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>Final Payable Invoice: ₹{grandTotal.toLocaleString('en-IN')}</span>
                <span className="text-slate-300 font-medium">B2B Net Cost: ₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
              </div>
            </div>

          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6"
          >
            
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Direct Founder Contact Form
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Expect a formal project proposal and call invitation within 4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">Inquiry Received!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{name}</strong>. Bijoy Lohar will review your estimated scope (₹{Math.round(subtotal).toLocaleString('en-IN')}) and email you at <strong>{email}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Submit Another Scope
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Work Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Business Type</label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="B2B Enterprise">B2B Corporate</option>
                      <option value="D2C E-Commerce">D2C Brand</option>
                      <option value="SaaS Startup">SaaS Startup</option>
                      <option value="Agency / White-Label">Agency / Studio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="₹75,000 - ₹1,50,000">₹75,000 - ₹1,50,000</option>
                    <option value="₹1,50,000 - ₹3,00,000">₹1,50,000 - ₹3,00,000</option>
                    <option value="₹3,00,000 - ₹5,00,000">₹3,00,000 - ₹5,00,000</option>
                    <option value="₹5,00,000+ Enterprise">₹5,00,000+ Enterprise Scope</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Project Details / Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your goals, existing stack, or target launch timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-blue-600/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry & Reserve Scope</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Quick Connect Alternative */}
                <div className="pt-2 text-center">
                  <a
                    href={`https://wa.me/919242725326?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Prefer Instant WhatsApp? Chat with Bijoy →</span>
                  </a>
                </div>

              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
