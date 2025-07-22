import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditableText } from '@/components/EditableText';

interface AboutSectionProps {
  data: {
    title: string;
    description: string;
    skills: string[];
  };
  isEditMode: boolean;
  onUpdate: (data: any) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  data,
  isEditMode,
  onUpdate
}) => {
  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const addSkill = () => {
    onUpdate({ ...data, skills: [...data.skills, 'Nuova skill'] });
  };

  const removeSkill = (index: number) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <EditableText
              value={data.title}
              onChange={(value) => onUpdate({ ...data, title: value })}
              isEditing={isEditMode}
              className="text-3xl md:text-4xl font-bold text-primary mb-6"
              as="h2"
            />
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <EditableText
                    value={data.description}
                    onChange={(value) => onUpdate({ ...data, description: value })}
                    isEditing={isEditMode}
                    className="text-lg text-muted-foreground leading-relaxed mb-6"
                    as="p"
                    multiline
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    Competenze principali
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="relative group">
                        <Badge 
                          variant="secondary" 
                          className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                        >
                          {isEditMode ? (
                            <EditableText
                              value={skill}
                              onChange={(value) => updateSkill(index, value)}
                              isEditing={isEditMode}
                              className="text-sm"
                              as="span"
                            />
                          ) : (
                            skill
                          )}
                        </Badge>
                        {isEditMode && (
                          <button
                            onClick={() => removeSkill(index)}
                            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditMode && (
                      <button
                        onClick={addSkill}
                        className="px-3 py-1 border-2 border-dashed border-accent/30 rounded-full text-accent hover:border-accent transition-colors"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};