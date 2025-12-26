"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { AchievementForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Achievement } from "@/components/achievements/types";

export default function AchievementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>(undefined);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const handleAddAchievement = (achievement: Achievement) => {
    if (editingAchievement) {
      setAchievements((prev) =>
        prev.map((ach) => (ach.id === achievement.id ? achievement : ach))
      );
    } else {
      setAchievements((prev) => [...prev, achievement]);
    }
    setShowForm(false);
    setEditingAchievement(undefined);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDeleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((ach) => ach.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAchievement(undefined);
  };

  return (
    <div className="min-h-screen">
      <PageNavbar title="Achievements" description="Manage your achievements" />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                Achievements
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Add and manage your achievements
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
                Add Achievement
              </button>
            )}
          </div>

          {showForm && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <AchievementForm
                initialData={editingAchievement}
                onSubmit={handleAddAchievement}
                onCancel={handleCancel}
              />
            </div>
          )}

          {!showForm && achievements.length === 0 && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Click "Add Achievement" to get started
              </p>
            </div>
          )}

          {!showForm && achievements.length > 0 && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-4`}>
                Achievement Entries
              </h3>
              <ul className="space-y-3">
                {achievements.map((achievement) => (
                  <li
                    key={achievement.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-gray-400 mt-1.5">•</span>
                      <span className={`${TYPOGRAPHY.content.class} text-gray-700`}>
                        {achievement.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <button
                        onClick={() => handleEditAchievement(achievement)}
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
                        onClick={() => handleDeleteAchievement(achievement.id)}
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
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

