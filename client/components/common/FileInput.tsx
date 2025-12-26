"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { TYPOGRAPHY } from "@/constants/typography";

export interface FileInputProps {
  label?: string;
  accept?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showPreview?: boolean;
  maxSizeMB?: number;
  variant?: "default" | "compact";
}

export function FileInput({
  label,
  accept = "image/*",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  showPreview = true,
  maxSizeMB = 5,
  variant = "default",
}: FileInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value && showPreview) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreview(null);
    }
  }, [value, showPreview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        onChange(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
      
      if (showPreview) {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        setPreview(URL.createObjectURL(file));
      }
      onChange(file);
    } else {
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
      onChange(null);
    }
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
        {preview && showPreview ? (
          <div className="p-4 flex items-center gap-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-contain rounded-lg border border-white/30"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="
                    absolute -top-2 -right-2
                    w-6 h-6 rounded-full
                    bg-red-500 text-white
                    flex items-center justify-center
                    hover:bg-red-600 transition-colors
                    shadow-lg
                  "
                  aria-label="Remove file"
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
            </div>
            <div className="flex-1">
              <p className={`${TYPOGRAPHY.content.class} text-gray-900 font-medium`}>
                {value?.name}
              </p>
              <p className={`${TYPOGRAPHY.content.class} text-sm text-gray-600`}>
                {(value ? value.size / 1024 : 0).toFixed(2)} KB
              </p>
            </div>
          </div>
        ) : variant === "compact" ? (
          <label
            className={`
              flex items-center justify-center
              p-2 cursor-pointer
              transition-all duration-300
              ${disabled ? "cursor-not-allowed" : "hover:bg-white/30"}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required={required}
              disabled={disabled}
              className="hidden"
            />
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
        ) : (
          <label
            className={`
              flex flex-col items-center justify-center
              p-6 cursor-pointer
              transition-all duration-300
              ${disabled ? "cursor-not-allowed" : "hover:bg-white/30"}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required={required}
              disabled={disabled}
              className="hidden"
            />
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className={`${TYPOGRAPHY.content.class} text-gray-600 text-center`}>
              <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className={`${TYPOGRAPHY.content.class} text-xs text-gray-500 mt-1`}>
              {accept === "image/*" ? "PNG, JPG, GIF" : "File"} up to {maxSizeMB}MB
            </p>
          </label>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

