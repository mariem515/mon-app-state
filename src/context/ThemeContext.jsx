import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('app_theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}