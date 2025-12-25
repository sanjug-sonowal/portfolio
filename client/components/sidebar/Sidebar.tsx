"use client";

import type { SidebarProps } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

export function Sidebar({ isOpen, onClose, title, content }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-xl z-50 ${
          isOpen ? "sidebar-bounce" : "translate-x-full transition-transform duration-300 ease-in-out"
        } ${!isOpen ? "pointer-events-none" : ""}`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900`}>{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className={`text-gray-700 ${TYPOGRAPHY.content.class}`}>{content}</div>
        </div>
      </div>
    </>
  );
}

