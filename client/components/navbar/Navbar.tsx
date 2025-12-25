"use client";

import { useState } from "react";
import { NavItem } from "./NavItem";
import { NavToggle } from "./NavToggle";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { navConfig } from "./navConfig";
import type { NavbarProps } from "./types";

export function Navbar({
  activeItemId = "projects",
  onItemClick,
}: Omit<NavbarProps, "items">) {
  const items = navConfig;
  const [activeId, setActiveId] = useState(activeItemId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "ai-engineer": true,
  });

  const handleItemClick = (itemId: string) => {
    setActiveId(itemId);
    setIsMenuOpen(false);
    onItemClick?.(itemId);
  };

  const handleToggle = (itemId: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-10 w-full backdrop-blur-md bg-white/70 border-b border-white/20 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center py-2 relative">
          <button
            onClick={toggleMenu}
            className="sm:hidden absolute left-0 p-2 rounded-lg hover:bg-white/40 transition-colors"
            aria-label="Toggle menu"
          >
            <HamburgerIcon size={24} isOpen={isMenuOpen} className="text-gray-700" />
          </button>

          <div className="hidden sm:flex items-center justify-center gap-1.5 sm:gap-2 bg-white/30 backdrop-blur-sm rounded-2xl px-2 sm:px-4 py-2 border border-white/30 shadow-sm">
            {items.map((item) => {
              if (item.type === "toggle") {
                return (
                  <NavToggle
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    isToggled={toggleStates[item.id] || false}
                    onToggle={() => handleToggle(item.id)}
                    onClick={() => handleItemClick(item.id)}
                  />
                );
              }

              return (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onClick={() => handleItemClick(item.id)}
                />
              );
            })}
          </div>
        </div>

        <div
          className={`
            sm:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-4 pb-4 space-y-2 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm mt-2">
            {items.map((item) => {
              if (item.type === "toggle") {
                return (
                  <NavToggle
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    isToggled={toggleStates[item.id] || false}
                    onToggle={() => handleToggle(item.id)}
                    onClick={() => handleItemClick(item.id)}
                  />
                );
              }

              return (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onClick={() => handleItemClick(item.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

