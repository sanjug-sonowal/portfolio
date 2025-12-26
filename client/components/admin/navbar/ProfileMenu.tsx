"use client";

/**
 * ProfileMenu Component
 * 
 * Single Responsibility: Renders profile picture/icon menu
 */
export function ProfileMenu() {
  // Dummy profile picture - using a placeholder avatar
  const profileImageUrl = "https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff&size=128";

  return (
    <div className="flex items-center">
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
      >
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
}

