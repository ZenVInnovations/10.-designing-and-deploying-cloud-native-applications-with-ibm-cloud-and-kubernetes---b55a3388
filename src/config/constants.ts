// Base API URL - would be different in production
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Cloudinary configuration
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'jobquest';
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

// Job Types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
  'Temporary',
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Manager',
  'Director',
  'Executive',
];

// Job Locations
export const JOB_LOCATIONS = [
  'Remote',
  'Hybrid',
  'On-site',
];

// Application Statuses
export const APPLICATION_STATUSES = [
  'Pending',
  'Reviewed',
  'Interview',
  'Offer',
  'Rejected',
];