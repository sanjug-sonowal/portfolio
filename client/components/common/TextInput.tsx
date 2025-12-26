"use client";

import { useState } from "react";
import { TYPOGRAPHY } from "@/constants/typography";

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "url";
  className?: string;
}

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  type = "text",
  className = "",
}: TextInputProps) {
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
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          className={`
            w-full py-3 px-4
            bg-transparent
            text-gray-900 placeholder-gray-400
            focus:outline-none
            transition-all duration-300
            ${TYPOGRAPHY.content.class}
          `}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

