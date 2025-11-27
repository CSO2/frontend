import { AxiosError } from 'axios';
import { ApiError } from '../api/types';

export class ApiException extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'ApiException';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): ApiException => {
  if (error instanceof ApiException) {
    return error;
  }

  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined;
    
    if (apiError) {
      return new ApiException(
        apiError.message || apiError.error || 'An error occurred',
        apiError.statusCode || error.response?.status || 500,
        apiError.details
      );
    }

    return new ApiException(
      error.message || 'Network error occurred',
      error.response?.status || 500
    );
  }

  if (error instanceof Error) {
    return new ApiException(error.message, 500);
  }

  return new ApiException('An unknown error occurred', 500);
};

export const getErrorMessage = (error: unknown): string => {
  const apiException = handleApiError(error);
  return apiException.message;
};
