import { httpService } from "./http.service";
import { API_CONFIG } from "@/config/api.config";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth.types";
import type { HttpResponse } from "@/types/api.types";

export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<LoginResponse>;
  register(data: RegisterRequest): Promise<RegisterResponse>;
}

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response: HttpResponse<LoginResponse> = await httpService.post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response: HttpResponse<RegisterResponse> = await httpService.post<RegisterResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  }
}

export const authRepository = new AuthRepository();

