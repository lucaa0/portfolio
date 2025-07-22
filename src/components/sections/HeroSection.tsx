import React from 'react';
import { Button } from '@/components/ui/button';
import { EditableText } from '@/components/EditableText';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-image.png';

interface HeroSectionProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  isEditMode: boolean;
  onUpdate: (data: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  isEditMode,
  onUpdate
}) => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Content with image and text side by side */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        {/* Rounded Square Hero Image */}
        <div className="mb-8 md:mb-0 md:mr-12 flex-shrink-0 flex items-center justify-center">
          <img
            src={heroImage}
            alt="Hero"
            className="w-96 h-96 object-contain drop-shadow-2xl"
          />
        </div>
        {/* Text Content */}
        <div className="max-w-2xl animate-fade-in">
          <EditableText
            value={data.subtitle}
            onChange={(value) => onUpdate({ ...data, subtitle: value })}
            isEditing={isEditMode}
            className="text-lg md:text-xl text-black mb-2 drop-shadow-lg"
            as="p"
          />
          <EditableText
            value={data.title}
            onChange={(value) => onUpdate({ ...data, title: value })}
            isEditing={isEditMode}
            className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight drop-shadow-xl"
            as="h1"
          />
          <EditableText
            value={data.description}
            onChange={(value) => onUpdate({ ...data, description: value })}
            isEditing={isEditMode}
            className="text-lg md:text-xl text-black mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
            as="p"
            multiline
          />
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="bg-gradient-primary hover:shadow-accent transform hover:scale-105 transition-all duration-300"
          >
            {isEditMode ? (
              <EditableText
                value={data.ctaText}
                onChange={(value) => onUpdate({ ...data, ctaText: value })}
                isEditing={isEditMode}
                className="text-white font-medium"
                as="span"
              />
            ) : (
              data.ctaText
            )}
          </Button>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};