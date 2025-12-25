"use client";

interface TechnicalSkillsContentProps {
  categoryId?: string;
}

export function TechnicalSkillsContent({ categoryId }: TechnicalSkillsContentProps) {
  const categoryNames: Record<string, string> = {
    "programming-languages": "Programming Languages",
    "frameworks-tools": "Frameworks & Tools",
    "core-skills": "Core Skills",
    "cloud-devops": "Cloud & DevOps",
  };

  const categoryName = categoryId ? categoryNames[categoryId] || categoryId : "Technical Skills";

  return (
    <div className="space-y-4">
      <p>Content for {categoryName} will go here.</p>
    </div>
  );
}

