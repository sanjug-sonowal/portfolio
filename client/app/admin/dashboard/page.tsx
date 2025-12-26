"use client";

import { PageNavbar } from "@/components/admin";

/**
 * Dashboard Page Component
 * 
 * Single Responsibility: Renders the admin dashboard UI
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <PageNavbar />

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-8">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Dashboard</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This is your admin dashboard. API integration will be implemented here later.
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Profile Management",
                  description: "Manage your portfolio profile information",
                  icon: (
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Projects",
                  description: "Add, edit, and manage your projects",
                  icon: (
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  ),
                  color: "from-purple-500 to-purple-600",
                },
                {
                  title: "Analytics",
                  description: "View portfolio analytics and statistics",
                  icon: (
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  ),
                  color: "from-green-500 to-green-600",
                },
              ].map((card, index) => (
                <div
                  key={card.title}
                  className="bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg text-white mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
              <p className="text-indigo-800 font-medium">
                🚀 Dashboard features coming soon. API integration will be added in the next phase.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

