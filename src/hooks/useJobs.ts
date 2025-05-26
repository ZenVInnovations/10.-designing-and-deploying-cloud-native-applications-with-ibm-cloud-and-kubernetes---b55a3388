import { useState, useEffect } from 'react';
import axios from 'axios';
import { Job, JobFilters } from '../types/job';
import { API_URL } from '../config/constants';

// Mock data for frontend development
import { mockJobs } from '../mocks/jobData';

export function useJobs(filters: JobFilters = {}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real application, we would use the API
        // const response = await axios.get(`${API_URL}/jobs`, { params: filters });
        // setJobs(response.data);
        
        // For now, we'll use mock data and apply filters client-side
        let filteredJobs = [...mockJobs];
        
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filteredJobs = filteredJobs.filter(
            job => 
              job.title.toLowerCase().includes(search) ||
              job.company.toLowerCase().includes(search) ||
              job.description.toLowerCase().includes(search) ||
              job.skills.some(skill => skill.toLowerCase().includes(search))
          );
        }
        
        if (filters.type) {
          filteredJobs = filteredJobs.filter(
            job => job.type === filters.type
          );
        }
        
        if (filters.experience) {
          filteredJobs = filteredJobs.filter(
            job => job.experience === filters.experience
          );
        }
        
        if (filters.location) {
          filteredJobs = filteredJobs.filter(
            job => job.location === filters.location
          );
        }
        
        // Simulate API delay
        setTimeout(() => {
          setJobs(filteredJobs);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters.search, filters.type, filters.experience, filters.location]);

  return { jobs, loading, error };
}