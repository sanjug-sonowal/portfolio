"use client";

import { useState, useMemo } from "react";
import { TextInput, Textarea, TagsInput, DateRangePicker } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Experience } from "@/components/experience/types";

export interface ExperienceFormProps {
  initialData?: Experience;
  onSubmit: (data: Experience) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const parseDuration = (duration: string) => {
  if (!duration) return { startMonth: "", startYear: "", endMonth: "", endYear: "", isPresent: false };
  
  const isPresent = duration.toLowerCase().includes("present");
  if (isPresent) {
    const match = duration.match(/(\w+)\s+(\d{4})\s+–\s+Present/i);
    if (match) {
      return {
        startMonth: match[1].slice(0, 3),
        startYear: match[2],
        endMonth: "",
        endYear: "",
        isPresent: true,
      };
    }
  }
  
  const match = duration.match(/(\w+)\s+(\d{4})\s+–\s+(\w+)\s+(\d{4})/i);
  if (match) {
    return {
      startMonth: match[1].slice(0, 3),
      startYear: match[2],
      endMonth: match[3].slice(0, 3),
      endYear: match[4],
      isPresent: false,
    };
  }
  
  return { startMonth: "", startYear: "", endMonth: "", endYear: "", isPresent: false };
};

const formatDuration = (startMonth: string, startYear: string, endMonth: string, endYear: string, isPresent: boolean): string => {
  if (!startMonth || !startYear) return "";
  if (isPresent) {
    return `${startMonth} ${startYear} – Present`;
  }
  if (!endMonth || !endYear) return "";
  return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
};

export function ExperienceForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ExperienceFormProps) {
  const parsedDuration = useMemo(() => parseDuration(initialData?.duration || ""), [initialData?.duration]);

  const [formData, setFormData] = useState<Omit<Experience, "id" | "duration">>({
    company: initialData?.company || "",
    role: initialData?.role || "",
    location: initialData?.location || "",
    description: initialData?.description || [],
    technologies: initialData?.technologies || [],
  });

  const [startMonth, setStartMonth] = useState(parsedDuration.startMonth);
  const [startYear, setStartYear] = useState(parsedDuration.startYear);
  const [endMonth, setEndMonth] = useState(parsedDuration.endMonth);
  const [endYear, setEndYear] = useState(parsedDuration.endYear);
  const [isPresent, setIsPresent] = useState(parsedDuration.isPresent);

  const [descriptionText, setDescriptionText] = useState(
    initialData?.description.join("\n") || ""
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Experience, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Experience, string>> = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!startMonth || !startYear) {
      newErrors.duration = "Start date is required";
    }

    if (!isPresent && (!endMonth || !endYear)) {
      newErrors.duration = "End date is required (or select Present)";
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
      const duration = formatDuration(startMonth, startYear, endMonth, endYear, isPresent);
      
      const experienceData: Experience = {
        id: initialData?.id || `experience-${Date.now()}`,
        company: formData.company.trim(),
        role: formData.role.trim(),
        duration,
        location: formData.location?.trim() || undefined,
        description: descriptionArray,
        technologies: formData.technologies && formData.technologies.length > 0 ? formData.technologies : undefined,
      };

      onSubmit(experienceData);
    }
  };

  const handleCompanyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, company: value }));
    if (errors.company) {
      setErrors((prev) => ({ ...prev, company: undefined }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: undefined }));
    }
  };

  const handleStartMonthChange = (value: string) => {
    setStartMonth(value);
    if (errors.duration) {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const handleStartYearChange = (value: string) => {
    setStartYear(value);
    if (errors.duration) {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const handleEndMonthChange = (value: string) => {
    setEndMonth(value);
    if (errors.duration) {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const handleEndYearChange = (value: string) => {
    setEndYear(value);
    if (errors.duration) {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const handleIsPresentChange = (value: boolean) => {
    setIsPresent(value);
    if (errors.duration) {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const handleLocationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, location: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setDescriptionText(value);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleTechnologiesChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, technologies: tags }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Company"
          placeholder="e.g., Candourootes Pvt. Ltd."
          value={formData.company}
          onChange={handleCompanyChange}
          error={errors.company}
          required
          disabled={isLoading}
        />

        <TextInput
          label="Role"
          placeholder="e.g., Software Engineer"
          value={formData.role}
          onChange={handleRoleChange}
          error={errors.role}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateRangePicker
          label="Duration"
          startMonth={startMonth}
          startYear={startYear}
          endMonth={endMonth}
          endYear={endYear}
          onStartMonthChange={handleStartMonthChange}
          onStartYearChange={handleStartYearChange}
          onEndMonthChange={handleEndMonthChange}
          onEndYearChange={handleEndYearChange}
          isEndDatePresent={isPresent}
          onIsPresentChange={handleIsPresentChange}
          error={errors.duration}
          required
          disabled={isLoading}
        />

        <TextInput
          label="Location"
          placeholder="e.g., Pune, India"
          value={formData.location || ""}
          onChange={handleLocationChange}
          disabled={isLoading}
        />
      </div>

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
        value={formData.technologies || []}
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
          {isLoading ? "Saving..." : initialData ? "Update Experience" : "Add Experience"}
        </button>
      </div>
    </form>
  );
}

