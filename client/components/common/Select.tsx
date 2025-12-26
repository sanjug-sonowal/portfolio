"use client";

import { useState } from "react";
import { TYPOGRAPHY } from "@/constants/typography";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = "",
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  const containerClasses = `
    relative
    bg-white/50 backdrop-blur-sm
    border rounded-xl
    transition-all duration-300 ease-out
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
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          size={1}
          className={`
            w-full py-3 px-4 pr-10
            bg-transparent
            text-gray-900
            focus:outline-none
            transition-all duration-300
            appearance-none
            cursor-pointer
            ${TYPOGRAPHY.content.class}
            ${!value ? "text-gray-400" : ""}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

