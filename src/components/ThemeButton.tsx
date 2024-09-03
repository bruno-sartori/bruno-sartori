import React from 'react';

interface ThemeButtonProps {
  id: string;
  aria: string;
  active: boolean;
  onClick: () => void;
  children: JSX.Element;
}

const ThemeButton = ({ id, aria, children, active, onClick }: ThemeButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={aria}
      className={`group flex size-9 items-center justify-center rounded border border-black/15 hover:bg-black/5 focus-visible:bg-black/5 dark:border-white/20 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 ${active ? 'bg-black/5 dark:bg-white/5' : ''}`}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
