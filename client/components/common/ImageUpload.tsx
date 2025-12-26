"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { TYPOGRAPHY } from "@/constants/typography";

export interface ImageUploadProps {
  label?: string;
  accept?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxSizeMB?: number;
  width?: number;
  height?: number;
}

export function ImageUpload({
  label,
  accept = "image/*",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  maxSizeMB = 5,
  width = 100,
  height = 100,
}: ImageUploadProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreview(null);
    }
  }, [value]);

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
      
      onChange(file);
    } else {
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
    <div className={className}>
      {label && (
        <label className={`block mb-2 ${TYPOGRAPHY.content.class} font-medium text-gray-700`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={`${containerClasses} flex items-center justify-center`} style={{ width: `${width}px`, height: `${height}px` }}>
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
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
                  hover:bg-red-600 transition-colors duration-200
                  shadow-lg
                "
                aria-label="Remove image"
              >
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <label
            className={`
              flex flex-col items-center justify-center
              w-full h-full
              cursor-pointer
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
              className="w-8 h-8 text-gray-400 mb-1"
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
            <span className={`${TYPOGRAPHY.content.class} text-xs text-gray-500 text-center px-2`}>
              Upload
            </span>
          </label>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

