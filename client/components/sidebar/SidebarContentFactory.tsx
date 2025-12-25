"use client";

import { ProblemSolvingContent } from "./content/ProblemSolvingContent";
import { TechnicalSkillsContent } from "./content/TechnicalSkillsContent";
import type { ReactNode } from "react";

interface SidebarContentFactoryProps {
  itemId: string;
}

const PROBLEM_SOLVING_PLATFORMS = [
  "leetcode",
  "geeksforgeeks",
  "interviewbit",
  "codestudio",
  "hackerrank",
  "hackerearth",
];

const TECHNICAL_SKILLS_CATEGORIES = [
  "programming-languages",
  "frameworks-tools",
  "core-skills",
  "cloud-devops",
  "technical-skills",
];

const getDisplayTitle = (itemId: string): string => {
  const platformNames: Record<string, string> = {
    leetcode: "LeetCode",
    geeksforgeeks: "GeeksForGeeks",
    interviewbit: "InterviewBit",
    codestudio: "CodeStudio",
    hackerrank: "HackerRank",
    hackerearth: "HackerEarth",
  };

  const categoryNames: Record<string, string> = {
    "programming-languages": "Programming Languages",
    "frameworks-tools": "Frameworks & Tools",
    "core-skills": "Core Skills",
    "cloud-devops": "Cloud & DevOps",
    "technical-skills": "Technical Skills",
  };

  const navItemNames: Record<string, string> = {
    certificates: "Certificates",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Technical Skills",
    "technical-skills": "Technical Skills",
    "problem-solving": "Problem Solving",
    achievements: "Achievements",
    education: "Education",
  };

  return platformNames[itemId] || categoryNames[itemId] || navItemNames[itemId] || itemId;
};

export function getSidebarTitle(itemId: string): string {
  return getDisplayTitle(itemId);
}

export function renderSidebarContent(itemId: string): ReactNode {
  if (PROBLEM_SOLVING_PLATFORMS.includes(itemId)) {
    return <ProblemSolvingContent platformId={itemId} />;
  }

  if (TECHNICAL_SKILLS_CATEGORIES.includes(itemId)) {
    return <TechnicalSkillsContent categoryId={itemId} />;
  }

  return <div>Content for {itemId} will go here.</div>;
}

