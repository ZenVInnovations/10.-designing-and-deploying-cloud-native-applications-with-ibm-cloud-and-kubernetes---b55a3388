import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  UserIcon,
  MailIcon,
  PhoneIcon,
  FileIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
  MessageSquareIcon,
  EyeIcon,
  FilterIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { mockJobs } from '../../mocks/jobData';

// Mock applicant data
const mockApplicants = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    appliedAt: new Date(2023, 6, 15).toISOString(),
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am excited to apply for this position...',
    status: 'Pending',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Taylor Smith',
    email: 'taylor.smith@example.com',
    phone: '(555) 234-5678',
    appliedAt: new Date(2023, 6, 14).toISOString(),
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'With my experience in this field...',
    status: 'Reviewed',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    phone: '(555) 345-6789',
    appliedAt: new Date(2023, 6, 13).toISOString(),
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I believe I would be a great fit for this role...',
    status: 'Interview',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Casey Martinez',
    email: 'casey.martinez@example.com',
    phone: '(555) 456-7890',
    appliedAt: new Date(2023, 6, 12).toISOString(),
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am writing to express my interest in the position...',
    status: 'Rejected',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    name: 'Sam Wilson',
    email: 'sam.wilson@example.com',
    phone: '(555) 567-8901',
    appliedAt: new Date(2023, 6, 11).toISOString(),
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am confident that my skills and experience...',
    status: 'Offer',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

function Applicants() {
  const { jobId } = useParams<{ jobId: string }>();
  const [loading, setLoading] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [applicants] = useState(mockApplicants);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Find the job details
  const job = mockJobs.find(job => job.id === jobId);
  
  const handleStatusChange = (applicantId: string, newStatus: string) => {
    // In a real app, we would make an API call to update the status
    console.log(`Changing status for applicant ${applicantId} to ${newStatus}`);
  };
  
  const handleFilter = (status: string) => {
    setStatusFilter(status);
    // In a real app, we would filter the applicants based on status
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-warning-500" />;
      case 'Reviewed':
        return <EyeIcon className="h-5 w-5 text-primary-500" />;
      case 'Interview':
        return <MessageSquareIcon className="h-5 w-5 text-accent-500" />;
      case 'Offer':
        return <CheckIcon className="h-5 w-5 text-success-500" />;
      case 'Rejected':
        return <XIcon className="h-5 w-5 text-error-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning-100 text-warning-800';
      case 'Reviewed':
        return 'bg-primary-100 text-primary-800';
      case 'Interview':
        return 'bg-accent-100 text-accent-800';
      case 'Offer':
        return 'bg-success-100 text-success-800';
      case 'Rejected':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md bg-error-50 p-4 text-center">
          <p className="text-error-800">
            Job not found. Please check the URL and try again.
          </p>
          <Link
            to="/employer/manage-jobs"
            className="mt-4 inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Back to Manage Jobs
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Applicants for {job.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review and manage candidates who have applied for this position
          </p>
        </div>
        <div className="mt-4 flex flex-col space-y-2 sm:mt-0 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<FilterIcon className="h-4 w-4" />}
          >
            {showFilters ? 'Hide Filters' : 'Filter'}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = `/jobs/${jobId}`}
            leftIcon={<EyeIcon className="h-4 w-4" />}
          >
            View Job Posting
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilter('all')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilter('Pending')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'Pending'
                  ? 'bg-warning-100 text-warning-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleFilter('Reviewed')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'Reviewed'
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Reviewed
            </button>
            <button
              onClick={() => handleFilter('Interview')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'Interview'
                  ? 'bg-accent-100 text-accent-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Interview
            </button>
            <button
              onClick={() => handleFilter('Offer')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'Offer'
                  ? 'bg-success-100 text-success-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Offer
            </button>
            <button
              onClick={() => handleFilter('Rejected')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'Rejected'
                  ? 'bg-error-100 text-error-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Applicants List */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h3 className="text-lg font-medium text-gray-900">
                Applicants ({applicants.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {applicants.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No applicants found.
                </div>
              ) : (
                applicants.map((applicant) => (
                  <button
                    key={applicant.id}
                    className={`block w-full px-4 py-3 text-left hover:bg-gray-50 ${
                      selectedApplicant?.id === applicant.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedApplicant(applicant)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {applicant.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={applicant.avatar}
                            alt={applicant.name}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied on {format(new Date(applicant.appliedAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {getStatusIcon(applicant.status)}
                          <span className="ml-1 hidden sm:inline">{applicant.status}</span>
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedApplicant ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Applicant Details
                  </h3>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedApplicant.status)}`}>
                    {getStatusIcon(selectedApplicant.status)}
                    <span className="ml-1">{selectedApplicant.status}</span>
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0">
                    {selectedApplicant.avatar ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={selectedApplicant.avatar}
                        alt={selectedApplicant.name}
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                        <UserIcon className="h-8 w-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedApplicant.name}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MailIcon className="mr-1 h-4 w-4" />
                        <a href={`mailto:${selectedApplicant.email}`} className="text-primary-600 hover:text-primary-900">
                          {selectedApplicant.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="mr-1 h-4 w-4" />
                        <a href={`tel:${selectedApplicant.phone}`} className="text-primary-600 hover:text-primary-900">
                          {selectedApplicant.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Applied For</h4>
                    <p className="mt-1 text-sm text-gray-900">{job.title}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Application Date</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {format(new Date(selectedApplicant.appliedAt), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500">Resume</h4>
                  <div className="mt-1 flex items-center">
                    <FileIcon className="mr-2 h-5 w-5 text-gray-400" />
                    <a
                      href={selectedApplicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      View Resume
                    </a>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
                  <div className="mt-1 rounded-md border border-gray-200 bg-gray-50 p-4">
                    <p className="whitespace-pre-line text-sm text-gray-700">
                      {selectedApplicant.coverLetter}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium text-gray-500">Update Application Status</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      variant={selectedApplicant.status === 'Pending' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(selectedApplicant.id, 'Pending')}
                      leftIcon={<ClockIcon className="h-4 w-4" />}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={selectedApplicant.status === 'Reviewed' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(selectedApplicant.id, 'Reviewed')}
                      leftIcon={<EyeIcon className="h-4 w-4" />}
                    >
                      Reviewed
                    </Button>
                    <Button
                      variant={selectedApplicant.status === 'Interview' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(selectedApplicant.id, 'Interview')}
                      leftIcon={<MessageSquareIcon className="h-4 w-4" />}
                    >
                      Interview
                    </Button>
                    <Button
                      variant={selectedApplicant.status === 'Offer' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(selectedApplicant.id, 'Offer')}
                      leftIcon={<CheckIcon className="h-4 w-4" />}
                    >
                      Offer
                    </Button>
                    <Button
                      variant={selectedApplicant.status === 'Rejected' ? 'danger' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(selectedApplicant.id, 'Rejected')}
                      leftIcon={<XIcon className="h-4 w-4" />}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => {}}
                  >
                    Contact Applicant
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="text-center">
                <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Select an applicant
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Click on an applicant from the list to view their details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Applicants;