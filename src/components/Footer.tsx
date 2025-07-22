import React from 'react';
import { EditableText } from '@/components/EditableText';
import { Github, Linkedin } from 'lucide-react';

interface FooterProps {
  socialData: {
    github?: string;
    linkedin?: string;
  };
  isEditMode: boolean;
  onUpdate: (socialData: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  socialData,
  isEditMode,
  onUpdate
}) => {
  const updateSocial = (platform: string, value: string) => {
    onUpdate({ ...socialData, [platform]: value });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Rimaniamo in contatto
          </h3>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Seguimi sui social per rimanere aggiornato sui miei progetti.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex items-center">
            <Github className="w-5 h-5 mr-2" />
            {isEditMode ? (
              <EditableText
                value={socialData.github || ''}
                onChange={(value) => updateSocial('github', value)}
                isEditing={isEditMode}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                placeholder="URL GitHub"
              />
            ) : (
              socialData.github && (
                <a
                  href={socialData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )
            )}
          </div>
          
          <div className="flex items-center">
            <Linkedin className="w-5 h-5 mr-2" />
            {isEditMode ? (
              <EditableText
                value={socialData.linkedin || ''}
                onChange={(value) => updateSocial('linkedin', value)}
                isEditing={isEditMode}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                placeholder="URL LinkedIn"
              />
            ) : (
              socialData.linkedin && (
                <a
                  href={socialData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Portfolio. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};