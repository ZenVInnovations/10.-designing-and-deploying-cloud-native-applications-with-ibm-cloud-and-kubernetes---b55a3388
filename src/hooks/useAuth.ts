import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config/constants';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobSeeker' | 'employer';
  profileImage?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'jobSeeker' | 'employer';
}

export function useAuthHook() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }
    
    try {
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Verify token and get user info
      const res = await axios.get(`${API_URL}/users/profile`);
      
      setAuthState({
        isAuthenticated: true,
        user: res.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: 'Authentication failed',
      });
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setAuthState({
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
        error: null,
      });
      
      return res.data.user;
    } catch (err: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Login failed',
      }));
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const res = await axios.post(`${API_URL}/auth/register`, data);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setAuthState({
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
        error: null,
      });
      
      return res.data.user;
    } catch (err: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Registration failed',
      }));
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
}