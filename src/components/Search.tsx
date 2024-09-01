import React, { useState, useEffect } from 'react';

interface UIOptions {
  showImages?: boolean;
  excerptLength?: number;
  resetStyles?: boolean;
}

interface SearchProps {
  id?: string;
  className?: string;
  uiOptions?: UIOptions;
}

const Search: React.FC<SearchProps> = ({ id, className, uiOptions }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ title: string; excerpt: string; image?: string }[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      // Simulação de busca - substitua com lógica de busca real
      const mockResults = [
        {
          title: 'Result 1 for ' + query,
          excerpt: 'This is an excerpt for the first result, describing it briefly.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Result 2 for ' + query,
          excerpt: 'This is a longer excerpt that goes into more detail about the result.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Result 3 for ' + query,
          excerpt: 'Another brief excerpt for the third result.',
          image: 'https://via.placeholder.com/150',
        },
      ].map(result => ({
        ...result,
        excerpt: result.excerpt.slice(0, uiOptions?.excerptLength || 100),
      }));

      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [query, uiOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div id={id} className={className}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className={`w-full p-2 border rounded ${uiOptions?.resetStyles ? '' : 'bg-gray-50'}`}
      />
      {results.length > 0 && (
        <div className="mt-2 border rounded p-2 bg-white dark:bg-gray-800">
          <ul>
            {results.map((result, index) => (
              <li key={index} className="p-2 border-b last:border-none">
                <div className="flex items-start">
                  {uiOptions?.showImages && result.image && (
                    <img src={result.image} alt={result.title} className="w-10 h-10 mr-2" />
                  )}
                  <div>
                    <div className="font-bold">{result.title}</div>
                    <div className="text-sm">{result.excerpt}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
