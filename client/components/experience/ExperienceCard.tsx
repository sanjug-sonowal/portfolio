"use client";

import type { Experience } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="p-4 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
        <div className="mb-2 sm:mb-0">
          <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900`}>{experience.role}</h3>
          <p className={`${TYPOGRAPHY.content.class} font-semibold text-gray-700`}>{experience.company}</p>
          {experience.location && (
            <p className={`${TYPOGRAPHY.content.class} text-gray-500`}>{experience.location}</p>
          )}
        </div>
        <div className={`${TYPOGRAPHY.content.class} text-gray-600 font-medium`}>{experience.duration}</div>
      </div>
      
      {experience.description && experience.description.length > 0 && (
        <ul className="space-y-2 mb-3">
          {experience.description.map((point, index) => (
            <li key={index} className={`flex items-start gap-2 ${TYPOGRAPHY.content.class} text-gray-700`}>
              <span className="text-gray-400 mt-1.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {experience.technologies && experience.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {experience.technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 ${TYPOGRAPHY.content.class} font-medium`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

