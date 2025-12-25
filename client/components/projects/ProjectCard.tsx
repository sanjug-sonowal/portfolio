"use client";

import { TYPOGRAPHY } from "@/constants/typography";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="p-4 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm">
      <div className="mb-3">
        <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-2`}>
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 ${TYPOGRAPHY.content.class} font-medium italic`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.description && project.description.length > 0 && (
        <ul className="space-y-2">
          {project.description.map((point, index) => (
            <li key={index} className={`flex items-start gap-2 ${TYPOGRAPHY.content.class} text-gray-700`}>
              <span className="text-gray-400 mt-1.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

