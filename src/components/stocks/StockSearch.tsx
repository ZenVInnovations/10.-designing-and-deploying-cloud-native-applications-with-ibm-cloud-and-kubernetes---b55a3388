import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchStocks } from '../../services/stockService';

const StockSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ symbol: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await searchStocks(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } catch (error) {
        console.error('Error fetching stock suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/stock/${query.trim().toUpperCase()}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder="Search for stocks (e.g., AAPL, TSLA, AMZN)"
          className="w-full py-3 px-4 pr-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          {query ? (
            <button
              type="button"
              onClick={handleClearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : (
            <Search size={18} className="text-gray-400" />
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : (
            <>
              {suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((stock) => (
                    <li key={stock.symbol} className="border-b last:border-0 border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => handleSuggestionClick(stock.symbol)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate ml-2">{stock.name}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                query.length >= 2 && (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No stocks found matching "{query}"
                  </div>
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StockSearch;