// services/api.js
import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include authorization token
api.interceptors.request.use(config => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
