import React, { useState, useEffect } from 'react';
import StockSearch from '../components/stocks/StockSearch';
import StockCard from '../components/stocks/StockCard';
import { getTrendingStocks, getStockData } from '../services/stockService';
import { StockData } from '../types/stock';
import { WatchlistProvider } from '../contexts/WatchlistContext';
import { ArrowUp, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const [trendingStocks, setTrendingStocks] = useState<StockData[]>([]);
  const [topGainers, setTopGainers] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const trending = await getTrendingStocks();
        setTrendingStocks(trending);
        
        // Get top gainers (we'd normally fetch this from an API)
        // For now, we'll just sort our trending stocks by change percent
        const sortedByGain = [...trending].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4);
        setTopGainers(sortedByGain);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <WatchlistProvider>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Track & Visualize Stock Trends
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
            Real-time stock data, interactive charts, and market insights—all in one place.
          </p>
          
          <StockSearch />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Trending Stocks</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {trendingStocks.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold">Top Gainers Today</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {topGainers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} showDetails={false} />
                ))}
              </div>
            </section>
          </>
        )}

        {showScrollButton && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </WatchlistProvider>
  );
};

export default HomePage;