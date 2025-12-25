import type { IconProps } from "./IconProps";

export function ProblemSolvingIcon({ className = "", size = 20, color = "#9333EA" }: IconProps) {
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
        d="M9.5 2C8.5 2 7.75 2.5 7.25 3.5C6.75 4.5 7 5.5 7.5 6.5C8 7.5 8.5 8 9.5 8C10.5 8 11.25 7.5 11.75 6.5C12.25 5.5 12 4.5 11.5 3.5C11 2.5 10.5 2 9.5 2Z"
        fill={color}
      />
      <path
        d="M16.5 2C15.5 2 14.75 2.5 14.25 3.5C13.75 4.5 14 5.5 14.5 6.5C15 7.5 15.5 8 16.5 8C17.5 8 18.25 7.5 18.75 6.5C19.25 5.5 19 4.5 18.5 3.5C18 2.5 17.5 2 16.5 2Z"
        fill={color}
      />
      <path
        d="M12 10C10 10 8.5 11 7.5 12.5C6.5 14 6 16 6.5 18C7 20 8.5 21 10.5 21C11.5 21 12.5 20.5 13 19.5C13.5 18.5 13.5 17.5 13 16.5C12.5 15.5 11.5 15 10.5 15H13.5C15 15 16.5 14.5 17.5 13.5C18.5 12.5 19 11 18.5 9.5C18 8 16.5 10 15 10H12Z"
        fill={color}
      />
    </svg>
  );
}

