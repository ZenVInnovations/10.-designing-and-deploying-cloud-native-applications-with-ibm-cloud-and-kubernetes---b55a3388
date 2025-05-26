import { StockData, ChartData, NewsItem } from '../types/stock';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getTrendingStocks = async (): Promise<StockData[]> => {
  try {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM'];
    const stocks = await Promise.all(symbols.map(symbol => getStockData(symbol)));
    return stocks;
  } catch (error) {
    console.error('Error fetching trending stocks:', error);
    throw error;
  }
};

export const getStockData = async (symbol: string): Promise<StockData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stock/${symbol}`);
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
};

export const getStockNews = async (symbol: string): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${symbol}`);
    if (!response.ok) {
      throw new Error('Failed to fetch stock news');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error);
    throw error;
  }
};

export const searchStocks = async (query: string): Promise<{ symbol: string; name: string }[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/${query}`);
    if (!response.ok) {
      throw new Error('Failed to search stocks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};