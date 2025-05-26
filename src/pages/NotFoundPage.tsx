import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        <Home className="mr-2 h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;