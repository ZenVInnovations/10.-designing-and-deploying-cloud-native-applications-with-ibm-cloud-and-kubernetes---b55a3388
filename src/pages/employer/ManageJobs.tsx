import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UsersIcon,
  ExternalLinkIcon,
  FilterIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { mockJobs } from '../../mocks/jobData';
import { Job } from '../../types/job';

function ManageJobs() {
  // Filter jobs to only show those posted by the current employer
  // In a real application, this would be based on the user's ID
  const [jobs, setJobs] = useState<Job[]>(mockJobs.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleDelete = () => {
    if (!selectedJob) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setJobs(jobs.filter(job => job.id !== selectedJob.id));
      setShowDeleteModal(false);
      setSelectedJob(null);
      setLoading(false);
    }, 1000);
  };
  
  const handleFilter = (status: string) => {
    setStatusFilter(status);
    // In a real app, we would filter the jobs based on status
  };
  
  if (loading && !selectedJob) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
          <p className="mt-2 text-lg text-gray-600">
            View, edit, and manage your job postings
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
            variant="primary"
            onClick={() => window.location.href = '/employer/post-job'}
            leftIcon={<PlusIcon className="h-4 w-4" />}
          >
            Post a New Job
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
              onClick={() => handleFilter('active')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'active'
                  ? 'bg-success-100 text-success-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleFilter('expired')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'expired'
                  ? 'bg-error-100 text-error-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Expired
            </button>
            <button
              onClick={() => handleFilter('draft')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                statusFilter === 'draft'
                  ? 'bg-warning-100 text-warning-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Draft
            </button>
          </div>
        </motion.div>
      )}
      
      {jobs.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <BriefcaseIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-2 text-gray-500">
            You haven't posted any jobs yet or no jobs match your filter criteria.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={() => window.location.href = '/employer/post-job'}
            >
              Post Your First Job
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Posted Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Closing Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Applicants
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {jobs.map((job) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {job.companyLogo ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={job.companyLogo}
                              alt={job.company}
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                              <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {job.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.location} • {job.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-success-100 px-2.5 py-0.5 text-xs font-medium text-success-800">
                        Active
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {format(new Date(job.postedAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {format(new Date(job.closingDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <Link
                        to={`/employer/applicants/${job.id}`}
                        className="flex items-center text-primary-600 hover:text-primary-900"
                      >
                        <UsersIcon className="mr-1 h-4 w-4" />
                        <span>{job.applications}</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="View Job"
                          onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit Job"
                          onClick={() => window.location.href = `/employer/edit-job/${job.id}`}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-error-600 hover:text-error-900"
                          title="Delete Job"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowDeleteModal(true);
                          }}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Delete Job Posting
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete the job posting for "{selectedJob.title}"? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  isLoading={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageJobs;