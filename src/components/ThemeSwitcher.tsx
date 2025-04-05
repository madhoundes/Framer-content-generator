import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import Icon from './ui/icon';

type Theme = 'light' | 'dark' | 'system';

const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme('system');
      applyTheme(systemPreference);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const resolvedTheme = newTheme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : newTheme;

    if (resolvedTheme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button 
      id="theme-switcher-btn"
      onClick={toggleTheme}
      variant="ghost"
      className="theme-switcher flex items-center"
    >
      <Icon 
        name={theme === 'dark' ? 'sun' : 'moon'} 
        id="theme-icon" 
        className="mr-2 rtl:ml-2 rtl:mr-0" 
        size={18} 
      />
      {theme === 'dark' ? t('common.light') : t('common.dark')}
    </Button>
  );
};

export default ThemeSwitcher; 