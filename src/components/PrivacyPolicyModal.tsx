import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight font-mono">
                  SHADOWARROW PRIVACY POLICY
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Official Legal Document • Effective Date: September 2026 • Compliant with DPDP Act 2023 & IT Act 2000
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

          {/* Scrollable Policy Body Content (~1200+ Words) */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans select-text">
            
            {/* Executive Summary Callout */}
            <div className="bg-blue-50/80 border border-blue-200 p-5 rounded-2xl space-y-2 text-blue-950 font-medium">
              <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Executive Summary & Confidentiality Guarantee</span>
              </div>
              <p className="text-xs text-slate-700 leading-normal">
                ShadowArrow Web Engineering ("ShadowArrow", "we", "us", "our"), led by founder Bijoy Lohar, operates with strict enterprise data protection standards. We respect your corporate and personal privacy. We do NOT sell, lease, monetize, or disclose your client data, source code, or business credentials to third-party data brokers. All client assets are protected under non-disclosure agreements (NDAs) and statutory Indian privacy frameworks.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-blue-600 text-xs flex items-center justify-center">1</span>
                <span>Information We Collect</span>
              </h3>
              <p>
                When you engage with ShadowArrow via our web platform (shadowarrow.in), discovery contact forms, project estimator tools, WhatsApp APIs, or direct founder communications, we collect specific information necessary for rendering engineering services and issuing legally valid 18% GST tax invoices:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">Identity & Business Details:</strong> Full Name, Business/Company Name, Corporate Address, GSTIN (GST Identification Number), Official Email Address, and Phone/WhatsApp Number.</li>
                <li><strong className="text-slate-800">Project Requirements & Technical Specifications:</strong> Architecture blueprints, source code repositories, API keys, database credentials provided for staging deployments, and design tokens.</li>
                <li><strong className="text-slate-800">Financial & Transaction Information:</strong> Payment transaction hashes, Razorpay/Stripe order identifiers, bank transfer records, and GST invoice billing records. (Note: Full credit card/banking credentials are processed directly via PCI-DSS Compliant Payment Gateways and are never stored on our servers).</li>
                <li><strong className="text-slate-800">Automated Analytics & Usage Metrics:</strong> IP addresses, browser types, referrer URLs, session duration, and device telemetry logged via secure server logs for cybersecurity audit trails.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-blue-600 text-xs flex items-center justify-center">2</span>
                <span>How We Use Your Information</span>
              </h3>
              <p>
                We use collected information strictly for operational, engineering, contractual, and tax compliance purposes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">Full-Stack Development</div>
                  <div className="text-xs text-slate-600">Building, testing, and deploying Next.js, Node.js, and database architectures as requested in your project scope.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">18% GST B2B Invoicing</div>
                  <div className="text-xs text-slate-600">Generating tax-compliant tax invoices enabling your business to claim 18% Input Tax Credit (ITC) with Indian GST authorities.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">Direct Founder Support</div>
                  <div className="text-xs text-slate-600">Facilitating direct communication with founder Bijoy Lohar regarding milestone updates, staging reviews, and SLA support.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs mb-1">Automated Notifications</div>
                  <div className="text-xs text-slate-600">Sending project status updates, payment confirmations, and deployment links via automated email and WhatsApp Cloud APIs.</div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-blue-600 text-xs flex items-center justify-center">3</span>
                <span>Source Code Confidentiality & IP Ownership</span>
              </h3>
              <p>
                All source code, database schemas, custom component logic, and proprietary business algorithms developed by ShadowArrow during an active milestone contract are strictly confidential:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">Complete IP Transfer:</strong> Upon 100% milestone payment completion, all Intellectual Property (IP), GitHub repositories, and copyright ownership are transferred to the client without restrictions.</li>
                <li><strong className="text-slate-800">Zero Code Re-use Guarantee:</strong> Proprietary business logic created for a client is never sold or reused for competing client builds.</li>
                <li><strong className="text-slate-800">NDA Enforceability:</strong> We execute bilateral Non-Disclosure Agreements (NDAs) prior to receiving sensitive staging access or API secrets.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-blue-600 text-xs flex items-center justify-center">4</span>
                <span>Data Security & Infrastructure Hardening</span>
              </h3>
              <p>
                ShadowArrow implements multi-layered security measures to protect data against unauthorized access, disclosure, alteration, or destruction:
              </p>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-2 font-mono text-xs">
                <div className="text-emerald-400 font-bold">✓ AES-256 Bit Encryption at Rest & SSL/TLS 1.3 in Transit</div>
                <div className="text-emerald-400 font-bold">✓ OWASP Security Hardening (CSRF, XSS, SQLi Protection)</div>
                <div className="text-emerald-400 font-bold">✓ Zero Local Credential Storage (Environment Secrets Managed via Vercel/AWS KMS)</div>
                <div className="text-emerald-400 font-bold">✓ Strict Role-Based Access Control (RBAC) across Staging Clusters</div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-blue-600 text-xs flex items-center justify-center">5</span>
                <span>Data Retention & Deletion Rights</span>
              </h3>
              <p>
                In compliance with the Digital Personal Data Protection Act 2023 (DPDP Act) and corporate tax record requirements:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">Tax Record Retention:</strong> GST billing records, tax invoices, and payment receipts are retained for 7 years as mandatory under Indian Goods and Services Tax Rules.</li>
                <li><strong className="text-slate-800">Staging Credentials Deletion:</strong> Temporary database credentials, SSH keys, and staging access tokens provided during development are permanently purged within 14 days of final production deployment handover.</li>
                <li><strong className="text-slate-800">Right to Erasure:</strong> Clients may request the deletion of non-statutory personal data by emailing support@shadowarrow.in.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-mono">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-blue-600 text-xs flex items-center justify-center">6</span>
                <span>Contact & Privacy Officer Desk</span>
              </h3>
              <p>
                If you have questions regarding this Privacy Policy, your statutory data rights, or NDA execution, please reach out to our desk:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1">
                <div><strong className="text-slate-900">Entity:</strong> ShadowArrow Web Engineering</div>
                <div><strong className="text-slate-900">Lead Officer:</strong> Bijoy Lohar (Founder & Lead Engineer)</div>
                <div><strong className="text-slate-900">Official Desk Email:</strong> support@shadowarrow.in</div>
                <div><strong className="text-slate-900">Direct WhatsApp:</strong> +91 92427 25326</div>
                <div><strong className="text-slate-900">Jurisdiction:</strong> India</div>
              </div>
            </section>

          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified 100% Compliant Privacy Standard</span>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
