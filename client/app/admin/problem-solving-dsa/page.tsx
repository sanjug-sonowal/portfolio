"use client";

import { useState, useMemo } from "react";
import { PageNavbar } from "@/components/admin";
import { HeatMap } from "@/components/heatmap";
import { Sidebar } from "@/components/sidebar";
import { ProblemSubmissionForm } from "@/components/admin/forms";
import type { ProblemSubmission } from "@/components/problem-solving/types";

export default function ProblemSolvingDSAPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [submissions, setSubmissions] = useState<ProblemSubmission[]>([]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedDate("");
  };

  const handleSubmitSubmission = (data: ProblemSubmission) => {
    setSubmissions((prev) => {
      const newSubmission: ProblemSubmission = {
        ...data,
        id: `submission-${Date.now()}-${Math.random()}`,
      };
      return [...prev, newSubmission];
    });
    setIsSidebarOpen(false);
    setSelectedDate("");
  };

  const submissionsMap = useMemo(() => {
    const map = new Map<string, number>();
    submissions.forEach((submission) => {
      const date = submission.date;
      const currentCount = map.get(date) || 0;
      map.set(date, currentCount + 1);
    });
    return map;
  }, [submissions]);

  return (
    <div className="min-h-screen">
      <PageNavbar 
        showSearch={true}
        searchPlaceholder="Search problem solving & DSA..."
        onSearch={handleSearch}
      />

      <main className="p-6 w-full">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8 w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Problem Solving Activity</h2>
            <p className="text-gray-600">Click on any date to add a problem submission</p>
          </div>
          
          <div className="border-t border-white/30 pt-6">
            <HeatMap 
              isAdminMode={true}
              onDayClick={handleDayClick}
              submissions={submissionsMap}
            />
          </div>
        </div>
      </main>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Add Problem Submission"
        content={
          selectedDate ? (
            <ProblemSubmissionForm
              selectedDate={selectedDate}
              onSubmit={handleSubmitSubmission}
              onCancel={handleCloseSidebar}
            />
          ) : null
        }
      />
    </div>
  );
}

