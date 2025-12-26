"use client";

import { AdminSidebar, SidebarProvider, useSidebar } from "@/components/admin";

/**
 * Admin Layout Content Component
 * 
 * Single Responsibility: Renders layout content with dynamic sidebar spacing
 */
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-[#FEFBF6]">
      <AdminSidebar />
      <main 
        className="transition-all duration-300 min-h-screen"
        style={{ 
          marginLeft: isExpanded ? '16rem' : '5rem' // 64 = 16rem, 20 = 5rem
        }}
      >
        {children}
      </main>
    </div>
  );
}

/**
 * Admin Layout Component
 * 
 * Single Responsibility: Provides layout structure for admin pages with sidebar context
 * Follows layout pattern from Next.js App Router
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}

