import { useState, useEffect } from 'react';
import axios from 'axios';
import { Job } from '../types/job';
import { API_URL } from '../config/constants';

// Mock data for frontend development
import { mockJobs } from '../mocks/jobData';

export function useJob(id: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real application, we would use the API
        // const response = await axios.get(`${API_URL}/jobs/${id}`);
        // setJob(response.data);
        
        // For now, we'll use mock data
        const foundJob = mockJobs.find(job => job.id === id);
        
        if (foundJob) {
          // Simulate API delay
          setTimeout(() => {
            setJob(foundJob);
            setLoading(false);
          }, 800);
        } else {
          setError('Job not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch job details');
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  return { job, loading, error };
}