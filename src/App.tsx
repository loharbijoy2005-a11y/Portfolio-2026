import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CinematicSplash } from './components/CinematicSplash';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { InteractiveCanvasGrid } from './components/InteractiveCanvasGrid';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { FounderBio } from './components/FounderBio';
import { TechStackMarquee } from './components/TechStackMarquee';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TechArchitecture } from './components/TechArchitecture';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { B2BTrustGST } from './components/B2BTrustGST';
import { PricingTiers } from './components/PricingTiers';
import { CostEstimatorForm } from './components/CostEstimatorForm';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { DiscoveryModal } from './components/DiscoveryModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';

const sectionVariants = {
  hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedCaseStudyTitle, setSelectedCaseStudyTitle] = useState<string | undefined>(undefined);
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1714] selection:bg-blue-100 selection:text-blue-900 font-sans relative overflow-x-hidden">
      
      {/* Cinematic Splash Intro Preloader */}
      <CinematicSplash onComplete={() => setIsSplashActive(false)} />

      {/* Top Scroll Progress Indicator Bar */}
      <ScrollProgress />

      {/* Desktop Custom Ring Cursor */}
      <CustomCursor />

      {/* Interactive Mouse Dot Grid Canvas */}
      <InteractiveCanvasGrid />

      {/* Drifting Ambient Background Blobs */}
      <BackgroundBlobs />

      {/* Sticky Blurred Navigation Header */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Content Area */}
      <main className={`relative z-10 space-y-4 transition-opacity duration-500 ${isSplashActive ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Hero
            onStartProject={handleStartProject}
            onExploreWork={handleExploreWork}
          />
        </motion.div>

        {/* Stats Counter Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <Stats />
        </motion.div>

        {/* Founder positioning & Bio Snippet */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <FounderBio />
        </motion.div>

        {/* Tech Stack Dual Opposing Marquee & Interactive Skill Matrix */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <TechStackMarquee />
        </motion.div>

        {/* Core Engineering Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <Services onSelectService={handleSelectService} />
        </motion.div>

        {/* Featured Case Studies & Work */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <CaseStudies onSelectForQuote={handleSelectForQuote} />
        </motion.div>

        {/* Clean System Architecture & Code Specs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <TechArchitecture />
        </motion.div>

        {/* The 3-4 Week Production Journey Milestone Roadmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <MilestoneTimeline />
        </motion.div>

        {/* B2B Trust, 18% GST Tax Credit & Milestone Process */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <B2BTrustGST />
        </motion.div>

        {/* Revamped Transparent Affordable Pricing (INR + GST) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <PricingTiers onSelectTier={handleSelectPricingTier} />
        </motion.div>

        {/* Interactive Scope Estimator & Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <CostEstimatorForm
            preselectedServiceId={selectedServiceId}
            preselectedTitle={selectedCaseStudyTitle}
          />
        </motion.div>

      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloating />

      {/* Direct Discovery Call Booking Modal */}
      <DiscoveryModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Detailed Legal Privacy Policy Modal (~1200 Words) */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Detailed Legal Terms of Service Modal (~1200 Words) */}
      <TermsOfServiceModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />

    </div>
  );
};

export default App;
