"use client";

import { useState } from "react";
import type { InputFieldProps } from "./types";

/**
 * InputField Component
 * 
 * Single Responsibility: Renders a single form input field with icon and error handling
 * Follows SOLID principles by being a focused, reusable component
 */
export function InputField({
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
  disabled = false,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      <div
        className={`
          relative flex items-center gap-3
          bg-white/50 backdrop-blur-sm
          border rounded-xl
          transition-all duration-300 ease-out
          ${error ? "border-red-300 shadow-red-100" : "border-white/30"}
          ${isFocused ? "ring-2 ring-indigo-200 border-indigo-300 shadow-lg shadow-indigo-100" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {Icon && (
          <div className="pl-4 flex-shrink-0">
            <Icon
              size={20}
              className="transition-transform duration-300"
              color={isFocused ? "#6366F1" : "#9CA3AF"}
            />
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          className={`
            flex-1 py-4 pr-4
            bg-transparent
            text-gray-900 placeholder-gray-400
            focus:outline-none
            transition-all duration-300
            ${Icon ? "" : "pl-4"}
            ${type === "password" ? "pr-12" : ""}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

