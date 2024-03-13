// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(config => {
  console.log('Request headers:', config.headers);
  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
