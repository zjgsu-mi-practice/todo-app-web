import axios from 'axios';

// Use the API URL from .env.local, falling back to the built-in API if not specified
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    const errorResponse = error.response?.data;
    console.error('API Error:', errorResponse);
    return Promise.reject(errorResponse);
  }
);

export default api; 