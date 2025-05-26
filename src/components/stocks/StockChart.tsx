import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TimeRange, ChartData } from '../../types/stock';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockChartProps {
  symbol: string;
  chartData: ChartData;
}

const StockChart: React.FC<StockChartProps> = ({ symbol, chartData }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  
  // Filter data based on selected time range
  const filteredData = chartData[timeRange];
  
  const data = {
    labels: filteredData.dates,
    datasets: [
      {
        label: symbol,
        data: filteredData.prices,
        borderColor: filteredData.change >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: filteredData.change >= 0 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toFixed(2);
          },
          color: '#9ca3af',
        },
      },
    },
  };

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '1Y', label: '1Y' },
    { value: '5Y', label: '5Y' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Price Chart</h3>
        <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-3 py-1 text-sm ${
                timeRange === option.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] md:h-[400px]">
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Open</p>
          <p className="font-medium">${filteredData.open.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
          <p className="font-medium">${filteredData.high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
          <p className="font-medium">${filteredData.low.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default StockChart;