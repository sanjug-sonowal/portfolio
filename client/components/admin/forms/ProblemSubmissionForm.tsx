"use client";

import { useState } from "react";
import { TextInput } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { ProblemSubmission } from "@/components/problem-solving/types";

export interface ProblemSubmissionFormProps {
  selectedDate: string;
  initialData?: ProblemSubmission;
  onSubmit: (data: ProblemSubmission) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ProblemSubmissionForm({
  selectedDate,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProblemSubmissionFormProps) {
  const [platform, setPlatform] = useState(initialData?.platform || "");
  const [problemName, setProblemName] = useState(initialData?.problemName || "");
  const [problemLink, setProblemLink] = useState(initialData?.problemLink || "");
  const [submissionLink, setSubmissionLink] = useState(initialData?.submissionLink || "");

  const [errors, setErrors] = useState<{
    platform?: string;
    problemName?: string;
    problemLink?: string;
    submissionLink?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      platform?: string;
      problemName?: string;
      problemLink?: string;
      submissionLink?: string;
    } = {};

    if (!platform.trim()) {
      newErrors.platform = "Platform is required";
    }

    if (!problemName.trim()) {
      newErrors.problemName = "Problem name is required";
    }

    if (!problemLink.trim()) {
      newErrors.problemLink = "Problem link is required";
    }

    if (!submissionLink.trim()) {
      newErrors.submissionLink = "Submission link is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const submissionData: ProblemSubmission = {
        id: initialData?.id || `submission-${Date.now()}`,
        date: selectedDate,
        platform: platform.trim(),
        problemName: problemName.trim(),
        problemLink: problemLink.trim(),
        submissionLink: submissionLink.trim(),
      };

      onSubmit(submissionData);
    }
  };

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    if (errors.platform) {
      setErrors((prev) => ({ ...prev, platform: undefined }));
    }
  };

  const handleProblemNameChange = (value: string) => {
    setProblemName(value);
    if (errors.problemName) {
      setErrors((prev) => ({ ...prev, problemName: undefined }));
    }
  };

  const handleProblemLinkChange = (value: string) => {
    setProblemLink(value);
    if (errors.problemLink) {
      setErrors((prev) => ({ ...prev, problemLink: undefined }));
    }
  };

  const handleSubmissionLinkChange = (value: string) => {
    setSubmissionLink(value);
    if (errors.submissionLink) {
      setErrors((prev) => ({ ...prev, submissionLink: undefined }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
        <p className={`${TYPOGRAPHY.content.class} text-sm text-gray-600 mb-1`}>Selected Date</p>
        <p className={`${TYPOGRAPHY.content.class} font-semibold text-indigo-900`}>
          {formatDate(selectedDate)}
        </p>
      </div>

      <TextInput
        label="Platform"
        placeholder="e.g., LeetCode, HackerRank, CodeChef"
        value={platform}
        onChange={handlePlatformChange}
        error={errors.platform}
        required
        disabled={isLoading}
      />

      <TextInput
        label="Problem Name"
        placeholder="e.g., Two Sum, Merge Intervals"
        value={problemName}
        onChange={handleProblemNameChange}
        error={errors.problemName}
        required
        disabled={isLoading}
      />

      <TextInput
        label="Problem Link"
        placeholder="https://leetcode.com/problems/two-sum/"
        value={problemLink}
        onChange={handleProblemLinkChange}
        error={errors.problemLink}
        required
        disabled={isLoading}
        type="url"
      />

      <TextInput
        label="Submission Link"
        placeholder="https://leetcode.com/submissions/detail/..."
        value={submissionLink}
        onChange={handleSubmissionLinkChange}
        error={errors.submissionLink}
        required
        disabled={isLoading}
        type="url"
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
          {isLoading ? "Saving..." : initialData ? "Update Submission" : "Add Submission"}
        </button>
      </div>
    </form>
  );
}

