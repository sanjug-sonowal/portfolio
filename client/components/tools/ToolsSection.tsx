"use client";

import { TYPOGRAPHY } from "@/constants/typography";
import type { ToolsSectionProps, Tool } from "./types";

const defaultTools: Tool[] = [
  {
    id: "git",
    name: "Git",
    iconElement: (
      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    iconElement: (
      <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    iconElement: (
      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "VS Code",
    iconElement: (
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "pycharm",
    name: "PyCharm",
    iconElement: (
      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "linux",
    name: "Linux",
    iconElement: (
      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "intellij",
    name: "IntelliJ IDEA",
    iconElement: (
      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "postman",
    name: "Postman",
    iconElement: (
      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    iconElement: (
      <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "selenium",
    name: "Selenium",
    iconElement: (
      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
  {
    id: "scrapy",
    name: "Scrapy",
    iconElement: (
      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    ),
  },
];

export function ToolsSection({ tools = defaultTools }: ToolsSectionProps) {
  return (
    <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6L6 12l4 6M14 6l4 6-4 6" />
        </svg>
        <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900`}>Tools</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-2 rounded-xl bg-white/50 border border-gray-300/30 backdrop-blur-sm flex items-center gap-2"
          >
            {tool.iconElement && (
              <div className="shrink-0">
                {tool.iconElement}
              </div>
            )}
            {tool.icon && (
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-4 h-4 shrink-0"
              />
            )}
            <span className={`${TYPOGRAPHY.content.class} text-gray-700 font-medium truncate`}>
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

