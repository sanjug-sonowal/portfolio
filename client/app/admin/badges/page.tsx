"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { VideoBadgeForm, ImageBadgeForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Badge } from "@/components/badges/types";

type TabType = "video" | "image";

export default function BadgesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("video");
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSubmit = (data: Badge) => {
    console.log("Badge data:", data);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen">
      <PageNavbar 
        showSearch={true}
        searchPlaceholder="Search badges..."
        onSearch={handleSearch}
      />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                Badges
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Add and manage your badges
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
                Add Badge
              </button>
            )}
          </div>

          {isAdding && (
            <>
              <div className="border-b border-white/30 mb-6">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("video")}
                    className={`
                      px-4 py-2 font-medium transition-all duration-300
                      ${TYPOGRAPHY.content.class}
                      ${
                        activeTab === "video"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    Video/GIF Badge
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("image")}
                    className={`
                      px-4 py-2 font-medium transition-all duration-300
                      ${TYPOGRAPHY.content.class}
                      ${
                        activeTab === "image"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    Image Badge
                  </button>
                </div>
              </div>

              <div className="border-t border-white/30 pt-6">
                {activeTab === "video" ? (
                  <VideoBadgeForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                  />
                ) : (
                  <ImageBadgeForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                  />
                )}
              </div>
            </>
          )}

          {!isAdding && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Click "Add Badge" to get started
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

