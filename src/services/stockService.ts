import { StockData, ChartData, NewsItem } from '../types/stock';
import { format } from 'date-fns';

// Mock data for demonstration
const MOCK_STOCKS: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 168.25,
    change: 2.35,
    changePercent: 1.42,
    volume: 58492654,
    marketCap: '$2.65T',
    lastUpdated: '2 mins ago',
    open: 165.90,
    previousClose: 165.90,
    dayHigh: 168.96,
    dayLow: 165.76,
    yearHigh: 182.94,
    yearLow: 124.17,
    avgVolume: 63245871,
    pe: 27.8,
    dividend: {
      yield: 0.54,
      amount: 0.91,
    },
    eps: 6.05,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 385.78,
    change: 3.27,
    changePercent: 0.85,
    volume: 22436789,
    marketCap: '$2.87T',
    lastUpdated: '3 mins ago',
    open: 382.51,
    previousClose: 382.51,
    dayHigh: 386.30,
    dayLow: 380.12,
    yearHigh: 420.82,
    yearLow: 271.12,
    avgVolume: 24987123,
    pe: 33.4,
    dividend: {
      yield: 0.82,
      amount: 3.15,
    },
    eps: 11.54,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 174.63,
    change: -1.27,
    changePercent: -0.72,
    volume: 37129876,
    marketCap: '$1.81T',
    lastUpdated: '1 min ago',
    open: 175.90,
    previousClose: 175.90,
    dayHigh: 176.12,
    dayLow: 173.58,
    yearHigh: 189.77,
    yearLow: 101.15,
    avgVolume: 42568912,
    pe: 60.4,
    dividend: {
      yield: 0,
      amount: 0,
    },
    eps: 2.89,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 172.63,
    change: -3.51,
    changePercent: -1.99,
    volume: 107658932,
    marketCap: '$550.2B',
    lastUpdated: '1 min ago',
    open: 176.14,
    previousClose: 176.14,
    dayHigh: 177.20,
    dayLow: 171.98,
    yearHigh: 278.98,
    yearLow: 138.80,
    avgVolume: 98754213,
    pe: 46.8,
    dividend: {
      yield: 0,
      amount: 0,
    },
    eps: 3.69,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 153.51,
    change: 1.89,
    changePercent: 1.25,
    volume: 23654789,
    marketCap: '$1.93T',
    lastUpdated: '2 mins ago',
    open: 151.62,
    previousClose: 151.62,
    dayHigh: 154.12,
    dayLow: 151.34,
    yearHigh: 157.38,
    yearLow: 102.21,
    avgVolume: 25897423,
    pe: 23.6,
    dividend: {
      yield: 0,
      amount: 0,
    },
    eps: 6.50,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 472.93,
    change: 8.42,
    changePercent: 1.81,
    volume: 15874623,
    marketCap: '$1.21T',
    lastUpdated: '3 mins ago',
    open: 464.51,
    previousClose: 464.51,
    dayHigh: 475.12,
    dayLow: 463.87,
    yearHigh: 485.96,
    yearLow: 274.38,
    avgVolume: 16987452,
    pe: 31.2,
    dividend: {
      yield: 0,
      amount: 0,
    },
    eps: 15.16,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 824.45,
    change: 15.73,
    changePercent: 1.95,
    volume: 41236789,
    marketCap: '$2.03T',
    lastUpdated: '1 min ago',
    open: 808.72,
    previousClose: 808.72,
    dayHigh: 827.65,
    dayLow: 806.21,
    yearHigh: 974.00,
    yearLow: 373.26,
    avgVolume: 45879652,
    pe: 68.9,
    dividend: {
      yield: 0.03,
      amount: 0.25,
    },
    eps: 11.96,
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 198.89,
    change: -0.32,
    changePercent: -0.16,
    volume: 9856423,
    marketCap: '$570.4B',
    lastUpdated: '4 mins ago',
    open: 199.21,
    previousClose: 199.21,
    dayHigh: 200.15,
    dayLow: 198.30,
    yearHigh: 205.81,
    yearLow: 135.69,
    avgVolume: 10254789,
    pe: 12.1,
    dividend: {
      yield: 2.28,
      amount: 4.50,
    },
    eps: 16.44,
  },
];

// Generate mock chart data
const generateMockChartData = (symbol: string): ChartData => {
  const now = new Date();
  
  const generateTimeRangeData = (days: number, volatility: number, trend: number) => {
    const dates: string[] = [];
    const prices: number[] = [];
    const basePrice = MOCK_STOCKS.find(s => s.symbol === symbol)?.price || 100;
    
    let currentPrice = basePrice - (trend * days);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      dates.push(format(date, i === 0 ? 'HH:mm' : 'MMM dd'));
      
      // Add some random variation plus a trend
      const change = (Math.random() * 2 - 1) * volatility + trend;
      currentPrice = Math.max(0.01, currentPrice + change);
      prices.push(currentPrice);
    }
    
    return {
      dates,
      prices,
      open: prices[0],
      high: Math.max(...prices),
      low: Math.min(...prices),
      change: prices[prices.length - 1] - prices[0],
    };
  };

  return {
    '1D': generateTimeRangeData(1, 0.5, 0.1),
    '1W': generateTimeRangeData(7, 1, 0.2),
    '1M': generateTimeRangeData(30, 2, 0.4),
    '3M': generateTimeRangeData(90, 4, 1.2),
    '1Y': generateTimeRangeData(365, 8, 5),
    '5Y': generateTimeRangeData(1825, 15, 25),
  };
};

// Generate mock news items
const generateMockNews = (symbol: string): NewsItem[] => {
  const stockName = MOCK_STOCKS.find(s => s.symbol === symbol)?.name || symbol;
  
  return [
    {
      id: '1',
      title: `${stockName} Reports Strong Quarterly Earnings`,
      summary: `${stockName} exceeded analyst expectations with a 15% growth in revenue and 18% increase in earnings per share.`,
      url: '#',
      publishedDate: '2 hours ago',
      source: 'Financial Times',
      imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: '2',
      title: `Analysts Raise Price Target for ${stockName}`,
      summary: `Several Wall Street analysts have raised their price targets following strong performance and positive outlook.`,
      url: '#',
      publishedDate: '5 hours ago',
      source: 'Bloomberg',
      imageUrl: 'https://images.pexels.com/photos/6781341/pexels-photo-6781341.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: '3',
      title: `${stockName} Announces New Product Line`,
      summary: `The company is expanding its offerings with a new product line expected to launch in Q3 this year.`,
      url: '#',
      publishedDate: 'Yesterday',
      source: 'Reuters',
      imageUrl: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: '4',
      title: `${stockName} CEO Discusses Future Growth Strategy`,
      summary: `In a recent interview, the CEO outlined the company's plans for expansion into emerging markets and investments in new technologies.`,
      url: '#',
      publishedDate: '2 days ago',
      source: 'CNBC',
    },
  ];
};

// Mock API functions
export const getTrendingStocks = async (): Promise<StockData[]> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_STOCKS);
    }, 500);
  });
};

export const getStockData = async (symbol: string): Promise<StockData> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stock = MOCK_STOCKS.find(s => s.symbol === symbol.toUpperCase());
      if (stock) {
        resolve(stock);
      } else {
        // For demo purposes, return the first stock with modified symbol
        const mockStock = { ...MOCK_STOCKS[0], symbol: symbol.toUpperCase(), name: `${symbol.toUpperCase()} Inc.` };
        resolve(mockStock);
      }
    }, 300);
  });
};

export const getStockChartData = async (symbol: string): Promise<ChartData> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generateMockChartData(symbol));
    }, 500);
  });
};

export const getStockNews = async (symbol: string): Promise<NewsItem[]> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generateMockNews(symbol));
    }, 700);
  });
};

export const searchStocks = async (query: string): Promise<{ symbol: string; name: string }[]> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      const results = MOCK_STOCKS
        .filter(stock => 
          stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
          stock.name.toLowerCase().includes(query.toLowerCase())
        )
        .map(stock => ({ symbol: stock.symbol, name: stock.name }));
      resolve(results);
    }, 200);
  });
};