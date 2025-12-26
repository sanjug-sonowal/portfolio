"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { ExperienceForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Experience } from "@/components/experience/types";

export default function ExperiencesPage() {
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (data: Experience) => {
    console.log("Experience data:", data);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen">
      <PageNavbar title="Experiences" description="Manage your work experiences" />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                Experiences
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Add and manage your work experiences
              </p>
            </div>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className={`
                  px-6 py-2.5 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700 transition-all duration-300
                  shadow-lg shadow-indigo-100
                  ${TYPOGRAPHY.content.class}
                `}
              >
                Add Experience
              </button>
            )}
          </div>

          {isAdding && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <ExperienceForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          {!isAdding && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Click "Add Experience" to get started
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

