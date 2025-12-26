"use client";

import { useState } from "react";
import { PageNavbar } from "@/components/admin";
import { SkillCategoryForm } from "@/components/admin/forms";
import { TYPOGRAPHY } from "@/constants/typography";
import type { SkillCategory } from "@/components/technical-skills/types";

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSubmit = (data: SkillCategory) => {
    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingId ? data : cat))
      );
      setEditingId(null);
    } else {
      setCategories((prev) => [...prev, data]);
      setIsCreating(false);
    }
    console.log("Skill category data:", data);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const editingCategory = editingId
    ? categories.find((cat) => cat.id === editingId)
    : undefined;

  const filteredCategories = searchQuery
    ? categories.filter(
        (cat) =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : categories;

  return (
    <div className="min-h-screen">
      <PageNavbar
        title="Technical Skills"
        description="Manage your technical skill categories"
        showSearch={true}
        searchPlaceholder="Search skill categories..."
        onSearch={handleSearch}
      />

      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-1`}>
                Skill Categories
              </h2>
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                Add and manage technical skill categories
              </p>
            </div>
            {!isCreating && !editingId && (
              <button
                onClick={() => setIsCreating(true)}
                className={`
                  px-6 py-2.5 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700 transition-all duration-300
                  shadow-lg shadow-indigo-100
                  ${TYPOGRAPHY.content.class}
                `}
              >
                Add Category
              </button>
            )}
          </div>

          {(isCreating || editingId) && (
            <div className="border-t border-white/30 pt-6 mt-6 mb-6">
              <SkillCategoryForm
                initialData={editingCategory}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          {categories.length === 0 && !isCreating && !editingId && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                No skill categories yet. Click "Add Category" to create one.
              </p>
            </div>
          )}

          {filteredCategories.length > 0 && !isCreating && !editingId && (
            <div className="space-y-4 border-t border-white/30 pt-6 mt-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 rounded-xl bg-white/50 border border-white/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {category.icon && (
                        typeof category.icon === "string" ? (
                          <img
                            src={category.icon}
                            alt={category.title}
                            className={`w-8 h-8 rounded-lg ${category.iconBgColor} object-contain p-1`}
                          />
                        ) : category.icon instanceof File ? (
                          <img
                            src={URL.createObjectURL(category.icon)}
                            alt={category.title}
                            className={`w-8 h-8 rounded-lg ${category.iconBgColor} object-contain p-1`}
                          />
                        ) : null
                      )}
                      <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900`}>
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(category.id)}
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
                        onClick={() => handleDelete(category.id)}
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
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-lg bg-gray-100 text-gray-700 ${TYPOGRAPHY.content.class}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery && filteredCategories.length === 0 && !isCreating && !editingId && (
            <div className="text-center py-12 border-t border-white/30 mt-6">
              <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                No categories found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

