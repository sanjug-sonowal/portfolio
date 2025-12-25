"use client";

import { useState } from "react";
import { SkillCategoryCard } from "./SkillCategoryCard";
import type { TechnicalSkillsSectionProps, SkillCategory } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

const skillCategories: SkillCategory[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    icon: (
      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    skills: ["C++", "Kotlin", "Java", "JavaScript"],
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: (
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    skills: ["React", "Android", "Jetpack Compose"],
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "backend",
    title: "Backend",
    icon: (
      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    skills: ["Spring Boot", "Node.js"],
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "databases",
    title: "Databases",
    icon: (
      <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    skills: ["MongoDB", "SQL", "PostgreSQL", "MySQL"],
    iconBgColor: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: (
      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    skills: ["RDS", "SNS", "S3", "EC2", "Firebase", "CI/CD"],
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "core-skills",
    title: "Core Skills",
    icon: (
      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
      </svg>
    ),
    skills: ["Data Structures & Algorithms", "Object-Oriented Design", "System Design", "SDLC", "API Development", "Performance Optimization", "Testing & Debugging"],
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    icon: (
      <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    ),
    skills: ["Problem Solving", "Collaboration", "Adaptability", "Communication"],
    iconBgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

export function TechnicalSkillsSection({ onSkillCategoryClick }: TechnicalSkillsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSkillCategoryClick("technical-skills");
  };

  return (
    <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900`}>Technical Skills</h3>
        <button
          onClick={handleExpandClick}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {skillCategories.map((category) => (
            <SkillCategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              icon={
                <div className={`w-6 h-6 rounded-lg ${category.iconBgColor} flex items-center justify-center`}>
                  {category.icon}
                </div>
              }
              skills={category.skills}
              iconBgColor={category.iconBgColor}
              iconColor={category.iconColor}
              onClick={() => onSkillCategoryClick(category.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

