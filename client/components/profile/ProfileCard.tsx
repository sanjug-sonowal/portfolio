"use client";

import { TYPOGRAPHY } from "@/constants/typography";

export function ProfileCard() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h1 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900`}>Sanjug Sonowal</h1>
            <img
              src="/icons/verified.png"
              alt="Verified"
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className={`${TYPOGRAPHY.content.class} text-gray-700`}>Software Engineer</span>
            <div className="flex gap-2">
              <span className={`px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 ${TYPOGRAPHY.content.class} font-medium flex items-center gap-1.5`}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 radar-dot"></span>
                Immediate Joiner
              </span>
              <span className={`px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 ${TYPOGRAPHY.content.class} font-medium flex items-center gap-1.5`}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 radar-dot"></span>
                Interview Ready
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800 ${TYPOGRAPHY.content.class} font-medium flex items-center gap-1.5`}>
              <img
                src="/icons/leetcodeicon.png"
                alt="LeetCode"
                className="w-4 h-4"
              />
              Top 54.32%
            </span>
          </div>

          <p className={`${TYPOGRAPHY.content.class} text-gray-700 leading-relaxed`}>
            Software Engineer with 2+ years of experience building scalable, high-performance applications. Skilled in system design, performance optimization, and delivering reliable production software.
          </p>
        </div>

        <div className="lg:w-auto lg:min-w-[200px] space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className={TYPOGRAPHY.content.class}>sanjugsonowalofficial@gmail.com</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className={TYPOGRAPHY.content.class}>9724224417</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/sanjug-sonowal-1063161a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/50 border border-white/30 flex items-center justify-center hover:bg-white/70 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/sanjug-sonowal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/50 border border-white/30 flex items-center justify-center hover:bg-white/70 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.865 20.335 8.839 21.49C9.339 21.58 9.521 21.272 9.521 21.008C9.521 20.773 9.513 20.024 9.508 19.304C6.726 19.9 6.14 17.924 6.14 17.924C5.685 16.664 5.029 16.327 5.029 16.327C4.121 15.68 5.097 15.693 5.097 15.693C6.101 15.765 6.629 16.732 6.629 16.732C7.521 18.156 8.97 17.766 9.539 17.536C9.631 16.934 9.889 16.523 10.175 16.305C7.954 16.073 5.62 15.202 5.62 11.588C5.62 10.435 6.01 9.505 6.649 8.796C6.546 8.532 6.203 7.471 6.747 6.106C6.747 6.106 7.586 5.831 9.496 7.239C10.294 7.021 11.147 6.912 12 6.908C12.853 6.912 13.706 7.021 14.504 7.239C16.414 5.831 17.253 6.106 17.253 6.106C17.797 7.471 17.454 8.532 17.351 8.796C17.99 9.505 18.38 10.435 18.38 11.588C18.38 15.214 16.041 16.073 13.814 16.299C14.171 16.588 14.483 17.214 14.483 18.168C14.483 19.593 14.47 20.753 14.47 21.008C14.47 21.275 14.649 21.588 15.155 21.489C19.138 20.331 22 16.415 22 12C22 6.477 17.523 2 12 2Z"
                />
              </svg>
            </a>
            <a
              href="https://leetcode.com/u/sanjug_sonowal/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/50 border border-white/30 flex items-center justify-center hover:bg-white/70 transition-colors"
            >
              <img
                src="/icons/leetcodeicon.png"
                alt="LeetCode"
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

