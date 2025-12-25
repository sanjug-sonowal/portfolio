"use client";

import type { AchievementsSectionProps, Achievement } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

const defaultAchievements: Achievement[] = [
  {
    id: "google-digital-garage",
    title: "Google Digital Garage Certification",
  },
  {
    id: "icsi-cnns",
    title: "ICSI / CNNS - Certified Network Security Specialist",
  },
  {
    id: "microsoft-ai",
    title: "Microsoft AI Classroom Series",
  },
  {
    id: "leetcode",
    title: "Solved 400+ problems on LeetCode, showcasing consistency and advanced algorithmic thinking.",
  },
];

export function AchievementsSection({ achievements = defaultAchievements }: AchievementsSectionProps) {
  return (
    <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
      <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-4`}>Achievements</h2>
      <ul className="space-y-2">
        {achievements.map((achievement) => (
          <li key={achievement.id} className={`flex items-start gap-2 ${TYPOGRAPHY.content.class} text-gray-700`}>
            <span className="text-gray-400 mt-1.5">•</span>
            <span>{achievement.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

