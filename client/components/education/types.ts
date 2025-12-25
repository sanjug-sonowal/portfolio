export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  cgpa?: string;
  icon?: string;
}

export interface EducationSectionProps {
  education?: Education[];
}

