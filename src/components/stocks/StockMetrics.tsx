import React from 'react';
import { StockData } from '../../types/stock';

interface StockMetricsProps {
  stock: StockData;
}

const StockMetrics: React.FC<StockMetricsProps> = ({ stock }) => {
  const metrics = [
    { label: 'Previous Close', value: `$${stock.previousClose.toFixed(2)}` },
    { label: 'Open', value: `$${stock.open.toFixed(2)}` },
    { label: 'Day Range', value: `$${stock.dayLow.toFixed(2)} - $${stock.dayHigh.toFixed(2)}` },
    { label: '52 Week Range', value: `$${stock.yearLow.toFixed(2)} - $${stock.yearHigh.toFixed(2)}` },
    { label: 'Volume', value: stock.volume.toLocaleString() },
    { label: 'Avg. Volume', value: stock.avgVolume.toLocaleString() },
    { label: 'Market Cap', value: stock.marketCap },
    { label: 'P/E Ratio', value: stock.pe.toFixed(2) },
    { label: 'Dividend', value: `${stock.dividend.yield.toFixed(2)}% ($${stock.dividend.amount.toFixed(2)})` },
    { label: 'EPS', value: `$${stock.eps.toFixed(2)}` },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-4">Key Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="border-b border-gray-100 dark:border-gray-700 pb-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
              <span className="font-medium">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockMetrics;