"use client";

import { useState } from "react";
import { TextInput } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Achievement } from "@/components/achievements/types";

export interface AchievementFormProps {
  initialData?: Achievement;
  onSubmit: (data: Achievement) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function AchievementForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: AchievementFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");

  const [errors, setErrors] = useState<{
    title?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      title?: string;
    } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const achievementData: Achievement = {
        id: initialData?.id || `achievement-${Date.now()}`,
        title: title.trim(),
      };

      onSubmit(achievementData);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Achievement Title"
        placeholder="e.g., Google Digital Garage Certification"
        value={title}
        onChange={handleTitleChange}
        error={errors.title}
        required
        disabled={isLoading}
      />

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
          {isLoading ? "Saving..." : initialData ? "Update Achievement" : "Add Achievement"}
        </button>
      </div>
    </form>
  );
}

