"use client";

import { TYPOGRAPHY } from "@/constants/typography";

interface PlatformCardProps {
  id: string;
  name: string;
  icon: string;
  stats: {
    primary: string;
    secondary: string;
  };
  onClick: () => void;
}

const renderPlatformIcon = (id: string, icon: string) => {
  if (icon) {
    return (
      <img
        src={icon}
        alt={id}
        className="w-3.5 h-3.5"
      />
    );
  }

  if (id === "interviewbit") {
    return (
      <div className="w-3.5 h-3.5 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-[8px] font-bold text-green-700">i</span>
      </div>
    );
  }

  if (id === "codestudio") {
    return (
      <div className="w-3.5 h-3.5 rounded-full bg-orange-100 flex items-center justify-center">
        <span className="text-[8px] font-bold text-orange-700">C</span>
      </div>
    );
  }

  if (id === "hackerearth") {
    return (
      <div className="w-3.5 h-3.5 rounded bg-blue-600 flex items-center justify-center">
        <span className="text-[8px] font-bold text-white">h</span>
      </div>
    );
  }

  return null;
};

export function PlatformCardComponent({ id, name, icon, stats, onClick }: PlatformCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-2 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm cursor-pointer hover:bg-white/70 transition-colors"
    >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-1">
                {renderPlatformIcon(id, icon)}
                <span className={`font-semibold ${TYPOGRAPHY.heading.small.class} text-gray-900`}>{name}</span>
              </div>
              <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`space-y-0.5 ${TYPOGRAPHY.content.class} text-gray-700`}>
              <p className="font-semibold text-gray-900">{stats.primary}</p>
              <p>{stats.secondary}</p>
            </div>
    </div>
  );
}

