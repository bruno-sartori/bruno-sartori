"use client";

import React, { useEffect, useRef } from 'react';
import Search from '@/components/Search';
import { useMainContext } from '@/app/hooks/mainContext';

const PageFind: React.FC = () => {
  const { pageFindOpen, setPageFindOpen } = useMainContext();
  const backdropRef = useRef<HTMLDivElement>(null);
    
  const onBackdropClick = (e: any) => {
    if (!(e.target as Element).closest('#pagefind-container')) {
      setPageFindOpen(false);
    }
  };

  useEffect(() => {
    const openPagefind = () => {
      setPageFindOpen(true);
    };

    const closePagefind = () => {
      setPageFindOpen(false);
    };

    const onDocKeydown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        openPagefind();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openPagefind();
      } else if (e.key === 'Escape' || e.keyCode === 27) {
        closePagefind();
      }
    };

    const onDocClick = (e: MouseEvent) => {
      if ((e.target as Element).classList.contains('pagefind-ui__result-link')) {
        closePagefind();
      }
    };

    document.addEventListener('keydown', onDocKeydown);
    document.addEventListener('click', onDocClick);

    return () => {
      document.removeEventListener('keydown', onDocKeydown);
      document.removeEventListener('click', onDocClick);
    };
  });

  return (
    <aside>
      <div
        ref={backdropRef}
        onClick={onBackdropClick}
        id="backdrop"
        className={`bg-[rgba(0, 0, 0, 0.5)] ${pageFindOpen ? 'visible' : 'invisible'} fixed left-0 top-0 z-50 flex h-screen w-full justify-center p-6 backdrop-blur-sm`}
      >
        <div
          id="pagefind-container"
          className="m-0 flex h-fit max-h-[80%] w-full max-w-screen-sm flex-col overflow-auto rounded border border-black/15 bg-neutral-100 p-2 px-4 py-3 shadow-lg dark:border-white/20 dark:bg-neutral-900"
        >
          <Search
            id="search"
            className="pagefind-ui"
            open={pageFindOpen}
            uiOptions={{
              showImages: true,
              excerptLength: 15,
              resetStyles: true,
            }}
          />
          <div className="mr-2 pb-1 pt-4 text-right text-xs dark:prose-invert">
            Press{' '}
            <span className="prose text-xs dark:prose-invert">
              <kbd>Esc</kbd>
            </span>{' '}
            or click anywhere to close
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PageFind;
