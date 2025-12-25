"use client";

import type { NavToggleProps } from "./types";

export function NavToggle({
  item,
  isActive,
  isToggled,
  onToggle,
  onClick,
}: NavToggleProps) {
  const iconColor = item.iconColor || "#F97316";

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-start gap-3 px-4 py-3 rounded-xl w-full sm:w-auto sm:px-3 md:px-4 sm:py-2 md:py-2.5
        transition-all duration-300 ease-out
        font-medium text-sm whitespace-nowrap cursor-pointer
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
      {!isActive && (
        <div
          className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 origin-left scale-x-0 group-hover:scale-x-100"
          style={{
            backgroundColor: iconColor,
          }}
        />
      )}
      {isActive && (
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out"
          style={{
            width: "100%",
            backgroundColor: iconColor,
          }}
        />
      )}
      <button
        onClick={handleToggleClick}
        type="button"
        className={`
          relative inline-flex h-4 w-7 sm:h-5 sm:w-9 items-center rounded-full shrink-0
          transition-colors duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
        style={{
          backgroundColor: isToggled ? iconColor : "#D1D5DB",
        }}
        aria-label="Toggle"
      >
        <span
          className={`
            inline-block h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white transition-transform duration-300 ease-out shadow-sm
          `}
          style={{
            transform: isToggled 
              ? "translateX(calc(100% + 2px))" 
              : "translateX(2px)",
          }}
        />
      </button>
      <span className="relative z-10">{item.label}</span>
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
      )}
    </div>
  );
}

