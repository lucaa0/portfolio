import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditableText } from '@/components/EditableText';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/hooks/usePortfolioData';
import project1 from '@/assets/ecom.png';
import project2 from '@/assets/aitrip.png';

interface PortfolioSectionProps {
  projects: Project[];
  isEditMode: boolean;
  onUpdate: (projects: Project[]) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  isEditMode,
  onUpdate
}) => {
  const projectImages = [project1, project2];

  const updateProject = (index: number, updatedProject: Project) => {
    const newProjects = [...projects];
    newProjects[index] = updatedProject;
    onUpdate(newProjects);
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies[techIndex] = value;
    onUpdate(newProjects);
  };

  const addTechnology = (projectIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies.push('Nuova tecnologia');
    onUpdate(newProjects);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies = newProjects[projectIndex].technologies.filter((_, i) => i !== techIndex);
    onUpdate(newProjects);
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            I miei progetti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selezione dei progetti più significativi che ho realizzato per i miei clienti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    {isEditMode ? (
                      <EditableText
                        value={project.image}
                        onChange={(value) => updateProject(index, { ...project, image: value })}
                        isEditing={isEditMode}
                        className="text-sm text-muted-foreground mb-2"
                        as="p"
                        placeholder="URL immagine"
                      />
                    ) : null}
                    <img
                      src={project.image.startsWith('/') ? projectImages[index] || projectImages[0] : project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <EditableText
                    value={project.title}
                    onChange={(value) => updateProject(index, { ...project, title: value })}
                    isEditing={isEditMode}
                    className="text-xl font-semibold text-primary mb-2"
                    as="h3"
                  />
                  <EditableText
                    value={project.description}
                    onChange={(value) => updateProject(index, { ...project, description: value })}
                    isEditing={isEditMode}
                    className="text-muted-foreground leading-relaxed"
                    as="p"
                    multiline
                  />
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="relative group/tech">
                        <Badge variant="outline" className="text-xs">
                          {isEditMode ? (
                            <EditableText
                              value={tech}
                              onChange={(value) => updateTechnology(index, techIndex, value)}
                              isEditing={isEditMode}
                              className="text-xs"
                              as="span"
                            />
                          ) : (
                            tech
                          )}
                        </Badge>
                        {isEditMode && (
                          <button
                            onClick={() => removeTechnology(index, techIndex)}
                            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover/tech:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditMode && (
                      <button
                        onClick={() => addTechnology(index)}
                        className="px-2 py-1 border border-dashed border-accent/30 rounded text-xs text-accent hover:border-accent transition-colors"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>

                {(project.link || isEditMode) && (
                  <div>
                    {isEditMode && (
                      <EditableText
                        value={project.link || ''}
                        onChange={(value) => updateProject(index, { ...project, link: value })}
                        isEditing={isEditMode}
                        className="text-sm text-muted-foreground mb-2"
                        as="p"
                        placeholder="URL progetto (opzionale)"
                      />
                    )}
                    {project.link && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group/btn"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                        Visualizza progetto
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};