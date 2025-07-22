import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';

import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { EditModeControls } from '@/components/EditModeControls';
import { PinModal } from '@/components/PinModal';
import { useEditMode } from '@/hooks/useEditMode';
import { usePortfolioData } from '@/hooks/usePortfolioData';

const Index = () => {
  const { isEditMode, showPinModal, enterEditMode, exitEditMode, togglePinModal } = useEditMode();
  const { data, updateSection } = usePortfolioData();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection
        data={data.hero}
        isEditMode={isEditMode}
        onUpdate={(heroData) => updateSection('hero', heroData)}
      />

      <AboutSection
        data={data.about}
        isEditMode={isEditMode}
        onUpdate={(aboutData) => updateSection('about', aboutData)}
      />

      <PortfolioSection
        projects={data.projects}
        isEditMode={isEditMode}
        onUpdate={(projects) => updateSection('projects', projects)}
      />


      <ContactSection
        contactData={data.contact}
        isEditMode={isEditMode}
        onUpdate={(contactData) => updateSection('contact', contactData)}
      />

      <Footer
        socialData={data.social}
        isEditMode={isEditMode}
        onUpdate={(socialData) => updateSection('social', socialData)}
      />

      <EditModeControls
        isEditMode={isEditMode}
        onToggleEditMode={togglePinModal}
        onExitEditMode={exitEditMode}
      />

      <PinModal
        isOpen={showPinModal}
        onClose={togglePinModal}
        onSubmit={enterEditMode}
      />
    </div>
  );
};

export default Index;
