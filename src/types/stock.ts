export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  lastUpdated: string;
  open: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  yearHigh: number;
  yearLow: number;
  avgVolume: number;
  pe: number;
  dividend: {
    yield: number;
    amount: number;
  };
  eps: number;
}

export interface TimeRangeData {
  dates: string[];
  prices: number[];
  open: number;
  high: number;
  low: number;
  change: number;
}

export interface ChartData {
  '1D': TimeRangeData;
  '1W': TimeRangeData;
  '1M': TimeRangeData;
  '3M': TimeRangeData;
  '1Y': TimeRangeData;
  '5Y': TimeRangeData;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedDate: string;
  source: string;
  imageUrl?: string;
}