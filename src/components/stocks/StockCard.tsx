import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Star, Clock } from 'lucide-react';
import { StockData } from '../../types/stock';
import { useWatchlist } from '../../contexts/WatchlistContext';

interface StockCardProps {
  stock: StockData;
  showDetails?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ stock, showDetails = true }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isWatched = isInWatchlist(stock.symbol);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWatched) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  const priceChange = stock.changePercent;
  const isPositive = priceChange >= 0;

  return (
    <Link to={`/stock/${stock.symbol}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 h-full">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[180px]">{stock.name}</p>
          </div>
          <button
            onClick={toggleWatchlist}
            className={`p-1.5 rounded-full ${
              isWatched 
                ? 'text-yellow-500 bg-yellow-50 dark:bg-gray-700' 
                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
            aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Star className={`h-5 w-5 ${isWatched ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-end justify-between mt-4">
          <div>
            <span className="text-xl font-semibold">${stock.price.toFixed(2)}</span>
            <div className={`flex items-center text-sm ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>Last updated: {stock.lastUpdated}</span>
          </div>
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
              <p className="font-medium">{stock.volume.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
              <p className="font-medium">{stock.marketCap}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default StockCard;