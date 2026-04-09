import axios from 'axios';

/**
 * UTKARSH HOME API CONFIGURATION
 * This instance handles all communication between the React frontend 
 * and the Node.js backend.
 */
const API = axios.create({
  // UPDATED: Points to your local server port (5000) for development
  // Switch back to 'https://api.utkarshhome.com/v1' only when you deploy
  baseURL: 'http://localhost:5000/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches the JWT token to the 'Authorization' header
 * so the backend 'protect' middleware can verify the user.
 */
API.interceptors.request.use((config) => {
  // Retrieve the user object stored during login
  const userData = localStorage.getItem('utkarsh_user');
  
  if (userData) {
    const user = JSON.parse(userData);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * RESPONSE INTERCEPTOR
 * Handles global API behaviors like session expiration.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 means the token is invalid or expired
    if (error.response?.status === 401) {
      console.error('Session expired or Unauthorized. Redirecting to login...');
      
      // Optional: Clear local storage and redirect to login page
      // localStorage.removeItem('utkarsh_user');
      // window.location.href = '/login';
    }

    // Handles cases where the server is down (Network Error)
    if (!error.response) {
      console.error('Server is unreachable. Please check if your backend is running on port 5000.');
    }

    return Promise.reject(error);
  }
);

export default API;