"use client";

import { useState } from "react";
import { InputField } from "./InputField";
import { EmailIcon } from "./EmailIcon";
import { PasswordIcon } from "./PasswordIcon";
import type { LoginFormProps, LoginFormData } from "./types";

/**
 * LoginForm Component
 * 
 * Single Responsibility: Handles login form state and submission
 * Open/Closed: Can be extended without modification through props
 * Dependency Inversion: Depends on abstraction (onSubmit callback)
 */
export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData((prev) => ({ ...prev, email: value }));
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <InputField
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleEmailChange}
        icon={EmailIcon}
        error={errors.email}
        required
        disabled={isLoading}
      />

      <InputField
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handlePasswordChange}
        icon={PasswordIcon}
        error={errors.password}
        required
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-4 px-6
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-white font-semibold
          rounded-xl
          shadow-lg shadow-indigo-200
          transition-all duration-300 ease-out
          hover:from-indigo-700 hover:to-purple-700
          hover:shadow-xl hover:shadow-indigo-300
          hover:scale-[1.02]
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          flex items-center justify-center gap-2
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Logging in...</span>
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
}

