import type { ComponentType } from "react";

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string; size?: number; color?: string }>;
  path: string;
  color?: string;
}

export interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
}

export interface PageNavbarProps {
  title?: string;
  description?: string;
  showSearch?: boolean;
  showProfile?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

