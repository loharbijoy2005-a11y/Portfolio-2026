<div align="center">

  <h1>⚡ SHADOW ARROW ⚡</h1>
  <h3>High-Performance Web Engineering & Custom SaaS Studio</h3>

  <p align="center">
    <b>Engineered for Performance. Built for Business Growth.</b><br />
    Direct Founder-Led Engineering by <b>Bijoy Lohar</b> • GST Registered & Compliant
  </p>

  <p align="center">
    <a href="https://www.shadowarrow.in/"><b>🌐 Visit Live Platform »</b></a>
    •
    <a href="#-core-architecture--performance"><b>⚡ Performance Metrics</b></a>
    •
    <a href="#-tech-stack"><b>🛠️ Tech Stack</b></a>
    •
    <a href="#-quick-start"><b>🚀 Quick Start</b></a>
  </p>

  <!-- GitHub Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Next.js-14_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-v8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/GST-Verified_Invoice-10B981?style=for-the-badge&logo=shieldsdotio&logoColor=white" alt="GST Verified" />
  </p>

</div>

---

## 📌 Executive Summary

**Shadow Arrow** is a premier web engineering studio specializing in high-performance digital products, full-stack web applications, headless e-commerce engines, and enterprise SaaS platforms.

Led directly by founder **Bijoy Lohar**, every project bypasses traditional agency bloat to deliver sub-second page loads, pixel-perfect responsive UX, zero layout shift, and contract-backed delivery with official **GST-compliant invoicing**.

---

## 🔥 Key Highlights & Features

- **🚀 Sub-Second Page Speeds**: Core Web Vitals tuned to perfection (TTFB < 200ms, FCP < 0.3s, 99+ Lighthouse Score).
- **🎨 Modern Dark/Glassmorphic Aesthetics**: Custom cursor, interactive canvas mouse grid, ambient floating background blobs, framer-motion micro-interactions, and magnetic buttons.
- **📞 Direct Discovery Booking Modal**: 30-minute founder technical audit calendar slot picker with real-time backend inquiry sync.
- **🧮 Interactive Scope Estimator**: Dynamic B2B price calculator supporting INR currency formatting, net cost vs 18% GST tax breakdown, and instant scope reservation.
- **🛡️ GST Compliance & B2B Trust**: Official GST tax invoice breakdown, contract-backed milestones, and 100% intellectual property (IP) code handoff.
- **🔐 Anti-Inspect & Security Shield**: Production-grade client protection with anti-tamper safeguards and admin role security.
- **📱 100% Responsive Architecture**: Meticulously optimized layouts for Mobile (iOS & Android) and Desktop viewports.

---

## ⚡ Core Architecture & Performance

```
+-----------------------------------------------------------------------+
|                         SHADOW ARROW PLATFORM                         |
+-----------------------------------------------------------------------+
        |                                       |
        v                                       v
+-----------------------+               +-------------------------------+
|   CLIENT FRONTEND     |               |     ADMIN DASHBOARD SUITE     |
| • React 19 + Vite     |               | • Real-time Lead Analytics    |
| • Framer Motion FX    |               | • Inquiry Status Tracker      |
| • Lucide Vectors      |               | • Token Auth & Security Logs  |
+-----------------------+               +-------------------------------+
        |                                       |
        +-------------------+---------------+---+
                            |
                            v
            +-------------------------------+
            |      PERSISTENCE LAYER        |
            | • Supabase Cloud PostgreSQL   |
            | • Express / Node.js API       |
            | • LocalStorage Offline Cache  |
            +-------------------------------+
```

### 📊 Benchmark Metrics
- **Lighthouse Performance Score**: `99 / 100`
- **Time to First Byte (TTFB)**: `~140 ms`
- **First Contentful Paint (FCP)**: `0.28 s`
- **Cumulative Layout Shift (CLS)**: `0.001`

---

## 🛠️ Tech Stack Specs

| Layer | Technologies Deployed |
| :--- | :--- |
| **Frontend Core** | React 19, TypeScript (Strict), Vite 8, React Router v7 |
| **Styling & Design System** | Tailwind CSS v4, Custom CSS Tokens, Glassmorphism, Responsive Grid |
| **Animations & FX** | Framer Motion, HTML5 Canvas 2D Interactive Grid, Canvas Confetti |
| **Icons & Assets** | Lucide React Icons, Simple Icons CDN, Custom SVG Micro-assets |
| **Database & Storage** | Supabase (PostgreSQL), Express.js REST API, LocalStorage Cache |
| **Code Quality & Linting** | Oxlint, TypeScript Compiler `tsc -b` |

---

## 📂 Repository Structure

```
.
├── admin-dashboard/            # Independent Admin Control Center
│   ├── src/                    # Admin Dashboard React & TSX Files
│   ├── api/                    # Serverless API Handlers for Admin
│   └── vite.config.ts          # Vite Configuration for Dashboard
├── public/                     # Public Web Assets, Manifest & SEO
│   ├── favicon.svg             # Vector Logo Icon
│   ├── llms.txt                # AI Agent Crawling & Context File
│   ├── robots.txt              # Search Engine Crawler Guidance
│   └── sitemap.xml             # XML Sitemap Index
├── server/                     # Express.js Backend Server
│   └── server.js               # Node.js API Router
├── src/                        # Main Web Application Source
│   ├── components/             # Reusable UI & Interactive Components
│   │   ├── B2BTrustGST.tsx     # GST Verification & Subtotal Calculator
│   │   ├── CostEstimatorForm.tsx# Interactive Scope & Contact Form
│   │   ├── DiscoveryModal.tsx  # Direct Founder Call Booking Modal
│   │   ├── FounderBio.tsx      # Founder Bio & Philosophy Component
│   │   ├── Hero.tsx            # Hero Section with 3D Tilt Card
│   │   ├── Navbar.tsx          # Sticky Blurred Header Navigation
│   │   └── Footer.tsx          # WCAG Compliant Footer & Navigation
│   ├── lib/                    # Supabase & Inquiry Service Libraries
│   │   ├── inquiryService.ts   # Unified Multi-Layer Persistence Logic
│   │   └── supabase.ts         # Supabase Client Initialization
│   ├── App.tsx                 # Core Application Router
│   └── main.tsx                # Application Mounting Entry Point
├── index.html                  # HTML5 Entry Point with SEO & JSON-LD
├── package.json                # Project Dependencies & Build Scripts
└── vite.config.ts              # Main Vite Configuration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone Repository
```bash
git clone https://github.com/loharbijoy2005-a11y/Shadow-Arrow-Website.git
cd Shadow-Arrow-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build Production Bundle
```bash
npm run build
```

---

## 👤 Founder & Lead Engineering

<table align="center">
  <tr>
    <td align="center" width="150 font-weight="bold"">
      <img src="https://github.com/loharbijoy2005-a11y.png" width="120" height="120" style="border-radius:50%;" alt="Bijoy Lohar" /><br />
      <b>Bijoy Lohar</b>
    </td>
    <td>
      <b>Founder & Lead Full-Stack Engineer</b><br />
      Architecting custom web applications, SaaS platforms, and high-performance digital engines.<br /><br />
      📧 <b>Email:</b> <a href="mailto:support.shadowarrow@gmail.com">support.shadowarrow@gmail.com</a><br />
      🌐 <b>Website:</b> <a href="https://www.shadowarrow.in/">shadowarrow.in</a><br />
      🐙 <b>GitHub:</b> <a href="https://github.com/loharbijoy2005-a11y">@loharbijoy2005-a11y</a>
    </td>
  </tr>
</table>

---

## 📄 License & Compliance

© 2026 **Shadow Arrow**. Engineered by **Bijoy Lohar**. All rights reserved.  
Official B2B GST Registered & Tax Compliant Enterprise Studio.
