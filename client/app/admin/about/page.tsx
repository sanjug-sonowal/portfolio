"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { AboutForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { About } from "@/components/about/types";

export default function AboutPage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data: About) => {
    console.log("About data:", data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <PageNavbar title="About" description="Manage your about section content" />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                About
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Add and manage your about section content
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className={`
                  px-6 py-2.5 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700 transition-all duration-300
                  shadow-lg shadow-indigo-100
                  ${TYPOGRAPHY.content.class}
                `}
              >
                Edit About
              </button>
            )}
          </div>

          {isEditing && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <AboutForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          {!isEditing && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Click "Edit About" to update your about section
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

