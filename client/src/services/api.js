import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});


//  * REQUEST INTERCEPTOR
 
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
    }

    // Handles cases where the server is down (Network Error)
    if (!error.response) {
      console.error('Server is unreachable. Please check if your backend is running on port 5000.');
    }

    return Promise.reject(error);
  }
);

export default API;