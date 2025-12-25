"use client";

interface ProblemSolvingContentProps {
  platformId: string;
}

export function ProblemSolvingContent({ platformId }: ProblemSolvingContentProps) {
  const platformNames: Record<string, string> = {
    leetcode: "LeetCode",
    geeksforgeeks: "GeeksForGeeks",
    interviewbit: "InterviewBit",
    codestudio: "CodeStudio",
    hackerrank: "HackerRank",
    hackerearth: "HackerEarth",
  };

  const platformName = platformNames[platformId] || platformId;

  return (
    <div className="space-y-4">
      <p>Content for {platformName} will go here.</p>
    </div>
  );
}

