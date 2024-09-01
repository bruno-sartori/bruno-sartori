import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Search = dynamic(() => import('@/components/Search'), { ssr: false });

const SearchComponent: React.FC = () => {
  useEffect(() => {
    const magnifyingGlass = document.getElementById('magnifying-glass');
    const backdrop = document.getElementById('backdrop');

    const openPagefind = () => {
      const searchDiv = document.getElementById('search');
      const search = searchDiv?.querySelector('input');
      setTimeout(() => {
        search?.focus();
      }, 0);
      backdrop?.classList.remove('invisible');
      backdrop?.classList.add('visible');
    };

    const closePagefind = () => {
      const search = document.getElementById('search') as HTMLInputElement;
      if (search) {
        search.value = '';
      }
      backdrop?.classList.remove('visible');
      backdrop?.classList.add('invisible');
    };

    magnifyingGlass?.addEventListener('click', openPagefind);

    document.addEventListener('keydown', (e) => {
      if (e.key === '/') {
        e.preventDefault();
        openPagefind();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openPagefind();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        closePagefind();
      }
    });

    document.addEventListener('click', (event) => {
      if ((event.target as Element).classList.contains('pagefind-ui__result-link')) {
        closePagefind();
      }
    });

    backdrop?.addEventListener('click', (event) => {
      if (!(event.target as Element).closest('#pagefind-container')) {
        closePagefind();
      }
    });

    const form = document.getElementById('form');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    return () => {
      magnifyingGlass?.removeEventListener('click', openPagefind);
      backdrop?.removeEventListener('click', closePagefind);
    };
  }, []);

  return (
    <aside data-pagefind-ignore>
      <div
        id="backdrop"
        className="bg-[rgba(0, 0, 0, 0.5)] invisible fixed left-0 top-0 z-50 flex h-screen w-full justify-center p-6 backdrop-blur-sm"
      >
        <div
          id="pagefind-container"
          className="m-0 flex h-fit max-h-[80%] w-full max-w-screen-sm flex-col overflow-auto rounded border border-black/15 bg-neutral-100 p-2 px-4 py-3 shadow-lg dark:border-white/20 dark:bg-neutral-900"
        >
          <Search
            id="search"
            className="pagefind-ui"
            uiOptions={{
              showImages: false,
              excerptLength: 15,
              resetStyles: false,
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

export default SearchComponent;
