import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.todoapp.com/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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