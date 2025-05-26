import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/constants';

interface ApplicationData {
  jobId: string;
  coverLetter: string;
  phone: string;
  resumeUrl: string;
}

export function useApplyForJob() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyForJob = async (data: ApplicationData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real application, we would make an API call
      // const response = await axios.post(`${API_URL}/applications`, data);
      
      // For now, we'll just simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { applyForJob, isLoading, error };
}