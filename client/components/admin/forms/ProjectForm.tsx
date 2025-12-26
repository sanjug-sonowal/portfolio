"use client";

import { useState } from "react";
import { TextInput, Textarea, TagsInput } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Project } from "@/components/projects/types";

export interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Project) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [descriptionText, setDescriptionText] = useState(
    initialData?.description.join("\n") || ""
  );
  const [technologies, setTechnologies] = useState(initialData?.technologies || []);
  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Project, string>> = {};

    if (!title.trim()) {
      newErrors.title = "Project title is required";
    }

    const descriptionArray = descriptionText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (descriptionArray.length === 0) {
      newErrors.description = "At least one description point is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const projectData: Project = {
        id: initialData?.id || `project-${Date.now()}`,
        title: title.trim(),
        description: descriptionArray,
        technologies: technologies,
      };

      onSubmit(projectData);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescriptionText(value);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleTechnologiesChange = (tags: string[]) => {
    setTechnologies(tags);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Project Title"
        placeholder="e.g., Phone Guard+, Voice Changer"
        value={title}
        onChange={handleTitleChange}
        error={errors.title}
        required
        disabled={isLoading}
      />

      <Textarea
        label="Description"
        placeholder="Enter each description point on a new line (one per line)"
        value={descriptionText}
        onChange={handleDescriptionChange}
        error={errors.description}
        required
        rows={6}
        disabled={isLoading}
      />

      <TagsInput
        label="Technologies"
        placeholder="Type technology name and press Enter"
        value={technologies}
        onChange={handleTechnologiesChange}
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
          {isLoading ? "Saving..." : initialData ? "Update Project" : "Add Project"}
        </button>
      </div>
    </form>
  );
}

