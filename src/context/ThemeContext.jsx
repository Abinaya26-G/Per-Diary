import React from 'react';

const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export function ThemeProvider(props) {
  const themeState = React.useState('light');
  const theme = themeState[0];
  const setTheme = themeState[1];

  React.useEffect(function() {
    const saved = localStorage.getItem('diary-theme');
    if (saved) {
      setTheme(saved);
    }
  }, []);

  React.useEffect(function() {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('diary-theme', theme);
  }, [theme]);

  const toggleTheme = function() {
    setTheme(function(prev) {
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}