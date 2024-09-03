"use client";

import { TTheme } from '@/types';
import React, {
  Context,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect
} from 'react';
import { usePathname } from 'next/navigation';

interface IMainContextProviderProps {
  children: JSX.Element; 
}

interface IMainContext {
  pageFindOpen: boolean;
  setPageFindOpen: Dispatch<SetStateAction<boolean>>;
  theme: TTheme;
  toggleTheme: (theme: TTheme) => void;
}

const defaultState: IMainContext = {
  pageFindOpen: false,
  setPageFindOpen: () => {},
  theme: 'dark',
  toggleTheme: (theme: TTheme) => {},
};

const MainContext: Context<IMainContext> = createContext<IMainContext>(defaultState);

export const MainContextProvider = ({ children }: IMainContextProviderProps) => {
  const [pageFindOpen, setPageFindOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<TTheme>('dark');
  const pathname = usePathname();
  
  const toggleTheme = (theme: TTheme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
    
    const css = document.createElement("style");

    css.appendChild(
      document.createTextNode(
        `* {
            -webkit-transition: none !important;
            -moz-transition: none !important;
            -o-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
        }
      `
      )
    );

    document.head.appendChild(css);

    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    const themeToApply = theme === 'system' ? systemPreference : theme;

    if (themeToApply === 'dark') {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
  };

  // preload theme
  useEffect(() => {
    function animate() {
      const animateElements = document.querySelectorAll<HTMLElement>(".animate");

      animateElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("show");
        }, index * 100);
      });
    }

    function onScroll() {
      if (window.scrollY > 0) {
        document.documentElement.classList.add("scrolled");
      } else {
        document.documentElement.classList.remove("scrolled");
      }
    }

    function init() {
      animate();
      onScroll();

      window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (localStorage.theme === "system") {
          toggleTheme('system');
        }
      });

      document.addEventListener("scroll", onScroll);
    }

    const storedTheme = localStorage.getItem('theme') as TTheme;
    toggleTheme(storedTheme);
    init();
    document.addEventListener("DOMContentLoaded", () => init());
  }, [pathname]);

  const contextValue: IMainContext = {
    pageFindOpen,
    setPageFindOpen,
    theme,
    toggleTheme
  };

  return (
    <MainContext.Provider value={contextValue}>
      {children}
    </MainContext.Provider>
  );
};

export function useMainContext() {
  return useContext(MainContext);
};
