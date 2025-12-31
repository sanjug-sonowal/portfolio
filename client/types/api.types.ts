export interface ApiResponse<T = unknown> {
  status: string;
  statusCode: number;
  message: string;
  timestamp?: string;
  data?: T;
}

export interface ApiError {
  status: string;
  statusCode: number;
  message: string;
  timestamp?: string;
  errors?: Record<string, string>;
}

export interface HttpRequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

