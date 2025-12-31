"use client";

import { AdminSidebar, SidebarProvider, useSidebar } from "@/components/admin";
import { ProtectedRoute } from "@/components/auth";

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

