"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarMenuItemComponent } from "./SidebarMenuItem";
import { DashboardIcon } from "../icons/DashboardIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { AboutIcon } from "../../icons/AboutIcon";
import { ExperienceIcon } from "../../icons/ExperienceIcon";
import { ImpactfulWorkIcon } from "../../icons/ImpactfulWorkIcon";
import { SkillsIcon } from "../../icons/SkillsIcon";
import { EducationIcon } from "../../icons/EducationIcon";
import { ProblemSolvingIcon } from "../../icons/ProblemSolvingIcon";
import { TrophyIcon } from "../../icons/TrophyIcon";
import { CertificatesIcon } from "../../icons/CertificatesIcon";
import { ToolsIcon } from "../../icons/ToolsIcon";
import { BadgesIcon } from "../../icons/BadgesIcon";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "@/hooks/useAuth";
import type { SidebarMenuItem } from "../types";

export function AdminSidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems: SidebarMenuItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: ProfileIcon,
      path: "/admin/profile",
      color: "#6366F1",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      path: "/admin/dashboard",
      color: "#6366F1",
    },
    {
      id: "projects",
      label: "Projects",
      icon: ImpactfulWorkIcon,
      path: "/admin/projects",
      color: "#F97316",
    },
    {
      id: "experiences",
      label: "Experiences",
      icon: ExperienceIcon,
      path: "/admin/experiences",
      color: "#9333EA",
    },
    {
      id: "about",
      label: "About",
      icon: AboutIcon,
      path: "/admin/about",
      color: "#3B82F6",
    },
    {
      id: "skills",
      label: "Skills",
      icon: SkillsIcon,
      path: "/admin/skills",
      color: "#22C55E",
    },
    {
      id: "education",
      label: "Education",
      icon: EducationIcon,
      path: "/admin/education",
      color: "#EF4444",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: TrophyIcon,
      path: "/admin/achievements",
      color: "#F59E0B",
    },
    {
      id: "problem-solving-dsa",
      label: "Problem Solving & DSA",
      icon: ProblemSolvingIcon,
      path: "/admin/problem-solving-dsa",
      color: "#9333EA",
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: CertificatesIcon,
      path: "/admin/certificates",
      color: "#EC4899",
    },
    {
      id: "tools",
      label: "Tools",
      icon: ToolsIcon,
      path: "/admin/tools",
      color: "#8B5CF6",
    },
    {
      id: "badges",
      label: "Badges",
      icon: BadgesIcon,
      path: "/admin/badges",
      color: "#F59E0B",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const activePath = pathname || "/admin/dashboard";

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-50
        bg-white/30 backdrop-blur-md border-r border-white/30
        transition-all duration-300 ease-out
        flex flex-col
        ${isExpanded ? "w-64" : "w-20"}
      `}
      >
      <div className="flex items-center justify-between p-4 border-b border-white/30">
        {isExpanded && (
          <h2 className="text-lg font-bold text-gray-900 whitespace-nowrap">Admin Panel</h2>
        )}
        <button
          onClick={toggleSidebar}
          className={`
            p-2 rounded-lg
            bg-white/50 backdrop-blur-sm
            border border-white/30
            hover:bg-white/70
            transition-all duration-300
            flex-shrink-0
            ${isExpanded ? "ml-auto" : "mx-auto"}
          `}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-700 transition-transform duration-300 ${isExpanded ? "" : "rotate-180"}`}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <SidebarMenuItemComponent
            key={item.id}
            item={item}
            isExpanded={isExpanded}
            isActive={activePath === item.path}
            onClick={() => {}}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-white/30">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl
            transition-all duration-300 ease-out
            group relative overflow-hidden
            bg-red-50 border border-red-200
            hover:bg-red-100 hover:border-red-300
          `}
        >
          <div className="flex-shrink-0">
            <LogoutIcon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
              color="#EF4444"
            />
          </div>
          {isExpanded && (
            <span className="text-sm font-medium text-red-700 whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}

