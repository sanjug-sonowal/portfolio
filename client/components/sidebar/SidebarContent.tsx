"use client";

import type { ReactNode } from "react";

interface SidebarContentProps {
  children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  return <div className="text-gray-700">{children}</div>;
}

