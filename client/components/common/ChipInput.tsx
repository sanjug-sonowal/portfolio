"use client";

import { useState, KeyboardEvent, useMemo } from "react";
import { TYPOGRAPHY } from "@/constants/typography";
import { ImageUpload } from "./ImageUpload";

export interface Chip {
  id: string;
  label: string;
  icon?: File | null;
}

function ChipIcon({ icon, alt }: { icon: File; alt: string }) {
  const objectUrl = useMemo(() => {
    return URL.createObjectURL(icon);
  }, [icon]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  return (
    <img
      src={objectUrl}
      alt={alt}
      className="w-4 h-4 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

export interface ChipInputProps {
  label?: string;
  placeholder?: string;
  value: Chip[];
  onChange: (chips: Chip[]) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ChipInput({
  label,
  placeholder = "Enter chip label and press Enter",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
}: ChipInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [labelInput, setLabelInput] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && labelInput.trim()) {
      e.preventDefault();
      const newChip: Chip = {
        id: `chip-${Date.now()}-${Math.random()}`,
        label: labelInput.trim(),
        icon: iconFile || undefined,
      };
      onChange([...value, newChip]);
      setLabelInput("");
      setIconFile(null);
    }
  };

  const handleRemoveChip = (chipId: string) => {
    onChange(value.filter((chip) => chip.id !== chipId));
  };

  const containerClasses = `
    relative
    bg-white/50 backdrop-blur-sm
    border rounded-xl
    transition-all duration-300 ease-out
    min-h-[52px]
    ${error ? "border-red-300 shadow-red-100" : "border-white/30"}
    ${isFocused ? "ring-2 ring-indigo-200 border-indigo-300 shadow-lg shadow-indigo-100" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`block mb-2 ${TYPOGRAPHY.content.class} font-medium text-gray-700`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={containerClasses}>
        <div className="flex flex-wrap items-center gap-2 p-2.5">
          {value.map((chip) => (
            <span
              key={chip.id}
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-xl
                bg-yellow-50 border border-yellow-200 text-yellow-800
                ${TYPOGRAPHY.content.class} font-medium
                ${disabled ? "" : "group"}
              `}
            >
              {chip.icon && (
                <ChipIcon icon={chip.icon} alt={chip.label} />
              )}
              {chip.label}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveChip(chip.id)}
                  className="text-yellow-600 hover:text-yellow-800 transition-colors"
                  aria-label={`Remove ${chip.label}`}
                >
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </span>
          ))}
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <ImageUpload
              accept="image/*"
              value={iconFile}
              onChange={setIconFile}
              disabled={disabled}
              maxSizeMB={2}
              className="flex-shrink-0"
            />
            <input
              type="text"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsFocused(false), 200);
              }}
              placeholder={placeholder}
              disabled={disabled}
              className={`
                flex-1 py-1.5 px-2
                bg-transparent
                text-gray-900 placeholder-gray-400
                focus:outline-none
                ${TYPOGRAPHY.content.class}
              `}
            />
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}
