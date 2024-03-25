// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', 
  },
});

api.interceptors.request.use(config => {
  console.log('Request headers:', config.headers);
  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken.content;
  }

  return config;
});

export default api;
