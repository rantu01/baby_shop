'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
      <button
        onClick={toggle}
        className="fixed bottom-20 right-4 z-50 glass-card p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary-600" />}
      </button>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
