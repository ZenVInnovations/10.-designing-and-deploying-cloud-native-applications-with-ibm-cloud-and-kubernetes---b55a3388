import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Building, 
  DollarSign, 
  Users, 
  Globe, 
  Share2,
  BookmarkIcon,
  SendIcon,
  ArrowLeft
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useJob } from '../../hooks/useJob';
import { useAuth } from '../../context/AuthContext';
import ApplyModal from './components/ApplyModal';

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { job, loading, error } = useJob(id || '');
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-md bg-error-50 p-4 text-center">
          <p className="text-error-800">
            The job listing could not be found or has been removed.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/jobs')}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }
  
  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setShowApplyModal(true);
  };
  
  return (
    <>
      <div className="bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="mb-6"
              onClick={() => navigate('/jobs')}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Jobs
            </Button>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100">
                        {job.companyLogo ? (
                          <img 
                            src={job.companyLogo} 
                            alt={job.company} 
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <Building className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-lg text-gray-600">{job.company}</p>
                        
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Briefcase className="mr-1 h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                        {job.salary}
                      </span>
                      <span className="mt-2 text-sm text-gray-500">
                        {job.applications} applicants
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2 sm:hidden">
                    <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                      {job.salary}
                    </span>
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                      {job.applications} applicants
                    </span>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    {user?.role === 'jobSeeker' ? (
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={handleApply}
                        leftIcon={<SendIcon className="h-4 w-4" />}
                      >
                        Apply Now
                      </Button>
                    ) : user?.role === 'employer' ? (
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => {}}
                        leftIcon={<SendIcon className="h-4 w-4" />}
                        disabled
                      >
                        Employers Cannot Apply
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={handleApply}
                        leftIcon={<SendIcon className="h-4 w-4" />}
                      >
                        Apply Now
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {}}
                      leftIcon={<BookmarkIcon className="h-4 w-4" />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {}}
                      leftIcon={<Share2 className="h-4 w-4" />}
                    >
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
                  <div className="mt-4 prose prose-blue max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                  </div>
                  
                  <h3 className="mt-8 text-lg font-semibold text-gray-900">Requirements</h3>
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  
                  <h3 className="mt-8 text-lg font-semibold text-gray-900">Responsibilities</h3>
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-600">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                  
                  <h3 className="mt-8 text-lg font-semibold text-gray-900">Required Skills</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">Job Overview</h3>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Salary Range</p>
                        <p className="text-sm text-gray-500">{job.salary}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Job Type</p>
                        <p className="text-sm text-gray-500">{job.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Experience Level</p>
                        <p className="text-sm text-gray-500">{job.experience}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Posted On</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(job.postedAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Closing Date</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(job.closingDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">About {job.company}</h3>
                  
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-600">{job.companyDescription}</p>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Website</p>
                        <a
                          href={job.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-500"
                        >
                          {job.companyWebsite.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-primary-50 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary-900">Similar Jobs</h3>
                  
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-primary-700">
                      Find more jobs like this one.
                    </p>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate('/jobs')}
                      className="bg-white"
                    >
                      Browse Similar Jobs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {showApplyModal && (
        <ApplyModal
          jobId={job.id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  );
}

export default JobDetails;