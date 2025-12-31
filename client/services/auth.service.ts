import { authRepository, type IAuthRepository } from "./auth.repository";
import { httpService } from "./http.service";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "@/types/auth.types";

export interface IAuthService {
  login(credentials: LoginRequest): Promise<LoginResponse>;
  register(data: RegisterRequest): Promise<RegisterResponse>;
  logout(): void;
  getStoredToken(): string | null;
  getStoredUser(): User | null;
  setAuthData(token: string, user: User): void;
  clearAuthData(): void;
  isAuthenticated(): boolean;
}

export class AuthService implements IAuthService {
  constructor(private repository: IAuthRepository = authRepository) {}

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.repository.login(credentials);
    this.setAuthData(response.token, response.user);
    return response;
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.repository.register(data);
  }

  logout(): void {
    this.clearAuthData();
  }

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const userJson = localStorage.getItem("auth_user");
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }

  setAuthData(token: string, user: User): void {
    if (typeof window === "undefined") return;
    httpService.setToken(token);
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    localStorage.setItem("auth_timestamp", new Date().toISOString());
  }

  clearAuthData(): void {
    if (typeof window === "undefined") return;
    httpService.clearToken();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_timestamp");
  }

  isAuthenticated(): boolean {
    return this.getStoredToken() !== null && this.getStoredUser() !== null;
  }
}

export const authService = new AuthService();

