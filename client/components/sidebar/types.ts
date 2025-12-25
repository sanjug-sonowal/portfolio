import type { ReactNode } from "react";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

