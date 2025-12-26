"use client";

import { useState, useMemo } from "react";
import { TextInput, DateRangePicker, ImageUpload } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Education } from "@/components/education/types";

export interface EducationFormProps {
  initialData?: Education;
  onSubmit: (data: Education) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const parseDuration = (duration: string) => {
  if (!duration) return { startMonth: "", startYear: "", endMonth: "", endYear: "", isPresent: false };
  
  const match = duration.match(/(\d{4})\s*–\s*(\d{4})/);
  if (match) {
    return {
      startMonth: "",
      startYear: match[1],
      endMonth: "",
      endYear: match[2],
      isPresent: false,
    };
  }
  
  return { startMonth: "", startYear: "", endMonth: "", endYear: "", isPresent: false };
};

const formatDuration = (startMonth: string, startYear: string, endMonth: string, endYear: string, isPresent: boolean): string => {
  if (!startYear) return "";
  if (isPresent) {
    return `${startMonth} ${startYear} – Present`;
  }
  if (!endYear) return "";
  return `${startYear} – ${endYear}`;
};

export function EducationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: EducationFormProps) {
  const parsedDuration = useMemo(() => parseDuration(initialData?.duration || ""), [initialData?.duration]);

  const [institution, setInstitution] = useState(initialData?.institution || "");
  const [degree, setDegree] = useState(initialData?.degree || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [cgpa, setCgpa] = useState(initialData?.cgpa || "");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [startMonth, setStartMonth] = useState(parsedDuration.startMonth || "");
  const [startYear, setStartYear] = useState(parsedDuration.startYear || "");
  const [endMonth, setEndMonth] = useState(parsedDuration.endMonth || "");
  const [endYear, setEndYear] = useState(parsedDuration.endYear || "");
  const [isPresent, setIsPresent] = useState(parsedDuration.isPresent || false);

  const [errors, setErrors] = useState<{
    institution?: string;
    degree?: string;
    location?: string;
    startYear?: string;
    endYear?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      institution?: string;
      degree?: string;
      location?: string;
      startYear?: string;
      endYear?: string;
    } = {};

    if (!institution.trim()) {
      newErrors.institution = "Institution is required";
    }

    if (!degree.trim()) {
      newErrors.degree = "Degree is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!startYear) {
      newErrors.startYear = "Start year is required";
    }

    if (!isPresent && !endYear) {
      newErrors.endYear = "End year is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const duration = formatDuration(startMonth, startYear, endMonth, endYear, isPresent);
      const educationData: Education = {
        id: initialData?.id || `education-${Date.now()}`,
        institution: institution.trim(),
        degree: degree.trim(),
        location: location.trim(),
        duration,
        ...(cgpa.trim() && { cgpa: cgpa.trim() }),
        ...(iconFile && { icon: URL.createObjectURL(iconFile) }),
        ...(initialData?.icon && !iconFile && { icon: initialData.icon }),
      };

      onSubmit(educationData);
    }
  };

  const handleInstitutionChange = (value: string) => {
    setInstitution(value);
    if (errors.institution) {
      setErrors((prev) => ({ ...prev, institution: undefined }));
    }
  };

  const handleDegreeChange = (value: string) => {
    setDegree(value);
    if (errors.degree) {
      setErrors((prev) => ({ ...prev, degree: undefined }));
    }
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: undefined }));
    }
  };

  const handleStartYearChange = (value: string) => {
    setStartYear(value);
    if (errors.startYear) {
      setErrors((prev) => ({ ...prev, startYear: undefined }));
    }
  };

  const handleEndYearChange = (value: string) => {
    setEndYear(value);
    if (errors.endYear) {
      setErrors((prev) => ({ ...prev, endYear: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Institution"
        placeholder="e.g., Chandigarh University"
        value={institution}
        onChange={handleInstitutionChange}
        error={errors.institution}
        required
        disabled={isLoading}
      />

      <TextInput
        label="Degree"
        placeholder="e.g., Master of Computer Applications (MCA)"
        value={degree}
        onChange={handleDegreeChange}
        error={errors.degree}
        required
        disabled={isLoading}
      />

      <TextInput
        label="Location"
        placeholder="e.g., Punjab, India"
        value={location}
        onChange={handleLocationChange}
        error={errors.location}
        required
        disabled={isLoading}
      />

      <DateRangePicker
        label="Duration"
        startMonth={startMonth}
        startYear={startYear}
        endMonth={endMonth}
        endYear={endYear}
        onStartMonthChange={setStartMonth}
        onStartYearChange={handleStartYearChange}
        onEndMonthChange={setEndMonth}
        onEndYearChange={handleEndYearChange}
        isEndDatePresent={isPresent}
        onIsPresentChange={setIsPresent}
        disabled={isLoading}
      />
      {errors.startYear && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{errors.startYear}</p>
      )}
      {errors.endYear && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{errors.endYear}</p>
      )}

      <TextInput
        label="CGPA/Percentage"
        placeholder="e.g., CGPA: 7.8 or 79% (First Class with Distinction)"
        value={cgpa}
        onChange={setCgpa}
        disabled={isLoading}
      />

      <ImageUpload
        label="Institution Icon"
        accept="image/*"
        value={iconFile}
        onChange={setIconFile}
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
          {isLoading ? "Saving..." : initialData ? "Update Education" : "Add Education"}
        </button>
      </div>
    </form>
  );
}

