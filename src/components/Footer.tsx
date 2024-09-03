"use client";

import React from 'react';
import Container from './Container';
import { SITE } from '../consts';
import BackToTop from './BackToTop';
import ThemeButton from './ThemeButton';
import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from './Icons';
import { useMainContext } from '@/app/hooks/mainContext';
import { TTheme } from '@/types';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useMainContext();

  const handleThemeButtonClick = (theme: TTheme) => () => {
    toggleTheme(theme);
  }

  return (
    <footer className="animate">
      <Container>
        <div className="relative">
          <div className="absolute -top-12 right-0">
            <BackToTop />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>&copy; 2024 • {SITE.TITLE}</div>
          <div className="flex flex-wrap items-center gap-1.5">
            <ThemeButton onClick={handleThemeButtonClick('light')} id="light-theme-button" aria="Light theme" active={theme === 'light'}>
              <LightThemeIcon />
            </ThemeButton>
            <ThemeButton onClick={handleThemeButtonClick('dark')} id="dark-theme-button" aria="Dark theme" active={theme === 'dark'}>
              <DarkThemeIcon />
            </ThemeButton>
            <ThemeButton onClick={handleThemeButtonClick('system')} id="system-theme-button" aria="System theme" active={theme === 'system'}>
              <SystemThemeIcon />
            </ThemeButton>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
