"use client";

import { useState } from "react";
import { TextInput, TagsInput, ImageUpload, Dropdown } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { SkillCategory } from "@/components/technical-skills/types";

export interface SkillCategoryFormProps {
  initialData?: SkillCategory;
  onSubmit: (data: SkillCategory) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const colorOptions = [
  { value: "bg-purple-100", label: "Purple" },
  { value: "bg-blue-100", label: "Blue" },
  { value: "bg-indigo-100", label: "Indigo" },
  { value: "bg-teal-100", label: "Teal" },
  { value: "bg-orange-100", label: "Orange" },
  { value: "bg-green-100", label: "Green" },
  { value: "bg-pink-100", label: "Pink" },
  { value: "bg-red-100", label: "Red" },
  { value: "bg-yellow-100", label: "Yellow" },
  { value: "bg-gray-100", label: "Gray" },
  { value: "bg-cyan-100", label: "Cyan" },
  { value: "bg-amber-100", label: "Amber" },
  { value: "bg-emerald-100", label: "Emerald" },
  { value: "bg-violet-100", label: "Violet" },
  { value: "bg-rose-100", label: "Rose" },
  { value: "bg-sky-100", label: "Sky" },
  { value: "bg-lime-100", label: "Lime" },
  { value: "bg-fuchsia-100", label: "Fuchsia" },
];

const textColorOptions = [
  { value: "text-purple-600", label: "Purple" },
  { value: "text-blue-600", label: "Blue" },
  { value: "text-indigo-600", label: "Indigo" },
  { value: "text-teal-600", label: "Teal" },
  { value: "text-orange-600", label: "Orange" },
  { value: "text-green-600", label: "Green" },
  { value: "text-pink-600", label: "Pink" },
  { value: "text-red-600", label: "Red" },
  { value: "text-yellow-600", label: "Yellow" },
  { value: "text-gray-600", label: "Gray" },
  { value: "text-cyan-600", label: "Cyan" },
  { value: "text-amber-600", label: "Amber" },
  { value: "text-emerald-600", label: "Emerald" },
  { value: "text-violet-600", label: "Violet" },
  { value: "text-rose-600", label: "Rose" },
  { value: "text-sky-600", label: "Sky" },
  { value: "text-lime-600", label: "Lime" },
  { value: "text-fuchsia-600", label: "Fuchsia" },
];

export function SkillCategoryForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: SkillCategoryFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconBgColor, setIconBgColor] = useState(initialData?.iconBgColor || "bg-purple-100");
  const [iconColor, setIconColor] = useState(initialData?.iconColor || "text-purple-600");

  const [errors, setErrors] = useState<{
    title?: string;
    skills?: string;
    icon?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; skills?: string; icon?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const categoryData: SkillCategory = {
        id: initialData?.id || `skill-category-${Date.now()}`,
        title: title.trim(),
        icon: iconFile || (initialData?.icon as string) || "",
        skills,
        iconBgColor,
        iconColor,
      };

      onSubmit(categoryData);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
    if (errors.skills) {
      setErrors((prev) => ({ ...prev, skills: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Category Title"
        placeholder="e.g., Programming Languages"
        value={title}
        onChange={handleTitleChange}
        error={errors.title}
        required
        disabled={isLoading}
      />

      <TagsInput
        label="Skills"
        placeholder="Enter skill name and press Enter"
        value={skills}
        onChange={handleSkillsChange}
        error={errors.skills}
        required
        disabled={isLoading}
      />

      <ImageUpload
        label="Icon"
        accept="image/*"
        value={iconFile}
        onChange={setIconFile}
        error={errors.icon}
        disabled={isLoading}
        maxSizeMB={2}
      />

      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="Icon Background Color"
          value={iconBgColor}
          onChange={setIconBgColor}
          options={colorOptions}
          disabled={isLoading}
          maxVisibleItems={3}
        />

        <Dropdown
          label="Icon Text Color"
          value={iconColor}
          onChange={setIconColor}
          options={textColorOptions}
          disabled={isLoading}
          maxVisibleItems={3}
        />
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/30">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={`
              px-6 py-2.5 rounded-xl
              bg-white/50 border border-white/30
              text-gray-700 font-medium
              hover:bg-white/70 transition-all duration-300
              ${TYPOGRAPHY.content.class}
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-6 py-2.5 rounded-xl
            bg-indigo-600 text-white font-medium
            hover:bg-indigo-700 transition-all duration-300
            shadow-lg shadow-indigo-100
            ${TYPOGRAPHY.content.class}
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? "Saving..." : initialData ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  );
}

