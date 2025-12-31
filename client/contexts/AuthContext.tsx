"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authService, type IAuthService } from "@/services/auth.service";
import type {
  AuthState,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "@/types/auth.types";
import { HttpError } from "@/services/http.service";

interface AuthContextValue extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  authServiceInstance?: IAuthService;
}

export function AuthProvider({
  children,
  authServiceInstance = authService,
}: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState<string | null>(null);

  const initializeAuth = useCallback(() => {
    try {
      const token = authServiceInstance.getStoredToken();
      const user = authServiceInstance.getStoredUser();

      setState({
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to initialize auth:", err);
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [authServiceInstance]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (credentials: LoginRequest): Promise<void> => {
      setError(null);
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const response: LoginResponse = await authServiceInstance.login(credentials);
        setState({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (err) {
        setState((prev) => ({ ...prev, isLoading: false }));
        if (err instanceof HttpError) {
          const errorMessage = err.message || "Login failed. Please check your credentials.";
          setError(errorMessage);
          console.error("Login error:", errorMessage);
        } else if (err instanceof Error) {
          setError(err.message || "An unexpected error occurred. Please try again.");
          console.error("Login error:", err);
        } else {
          setError("An unexpected error occurred. Please try again.");
          console.error("Unknown login error:", err);
        }
      }
    },
    [authServiceInstance]
  );

  const register = useCallback(
    async (data: RegisterRequest): Promise<void> => {
      setError(null);
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        await authServiceInstance.register(data);
        setState((prev) => ({ ...prev, isLoading: false }));
      } catch (err) {
        setState((prev) => ({ ...prev, isLoading: false }));
        if (err instanceof HttpError) {
          const errorMessage = err.message || "Registration failed. Please try again.";
          setError(errorMessage);
          console.error("Registration error:", errorMessage);
        } else if (err instanceof Error) {
          setError(err.message || "An unexpected error occurred. Please try again.");
          console.error("Registration error:", err);
        } else {
          setError("An unexpected error occurred. Please try again.");
          console.error("Unknown registration error:", err);
        }
      }
    },
    [authServiceInstance]
  );

  const logout = useCallback(() => {
    authServiceInstance.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setError(null);
  }, [authServiceInstance]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

