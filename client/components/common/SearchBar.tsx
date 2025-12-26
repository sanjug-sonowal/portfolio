"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/admin/icons/SearchIcon";
import { TYPOGRAPHY } from "@/constants/typography";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  className?: string;
  width?: string;
  disabled?: boolean;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  defaultValue = "",
  value: controlledValue,
  className = "",
  width = "w-64",
  disabled = false,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const searchValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onSearch?.(newValue);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const containerClasses = `
    flex items-center gap-2
    bg-white/50 backdrop-blur-sm
    border rounded-lg
    transition-all duration-300 ease-out
    ${isFocused ? "ring-2 ring-indigo-200 border-indigo-300 shadow-md" : "border-white/30"}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  const inputClasses = `
    ${TYPOGRAPHY.content.class}
    py-2 pr-4
    bg-transparent
    text-gray-900 placeholder-gray-400
    focus:outline-none
    ${width}
    ${disabled ? "cursor-not-allowed" : ""}
  `;

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className={containerClasses}>
        <div className="pl-3 flex-shrink-0">
          <SearchIcon
            size={16}
            color={isFocused ? "#6366F1" : "#9CA3AF"}
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClasses}
        />
      </div>
    </div>
  );
}

