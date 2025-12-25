"use client";

import { AboutIcon } from "../icons/AboutIcon";
import { ExperienceIcon } from "../icons/ExperienceIcon";
import { ImpactfulWorkIcon } from "../icons/ImpactfulWorkIcon";
import { SkillsIcon } from "../icons/SkillsIcon";
import { ProblemSolvingIcon } from "../icons/ProblemSolvingIcon";
import { TrophyIcon } from "../icons/TrophyIcon";
import { EducationIcon } from "../icons/EducationIcon";
import { CertificatesIcon } from "../icons/CertificatesIcon";
import type { NavItemConfig } from "./types";

export const navConfig: NavItemConfig[] = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    icon: () => null,
    type: "toggle",
    activeBackgroundColor: "#FFF5E6",
    iconColor: "#F97316",
    textColor: "#F97316",
  },
  {
    id: "about",
    label: "About",
    icon: AboutIcon,
    type: "regular",
    iconColor: "#3B82F6",
  },
  {
    id: "experience",
    label: "Experience",
    icon: ExperienceIcon,
    type: "regular",
    iconColor: "#9333EA",
  },
  {
    id: "projects",
    label: "Projects",
    icon: ImpactfulWorkIcon,
    type: "regular",
    activeBackgroundColor: "#E0F2FE",
    iconColor: "#F97316",
    textColor: "#0284C7",
  },
  {
    id: "skills",
    label: "Skills",
    icon: SkillsIcon,
    type: "regular",
    iconColor: "#22C55E",
  },
  {
    id: "problem-solving",
    label: "Problem Solving",
    icon: ProblemSolvingIcon,
    type: "regular",
    iconColor: "#9333EA",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: TrophyIcon,
    type: "regular",
    iconColor: "#F59E0B",
  },
  {
    id: "education",
    label: "Education",
    icon: EducationIcon,
    type: "regular",
    iconColor: "#EF4444",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: CertificatesIcon,
    type: "regular",
    iconColor: "#EC4899",
  },
];

