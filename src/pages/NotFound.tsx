import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { HomeIcon } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-16">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
          Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            leftIcon={<HomeIcon className="h-4 w-4" />}
          >
            Go back home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;