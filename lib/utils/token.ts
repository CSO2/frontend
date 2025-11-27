let accessToken: string | null = null;

export const tokenManager = {
  getAccessToken: (): string | null => {
    return accessToken;
  },

  setAccessToken: (token: string | null): void => {
    accessToken = token;
  },

  clearAccessToken: (): void => {
    accessToken = null;
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch {
      return true;
    }
  },

  getTokenExpiry: (token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000;
    } catch {
      return null;
    }
  },
};
