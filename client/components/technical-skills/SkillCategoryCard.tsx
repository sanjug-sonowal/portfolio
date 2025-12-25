"use client";

import { TYPOGRAPHY } from "@/constants/typography";

interface SkillCategoryCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
  iconBgColor: string;
  iconColor: string;
  onClick: () => void;
}

export function SkillCategoryCard({
  title,
  icon,
  skills,
  onClick,
}: SkillCategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-3 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm cursor-pointer hover:bg-white/70 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
            {icon}
          </div>
          <h4 className={`font-semibold text-gray-900 ${TYPOGRAPHY.heading.small.class}`}>{title}</h4>
        </div>
        <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-lg bg-gray-100 text-gray-700 ${TYPOGRAPHY.content.class}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

