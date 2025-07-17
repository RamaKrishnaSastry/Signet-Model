import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes timeout for training
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.error || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error - please check your connection');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
);

// API functions
export const healthCheck = async () => {
  return await api.get('/health');
};

export const verifySignatures = async (signature1, signature2) => {
  return await api.post('/verify', {
    signature1,
    signature2,
  });
};

export const trainModel = async () => {
  return await api.post('/train');
};

export const evaluateModel = async () => {
  return await api.get('/evaluate');
};

export const getModelInfo = async () => {
  return await api.get('/model-info');
};

export default api;
