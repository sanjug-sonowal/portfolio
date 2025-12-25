import type { IconProps } from "./IconProps";

export function TrophyIcon({ className = "", size = 20, color = "#F59E0B" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 9C6 7.34315 7.34315 6 9 6H15C16.6569 6 18 7.34315 18 9V10C18 12.7614 15.7614 15 13 15H11C8.23858 15 6 12.7614 6 10V9Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21V22M12 21H15M12 21H9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

