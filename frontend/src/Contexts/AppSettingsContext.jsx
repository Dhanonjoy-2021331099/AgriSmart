import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const AppSettingsContext = createContext(null);

export function AppSettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'bangla');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'bangla' ? 'english' : 'bangla'));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const getText = useCallback(
    (banglaText, englishText) => (language === 'bangla' ? banglaText : englishText || banglaText),
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      theme,
      toggleLanguage,
      toggleTheme,
      getText,
    }),
    [language, theme, toggleLanguage, toggleTheme, getText],
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

AppSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
}

