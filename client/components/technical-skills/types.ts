import type { ReactNode } from "react";

export interface SkillCategory {
  id: string;
  title: string;
  icon: ReactNode | File | string;
  skills: string[];
  iconBgColor: string;
  iconColor: string;
}

export interface TechnicalSkillsSectionProps {
  onSkillCategoryClick: (categoryId: string) => void;
}
