"use client";

import React, { useEffect, useState } from 'react';
import Giscus from '@giscus/react';
import { useMainContext } from '@/app/hooks/mainContext';

const Comments: React.FC = () => {
  const { theme } = useMainContext();
  const [themeToApply, setThemeToApply] = useState('dark');

  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    setThemeToApply(theme === 'system' ? systemPreference : theme);
  }, [theme]);

  return <Giscus
    repo="trevortylerlee/astro-micro"
    repoId="R_kgDOL_6l9Q"
    category="Announcements"
    categoryId="DIC_kwDOL_6l9c4Cfk55"
    mapping="pathname"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme={themeToApply === "dark" ? "transparent_dark" : "light"}
    loading="lazy"
  />
};

export default Comments;
