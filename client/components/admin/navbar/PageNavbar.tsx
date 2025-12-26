"use client";

import { SearchBar as CommonSearchBar } from "@/components/common";
import { ProfileMenu } from "./ProfileMenu";
import { TYPOGRAPHY } from "@/constants/typography";
import type { PageNavbarProps } from "../types";

export function PageNavbar({ 
  title, 
  description, 
  showSearch, 
  showProfile = true,
  searchPlaceholder,
  onSearch
}: PageNavbarProps) {
  const shouldShowSearch = showSearch !== undefined ? showSearch : !title;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-white/20 py-2">
      <div className="px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-1">
            {shouldShowSearch ? (
              <CommonSearchBar 
                placeholder={searchPlaceholder || "Search..."} 
                onSearch={onSearch}
              />
            ) : title ? (
              <div className="space-y-0.5">
                <h1 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900`}>
                  {title}
                </h1>
                {description && (
                  <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
                    {description}
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {showProfile && (
            <div className="flex-shrink-0">
              <ProfileMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

