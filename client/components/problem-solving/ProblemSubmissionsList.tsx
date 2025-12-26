"use client";

import type { ProblemSubmission } from "./types";
import { TYPOGRAPHY } from "@/constants/typography";

export interface ProblemSubmissionsListProps {
  date: string;
  submissions: ProblemSubmission[];
}

export function ProblemSubmissionsList({ date, submissions }: ProblemSubmissionsListProps) {
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className={`${TYPOGRAPHY.heading.medium.class} font-bold text-gray-900 mb-2`}>
          {formatDate(date)}
        </h3>
        <p className={`${TYPOGRAPHY.content.class} text-gray-600`}>
          {submissions.length} {submissions.length === 1 ? "problem solved" : "problems solved"}
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <p className={`${TYPOGRAPHY.content.class} text-gray-500`}>
            No problems solved on this day
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${TYPOGRAPHY.content.class} font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full`}>
                      {submission.platform}
                    </span>
                  </div>
                  <h4 className={`${TYPOGRAPHY.content.class} font-semibold text-gray-900 mb-2 truncate`}>
                    {submission.problemName}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {submission.problemLink && (
                      <a
                        href={submission.problemLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${TYPOGRAPHY.content.class} text-sm text-indigo-600 hover:text-indigo-700 underline`}
                      >
                        Problem Link
                      </a>
                    )}
                    {submission.submissionLink && (
                      <a
                        href={submission.submissionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${TYPOGRAPHY.content.class} text-sm text-indigo-600 hover:text-indigo-700 underline`}
                      >
                        Submission Link
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

