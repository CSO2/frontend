'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/themeStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  // Apply theme to DOM whenever it changes - only after mounted
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('dark', 'light');
    
    // Add the current theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
