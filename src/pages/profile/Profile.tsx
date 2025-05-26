import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { AlertCircleIcon, SaveIcon, UploadIcon, User, CheckCircleIcon } from 'lucide-react';
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '../../config/constants';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional(),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
  location: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImage || '');
  const [isUploading, setIsUploading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      title: '',
      company: '',
      bio: '',
      location: '',
      website: '',
    },
  });
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    try {
      setIsUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.secure_url) {
        setProfileImage(data.secure_url);
      } else {
        setError('Failed to upload image. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      // In a real app, we would make an API call to update the profile
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-lg text-gray-600">
          Update your personal information and profile settings
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="relative mx-auto h-32 w-32">
                <div className={`h-full w-full overflow-hidden rounded-full border-4 border-white ${isUploading ? 'opacity-50' : ''}`}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                  </div>
                )}
                <label
                  htmlFor="profile-image"
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600"
                >
                  <UploadIcon className="h-4 w-4" />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {user?.name || 'Your Name'}
              </h2>
              <p className="text-gray-500">
                {user?.role === 'jobSeeker' ? 'Job Seeker' : 'Employer'}
              </p>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Account Info</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm text-gray-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Actions</h3>
              <div className="mt-4 space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<SaveIcon className="h-4 w-4" />}
                  onClick={() => {
                    document.getElementById('submit-profile-btn')?.click();
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            
            {error && (
              <div className="mt-4 rounded-md bg-error-50 p-4">
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
              <div className="mt-4 rounded-md bg-success-50 p-4">
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
            
            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`input ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                    disabled
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`input ${errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="location" className="label">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    className={`input ${errors.location ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="City, Country"
                    {...register('location')}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-error-600">{errors.location.message}</p>
                  )}
                </div>
              </div>
              
              {user?.role === 'jobSeeker' ? (
                <>
                  <div>
                    <label htmlFor="title" className="label">
                      Professional Title
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
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="company" className="label">
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      className={`input ${errors.company ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      {...register('company')}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-error-600">{errors.company.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="label">
                      Company Website
                    </label>
                    <input
                      id="website"
                      type="url"
                      className={`input ${errors.website ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="https://example.com"
                      {...register('website')}
                    />
                    {errors.website && (
                      <p className="mt-1 text-sm text-error-600">{errors.website.message}</p>
                    )}
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="bio" className="label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className={`input ${errors.bio ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Tell us about yourself..."
                  {...register('bio')}
                ></textarea>
                {errors.bio && (
                  <p className="mt-1 text-sm text-error-600">{errors.bio.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Brief description of yourself or your company for your profile. Maximum 500 characters.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button
                  id="submit-profile-btn"
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  leftIcon={<SaveIcon className="h-4 w-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
          
          {user?.role === 'jobSeeker' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-8 rounded-lg bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900">Resume & Documents</h2>
              <p className="mt-2 text-sm text-gray-600">
                Upload and manage your resume and other documents.
              </p>
              
              <div className="mt-6 rounded-md border-2 border-dashed border-gray-300 p-6">
                <div className="text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                    >
                      <span>Upload Resume</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    PDF or DOCX up to 5MB
                  </p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">My Documents</h3>
                <p className="mt-2 text-sm text-gray-500">
                  No documents uploaded yet.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;