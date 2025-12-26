import type { IconProps } from "../icons/IconProps";
import type { ComponentType } from "react";

export interface NavItemConfig {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  type?: "regular" | "toggle";
  activeBackgroundColor?: string;
  iconColor?: string;
  textColor?: string;
}

export interface NavItemProps {
  item: NavItemConfig;
  isActive: boolean;
  onClick: () => void;
}

export interface NavToggleProps {
  item: NavItemConfig;
  isActive: boolean;
  isToggled: boolean;
  onToggle: () => void;
  onClick: () => void;
}

export interface NavbarProps {
  items?: NavItemConfig[];
  activeItemId?: string;
  onItemClick?: (itemId: string) => void;
}

