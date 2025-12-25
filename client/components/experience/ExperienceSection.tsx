"use client";

import { ExperienceCard } from "./ExperienceCard";
import type { ExperienceSectionProps, Experience } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

const defaultExperiences: Experience[] = [
  {
    id: "candourootes",
    company: "Candourootes Pvt. Ltd.",
    role: "Software Engineer",
    duration: "Dec 2024 – Apr 2025",
    location: "Pune, India",
    description: [
      "Developed and optimized two HRMS mobile apps, \"WorkPlus HRMS\", automating payroll and attendance tracking to boost productivity by 90%",
      "Enhanced scalability and security using Kotlin, Java, Firebase, and REST APIs, reducing downtime by 30%",
    ],
    technologies: ["Kotlin", "Java", "Firebase", "REST APIs"],
  },
  {
    id: "unlock-technology",
    company: "Unlock Technology",
    role: "Sr. Android Developer",
    duration: "May 2024 – Sep 2024",
    location: "Mumbai, India",
    description: [
      "Led development of fintech apps including \"Digikhata\", \"Paypoint\", \"KYC App\", \"Distributor App\", and \"Retailer SDK\", enhancing functionality and stability",
      "Built secure AEPS and mATM systems, processing 200K+ monthly transactions and reducing fraud by 40%",
    ],
    technologies: ["Android", "Fintech", "AEPS", "mATM"],
  },
  {
    id: "mobibox",
    company: "Mobibox Softech Pvt. Ltd.",
    role: "Software Engineer (Full-time)",
    duration: "Mar 2022 – Oct 2023",
    location: "Vapi, India",
    description: [
      "Designed and deployed Android & iOS apps with Swift, SwiftUI, and Firebase, reducing crash rates by 30%",
      "Collaborated with design, backend, and QA teams to ensure 100% on-time delivery of high-quality products",
    ],
    technologies: ["Android", "iOS", "Swift", "SwiftUI", "Firebase"],
  },
];

export function ExperienceSection({ experiences = defaultExperiences }: ExperienceSectionProps) {
  return (
    <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
      <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-4`}>Experience</h2>
      <div className="space-y-4">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}

