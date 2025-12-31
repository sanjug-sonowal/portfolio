"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/components/auth";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormData } from "@/components/auth/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !error && !isLoading) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, error, isLoading, router]);

  const handleLogin = async (data: LoginFormData) => {
    clearError();
    await login(data);
  };

  return (
    <div className="min-h-screen bg-[#FEFBF6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl p-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <svg
                width={32}
                height={32}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H15M10 7L15 12M15 12L10 17M15 12H3" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          <div className="text-center text-sm text-gray-500">
            <p>Don&apos;t have an account? Contact administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

