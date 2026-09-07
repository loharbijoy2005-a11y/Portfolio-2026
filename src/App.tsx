import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TechArchitecture } from './components/TechArchitecture';
import { B2BTrustGST } from './components/B2BTrustGST';
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* Sticky Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Section */}
      <Hero
        onStartProject={handleStartProject}
        onExploreWork={handleExploreWork}
      />

      {/* Trust Stats Bar */}
      <Stats />

      {/* Core Engineering Services */}
      <Services onSelectService={handleSelectService} />

      {/* Work & Featured Case Studies */}
      <CaseStudies onSelectForQuote={handleSelectForQuote} />

      {/* Clean Architecture & Tech Stack Showcase */}
      <TechArchitecture />

      {/* B2B Trust, GST 18% Tax Credit & Milestone Process */}
      <B2BTrustGST />

      {/* Interactive Project Estimator & Inquiry Form */}
      <CostEstimatorForm
        preselectedServiceId={selectedServiceId}
        preselectedTitle={selectedCaseStudyTitle}
      />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloating />

      {/* Discovery Call Booking Modal */}
      <DiscoveryModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
};

export default App;
