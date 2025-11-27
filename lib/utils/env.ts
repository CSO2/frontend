export const shouldUseApi = (): boolean => {
  return process.env.NEXT_PUBLIC_USE_API === 'true';
};

export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
};
