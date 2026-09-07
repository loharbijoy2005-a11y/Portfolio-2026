import React, { useState } from 'react';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { TechStackMarquee } from './components/TechStackMarquee';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { GitHubShowcase } from './components/GitHubShowcase';
import { TechArchitecture } from './components/TechArchitecture';
import { B2BTrustGST } from './components/B2BTrustGST';
import { PricingTiers } from './components/PricingTiers';
import { CostEstimatorForm } from './components/CostEstimatorForm';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { DiscoveryModal } from './components/DiscoveryModal';

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedCaseStudyTitle, setSelectedCaseStudyTitle] = useState<string | undefined>(undefined);

  const handleStartProject = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleStartProject();
  };

  const handleSelectForQuote = (title: string) => {
    setSelectedCaseStudyTitle(title);
    handleStartProject();
  };

  const handleSelectPricingTier = (_tierId: string, tierName: string, basePrice: number) => {
    setSelectedCaseStudyTitle(`Selected Pricing Package: ${tierName} (₹${basePrice.toLocaleString('en-IN')})`);
    handleStartProject();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-blue-100 selection:text-blue-900 font-sans relative overflow-x-hidden">
      
      {/* Drifting Ambient Background Blobs */}
      <BackgroundBlobs />

      {/* Sticky Blurred Navigation Header */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* High-Converting Hero */}
        <Hero
          onStartProject={handleStartProject}
          onExploreWork={handleExploreWork}
        />

        {/* Key Metrics & Stats Counter */}
        <Stats />

        {/* Tech Stack Infinite Marquee & Interactive Skill Matrix */}
        <TechStackMarquee />

        {/* Core Engineering Services Grid */}
        <Services onSelectService={handleSelectService} />

        {/* Featured Case Studies & Work */}
        <CaseStudies onSelectForQuote={handleSelectForQuote} />

        {/* Live GitHub Repositories Showcase */}
        <GitHubShowcase />

        {/* Clean System Architecture & Code Specs */}
        <TechArchitecture />

        {/* B2B Trust, 18% GST Tax Credit & Milestone Process */}
        <B2BTrustGST />

        {/* Revamped 3-Tier Transparent Pricing (INR + GST) */}
        <PricingTiers onSelectTier={handleSelectPricingTier} />

        {/* Interactive Scope Estimator & Contact Form */}
        <CostEstimatorForm
          preselectedServiceId={selectedServiceId}
          preselectedTitle={selectedCaseStudyTitle}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloating />

      {/* Direct Discovery Call Booking Modal */}
      <DiscoveryModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
};

export default App;
