"use client";

import { useState } from "react";
import { Textarea } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { About } from "@/components/about/types";

export interface AboutFormProps {
  initialData?: About;
  onSubmit: (data: About) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function AboutForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: AboutFormProps) {
  const [paragraphsText, setParagraphsText] = useState(
    initialData?.paragraphs.join("\n\n") || ""
  );

  const [errors, setErrors] = useState<{ paragraphs?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { paragraphs?: string } = {};

    const paragraphsArray = paragraphsText
      .split("\n\n")
      .map((para) => para.trim())
      .filter((para) => para.length > 0);

    if (paragraphsArray.length === 0) {
      newErrors.paragraphs = "At least one paragraph is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const aboutData: About = {
        id: initialData?.id || `about-${Date.now()}`,
        paragraphs: paragraphsArray,
      };

      onSubmit(aboutData);
    }
  };

  const handleParagraphsChange = (value: string) => {
    setParagraphsText(value);
    if (errors.paragraphs) {
      setErrors((prev) => ({ ...prev, paragraphs: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Textarea
        label="About Content"
        placeholder="Enter each paragraph separated by a blank line (double line break)"
        value={paragraphsText}
        onChange={handleParagraphsChange}
        error={errors.paragraphs}
        required
        rows={12}
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
          {isLoading ? "Saving..." : initialData ? "Update About" : "Save About"}
        </button>
      </div>
    </form>
  );
}

