import React, { useState, useEffect } from 'react';
import { Star, Settings, Trash } from 'lucide-react';
import StockCard from '../components/stocks/StockCard';
import { getStockData } from '../services/stockService';
import { StockData } from '../types/stock';
import { WatchlistProvider, useWatchlist } from '../contexts/WatchlistContext';

const WatchlistPageContent: React.FC = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (watchlist.length === 0) {
        setStocks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const stocksData = await Promise.all(
          watchlist.map(symbol => getStockData(symbol))
        );
        setStocks(stocksData);
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistData();
  }, [watchlist]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Star className="h-6 w-6 text-yellow-500 mr-2 fill-current" />
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
        </div>
        
        <button
          onClick={toggleEditMode}
          className="flex items-center px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isEditing ? (
            <>
              <span>Done</span>
            </>
          ) : (
            <>
              <Settings className="h-4 w-4 mr-1" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {stocks.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
              {stocks.map((stock) => (
                <div key={stock.symbol} className="relative group">
                  {isEditing && (
                    <button
                      onClick={() => removeFromWatchlist(stock.symbol)}
                      className="absolute -top-2 -right-2 z-10 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                      aria-label={`Remove ${stock.symbol} from watchlist`}
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <StockCard stock={stock} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Star className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">
                Your watchlist is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Add stocks to your watchlist to track them here
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const WatchlistPage: React.FC = () => {
  return (
    <WatchlistProvider>
      <WatchlistPageContent />
    </WatchlistProvider>
  );
};

export default WatchlistPage;