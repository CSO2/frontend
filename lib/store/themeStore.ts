import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }));
      },
      setTheme: (theme) => {
        set(() => ({ theme }));
      },
      initializeTheme: () => {
        // Let persist middleware handle rehydration
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // If no stored theme, check system preference
        if (!state || !state.theme) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const theme = prefersDark ? 'dark' : 'light';
          useThemeStore.setState({ theme });
        }
      },
    }
  )
);
