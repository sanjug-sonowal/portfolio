import { authService } from "@/services/auth.service";
import type { User } from "@/types/auth.types";

export function getStoredUser(): User | null {
  return authService.getStoredUser();
}

export function getStoredToken(): string | null {
  return authService.getStoredToken();
}

export function isAuthenticated(): boolean {
  return authService.isAuthenticated();
}

export function getUserEmail(): string | null {
  const user = getStoredUser();
  return user?.email || null;
}

export function getUserName(): string | null {
  const user = getStoredUser();
  return user?.name || null;
}

export function getUserId(): number | null {
  const user = getStoredUser();
  return user?.id || null;
}

