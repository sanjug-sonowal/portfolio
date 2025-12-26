"use client";

import { useState } from "react";
import { TextInput, Switch, ChipInput } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Profile, ProfileChip } from "@/components/profile/types";
import type { Chip } from "@/components/common/ChipInput";

export interface ProfileFormProps {
  initialData?: Profile;
  onSubmit: (data: Profile) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const chipToProfileChip = (chip: Chip): ProfileChip => ({
  id: chip.id,
  label: chip.label,
  icon: chip.icon,
});

const profileChipToChip = (chip: ProfileChip): Chip => ({
  id: chip.id,
  label: chip.label,
  icon: chip.icon,
});

export function ProfileForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProfileFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [chips, setChips] = useState<Chip[]>(
    initialData?.chips?.map(profileChipToChip) || []
  );
  const [interviewReady, setInterviewReady] = useState(initialData?.interviewReady || false);
  const [immediateJoiner, setImmediateJoiner] = useState(initialData?.immediateJoiner || false);
  const [openToWork, setOpenToWork] = useState(initialData?.openToWork || false);

  const [errors, setErrors] = useState<{
    name?: string;
    chips?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; chips?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const profileData: Profile = {
        id: initialData?.id || `profile-${Date.now()}`,
        name: name.trim(),
        chips: chips.map(chipToProfileChip),
        interviewReady,
        immediateJoiner,
        openToWork,
      };

      onSubmit(profileData);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleChipsChange = (newChips: Chip[]) => {
    setChips(newChips);
    if (errors.chips) {
      setErrors((prev) => ({ ...prev, chips: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        error={errors.name}
        required
        disabled={isLoading}
      />

      <ChipInput
        label="Chips"
        placeholder="Enter chip label (e.g., Top 54.32%) and press Enter"
        value={chips}
        onChange={handleChipsChange}
        error={errors.chips}
        disabled={isLoading}
      />

      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <label className={`block w-48 ${TYPOGRAPHY.content.class} font-medium text-gray-700`}>
            Interview Ready
          </label>
          <Switch
            checked={interviewReady}
            onChange={setInterviewReady}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className={`block w-48 ${TYPOGRAPHY.content.class} font-medium text-gray-700`}>
            Immediate Joiner
          </label>
          <Switch
            checked={immediateJoiner}
            onChange={setImmediateJoiner}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className={`block w-48 ${TYPOGRAPHY.content.class} font-medium text-gray-700`}>
            Open to Work
          </label>
          <Switch
            checked={openToWork}
            onChange={setOpenToWork}
            disabled={isLoading}
          />
        </div>
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
          {isLoading ? "Saving..." : initialData ? "Update Profile" : "Save Profile"}
        </button>
      </div>
    </form>
  );
}

