"use client";

import { EducationCard } from "./EducationCard";
import type { EducationSectionProps, Education } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

const defaultEducation: Education[] = [
  {
    id: "chandigarh-university",
    institution: "Chandigarh University",
    degree: "Master of Computer Applications (MCA)",
    duration: "2022 – 2024",
    location: "Punjab, India",
    cgpa: "CGPA: 7.8",
  },
  {
    id: "ssr-college",
    institution: "SSR College of Arts, Commerce and Science",
    degree: "Bachelor of Computer Applications (BCA)",
    duration: "2018 – 2021",
    location: "Silvassa, India",
    cgpa: "79% (First Class with Distinction)",
  },
];

export function EducationSection({ education = defaultEducation }: EducationSectionProps) {
  return (
    <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
      <h2 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-3`}>Education</h2>
      <div className="space-y-3">
        {education.map((edu) => (
          <EducationCard key={edu.id} education={edu} />
        ))}
      </div>
    </div>
  );
}

