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
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );
    
    const { accessToken, refreshToken } = response.data;
    tokenManager.setAccessToken(accessToken);
    tokenManager.setRefreshToken(refreshToken);
    
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.auth.signup,
      data
    );
    
    const { accessToken, refreshToken } = response.data;
    tokenManager.setAccessToken(accessToken);
    tokenManager.setRefreshToken(refreshToken);
    
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      tokenManager.clearAccessToken();
      tokenManager.clearRefreshToken();
    } finally {
      tokenManager.clearAccessToken();
      tokenManager.clearRefreshToken();
    }
  },

  refreshToken: async (): Promise<string> => {
    const refreshToken = tokenManager.getRefreshToken();
    const response = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.auth.refresh,
      { refreshToken }
    );
    
    const { accessToken } = response.data;
    tokenManager.setAccessToken(accessToken);
    
    return accessToken;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>(
      API_ENDPOINTS.auth.me
    );
    
    return response.data;
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
