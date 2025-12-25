"use client";

import { ProjectCard } from "./ProjectCard";
import type { ProjectsSectionProps, Project } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

const defaultProjects: Project[] = [
  {
    id: "phone-guard",
    title: "Phone Guard+",
    technologies: ["Kotlin", "Android", "Jetpack Compose"],
    description: [
      "Developed a utility app to detect and remove duplicate photos, videos, and files, optimizing storage and performance.",
      "Integrated app management and contact tools within a modern, responsive UI.",
    ],
  },
  {
    id: "voice-changer",
    title: "Voice Changer",
    technologies: ["Kotlin", "Android Studio", "FakeYou API", "Audio Processing"],
    description: [
      "Built a real-time voice transformation app with pitch modulation and fun sound effects.",
      "Integrated the FakeYou API for AI-driven celebrity voice generation and dynamic audio synthesis.",
    ],
  },
];

export function ProjectsSection({ projects = defaultProjects }: ProjectsSectionProps) {
  return (
    <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
      <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-4`}>Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

