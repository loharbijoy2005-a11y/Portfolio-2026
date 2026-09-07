import type { ServiceItem, CaseStudy, ArchitectureLayer } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'fullstack-web',
    title: 'Custom Full-Stack Web Applications',
    category: 'Engineering & Cloud',
    description: 'High-speed, scalable web applications built with Next.js, React, and robust Node.js microservices. Designed for zero-latency user experiences and rock-solid reliability.',
    deliverables: [
      'Single Page & Multi-Page Next.js Apps',
      'REST & GraphQL API Microservices',
      'Role-Based Auth & Session Management',
      'CI/CD Automated Cloud Pipelines'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    iconName: 'Code2',
    highlightText: 'Sub-1s Page Load Benchmark',
    baseEstimate: 14999
  },
  {
    id: 'ecommerce-engine',
    title: 'E-Commerce & Checkout Engines',
    category: 'Monetization & Sales',
    description: 'Bespoke high-converting checkout systems with instant payment integrations (Razorpay, Stripe), automated GST tax calculation, stock synchronization, and customer analytics.',
    deliverables: [
      'Custom Razorpay / Stripe Payment Flows',
      'Automated GST B2B Invoice Generation',
      'Inventory Sync & Order Management',
      'Cart Abandonment Recovery Workflows'
    ],
    techStack: ['Next.js', 'Node.js', 'Razorpay API', 'Stripe', 'Redis', 'Tailwind CSS'],
    iconName: 'ShoppingBag',
    highlightText: '3.2x Average Checkout Conversion',
    baseEstimate: 19999
  },
  {
    id: 'saas-dashboard',
    title: 'Business SaaS & Internal Dashboards',
    category: 'Enterprise Systems',
    description: 'Custom admin control panels, real-time analytics portals, and workflow automation suites tailored to optimize operational efficiency for modern B2B businesses.',
    deliverables: [
      'Real-Time Analytics & Data Visualization',
      'Granular User Permissions & Audit Logs',
      'Automated PDF Report & Tax Generators',
      'Third-Party API & ERP Integrations'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js / Recharts', 'Express API'],
    iconName: 'LayoutDashboard',
    highlightText: 'Automated Operations & Workflows',
    baseEstimate: 24999
  },
  {
    id: 'perf-seo',
    title: 'Web Performance & Core Web Vitals Optimization',
    category: 'Optimization & Security',
    description: 'Refactoring legacy codebases to achieve 95+ Lighthouse scores, sub-second TTFB, bulletproof web security headers, and top organic search engine positioning.',
    deliverables: [
      'Lighthouse 95+ Core Web Vitals Guarantee',
      'Bundle Size & Image Compression Tuning',
      'Structured Data & Schema Markup',
      'OWASP Security Audit & CSRF/XSS Shields'
    ],
    techStack: ['Lighthouse', 'Next.js SSR/ISR', 'Cloudflare CDN', 'Web Vitals', 'Edge Workers'],
    iconName: 'Zap',
    highlightText: '99+ Core Web Vitals Score',
    baseEstimate: 7999
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'nexora-fintech',
    title: 'Nexora Financial: B2B Merchant Portal & Auto Tax Engine',
    client: 'Nexora Tech India Pvt Ltd',
    category: 'SaaS',
    summary: 'Engineered an ultra-fast B2B payment reconciliation dashboard processing over 50,000 monthly transactions with automated GST tax invoice generation and instant compliance reporting.',
    outcome: '3.4x Faster Settlement Cycles & 100% Tax Audit Pass Rate',
    metrics: [
      { label: 'Monthly GMV Processed', value: '₹6.8 Cr' },
      { label: 'Lighthouse Performance Score', value: '99/100' },
      { label: 'Average Page Load Time', value: '0.42s' }
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis'],
    architectureNotes: 'Leveraged Server-Side Rendering (SSR) with Edge Caching and PostgreSQL connection pooling to ensure instant database queries under peak loads.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demoUrl: '#',
    testimonial: {
      quote: 'Bijoy and the Shadow Arrow team delivered an enterprise-grade platform ahead of schedule. The GST tax automation feature alone saved our finance team 40+ hours per month.',
      author: 'Rajiv Sharma',
      role: 'CTO, Nexora Financial'
    }
  },
  {
    id: 'aura-crafts',
    title: 'AuraCrafts: Bespoke D2C E-Commerce Experience',
    client: 'AuraCrafts Luxury Goods',
    category: 'E-Commerce',
    summary: 'Transformed a sluggish legacy store into a lightning-fast custom headless e-commerce frontend with instant Razorpay checkout, dynamic currency switcher, and 1-click WhatsApp order confirmation.',
    outcome: '+184% Revenue Growth & 2.9% Higher Checkout Conversion',
    metrics: [
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Page Speed (Mobile)', value: '0.6s' },
      { label: 'Return Customer Rate', value: '38%' }
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Razorpay Webhooks', 'Stripe', 'Node API'],
    architectureNotes: 'Implemented incremental static regeneration (ISR) for 10,000+ product catalog items, ensuring 0ms static delivery via CDN Edge nodes.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: '#',
    testimonial: {
      quote: 'The checkout speed is phenomenal. Our customers love how effortless it is to purchase. Working with Bijoy was the best decision for our digital expansion.',
      author: 'Priya Mukherjee',
      role: 'Founder, AuraCrafts'
    }
  },
  {
    id: 'quantum-ops',
    title: 'QuantumOps: Logistics Fleet Command & Dispatch Engine',
    client: 'Quantum Logistics Corp',
    category: 'Dashboard',
    summary: 'Built a real-time web control room for fleet tracking, driver assignment, automated route calculations, and GST billing for multi-city freight operations.',
    outcome: '42% Reduction in Idle Dispatch Time & Zero Billing Discrepancies',
    metrics: [
      { label: 'Active Fleet Tracked', value: '1,200+' },
      { label: 'Realtime Latency', value: '<50ms' },
      { label: 'Monthly Invoices Generated', value: '15,000+' }
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Express', 'MongoDB'],
    architectureNotes: 'Utilized WebSockets for sub-100ms real-time vehicle coordinate updates alongside background queue workers for PDF invoice generation.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: '#',
    testimonial: {
      quote: 'Direct founder engineering makes a massive difference. Bijoy understood our complex logistics requirements immediately and delivered rock-solid software.',
      author: 'Vikram Sengupta',
      role: 'VP Operations, Quantum Logistics'
    }
  }
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'frontend',
    title: '01. High-Speed Frontend Engine',
    subtitle: 'Next.js 14 / React + TypeScript + Tailwind CSS',
    icon: 'Layout',
    techs: [
      { name: 'Next.js 14 App Router', desc: 'Server Components for zero-bundle rendering', icon: 'Zap' },
      { name: 'Tailwind CSS & Utility Specs', desc: 'Airy, modern design tokens with zero CSS bloat', icon: 'Palette' },
      { name: 'TypeScript Strict Mode', desc: 'Compile-time type safety preventing 99% runtime crashes', icon: 'ShieldCheck' }
    ],
    codeSnippet: `// High-Performance Next.js Server Component
export async function ProductCatalog({ categoryId }: { categoryId: string }) {
  const products = await fetchProducts(categoryId, { next: { revalidate: 3600 } });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}`,
    keyBenefits: ['Sub-1 second page load speed', 'Zero cumulative layout shift (CLS)', 'Automated SEO schema markup']
  },
  {
    id: 'backend',
    title: '02. Scalable Microservice APIs',
    subtitle: 'Node.js / Express / REST & GraphQL / Webhooks',
    icon: 'Server',
    techs: [
      { name: 'Node.js & Express / Fastify', desc: 'Asynchronous event loops built for thousands of concurrent requests', icon: 'Cpu' },
      { name: 'Razorpay & Stripe Webhook Hub', desc: 'Idempotent transaction processing with automated retries', icon: 'CreditCard' },
      { name: 'PostgreSQL & Prisma ORM', desc: 'ACID-compliant relational database schemas with strict migrations', icon: 'Database' }
    ],
    codeSnippet: `// Robust GST-Compliant Payment Verification Webhook
app.post('/api/webhooks/razorpay', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const isValid = verifySignature(req.body, signature, process.env.RAZORPAY_SECRET);
  
  if (!isValid) return res.status(400).json({ error: 'Invalid Signature' });
  
  const invoice = await createGSTInvoice(req.body.payload.payment.entity);
  await sendB2BTaxReceipt(invoice.customerEmail, invoice.pdfUrl);
  return res.status(200).json({ status: 'SUCCESS', invoiceId: invoice.id });
});`,
    keyBenefits: ['Idempotent payment webhooks', '99.9% uptime guaranteed', 'Automated GST B2B tax compliance']
  },
  {
    id: 'security',
    title: '03. Enterprise Security & Compliance',
    subtitle: 'GST Invoice Engine + Contract-Backed IP Ownership',
    icon: 'Lock',
    techs: [
      { name: 'Official GST Invoicing', desc: 'Official GST tax invoices issued for legal tax compliance', icon: 'FileText' },
      { name: 'OWASP Security Hardening', desc: 'CSRF protection, strict CORS, rate limiting, and sanitized inputs', icon: 'Shield' },
      { name: '100% IP Transfer Contract', desc: 'Full GitHub repository handoff with zero proprietary lock-in', icon: 'CheckCircle2' }
    ],
    codeSnippet: `// GST Billing & B2B Tax Invoice Spec
interface GSTInvoice {
  legalName: string;
  gstin: string; // e.g. 19ABCDE1234F1Z5
  subtotal: number;
  cgst: number; // 9%
  sgst: number; // 9%
  igst: number; // 18% for inter-state
  totalTax: number;
  grandTotal: number;
  inputTaxCreditAvailable: boolean;
}`,
    keyBenefits: ['Legally binding contract SLA', 'Full source code ownership', 'Verified GST tax invoicing']
  }
];

export const ESTIMATOR_MODULES = [
  { id: 'auth', name: 'Secure User Auth & RBAC', cost: 2500, time: '+3 Days' },
  { id: 'payment', name: 'Razorpay / Stripe Payment Engine', cost: 3500, time: '+4 Days' },
  { id: 'gst-invoicing', name: 'Automated GST B2B Invoicing', cost: 2999, time: '+3 Days' },
  { id: 'admin-dash', name: 'Custom Admin Dashboard', cost: 4999, time: '+5 Days' },
  { id: 'seo-vitals', name: 'Lighthouse 95+ SEO Tuning', cost: 1999, time: '+2 Days' },
  { id: 'whatsapp-bot', name: 'WhatsApp Quick Connect & Notifications', cost: 1499, time: '+2 Days' }
];
