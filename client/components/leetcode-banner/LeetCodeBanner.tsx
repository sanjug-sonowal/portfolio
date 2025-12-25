"use client";

export function LeetCodeBanner() {
  const gifUrl = "https://assets.leetcode.com/static_assets/marketing/365_new.gif";
  const repeatCount = 10;

  return (
    <div className="w-full overflow-x-auto scrollbar-hide mb-6 flex justify-center">
      <div className="flex gap-4 min-w-max">
        {Array.from({ length: repeatCount }).map((_, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={gifUrl}
              alt={`LeetCode 365 Days ${index + 1}`}
              className="h-20 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

