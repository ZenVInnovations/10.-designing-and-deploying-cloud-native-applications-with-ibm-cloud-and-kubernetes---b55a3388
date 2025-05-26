import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon, BriefcaseIcon, UserIcon, TrendingUpIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchTerm}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find Your Dream Job Today
              </h1>
              <p className="mt-4 text-lg sm:text-xl">
                Connect with top employers and discover opportunities that match your skills and aspirations.
              </p>
              
              <form onSubmit={handleSearch} className="mt-8 sm:flex sm:max-w-md">
                <div className="relative rounded-md shadow-sm flex-grow">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500"
                    placeholder="Search jobs, keywords, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="mt-3 sm:ml-3 sm:mt-0">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Search
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {user?.role === 'employer' ? (
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => navigate('/employer/post-job')}
                  >
                    Post a Job
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => navigate('/jobs')}
                  >
                    Browse All Jobs
                  </Button>
                )}
                
                {!user && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => navigate('/register')}
                  >
                    Create an Account
                  </Button>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Job seekers collaborating"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose JobQuest?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We're more than just a job board. We're a career partner committed to connecting talent with opportunity.
            </p>
          </div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Curated Job Listings
              </h3>
              <p className="text-gray-600">
                Access thousands of verified job postings from top companies across industries and locations.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <UserIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Personalized Experience
              </h3>
              <p className="text-gray-600">
                Get job recommendations tailored to your skills, experience, and career goals.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
                <TrendingUpIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Career Growth Tools
              </h3>
              <p className="text-gray-600">
                Access resources to help you build your resume, prepare for interviews, and advance your career.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take the next step in your career?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Join thousands of job seekers who have found their dream jobs through JobQuest.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/jobs')}
              >
                Browse Jobs
              </Button>
              {!user && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 hover:bg-gray-800"
                  onClick={() => navigate('/register')}
                >
                  Sign Up Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;