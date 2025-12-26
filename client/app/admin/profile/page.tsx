"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { ProfileForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Profile } from "@/components/profile/types";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data: Profile) => {
    console.log("Profile data:", data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <PageNavbar title="Profile" description="Manage your profile information" />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                Profile
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Manage your name, top percentage, and availability status
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
                Edit Profile
              </button>
            )}
          </div>

          {isEditing && (
            <div className="border-t border-white/30 pt-6 mt-6">
              <ProfileForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          {!isEditing && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Click "Edit Profile" to update your profile information
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

