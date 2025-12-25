"use client";

import { TYPOGRAPHY } from "@/constants/typography";

export function Footer() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
      <div className="flex flex-col items-center gap-2 text-gray-600">
        <p className={TYPOGRAPHY.content.class}>
          © {currentYear} Sanjug Sonowal. All rights reserved.
        </p>
        <p className={`${TYPOGRAPHY.content.class} text-gray-500`}>
          UPDATED AT {currentMonth} {currentYear}
        </p>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <p className={`${TYPOGRAPHY.content.class} font-semibold text-gray-700`}>
            0 VISITORS
          </p>
        </div>
      </div>
    </div>
  );
}

