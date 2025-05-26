import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Briefcase, Clock, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '../../../types/job';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden hover:border-primary-200"
    >
      <Link to={`/jobs/${job.id}`} className="block p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={job.company} 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <Building className="h-6 w-6 text-gray-400" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
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
                  <span>{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:block">
            <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
              {job.salary}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="line-clamp-2 text-sm text-gray-600">
            {job.description}
          </p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default JobCard;