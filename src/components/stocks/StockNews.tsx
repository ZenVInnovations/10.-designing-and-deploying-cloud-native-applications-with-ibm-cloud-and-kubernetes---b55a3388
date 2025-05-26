import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { NewsItem } from '../../types/stock';

interface StockNewsProps {
  news: NewsItem[];
}

const StockNews: React.FC<StockNewsProps> = ({ news }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-4">Latest News</h3>
      
      <div className="space-y-4">
        {news.length > 0 ? (
          news.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                {item.imageUrl && (
                  <div className="w-20 h-16 flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.publishedDate}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <p>No news articles available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockNews;