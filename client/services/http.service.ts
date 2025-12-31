import { API_CONFIG } from "@/config/api.config";
import type { ApiError, HttpRequestConfig, HttpResponse } from "@/types/api.types";

export class HttpService {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  private getHeaders(customHeaders?: Record<string, string>): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: T | ApiError;
    try {
      data = isJson ? await response.json() : ((await response.text()) as T);
    } catch (error) {
      if (!response.ok) {
        throw new HttpError(
          `Request failed with status ${response.status}: ${response.statusText}`,
          response.status
        );
      }
      throw new HttpError("Failed to parse response", response.status);
    }

    if (!response.ok) {
      const error = data as ApiError;
      const errorMessage = error.message || `Request failed with status ${response.status}`;
      throw new HttpError(
        errorMessage,
        response.status,
        error
      );
    }

    return {
      data: data as T,
      status: response.status,
      statusText: response.statusText,
    };
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: "GET",
      ...config,
    });
  }

  async post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: "DELETE",
      ...config,
    });
  }

  private async request<T>(url: string, config: RequestInit & HttpRequestConfig): Promise<HttpResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || this.defaultTimeout);

    try {
      const fullUrl = url.startsWith("http") ? url : `${this.baseURL}${url}`;
      const response = await fetch(fullUrl, {
        ...config,
        headers: this.getHeaders(config.headers as Record<string, string>),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof HttpError) {
        throw error;
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new HttpError("Request timeout. Please check your connection.", 408);
      }
      
      let errorMessage = "Network error. Please check:";
      errorMessage += "\n1. Is the backend server running on " + this.baseURL + "?";
      errorMessage += "\n2. Check your internet connection";
      errorMessage += "\n3. Verify CORS configuration on the backend";
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = `Cannot connect to ${this.baseURL}. Make sure the backend server is running.`;
      }
      
      throw new HttpError(errorMessage, 0, error);
    }
  }

  setToken(token: string | null): void {
    if (typeof window === "undefined") return;
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  clearToken(): void {
    this.setToken(null);
  }
}

export class HttpError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const httpService = new HttpService();

