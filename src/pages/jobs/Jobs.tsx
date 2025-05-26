import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { JOB_TYPES, EXPERIENCE_LEVELS, JOB_LOCATIONS } from '../../config/constants';
import { useJobs } from '../../hooks/useJobs';
import JobCard from './components/JobCard';

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    experience: searchParams.get('experience') || '',
    location: searchParams.get('location') || '',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const { jobs, loading, error } = useJobs({
    search: searchTerm,
    ...filters,
  });
  
  // Update search params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    
    if (searchTerm) params.search = searchTerm;
    if (filters.type) params.type = filters.type;
    if (filters.experience) params.experience = filters.experience;
    if (filters.location) params.location = filters.location;
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, filters, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The searchTerm state will trigger the useEffect to update the URL
  };
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === prev[key] ? '' : value, // Toggle the filter if already selected
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      type: '',
      experience: '',
      location: '',
    });
  };
  
  const hasActiveFilters = Object.values(filters).some(Boolean);
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse through thousands of job openings tailored to your career goals
        </p>
      </div>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Search jobs, keywords, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            leftIcon={<Filter className="h-4 w-4" />}
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button type="submit" variant="primary" className="sm:w-auto">
            Search
          </Button>
        </div>
      </form>
      
      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Job Type Filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">Job Type</h4>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('type', type)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      filters.type === type
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Experience Level Filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">Experience Level</h4>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleFilterChange('experience', level)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      filters.experience === level
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Location Filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">Location</h4>
              <div className="flex flex-wrap gap-2">
                {JOB_LOCATIONS.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleFilterChange('location', location)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      filters.location === location
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Results */}
      <div className="mt-6">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-md bg-error-50 p-4 text-center">
            <p className="text-error-800">
              An error occurred while fetching jobs. Please try again.
            </p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filters to find more results.
            </p>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-sm text-gray-600">
              Found <span className="font-medium">{jobs.length}</span> jobs matching your criteria
            </p>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;