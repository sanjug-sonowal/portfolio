"use client";

import { useState, KeyboardEvent } from "react";
import { TYPOGRAPHY } from "@/constants/typography";

export interface TagsInputProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function TagsInput({
  label,
  placeholder = "Type and press Enter to add",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
}: TagsInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
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
          {value.map((tag, index) => (
            <span
              key={index}
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-lg
                bg-indigo-100 text-indigo-700
                ${TYPOGRAPHY.content.class} font-medium
                ${disabled ? "" : "group"}
              `}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-indigo-500 hover:text-indigo-700 transition-colors"
                  aria-label={`Remove ${tag}`}
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
          <input
            type="text"
            placeholder={value.length === 0 ? placeholder : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`
              flex-1 min-w-[120px] py-2
              bg-transparent
              text-gray-900 placeholder-gray-400
              focus:outline-none
              ${TYPOGRAPHY.content.class}
            `}
          />
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

