import React, { useEffect } from 'react';

const Giscus: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'trevortylerlee/astro-micro');
    script.setAttribute('data-repo-id', 'R_kgDOL_6l9Q');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOL_6l9c4Cfk55');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    
    document.querySelector('.giscus')?.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.querySelector('.giscus')?.removeChild(script);
    };
  }, []);

  return <div className="giscus"></div>;
};

export default Giscus;
