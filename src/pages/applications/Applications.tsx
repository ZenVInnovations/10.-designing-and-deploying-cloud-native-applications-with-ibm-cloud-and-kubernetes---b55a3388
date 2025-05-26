import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CheckCircleIcon, ClockIcon, XCircleIcon, MessageSquareIcon, BriefcaseIcon, AlertTriangleIcon, EyeIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { mockApplications } from '../../mocks/jobData';
import { JobApplication } from '../../types/job';

function Applications() {
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-warning-500" />;
      case 'Reviewed':
        return <EyeIcon className="h-5 w-5 text-primary-500" />;
      case 'Interview':
        return <MessageSquareIcon className="h-5 w-5 text-accent-500" />;
      case 'Offer':
        return <CheckCircleIcon className="h-5 w-5 text-success-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-5 w-5 text-error-500" />;
      default:
        return <AlertTriangleIcon className="h-5 w-5 text-gray-500" />;
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
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="mt-2 text-lg text-gray-600">
          Track the status of your job applications
        </p>
      </div>
      
      {applications.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <BriefcaseIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
          <p className="mt-2 text-gray-500">
            You haven't applied to any jobs yet. Start exploring job opportunities!
          </p>
          <div className="mt-6">
            <Button variant="primary" onClick={() => window.location.href = '/jobs'}>
              Browse Jobs
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
                    Job
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Applied On
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {applications.map((application) => (
                  <motion.tr
                    key={application.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.jobTitle}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          {application.companyLogo ? (
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={application.companyLogo}
                              alt={application.company}
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                              <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {format(new Date(application.appliedAt), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{application.status}</span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                      >
                        View Details
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Application Details
              </h2>
              <button
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => setSelectedApplication(null)}
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 flex-shrink-0">
                    {selectedApplication.companyLogo ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={selectedApplication.companyLogo}
                        alt={selectedApplication.company}
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <BriefcaseIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedApplication.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedApplication.company}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                  {getStatusIcon(selectedApplication.status)}
                  <span className="ml-1">{selectedApplication.status}</span>
                </span>
              </div>
              
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Applied On</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(new Date(selectedApplication.appliedAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Resume</h4>
                  <p className="mt-1">
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      View Resume
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
                <div className="mt-1 rounded-md border border-gray-200 bg-gray-50 p-4">
                  <p className="whitespace-pre-line text-sm text-gray-700">
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => window.open(`/jobs/${selectedApplication.jobId}`, '_blank')}
                >
                  View Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;