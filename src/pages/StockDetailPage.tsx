import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Star, ArrowLeft } from 'lucide-react';
import StockChart from '../components/stocks/StockChart';
import StockMetrics from '../components/stocks/StockMetrics';
import StockNews from '../components/stocks/StockNews';
import { getStockData, getStockChartData, getStockNews } from '../services/stockService';
import { StockData, ChartData, NewsItem } from '../types/stock';
import { WatchlistProvider, useWatchlist } from '../contexts/WatchlistContext';

const StockDetailPageContent: React.FC = () => {
  const { symbol = '' } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const stockData = await getStockData(symbol);
        setStock(stockData);
        
        const chartData = await getStockChartData(symbol);
        setChartData(chartData);
        
        const newsData = await getStockNews(symbol);
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Could not retrieve stock data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleWatchlist = () => {
    if (!stock) return;
    
    if (isInWatchlist(stock.symbol)) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !stock || !chartData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {error || `Could not find data for ${symbol}`}
        </h2>
        <button
          onClick={handleBack}
          className="flex items-center justify-center mx-auto text-primary-600 dark:text-primary-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go back
        </button>
      </div>
    );
  }

  const isWatched = isInWatchlist(stock.symbol);
  const priceChange = stock.changePercent;
  const isPositive = priceChange >= 0;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>

      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold mr-3">{stock.symbol}</h1>
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
            <p className="text-gray-600 dark:text-gray-300 text-lg">{stock.name}</p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end text-lg ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-5 w-5 mr-1" />
              ) : (
                <ArrowDownRight className="h-5 w-5 mr-1" />
              )}
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({priceChange.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockChart symbol={stock.symbol} chartData={chartData} />
          
          <div className="mt-6">
            <StockNews news={news} />
          </div>
        </div>
        
        <div>
          <StockMetrics stock={stock} />
        </div>
      </div>
    </div>
  );
};

const StockDetailPage: React.FC = () => {
  return (
    <WatchlistProvider>
      <StockDetailPageContent />
    </WatchlistProvider>
  );
};

export default StockDetailPage;