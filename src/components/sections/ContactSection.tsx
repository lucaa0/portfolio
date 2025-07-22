import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EditableText } from '@/components/EditableText';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  contactData: {
    email: string;
    phone: string;
    location: string;
  };
  isEditMode: boolean;
  onUpdate: (data: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactData,
  isEditMode,
  onUpdate
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui potresti integrare un servizio di invio email come EmailJS
    toast({
      title: "Messaggio inviato!",
      description: "Ti risponderò al più presto.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Iniziamo a collaborare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hai un progetto in mente? Contattami per una consulenza gratuita.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Informazioni di contatto
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <EditableText
                    value={contactData.email}
                    onChange={(value) => onUpdate({ ...contactData, email: value })}
                    isEditing={isEditMode}
                    className="text-primary font-medium"
                    as="p"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <EditableText
                    value={contactData.phone}
                    onChange={(value) => onUpdate({ ...contactData, phone: value })}
                    isEditing={isEditMode}
                    className="text-primary font-medium"
                    as="p"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posizione</p>
                  <EditableText
                    value={contactData.location}
                    onChange={(value) => onUpdate({ ...contactData, location: value })}
                    isEditing={isEditMode}
                    className="text-primary font-medium"
                    as="p"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Oggetto</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Messaggio</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-accent"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Invia messaggio
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};