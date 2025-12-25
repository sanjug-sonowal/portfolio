"use client";

import { PlatformCardComponent } from "./PlatformCard";
import type { ProblemSolvingSectionProps, PlatformCard } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

const platforms: PlatformCard[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    icon: "/icons/leetcodeicon.png",
    stats: {
      primary: "Top 54.32%",
      secondary: "400+ Solved",
    },
  },
  {
    id: "geeksforgeeks",
    name: "GeeksForGeeks",
    icon: "/icons/gfg.png",
    stats: {
      primary: "220 Solved",
      secondary: "Coding Score: 776",
    },
  },
  {
    id: "interviewbit",
    name: "InterviewBit",
    icon: "",
    stats: {
      primary: "1854+ (Master)",
      secondary: "560+ Solved",
    },
  },
  {
    id: "codestudio",
    name: "CodeStudio",
    icon: "",
    stats: {
      primary: "1854+ (Specialist)",
      secondary: "2000+ Solved",
    },
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    icon: "/icons/hackerrank.webp",
    stats: {
      primary: "300+ Solved",
      secondary: "Problem Solving",
    },
  },
  {
    id: "hackerearth",
    name: "HackerEarth",
    icon: "",
    stats: {
      primary: "1260+ Top 10%",
      secondary: "200+ Solved",
    },
  },
];


export function ProblemSolvingSection({ onPlatformClick }: ProblemSolvingSectionProps) {
  return (
    <div className="border-t border-dashed border-gray-300 pt-6">
      <h2 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-3`}>Problem Solving & DSA</h2>
      
      <div className="mb-3 p-2.5 rounded-xl bg-green-50 border border-green-200">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h3 className={`font-bold text-gray-900 ${TYPOGRAPHY.heading.small.class}`}>Key Highlights</h3>
        </div>
        <ul className={`space-y-1.5 ${TYPOGRAPHY.content.class} text-gray-700`}>
          <li className="flex items-start gap-1.5">
            <span className="text-green-600 mt-0.5">•</span>
            <span><strong>400+ Problems Solved</strong> Across Multiple Platforms</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-green-600 mt-0.5">•</span>
            <span><strong>Top 54.32%</strong> @LeetCode</span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform) => (
          <PlatformCardComponent
            key={platform.id}
            id={platform.id}
            name={platform.name}
            icon={platform.icon}
            stats={platform.stats}
            onClick={() => onPlatformClick(platform.id)}
          />
        ))}
      </div>
    </div>
  );
}

