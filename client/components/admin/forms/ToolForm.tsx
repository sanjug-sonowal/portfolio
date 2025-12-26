"use client";

import { useState } from "react";
import { TextInput, ImageUpload } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Tool } from "@/components/tools/types";

export interface ToolFormProps {
  initialData?: Tool;
  onSubmit: (data: Tool) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ToolForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ToolFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [iconFile, setIconFile] = useState<File | null>(
    initialData?.icon instanceof File ? initialData.icon : null
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Tool, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Tool, string>> = {};

    if (!name.trim()) {
      newErrors.name = "Tool name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const toolData: Tool = {
        id: initialData?.id || `tool-${Date.now()}`,
        name: name.trim(),
        icon: iconFile || initialData?.icon || undefined,
      };

      onSubmit(toolData);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleIconChange = (file: File | null) => {
    setIconFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Tool Name"
        placeholder="e.g., Git, VS Code, GitHub"
        value={name}
        onChange={handleNameChange}
        error={errors.name}
        required
        disabled={isLoading}
      />

      <ImageUpload
        label="Tool Icon"
        accept="image/*"
        value={iconFile}
        onChange={handleIconChange}
        disabled={isLoading}
        maxSizeMB={2}
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
          {isLoading ? "Saving..." : initialData ? "Update Tool" : "Add Tool"}
        </button>
      </div>
    </form>
  );
}

