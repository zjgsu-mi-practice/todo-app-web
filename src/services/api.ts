import axios from 'axios';

// Use the API URL from .env.local, falling back to the built-in API if not specified
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent long waits on network errors
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  // Check if running in browser (client-side) before accessing localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Unknown error occurred';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data?.error?.message || 
                     `Server error: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from server. Please check your connection or server status.';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    
    console.error('API Error:', error);
    
    return Promise.reject({
      error: {
        code: error.response?.status || 'NETWORK_ERROR',
        message: errorMessage,
        details: error.response?.data
      }
    });
  }
);

export default api; 