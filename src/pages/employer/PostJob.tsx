import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import { JOB_TYPES, EXPERIENCE_LEVELS, JOB_LOCATIONS } from '../../config/constants';

const jobSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  location: z.string().min(1, 'Please select a location'),
  type: z.string().min(1, 'Please select a job type'),
  experience: z.string().min(1, 'Please select an experience level'),
  salary: z.string().min(1, 'Please enter a salary range'),
  description: z.string().min(50, 'Job description must be at least 50 characters'),
  requirements: z.string().min(30, 'Requirements must be at least 30 characters'),
  responsibilities: z.string().min(30, 'Responsibilities must be at least 30 characters'),
  skills: z.string().min(1, 'Please enter at least one required skill'),
  closingDate: z.string().min(1, 'Please enter a closing date'),
});

type JobFormData = z.infer<typeof jobSchema>;

function PostJob() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    },
  });
  
  const onSubmit = async (data: JobFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      // In a real app, we would make an API call to post the job
      // For now, we'll just simulate a successful post
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Job posted successfully!');
      
      // Redirect to the employer dashboard after a delay
      setTimeout(() => {
        navigate('/employer');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-2 text-lg text-gray-600">
          Create a job listing to find the perfect candidate for your position
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="mb-6 rounded-md bg-error-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircleIcon className="h-5 w-5 text-error-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 rounded-md bg-success-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-success-700">{success}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="label">
                Job Title
              </label>
              <input
                id="title"
                type="text"
                className={`input ${errors.title ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                placeholder="e.g., Senior Frontend Developer"
                {...register('title')}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-error-600">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="salary" className="label">
                Salary Range
              </label>
              <input
                id="salary"
                type="text"
                className={`input ${errors.salary ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                placeholder="e.g., $80,000 - $100,000"
                {...register('salary')}
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-error-600">{errors.salary.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="label">
                Location
              </label>
              <select
                id="location"
                className={`input ${errors.location ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                {...register('location')}
              >
                <option value="">Select Location</option>
                {JOB_LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-error-600">{errors.location.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="type" className="label">
                Job Type
              </label>
              <select
                id="type"
                className={`input ${errors.type ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                {...register('type')}
              >
                <option value="">Select Job Type</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-error-600">{errors.type.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="experience" className="label">
                Experience Level
              </label>
              <select
                id="experience"
                className={`input ${errors.experience ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                {...register('experience')}
              >
                <option value="">Select Experience Level</option>
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.experience && (
                <p className="mt-1 text-sm text-error-600">{errors.experience.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="closingDate" className="label">
                Closing Date
              </label>
              <input
                id="closingDate"
                type="date"
                className={`input ${errors.closingDate ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                {...register('closingDate')}
              />
              {errors.closingDate && (
                <p className="mt-1 text-sm text-error-600">{errors.closingDate.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="label">
              Job Description
            </label>
            <textarea
              id="description"
              rows={5}
              className={`input ${errors.description ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder="Provide a detailed description of the job..."
              {...register('description')}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="requirements" className="label">
              Requirements (one per line)
            </label>
            <textarea
              id="requirements"
              rows={4}
              className={`input ${errors.requirements ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder="e.g., 
3+ years of experience in React
Strong knowledge of JavaScript
Experience with RESTful APIs"
              {...register('requirements')}
            ></textarea>
            {errors.requirements && (
              <p className="mt-1 text-sm text-error-600">{errors.requirements.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="responsibilities" className="label">
              Responsibilities (one per line)
            </label>
            <textarea
              id="responsibilities"
              rows={4}
              className={`input ${errors.responsibilities ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder="e.g.,
Develop and maintain web applications
Collaborate with cross-functional teams
Write clean, maintainable code"
              {...register('responsibilities')}
            ></textarea>
            {errors.responsibilities && (
              <p className="mt-1 text-sm text-error-600">{errors.responsibilities.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="skills" className="label">
              Required Skills (comma separated)
            </label>
            <input
              id="skills"
              type="text"
              className={`input ${errors.skills ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder="e.g., React, JavaScript, TypeScript, HTML, CSS"
              {...register('skills')}
            />
            {errors.skills && (
              <p className="mt-1 text-sm text-error-600">{errors.skills.message}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employer')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Post Job
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default PostJob;