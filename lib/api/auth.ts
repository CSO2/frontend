import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
  RefreshTokenResponse,
} from './types';
import { tokenManager } from '../utils/token';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.auth.login,
      credentials
    );
    
    const { accessToken } = response.data.data;
    tokenManager.setAccessToken(accessToken);
    
    return response.data.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.auth.signup,
      data
    );
    
    const { accessToken } = response.data.data;
    tokenManager.setAccessToken(accessToken);
    
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } finally {
      tokenManager.clearAccessToken();
    }
  },

  refreshToken: async (): Promise<string> => {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
      API_ENDPOINTS.auth.refresh
    );
    
    const { accessToken } = response.data.data;
    tokenManager.setAccessToken(accessToken);
    
    return accessToken;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.auth.me
    );
    
    return response.data.data;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.verifyEmail, { token });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.forgotPassword, { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.resetPassword, { token, password });
  },
};
