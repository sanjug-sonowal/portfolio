"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { TYPOGRAPHY } from "@/constants/typography";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxVisibleItems?: number;
}

export function Dropdown({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = "",
  maxVisibleItems = 12,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    const handleScroll = (event: Event) => {
      if (isOpen && dropdownMenuRef.current) {
        const target = event.target as Node;
        if (!dropdownMenuRef.current.contains(target)) {
          setIsOpen(false);
          setIsFocused(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  const containerClasses = `
    relative
    bg-white/50 backdrop-blur-sm
    border rounded-xl
    transition-all duration-300 ease-out
    ${error ? "border-red-300 shadow-red-100" : "border-white/30"}
    ${isFocused || isOpen ? "ring-2 ring-indigo-200 border-indigo-300 shadow-lg shadow-indigo-100" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  const maxHeight = maxVisibleItems * 44;

  return (
    <div className={`w-full relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className={`block mb-2 ${TYPOGRAPHY.content.class} font-medium text-gray-700`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`relative ${containerClasses}`}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => {}}
          disabled={disabled}
          className={`
            w-full py-3 px-4 pr-10
            bg-transparent
            text-left
            focus:outline-none
            transition-all duration-300
            cursor-pointer
            ${TYPOGRAPHY.content.class}
            ${!value || !selectedOption ? "text-gray-400" : "text-gray-900"}
          `}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>
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
            className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {isOpen && mounted && buttonRef.current && createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998] bg-transparent"
              onClick={() => setIsOpen(false)}
            />
            <div
              ref={dropdownMenuRef}
              className={`
                fixed z-[9999]
                bg-white border border-gray-200 rounded-xl shadow-2xl
                overflow-y-auto scrollbar-thin
                ${TYPOGRAPHY.content.class}
              `}
              style={{
                width: `${buttonRef.current.offsetWidth}px`,
                top: `${buttonRef.current.getBoundingClientRect().bottom + 8}px`,
                left: `${buttonRef.current.getBoundingClientRect().left}px`,
                maxHeight: `${maxHeight}px`
              }}
            >
              <div>
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full px-4 py-3 text-left
                      transition-colors duration-150
                      relative
                      ${value === option.value
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {value === option.value && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" />
                    )}
                    <span className={value === option.value ? "ml-2" : ""}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>,
          document.body
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

