export type BadgeType = "video" | "image";

export interface Badge {
  id: string;
  title: string;
  type: BadgeType;
  file: File | string;
  link?: string;
}

export interface BadgesSectionProps {
  badges?: Badge[];
}

