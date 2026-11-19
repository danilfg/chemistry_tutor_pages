import React, { useState } from 'react';
import { ModeProvider } from '../components/landing/ModeContext';
import StickyHeader from '../components/landing/StickyHeader';
import HeroSection from '../components/landing/HeroSection';
import AudienceSection from '../components/landing/AudienceSection';
import WhyItWorksSection from '../components/landing/WhyItWorksSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import PricingSection from '../components/landing/PricingSection';
import FormatGuideSection from '../components/landing/FormatGuideSection';
import ReviewsSection from '../components/landing/ReviewsSection';
import AboutSection from '../components/landing/AboutSection';
import FAQSection from '../components/landing/FAQSection';
import ContactSection from '../components/landing/ContactSection';
import ReactionGameSection from '../components/landing/ReactionGameSection';
import ActivitySeriesSection from '../components/landing/ActivitySeriesSection';
import PeriodicTableSection from '../components/landing/PeriodicTableSection';
import MolarMassCalculator from '../components/landing/MolarMassCalculator';
import MixtureSeparationSection from '../components/landing/MixtureSeparationSection';
import Footer from '../components/landing/Footer';
import { ContentProvider } from '../components/landing/ContentContext';

export default function Landing() {
  const [selectedTariff, setSelectedTariff] = useState('');

  const handleSelectTariff = (tariffName) => {
    setSelectedTariff(tariffName);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ContentProvider>
      <ModeProvider>
        <div className="min-h-screen bg-background font-body">
          <StickyHeader />
          <HeroSection />
          <AudienceSection />
          <WhyItWorksSection />
          <HowItWorksSection />
          <PricingSection onSelectTariff={handleSelectTariff} />
          <FormatGuideSection />
          <ReactionGameSection />
          <ActivitySeriesSection />
          <PeriodicTableSection />
          <MolarMassCalculator />
          <MixtureSeparationSection />
          <ReviewsSection />
          <AboutSection />
          <FAQSection />
          <ContactSection selectedTariff={selectedTariff} />
          <Footer />
        </div>
      </ModeProvider>
    </ContentProvider>
  );
}
