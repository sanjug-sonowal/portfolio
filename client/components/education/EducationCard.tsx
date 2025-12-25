"use client";

import { TYPOGRAPHY } from "@/constants/typography";
import type { Education } from "./types";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="p-4 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
        <div className="mb-2 sm:mb-0 flex-1">
          {education.icon && (
            <img
              src={education.icon}
              alt={education.institution}
              className="w-6 h-6 shrink-0 mb-2"
            />
          )}
          <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-1`}>
            {education.institution}
          </h3>
          <p className={`${TYPOGRAPHY.content.class} font-semibold text-gray-700 mb-1`}>
            {education.degree}
          </p>
          {education.cgpa && (
            <p className={`${TYPOGRAPHY.content.class} text-gray-700`}>
              {education.cgpa}
            </p>
          )}
        </div>
        <div className={`${TYPOGRAPHY.content.class} text-gray-600 font-medium`}>
          <div>{education.duration}</div>
          <div>{education.location}</div>
        </div>
      </div>
    </div>
  );
}

