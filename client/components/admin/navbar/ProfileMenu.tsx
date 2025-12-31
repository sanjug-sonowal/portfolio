"use client";

import { useAuth } from "@/hooks/useAuth";

export function ProfileMenu() {
  const { user } = useAuth();
  
  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6366f1&color=fff&size=128`;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden md:block">
        <p className="text-sm font-medium text-gray-900">{userName}</p>
        <p className="text-xs text-gray-500 truncate max-w-[150px]">{userEmail}</p>
      </div>
      <button
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          overflow-hidden
          border-2 border-white/30
          hover:border-indigo-300
          transition-all duration-300
          cursor-pointer
        "
        aria-label="Profile menu"
        title={userEmail}
      >
        <img
          src={profileImageUrl}
          alt={userName}
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
}

