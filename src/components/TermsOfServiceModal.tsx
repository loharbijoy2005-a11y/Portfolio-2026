import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, CheckCircle2, Scale } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight font-mono">
                  SHADOWARROW TERMS OF SERVICE
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  B2B Engineering Master Service Agreement (MSA) • Effective Date: September 2026
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Terms Body Content (~1200+ Words) */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans select-text">
            
            {/* Executive Summary Callout */}
            <div className="bg-indigo-50/80 border border-indigo-200 p-5 rounded-2xl space-y-2 text-indigo-950 font-medium">
              <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm">
                <Scale className="w-4 h-4 text-indigo-600" />
                <span>Contractual Governance & Transparent Engineering Commitment</span>
              </div>
              <p className="text-xs text-slate-700 leading-normal">
                These Master Terms of Service ("Agreement" or "Terms") govern all web engineering services, Next.js application development, API integrations, e-commerce builds, and retainer engagements provided by ShadowArrow Web Engineering ("ShadowArrow", "we", "us"), led by founder Bijoy Lohar. By commissioning a project, accepting a proposal, or initiating milestone payments, the client ("Client", "you") agrees to be bound by these transparent terms.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 text-xs flex items-center justify-center font-bold">1</span>
                <span>Scope of Work & Milestone Sprints</span>
              </h3>
              <p>
                Every project commences with a documented System Architecture Blueprint defining deliverables, technical specifications, and delivery target timelines:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">Business Starter Builds (1–2 Weeks):</strong> Custom responsive multi-page web applications, SEO optimization, contact forms, and WhatsApp integrations.</li>
                <li><strong className="text-slate-800">E-Commerce & Growth Engines (3–4 Weeks):</strong> Next.js store frontends, Razorpay/Stripe payment gateway integration, order webhook triggers, admin inventory dashboards, and automated 18% GST tax invoice generation.</li>
                <li><strong className="text-slate-800">Custom Full-Stack & SaaS (4–6 Weeks):</strong> Bespoke full-stack web platforms, database schema architecture (MongoDB/PostgreSQL/Supabase), RBAC authentication, and automated cloud deployments.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 text-xs flex items-center justify-center font-bold">2</span>
                <span>Affordable Investment, GST Invoicing & Milestone Payments</span>
              </h3>
              <p>
                ShadowArrow operates on a transparent, milestone-based escrow payment model structured to eliminate upfront risk for Indian businesses and global clients:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">30% Milestone 1 (Scope & Lock)</div>
                  <div className="text-xs text-slate-600">Deposit upon proposal approval, system architecture design, and Figma UI wireframe signoff.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">40% Milestone 2 (Staging Demo)</div>
                  <div className="text-xs text-slate-600">Due upon delivery of an interactive live staging URL demonstrating full frontend and API functionality.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">20% Milestone 3 (Vitals & Security)</div>
                  <div className="text-xs text-slate-600">Due after passing Lighthouse 95+ performance audits, OWASP security checks, and client UAT testing.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">10% Milestone 4 (Production & Handover)</div>
                  <div className="text-xs text-slate-600">Final payment upon live domain deployment, GitHub repo transfer, and 18% GST B2B Tax Credit Invoice issuance.</div>
                </div>
              </div>
              <p className="text-slate-600 pt-1">
                <strong className="text-slate-900">18% GST Input Tax Credit (ITC):</strong> As a registered corporate entity, ShadowArrow issues tax-compliant invoices allowing your business to deduct 100% of GST paid on corporate tax filings.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 text-xs flex items-center justify-center font-bold">3</span>
                <span>100% Intellectual Property (IP) Transfer & Code Handoff</span>
              </h3>
              <p>
                We believe in zero vendor lock-in. Upon final milestone payment receipt:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">Full Code Ownership:</strong> The client receives 100% unrestricted intellectual property ownership, copyright, and exclusive rights to all custom source code, components, and assets created for the project.</li>
                <li><strong className="text-slate-800">GitHub Repository Handoff:</strong> Complete GitHub repository ownership is transferred directly to your organization's GitHub account.</li>
                <li><strong className="text-slate-800">Third-Party Open Source Licenses:</strong> Standard open-source libraries (e.g. React, Next.js, Tailwind CSS) remain under their respective MIT/Apache licenses.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 text-xs flex items-center justify-center font-bold">4</span>
                <span>30-Day Post-Launch Warranty & SLA Guarantee</span>
              </h3>
              <p>
                Every project built by ShadowArrow includes an automated 30-day post-launch technical warranty starting on the date of live domain deployment:
              </p>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-2 font-mono text-xs">
                <div className="text-emerald-400 font-bold">✓ Free Bug Resolution for any functional errors deviating from agreed scope</div>
                <div className="text-emerald-400 font-bold">✓ Performance Guarantee: Lighthouse 95+ Core Web Vitals maintenance</div>
                <div className="text-emerald-400 font-bold">✓ Sub-Second Response Times (TTFB &lt; 200ms) on Edge Infrastructure</div>
                <div className="text-emerald-400 font-bold">✓ Direct Founder Escalation Channel via WhatsApp (+91 92427 25326)</div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 text-xs flex items-center justify-center font-bold">5</span>
                <span>Client Responsibilities & Scope Revisions</span>
              </h3>
              <p>
                To maintain our disciplined 3–4 week milestone cycle:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">Timely Approvals:</strong> Client shall provide feedback, content assets, and staging approvals within 3 business days of milestone submissions.</li>
                <li><strong className="text-slate-800">Scope Additions:</strong> Feature requests or major architectural alterations introduced after scope lock will be estimated separately under an addendum proposal without halting existing sprint milestones.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 text-xs flex items-center justify-center font-bold">6</span>
                <span>Limitation of Liability & Governing Law</span>
              </h3>
              <p>
                In no event shall ShadowArrow or founder Bijoy Lohar be liable for indirect, consequential, or special damages exceeding the total milestone fees paid by the client under the applicable project contract. This Agreement shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the competent courts of West Bengal, India.
              </p>
            </section>

          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Legally Binding B2B Master Service Terms</span>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Accept Terms of Service
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
