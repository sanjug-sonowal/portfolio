"use client";

import type { NavItemProps } from "./types";

export function NavItem({ item, isActive, onClick }: NavItemProps) {
  const Icon = item.icon;
  const iconColor = item.iconColor || "#6B7280";
  const activeIconColor = item.iconColor || "#374151";

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-start gap-2 px-4 py-3 rounded-xl w-full sm:w-auto sm:px-3 md:px-4 sm:py-2 md:py-2.5
        transition-all duration-300 ease-out
        font-medium text-sm whitespace-nowrap
        relative overflow-hidden group
        ${
          isActive
            ? "bg-white/50 backdrop-blur-md shadow-lg shadow-black/5 border border-white/30"
            : "bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 hover:backdrop-blur-md hover:shadow-md hover:shadow-black/5 hover:border-white/30"
        }
      `}
      style={{
        color: isActive ? "#1F2937" : "#374151",
      }}
    >
      {isActive && (
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out"
          style={{
            width: "100%",
            backgroundColor: iconColor,
          }}
        />
      )}
      {!isActive && (
        <div
          className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 origin-left scale-x-0 group-hover:scale-x-100"
          style={{
            backgroundColor: iconColor,
          }}
        />
      )}
      {Icon && <Icon size={20} className="w-5 h-5 shrink-0 transition-all duration-300 group-hover:scale-110" color={isActive ? activeIconColor : iconColor} />}
      <span className="relative z-10">{item.label}</span>
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
      )}
    </button>
  );
}
