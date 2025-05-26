import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XIcon, UploadIcon, CheckCircleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { useApplyForJob } from '../../../hooks/useApplyForJob';
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '../../../config/constants';

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
  company: string;
  onClose: () => void;
}

const applicationSchema = z.object({
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

function ApplyModal({ jobId, jobTitle, company, onClose }: ApplyModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const { applyForJob, isLoading, error } = useApplyForJob();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is PDF or DOCX
      if (
        file.type !== 'application/pdf' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setUploadError('Please upload a PDF or DOCX file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size should be less than 5MB');
        return;
      }
      
      setResumeFile(file);
      setUploadError('');
    }
  };
  
  const uploadResume = async () => {
    if (!resumeFile) {
      setUploadError('Please select a resume file');
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadError('');
      
      const formData = new FormData();
      formData.append('file', resumeFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.secure_url) {
        setResumeUrl(data.secure_url);
        setStep(2);
      } else {
        setUploadError('Failed to upload resume. Please try again.');
      }
    } catch (error) {
      setUploadError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeUrl) {
      setStep(1);
      return;
    }
    
    const applicationData = {
      jobId,
      coverLetter: data.coverLetter,
      phone: data.phone,
      resumeUrl,
    };
    
    const success = await applyForJob(applicationData);
    
    if (success) {
      setStep(3);
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="w-full max-w-md rounded-lg bg-white shadow-xl"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 3 ? 'Application Submitted' : `Apply for ${jobTitle}`}
            </h2>
            <button
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={onClose}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="px-6 py-4">
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  To apply for <span className="font-medium">{jobTitle}</span> at{' '}
                  <span className="font-medium">{company}</span>, please upload your resume.
                </p>
                
                <div className="rounded-md border-2 border-dashed border-gray-300 p-6 text-center">
                  <input
                    type="file"
                    id="resume"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="resume"
                    className="cursor-pointer"
                  >
                    <UploadIcon className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {resumeFile ? resumeFile.name : 'Upload your resume'}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF or DOCX up to 5MB
                    </p>
                  </label>
                </div>
                
                {uploadError && (
                  <div className="rounded-md bg-error-50 p-3 text-sm text-error-700">
                    {uploadError}
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={uploadResume}
                    isLoading={isUploading}
                    disabled={!resumeFile || isUploading}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="coverLetter" className="label">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={6}
                    className={`input ${
                      errors.coverLetter ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder="Tell us why you're a good fit for this position..."
                    {...register('coverLetter')}
                  ></textarea>
                  {errors.coverLetter && (
                    <p className="mt-1 text-sm text-error-600">{errors.coverLetter.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`input ${
                      errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder="Enter your phone number"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
                  )}
                </div>
                
                {error && (
                  <div className="rounded-md bg-error-50 p-3 text-sm text-error-700">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
            
            {step === 3 && (
              <div className="text-center py-6 space-y-4">
                <CheckCircleIcon className="mx-auto h-16 w-16 text-success-500" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Application Submitted!
                </h3>
                <p className="text-gray-600">
                  Your application for {jobTitle} at {company} has been successfully submitted.
                </p>
                <div className="pt-4 space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/applications')}
                  >
                    View My Applications
                  </Button>
                  <Button
                    variant="primary"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ApplyModal;