export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyWebsite: string;
  companyDescription: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  postedAt: string;
  closingDate: string;
  applications: number;
  postedBy: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  appliedAt: string;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Offer' | 'Rejected';
  resumeUrl: string;
  coverLetter: string;
}

export interface JobFilters {
  search?: string;
  type?: string;
  experience?: string;
  location?: string;
  page?: number;
  limit?: number;
}