import type { ComponentType } from "react";

/**
 * Types for authentication-related components
 */

export interface InputFieldProps {
  type: "email" | "password" | "text";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ComponentType<{ className?: string; size?: number; color?: string }>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

