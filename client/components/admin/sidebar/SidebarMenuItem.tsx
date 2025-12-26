"use client";

import Link from "next/link";
import type { SidebarMenuItem } from "../types";

interface SidebarMenuItemProps {
  item: SidebarMenuItem;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarMenuItemComponent({
  item,
  isExpanded,
  isActive,
  onClick,
}: SidebarMenuItemProps) {
  const Icon = item.icon;
  const iconColor = item.color || "#6B7280";
  const activeIconColor = item.color || "#6366F1";

  return (
    <Link
      href={item.path}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl
        transition-all duration-300 ease-out
        group relative overflow-hidden
        ${isActive
          ? "bg-indigo-50 border border-indigo-200 shadow-sm"
          : "hover:bg-white/50 border border-transparent hover:border-white/30"
        }
      `}
    >
      <div className="flex-shrink-0">
        <Icon
          size={20}
          className="transition-transform duration-300 group-hover:scale-110"
          color={isActive ? activeIconColor : iconColor}
        />
      </div>
      
      {isExpanded && (
        <span
          className={`
            text-sm font-medium whitespace-nowrap
            transition-all duration-300
            ${isActive ? "text-indigo-700" : "text-gray-700 group-hover:text-gray-900"}
          `}
        >
          {item.label}
        </span>
      )}

      {isActive && isExpanded && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full" />
      )}
    </Link>
  );
}

