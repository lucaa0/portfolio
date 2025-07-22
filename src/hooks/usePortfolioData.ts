import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}


export interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  about: {
    title: string;
    description: string;
    skills: string[];
  };
  projects: Project[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: {
    github?: string;
    linkedin?: string;
  };
}

const defaultData: PortfolioData = {
  hero: {
    title: "Web Developer & Designer",
    subtitle: "Ciao, sono Marco Rossi",
    description: "Creo soluzioni web moderne e performanti per aziende che vogliono distinguersi online. Specializzato in React, Node.js e design UX/UI.",
    ctaText: "Scopri i miei progetti"
  },
  about: {
    title: "Chi sono",
    description: "Sono un web developer con oltre 5 anni di esperienza nella creazione di applicazioni web moderne. Mi specializzo nello sviluppo full-stack con particolare attenzione all'esperienza utente e alle performance.",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Figma", "AWS", "GraphQL"]
  },
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Piattaforma e-commerce completa con sistema di pagamento integrato, gestione inventario e dashboard amministrativa.',
      image: '/src/assets/project-1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://example.com'
    },
    {
      id: '2',
      title: 'Corporate Website',
      description: 'Sito web aziendale responsive con CMS personalizzato per la gestione dei contenuti e SEO ottimizzato.',
      image: '/src/assets/project-2.jpg',
      technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS'],
      link: 'https://example.com'
    },
    {
      id: '3',
      title: 'Mobile App Dashboard',
      description: 'Dashboard amministrativa per app mobile con analytics in tempo reale e gestione utenti avanzata.',
      image: '/src/assets/project-3.jpg',
      technologies: ['React', 'Chart.js', 'Firebase', 'Material-UI'],
      link: 'https://example.com'
    }
  ],
  contact: {
    email: 'marco.rossi@email.com',
    phone: '+39 123 456 7890',
    location: 'Milano, Italia'
  },
  social: {
    github: 'https://github.com/marcorossi',
    linkedin: 'https://linkedin.com/in/marcorossi'
  }
};

const STORAGE_KEY = 'portfolio_data';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setData({ ...defaultData, ...parsedData });
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }
  }, []);

  const updateData = (newData: Partial<PortfolioData>) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  const updateSection = (section: keyof PortfolioData, sectionData: any) => {
    const updatedData = { ...data, [section]: sectionData };
    setData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  return {
    data,
    updateData,
    updateSection
  };
};