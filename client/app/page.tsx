"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ProfileCard } from "@/components/profile";
import { LeetCodeBanner } from "@/components/leetcode-banner";
import { AboutSection } from "@/components/about/AboutSection";
import { ExperienceSection } from "@/components/experience";
import { ProjectsSection } from "@/components/projects";
import { AchievementsSection } from "@/components/achievements";
import { EducationSection } from "@/components/education";
import { ProblemSolvingSection } from "@/components/problem-solving/ProblemSolvingSection";
import { TechnicalSkillsSection } from "@/components/technical-skills/TechnicalSkillsSection";
import { ToolsSection } from "@/components/tools";
import { HeatMap } from "@/components/heatmap";
import { Footer } from "@/components/footer";
import { Sidebar, getSidebarTitle, renderSidebarContent } from "@/components/sidebar";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (itemId: string) => {
    const sidebarItems = ["certificates", "skills", "technical-skills"];
    
    if (sidebarItems.includes(itemId)) {
      const sidebarItemId = itemId === "skills" ? "technical-skills" : itemId;
      setSelectedItem(sidebarItemId);
      setIsModalOpen(true);
      return;
    }

    const sectionIds: Record<string, string> = {
      about: "about-section",
      experience: "experience-section",
      projects: "projects-section",
      achievements: "achievements-section",
      "problem-solving": "problem-solving-section",
      education: "education-section",
    };

    const sectionId = sectionIds[itemId];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem("");
  };

  return (
    <div className="min-h-screen bg-[#FEFBF6]">
      <Navbar activeItemId="projects" onItemClick={handleItemClick} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-6">
          <div className="space-y-6">
            <ProfileCard />
            <div className="pt-6">
              <LeetCodeBanner />
              <div className="flex flex-col lg:flex-row gap-4 mt-6">
                <div className="w-full lg:w-3/4">
                  <div id="about-section">
                    <AboutSection />
                  </div>
                  <div id="experience-section">
                    <ExperienceSection />
                  </div>
                  <div id="projects-section">
                    <ProjectsSection />
                  </div>
                  <div id="achievements-section">
                    <AchievementsSection />
                  </div>
                </div>
                <div className="w-full lg:w-1/4">
                  <div className="space-y-4">
                    <div id="problem-solving-section">
                      <ProblemSolvingSection onPlatformClick={handleItemClick} />
                    </div>
                    <TechnicalSkillsSection onSkillCategoryClick={handleItemClick} />
                    <ToolsSection />
                    <div id="education-section">
                      <EducationSection />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HeatMap />
            <Footer />
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedItem ? getSidebarTitle(selectedItem) : ""}
        content={selectedItem ? renderSidebarContent(selectedItem) : null}
      />
    </div>
  );
}
