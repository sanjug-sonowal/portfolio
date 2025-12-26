"use client";

import { useState } from "react";
import { TextInput, ImageUpload } from "@/components/common";
import { TYPOGRAPHY } from "@/constants/typography";
import type { Certificate } from "@/components/certificates/types";

export interface CertificateFormProps {
  initialData?: Certificate;
  onSubmit: (data: Certificate) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CertificateForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: CertificateFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [imageFile, setImageFile] = useState<File | null>(
    initialData?.image instanceof File ? initialData.image : null
  );
  const [credentials, setCredentials] = useState(initialData?.credentials || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [errors, setErrors] = useState<Partial<Record<keyof Certificate, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Certificate, string>> = {};

    if (!title.trim()) {
      newErrors.title = "Certificate title is required";
    }

    if (!imageFile && !initialData?.image) {
      newErrors.image = "Certificate image is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const certificateData: Certificate = {
        id: initialData?.id || `certificate-${Date.now()}`,
        title: title.trim(),
        image: imageFile || initialData?.image || "",
        credentials: credentials.trim() || undefined,
        link: link.trim() || undefined,
      };

      onSubmit(certificateData);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleCredentialsChange = (value: string) => {
    setCredentials(value);
  };

  const handleLinkChange = (value: string) => {
    setLink(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Certificate Title"
        placeholder="e.g., Google Digital Garage Certification"
        value={title}
        onChange={handleTitleChange}
        error={errors.title}
        required
        disabled={isLoading}
      />

      <ImageUpload
        label="Certificate Image"
        accept="image/*"
        value={imageFile}
        onChange={handleImageChange}
        error={errors.image}
        required
        disabled={isLoading}
        maxSizeMB={5}
        width={400}
        height={300}
      />

      <TextInput
        label="Credentials"
        placeholder="e.g., Certificate ID, Credential ID (optional)"
        value={credentials}
        onChange={handleCredentialsChange}
        disabled={isLoading}
      />

      <TextInput
        label="Certificate Link"
        placeholder="https://example.com/certificate/... (optional)"
        value={link}
        onChange={handleLinkChange}
        type="url"
        disabled={isLoading}
      />

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/30">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={`
              px-6 py-2.5 rounded-xl
              bg-white/50 border border-white/30
              text-gray-700 font-medium
              hover:bg-white/70 transition-all duration-300
              ${TYPOGRAPHY.content.class}
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-6 py-2.5 rounded-xl
            bg-indigo-600 text-white font-medium
            hover:bg-indigo-700 transition-all duration-300
            shadow-lg shadow-indigo-100
            ${TYPOGRAPHY.content.class}
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? "Saving..." : initialData ? "Update Certificate" : "Add Certificate"}
        </button>
      </div>
    </form>
  );
}

