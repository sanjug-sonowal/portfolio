"use client";

import { TYPOGRAPHY } from "@/constants/typography";

export interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}: SwitchProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <label
          className={`
            ${TYPOGRAPHY.content.class}
            font-medium text-gray-700
            cursor-pointer
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={disabled ? undefined : handleToggle}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center
          w-11 h-6 rounded-full
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          ${checked ? "bg-indigo-600" : "bg-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block w-4 h-4 rounded-full bg-white
            transform transition-transform duration-300 ease-in-out
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}

