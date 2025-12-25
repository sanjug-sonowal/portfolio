export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

export interface ExperienceSectionProps {
  experiences?: Experience[];
}

