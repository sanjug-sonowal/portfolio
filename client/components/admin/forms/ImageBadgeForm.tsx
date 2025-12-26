"use client";

import { useState } from "react";
import { TextInput, ImageUpload } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Badge } from "@/components/badges/types";

export interface ImageBadgeFormProps {
  initialData?: Badge;
  onSubmit: (data: Badge) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ImageBadgeForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ImageBadgeFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [imageFile, setImageFile] = useState<File | null>(
    initialData?.file instanceof File ? initialData.file : null
  );
  const [link, setLink] = useState(initialData?.link || "");
  const [errors, setErrors] = useState<Partial<Record<keyof Badge, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Badge, string>> = {};

    if (!title.trim()) {
      newErrors.title = "Badge title is required";
    }

    if (!imageFile && !initialData?.file && !link.trim()) {
      newErrors.file = "Either image file or link is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const badgeData: Badge = {
        id: initialData?.id || `image-badge-${Date.now()}`,
        title: title.trim(),
        type: "image",
        file: imageFile || initialData?.file || "",
        link: link.trim() || undefined,
      };

      onSubmit(badgeData);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const handleLinkChange = (value: string) => {
    setLink(value);
    if (errors.file && value.trim()) {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Badge Title"
        placeholder="e.g., LeetCode Badge, Achievement Badge"
        value={title}
        onChange={handleTitleChange}
        error={errors.title}
        required
        disabled={isLoading}
      />

      <ImageUpload
        label="Badge Image"
        accept="image/*"
        value={imageFile}
        onChange={handleImageChange}
        error={errors.file}
        disabled={isLoading}
        maxSizeMB={5}
      />

      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className={`${TYPOGRAPHY.content.class} text-gray-500`}>OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <TextInput
        label="Badge Link"
        placeholder="https://example.com/badge/... (optional, if no file uploaded)"
        value={link}
        onChange={handleLinkChange}
        type="url"
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
          {isLoading ? "Saving..." : initialData ? "Update Badge" : "Add Badge"}
        </button>
      </div>
    </form>
  );
}

