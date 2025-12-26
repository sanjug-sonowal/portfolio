"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { EducationForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Education } from "@/components/education/types";

export default function EducationPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | undefined>(undefined);
  const [educations, setEducations] = useState<Education[]>([]);

  const handleAddEducation = (education: Education) => {
    if (editingEducation) {
      setEducations((prev) =>
        prev.map((edu) => (edu.id === education.id ? education : edu))
      );
    } else {
      setEducations((prev) => [...prev, education]);
    }
    setShowForm(false);
    setEditingEducation(undefined);
  };

  const handleEditEducation = (education: Education) => {
    setEditingEducation(education);
    setShowForm(true);
  };

  const handleDeleteEducation = (id: string) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEducation(undefined);
  };

  return (
    <div className="min-h-screen">
      <PageNavbar title="Education" description="Manage your education details" />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                Education
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Add and manage your educational background
              </p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className={`
                  px-6 py-2.5 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700 transition-all duration-300
                  shadow-lg shadow-indigo-100
                  ${TYPOGRAPHY.content.class}
                `}
              >
                Add Education
              </button>
            )}
          </div>

          {showForm && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <EducationForm
                initialData={editingEducation}
                onSubmit={handleAddEducation}
                onCancel={handleCancel}
              />
            </div>
          )}

          {!showForm && educations.length === 0 && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Click "Add Education" to get started
              </p>
            </div>
          )}

          {!showForm && educations.length > 0 && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-4`}>
                Education Entries
              </h3>
              <div className="space-y-4">
                {educations.map((education) => (
                  <div
                    key={education.id}
                    className="p-4 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="mb-2 sm:mb-0 flex-1">
                        {education.icon && (
                          <img
                            src={education.icon}
                            alt={education.institution}
                            className="w-6 h-6 shrink-0 mb-2"
                          />
                        )}
                        <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-1`}>
                          {education.institution}
                        </h3>
                        <p className={`${TYPOGRAPHY.content.class} font-semibold text-gray-700 mb-1`}>
                          {education.degree}
                        </p>
                        {education.cgpa && (
                          <p className={`${TYPOGRAPHY.content.class} text-gray-700`}>
                            {education.cgpa}
                          </p>
                        )}
                      </div>
                      <div className={`${TYPOGRAPHY.content.class} text-gray-600 font-medium`}>
                        <div>{education.duration}</div>
                        <div>{education.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleEditEducation(education)}
                        className={`
                          px-4 py-2 rounded-lg
                          bg-indigo-100 text-indigo-700 font-medium
                          hover:bg-indigo-200 transition-all duration-300
                          ${TYPOGRAPHY.content.class}
                        `}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(education.id)}
                        className={`
                          px-4 py-2 rounded-lg
                          bg-red-100 text-red-700 font-medium
                          hover:bg-red-200 transition-all duration-300
                          ${TYPOGRAPHY.content.class}
                        `}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
