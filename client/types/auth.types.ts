export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  jobTitle?: string | null;
  bio?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  leetcodeUrl?: string | null;
  interviewReady: boolean;
  immediateJoiner: boolean;
  openToWork: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  statusCode: number;
  message: string;
  token: string;
  user: User;
  timestamp: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  jobTitle?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  leetcodeUrl?: string;
}

export interface RegisterResponse {
  status: string;
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

