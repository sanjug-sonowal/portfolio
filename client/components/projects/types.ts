export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string[];
}

export interface ProjectsSectionProps {
  projects?: Project[];
}

