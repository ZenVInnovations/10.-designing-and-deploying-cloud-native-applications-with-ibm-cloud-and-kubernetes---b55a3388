import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  EyeIcon, 
  BarChart3Icon, 
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  ExternalLinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { mockJobs } from '../../mocks/jobData';

function Dashboard() {
  // Filter jobs to only show those posted by the current employer
  // In a real application, this would be based on the user's ID
  const myJobs = mockJobs.slice(0, 3);
  
  const stats = [
    {
      name: 'Active Jobs',
      value: myJobs.length,
      icon: BriefcaseIcon,
      change: '+3',
      changeType: 'increase',
    },
    {
      name: 'Total Applicants',
      value: 46,
      icon: UsersIcon,
      change: '+12',
      changeType: 'increase',
    },
    {
      name: 'Job Views',
      value: 1204,
      icon: EyeIcon,
      change: '+28%',
      changeType: 'increase',
    },
    {
      name: 'Conversion Rate',
      value: '3.8%',
      icon: BarChart3Icon,
      change: '-0.5%',
      changeType: 'decrease',
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your job postings and track applicants
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            onClick={() => window.location.href = '/employer/post-job'}
            leftIcon={<PlusIcon className="h-4 w-4" />}
          >
            Post a New Job
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <TrendingUpIcon className="h-4 w-4 text-success-500" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 text-error-500" />
              )}
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {stat.change} since last month
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Recent Jobs */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
          <Link
            to="/employer/manage-jobs"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            View all jobs
          </Link>
        </div>
        
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
                    Applicants
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {myJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
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
                            {job.location}
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
                      {new Date(job.postedAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {job.applications}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/employer/applicants/${job.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View Applicants
                        </Link>
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-gray-600 hover:text-gray-900"
                          target="_blank"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Quick Access */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/employer/post-job'}
              leftIcon={<PlusIcon className="h-4 w-4" />}
            >
              Post a Job
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/employer/manage-jobs'}
              leftIcon={<BriefcaseIcon className="h-4 w-4" />}
            >
              Manage Jobs
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/profile'}
              leftIcon={<UsersIcon className="h-4 w-4" />}
            >
              Company Profile
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => {}}
              leftIcon={<BarChart3Icon className="h-4 w-4" />}
            >
              View Analytics
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-primary-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-primary-900">Hiring Tips</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 text-primary-600">
                  1
                </div>
              </div>
              <p className="ml-3 text-sm text-primary-800">
                Write clear and specific job descriptions to attract qualified candidates.
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 text-primary-600">
                  2
                </div>
              </div>
              <p className="ml-3 text-sm text-primary-800">
                Include salary ranges to increase application rates by up to 30%.
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 text-primary-600">
                  3
                </div>
              </div>
              <p className="ml-3 text-sm text-primary-800">
                Respond to applicants promptly to maintain candidate interest.
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 text-primary-600">
                  4
                </div>
              </div>
              <p className="ml-3 text-sm text-primary-800">
                Use skills-based assessments to evaluate candidates more effectively.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;